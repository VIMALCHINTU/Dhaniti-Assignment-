const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    application_id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    student_name: {
      type: String,
      required: true,
      trim: true
    },

    age: Number,

    student_state: {
      type: String,
      trim: true
    },

    institution_id: String,

    institution_name: {
      type: String,
      trim: true
    },

    course_id: String,

    course_name: {
      type: String,
      trim: true
    },

    course_domain: {
      type: String,
      trim: true
    },

    course_fee_inr: Number,

    loan_amount_requested_inr: Number,

    parent_monthly_income_inr: Number,

    existing_monthly_obligations_inr: Number,

    credit_score: Number,

    employment_type: {
      type: String,
      trim: true
    },

    application_date: Date,

    application_status: {
      type: String,
      enum: [
        "Submitted",
        "Under Review",
        "Approved",
        "Rejected"
      ],
      default: "Submitted"
    },

    application_channel: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

module.exports = Application;