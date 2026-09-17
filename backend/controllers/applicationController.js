const Application = require("../models/Application");

// ========================================
// GET ALL APPLICATIONS
// Search, Filter, Sort, Pagination
// ========================================

const getApplications = async (req, res) => {
  try {
    const {
      search = "",
      status = "",
      course = "",
      institution = "",
      sortBy = "",
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    // ========================================
    // SEARCH
    // Search by Application ID or Student Name
    // ========================================

    if (search.trim()) {
      filter.$or = [
        {
          application_id: {
            $regex: search.trim(),
            $options: "i"
          }
        },
        {
          student_name: {
            $regex: search.trim(),
            $options: "i"
          }
        }
      ];
    }

    // ========================================
    // STATUS FILTER
    // ========================================

    if (status) {
      filter.application_status = status;
    }

    // ========================================
    // COURSE FILTER
    // ========================================

    if (course) {
      filter.course_name = course;
    }

    // ========================================
    // INSTITUTION FILTER
    // ========================================

    if (institution) {
      filter.institution_name = institution;
    }

    // ========================================
    // SORTING
    // ========================================

    let sort = {
      application_date: -1
    };

    if (sortBy === "loan-high") {
      sort = {
        loan_amount_requested_inr: -1
      };
    }

    if (sortBy === "loan-low") {
      sort = {
        loan_amount_requested_inr: 1
      };
    }

    if (sortBy === "credit-high") {
      sort = {
        credit_score: -1
      };
    }

    if (sortBy === "credit-low") {
      sort = {
        credit_score: 1
      };
    }

    // ========================================
    // PAGINATION
    // ========================================

    const pageNumber = Math.max(
      Number(page),
      1
    );

    // No maximum of 100 here.
    // Dashboard can request ?limit=1000
    const limitNumber = Math.max(
      Number(limit),
      1
    );

    const skip =
      (pageNumber - 1) * limitNumber;

    // ========================================
    // GET DATA + TOTAL COUNT
    // ========================================

    const [applications, total] =
      await Promise.all([
        Application.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(limitNumber),

        Application.countDocuments(filter)
      ]);

    // ========================================
    // RESPONSE
    // ========================================

    res.status(200).json({
      applications,

      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(
          total / limitNumber
        )
      }
    });

  } catch (error) {

    console.error(
      "Get applications error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message
    });
  }
};


// ========================================
// GET SINGLE APPLICATION
// ========================================

const getApplicationById = async (req, res) => {
  try {

    const application =
      await Application.findOne({
        application_id: req.params.id
      });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.status(200).json(
      application
    );

  } catch (error) {

    console.error(
      "Get application error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch application",
      error: error.message
    });
  }
};


// ========================================
// CREATE APPLICATION
// ========================================

const createApplication = async (req, res) => {
  try {

    // ========================================
    // FIND HIGHEST EXISTING APPLICATION ID
    // ========================================

    const applications =
      await Application.find(
        {},
        { application_id: 1 }
      );

    let maxNumber = 1000;

    applications.forEach(
      (application) => {

        const id =
          application.application_id;

        if (
          id &&
          id.startsWith("EDU")
        ) {

          const number =
            Number(
              id.replace("EDU", "")
            );

          if (
            !isNaN(number) &&
            number > maxNumber
          ) {
            maxNumber = number;
          }
        }
      }
    );

    // Generate new application ID
    const application_id =
      `EDU${maxNumber + 1}`;


    // ========================================
    // PREPARE APPLICATION DATA
    // ========================================

    const applicationData = {
      ...req.body,

      application_id,

      student_state:
        req.body.student_state ||
        req.body.state,

      application_date:
        new Date(),

      application_status:
        "Submitted"
    };


    // ========================================
    // CREDIT SCORE VALIDATION
    // ========================================

    const creditScore =
      Number(applicationData.credit_score);

    if (creditScore < 550) {

      return res.status(400).json({
        message:
          "Credit score must be 55 0 or above"
      });

    }


    // ========================================
    // REMOVE FRONTEND-ONLY FIELDS
    // ========================================

    delete applicationData.state;

    delete applicationData.gender;


    // ========================================
    // CREATE APPLICATION
    // ========================================

    const application =
      await Application.create(
        applicationData
      );


    // ========================================
    // SUCCESS RESPONSE
    // ========================================

    res.status(201).json({

      message:
        "Application created successfully",

      application

    });

  } catch (error) {

    // ========================================
    // ERROR HANDLING
    // ========================================

    console.error(
      "Create application error:",
      error
    );

    res.status(400).json({

      message:
        "Failed to create application",

      error:
        error.message

    });
  }
};




// ========================================
// UPDATE APPLICATION STATUS
// ========================================

const updateApplicationStatus =
  async (req, res) => {

    try {

      const {
        application_status
      } = req.body;

      // ========================================
      // VALIDATE STATUS
      // ========================================

      const validStatuses = [
        "Submitted",
        "Under Review",
        "Approved",
        "Rejected"
      ];

      if (
        !validStatuses.includes(
          application_status
        )
      ) {

        return res.status(400).json({
          message:
            "Invalid application status"
        });

      }

      // ========================================
      // UPDATE
      // ========================================

      const application =
        await Application.findOneAndUpdate(

          {
            application_id:
              req.params.id
          },

          {
            application_status
          },

          {
            new: true,
            runValidators: true
          }

        );

      // ========================================
      // NOT FOUND
      // ========================================

      if (!application) {

        return res.status(404).json({
          message:
            "Application not found"
        });

      }

      // ========================================
      // RESPONSE
      // ========================================

      res.status(200).json({

        message:
          "Application status updated successfully",

        application

      });

    } catch (error) {

      console.error(
        "Update status error:",
        error
      );

      res.status(500).json({

        message:
          "Failed to update application status",

        error:
          error.message

      });
    }
  };


// ========================================
// EXPORT FUNCTIONS
// ========================================

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus
};