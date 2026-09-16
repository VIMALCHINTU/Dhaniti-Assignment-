import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddApplication() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_name: "",
    age: "",
    gender: "",
    state: "",
    institution_name: "",
    course_name: "",
    course_domain: "",
    course_fee_inr: "",
    loan_amount_requested_inr: "",
    parent_monthly_income_inr: "",
    existing_monthly_obligations_inr: "",
    credit_score: "",
    employment_type: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:5000/api/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to create application"
      );
    }

    console.log("Created Application:", data.application);

    alert("Application created successfully");

    navigate("/applications");

  } catch (error) {
    console.error("Create application error:", error);

    alert(
      `Failed to create application: ${error.message}`
    );
  }
};
  
  return (
    <div className="add-page">

      <div className="page-header">

        <div>
          <h1>Add Application</h1>

          <p>
            Create a new education-loan application
          </p>
        </div>

      </div>


      <form
        className="application-form"
        onSubmit={handleSubmit}
      >

        {/* STUDENT INFORMATION */}

        <div className="form-section">

          <h2>Student Information</h2>

          <div className="form-grid">

            <div className="form-group">

              <label>Student Name</label>

              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />

            </div>


            <div className="form-group">

              <label>Age</label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
              />

            </div>


            <div className="form-group">

              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

              </select>

            </div>


            <div className="form-group">

              <label>State</label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
              />

            </div>


            <div className="form-group">

              <label>Employment Type</label>

              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select employment type
                </option>

                <option value="Salaried">
                  Salaried
                </option>

                <option value="Self-Employed">
                  Self-Employed
                </option>

                <option value="Business">
                  Business
                </option>

                <option value="Unemployed">
                  Unemployed
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* EDUCATION */}

        <div className="form-section">

          <h2>Education Information</h2>

          <div className="form-grid">

            <div className="form-group">

              <label>Institution</label>

              <input
                type="text"
                name="institution_name"
                value={formData.institution_name}
                onChange={handleChange}
                placeholder="Enter institution"
                required
              />

            </div>


            <div className="form-group">

              <label>Course</label>

              <input
                type="text"
                name="course_name"
                value={formData.course_name}
                onChange={handleChange}
                placeholder="Enter course"
                required
              />

            </div>


            <div className="form-group">

              <label>Course Domain</label>

              <input
                type="text"
                name="course_domain"
                value={formData.course_domain}
                onChange={handleChange}
                placeholder="Example: Engineering"
              />

            </div>


            <div className="form-group">

              <label>Course Fee (₹)</label>

              <input
                type="number"
                name="course_fee_inr"
                value={formData.course_fee_inr}
                onChange={handleChange}
                placeholder="Enter course fee"
                required
              />

            </div>

          </div>

        </div>


        {/* LOAN */}

        <div className="form-section">

          <h2>Loan Information</h2>

          <div className="form-grid">

            <div className="form-group">

              <label>Loan Amount Requested (₹)</label>

              <input
                type="number"
                name="loan_amount_requested_inr"
                value={formData.loan_amount_requested_inr}
                onChange={handleChange}
                placeholder="Enter loan amount"
                required
              />

            </div>


            <div className="form-group">

              <label>Parent Monthly Income (₹)</label>

              <input
                type="number"
                name="parent_monthly_income_inr"
                value={formData.parent_monthly_income_inr}
                onChange={handleChange}
                placeholder="Enter monthly income"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Existing Monthly Obligations (₹)
              </label>

              <input
                type="number"
                name="existing_monthly_obligations_inr"
                value={
                  formData.existing_monthly_obligations_inr
                }
                onChange={handleChange}
                placeholder="Enter obligations"
              />

            </div>


            <div className="form-group">

              <label>Credit Score</label>

              <input
                type="number"
                name="credit_score"
                value={formData.credit_score}
                onChange={handleChange}
                placeholder="Enter credit score"
              />

            </div>

          </div>

        </div>


        {/* BUTTONS */}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/applications")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-button"
          >
            Create Application
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddApplication;