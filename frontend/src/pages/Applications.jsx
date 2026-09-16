import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [course, setCourse] = useState("");
  const [institution, setInstitution] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [courses, setCourses] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch applications
  const fetchApplications = async (
    selectedPage = 1
  ) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search);
      }

      if (status) {
        params.append("status", status);
      }

      if (course) {
        params.append("course", course);
      }

      if (institution) {
        params.append("institution", institution);
      }

      if (sortBy) {
        params.append("sortBy", sortBy);
      }

      params.append("page", selectedPage);
      params.append("limit", 10);

      const response = await fetch(
        `http://localhost:5000/api/applications?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();

      setApplications(data.applications);
      setPagination(data.pagination);

    } catch (error) {
      console.error(
        "Applications fetch error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Initial data
  useEffect(() => {
    fetchApplications(1);
  }, []);

  // Get filter options
  useEffect(() => {
    fetch(
      "http://localhost:5000/api/applications?limit=100"
    )
      .then((response) => response.json())
      .then((data) => {
        const allApplications = data.applications;

        const uniqueCourses = [
          ...new Set(
            allApplications
              .map((item) => item.course_name?.trim())
              .filter(Boolean)
          )
        ];

        const uniqueInstitutions = [
          ...new Set(
            allApplications
              .map(
                (item) =>
                  item.institution_name?.trim()
              )
              .filter(Boolean)
          )
        ];

        setCourses(uniqueCourses);
        setInstitutions(uniqueInstitutions);
      })
      .catch((error) => {
        console.error(
          "Filter data error:",
          error
        );
      });
  }, []);

  // Apply filters
  const handleApplyFilters = () => {
    fetchApplications(1);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setCourse("");
    setInstitution("");
    setSortBy("");

    setTimeout(() => {
      fetchApplications(1);
    }, 0);
  };

  return (
    <div className="applications-page">

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h1>Applications</h1>

          <p>
            Manage education-loan applications
          </p>
        </div>

        <Link
          to="/add-application"
          className="primary-button"
        >
          + Add Application
        </Link>

      </div>


      {/* FILTERS */}

      <div className="filters">

        <input
          type="text"
          placeholder="Search by ID or student name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">
            All Status
          </option>

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


        <select
          value={course}
          onChange={(e) =>
            setCourse(e.target.value)
          }
        >
          <option value="">
            All Courses
          </option>

          {courses.map((courseName) => (
            <option
              key={courseName}
              value={courseName}
            >
              {courseName}
            </option>
          ))}

        </select>


        <select
          value={institution}
          onChange={(e) =>
            setInstitution(e.target.value)
          }
        >
          <option value="">
            All Institutions
          </option>

          {institutions.map(
            (institutionName) => (
              <option
                key={institutionName}
                value={institutionName}
              >
                {institutionName}
              </option>
            )
          )}

        </select>


        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="">
            Sort By
          </option>

          <option value="loan-high">
            Loan Amount: High → Low
          </option>

          <option value="loan-low">
            Loan Amount: Low → High
          </option>

          <option value="credit-high">
            Credit Score: High → Low
          </option>

          <option value="credit-low">
            Credit Score: Low → High
          </option>

        </select>

        <button
          className="filter-button"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>

        <button
          className="clear-button"
          onClick={handleClearFilters}
        >
          Clear
        </button>

      </div>


      {/* RESULT COUNT */}

      <p className="result-count">
        Showing{" "}
        {applications.length} of{" "}
        {pagination.total} applications
      </p>


      {/* TABLE */}

      <div className="table-container">

        {loading ? (

          <div className="loading">
            Loading applications...
          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>
                  Application ID
                </th>

                <th>
                  Student
                </th>

                <th>
                  Course
                </th>

                <th>
                  Institution
                </th>

                <th>
                  Loan Amount
                </th>

                <th>
                  Credit Score
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {applications.map(
                (application) => (

                  <tr
                    key={
                      application.application_id
                    }
                  >

                    <td>
                      {
                        application.application_id
                      }
                    </td>

                    <td>
                      {
                        application.student_name
                      }
                    </td>

                    <td>
                      {
                        application.course_name
                      }
                    </td>

                    <td>
                      {
                        application.institution_name
                      }
                    </td>

                    <td>
                      ₹
                      {Number(
                        application.loan_amount_requested_inr ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      {
                        application.credit_score ??
                        "N/A"
                      }
                    </td>

                    <td>

                      <span
                        className={`status ${application.application_status
                          ?.toLowerCase()
                          .replace(
                            " ",
                            "-"
                          )}`}
                      >
                        {
                          application.application_status
                        }
                      </span>

                    </td>

                    <td>

                      <Link
                        to={`/applications/${application.application_id}`}
                        className="view-link"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

        {!loading &&
          applications.length === 0 && (
            <p className="no-results">
              No applications found.
            </p>
          )}

      </div>


      {/* PAGINATION */}

      {pagination.totalPages > 1 && (

        <div className="pagination">

          <button
            disabled={
              pagination.page === 1
            }
            onClick={() =>
              fetchApplications(
                pagination.page - 1
              )
            }
          >
            ← Previous
          </button>


          <span>
            Page {pagination.page} of{" "}
            {pagination.totalPages}
          </span>


          <button
            disabled={
              pagination.page ===
              pagination.totalPages
            }
            onClick={() =>
              fetchApplications(
                pagination.page + 1
              )
            }
          >
            Next →
          </button>

        </div>

      )}

    </div>
  );
}

export default Applications;