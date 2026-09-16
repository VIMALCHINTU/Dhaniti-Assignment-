import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  // Fetch application
  useEffect(() => {
    fetch(`http://localhost:5000/api/applications/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Application not found");
        }

        return response.json();
      })
      .then((data) => {
        setApplication(data);
        setNewStatus(data.application_status);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  // Update status
  const handleStatusUpdate = async () => {
    try {
      setUpdating(true);

      const response = await fetch(
        `http://localhost:5000/api/applications/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            application_status: newStatus
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();

      setApplication(data.application);

      alert("Application status updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="details-page">
        <h2>Loading application...</h2>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="details-page">
        <h2>Application not found</h2>

        <button onClick={() => navigate("/applications")}>
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">

      {/* Header */}

      <div className="details-header">

        <div>
          <button
            className="back-button"
            onClick={() => navigate("/applications")}
          >
            ← Back to Applications
          </button>

          <h1>{application.application_id}</h1>

          <p>{application.student_name}</p>
        </div>

        <span
          className={`status ${application.application_status
            ?.toLowerCase()
            .replace(" ", "-")}`}
        >
          {application.application_status}
        </span>

      </div>

      {/* Student Information */}

      <div className="details-section">

        <h2>Student Information</h2>

        <div className="details-grid">

          <div>
            <span>Name</span>
            <strong>{application.student_name}</strong>
          </div>

          <div>
            <span>Age</span>
            <strong>{application.age || "N/A"}</strong>
          </div>

          <div>
            <span>State</span>
            <strong>{application.student_state || "N/A"}</strong>
          </div>

          <div>
            <span>Gender</span>
            <strong>{application.gender || "N/A"}</strong>
          </div>

        </div>

      </div>

      {/* Education Information */}

      <div className="details-section">

        <h2>Education Information</h2>

        <div className="details-grid">

          <div>
            <span>Institution</span>
            <strong>
              {application.institution_name || "N/A"}
            </strong>
          </div>

          <div>
            <span>Course</span>
            <strong>
              {application.course_name || "N/A"}
            </strong>
          </div>

          <div>
            <span>Course Domain</span>
            <strong>
              {application.course_domain || "N/A"}
            </strong>
          </div>

          <div>
            <span>Course Fee</span>
            <strong>
              ₹
              {Number(
                application.course_fee_inr || 0
              ).toLocaleString("en-IN")}
            </strong>
          </div>

        </div>

      </div>

      {/* Loan Information */}

      <div className="details-section">

        <h2>Loan Information</h2>

        <div className="details-grid">

          <div>
            <span>Loan Requested</span>
            <strong>
              ₹
              {Number(
                application.loan_amount_requested_inr || 0
              ).toLocaleString("en-IN")}
            </strong>
          </div>

          <div>
            <span>Parent Monthly Income</span>
            <strong>
              ₹
              {Number(
                application.parent_monthly_income_inr || 0
              ).toLocaleString("en-IN")}
            </strong>
          </div>

          <div>
            <span>Existing Obligations</span>
            <strong>
              ₹
              {Number(
                application.existing_monthly_obligations_inr || 0
              ).toLocaleString("en-IN")}
            </strong>
          </div>

          <div>
            <span>Credit Score</span>
            <strong>
              {application.credit_score ?? "N/A"}
            </strong>
          </div>

        </div>

      </div>

      {/* Application Information */}

      <div className="details-section">

        <h2>Application Information</h2>

        <div className="details-grid">

          <div>
            <span>Application Date</span>
            <strong>
              {application.application_date
                ? new Date(
                    application.application_date
                  ).toLocaleDateString("en-IN")
                : "N/A"}
            </strong>
          </div>

          <div>
            <span>Employment Type</span>
            <strong>
              {application.employment_type || "N/A"}
            </strong>
          </div>

          <div>
            <span>Application Channel</span>
            <strong>
              {application.application_channel || "N/A"}
            </strong>
          </div>

        </div>

      </div>

      {/* Status Update */}

      <div className="details-section">

        <h2>Update Application Status</h2>

        <div className="status-update">

          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Submitted">
              Submitted
            </option>

            <option value="Under Review">
              Under Review
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>

          <button
            className="primary-button"
            onClick={handleStatusUpdate}
            disabled={updating}
          >
            {updating
              ? "Updating..."
              : "Update Status"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ApplicationDetails;