const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.join(__dirname, "../.env")
});

const Application = require("../models/Application");

const applications = [];

const filePath = path.join(
  __dirname,
  "education_loan_applications.csv"
);

// Read CSV
fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (row) => {
    applications.push({
      application_id: row.application_id,

      student_name: row.student_name,

      age: row.age
        ? Number(row.age)
        : null,

      student_state: row.student_state,

      institution_id: row.institution_id,

      institution_name: row.institution_name,

      course_id: row.course_id,

      course_name: row.course_name,

      course_domain: row.course_domain,

      course_fee_inr: row.course_fee_inr
        ? Number(row.course_fee_inr)
        : null,

      loan_amount_requested_inr:
        row.loan_amount_requested_inr
          ? Number(row.loan_amount_requested_inr)
          : null,

      parent_monthly_income_inr:
        row.parent_monthly_income_inr
          ? Number(row.parent_monthly_income_inr)
          : null,

      existing_monthly_obligations_inr:
        row.existing_monthly_obligations_inr
          ? Number(row.existing_monthly_obligations_inr)
          : null,

      credit_score:
        row.credit_score === ""
          ? null
          : Number(row.credit_score),

      employment_type: row.employment_type,

      application_date:
        row.application_date
          ? new Date(row.application_date)
          : null,

      application_status: row.application_status,

      application_channel: row.application_channel
    });
  })

  .on("end", async () => {
    try {
      console.log(`CSV records found: ${applications.length}`);

      // Connect MongoDB
      await mongoose.connect(process.env.MONGODB_URI);

      console.log("MongoDB connected");

      // Delete existing data
      await Application.deleteMany({});

      console.log("Old application data cleared");

      // Remove old incorrect index
      try {
        await mongoose.connection.db
          .collection("applications")
          .dropIndex("applicationId_1");

        console.log("Old applicationId index removed");
      } catch (error) {
        console.log("Old applicationId index not found");
      }

      // Insert applications
      await Application.insertMany(applications);

      console.log(
        `${applications.length} applications inserted successfully`
      );

      await mongoose.connection.close();

      console.log("MongoDB connection closed");

      process.exit(0);

    } catch (error) {
      console.error("Seeding failed:", error.message);

      await mongoose.connection.close();

      process.exit(1);
    }
  })

  .on("error", (error) => {
    console.error("CSV reading failed:", error.message);
    process.exit(1);
  });