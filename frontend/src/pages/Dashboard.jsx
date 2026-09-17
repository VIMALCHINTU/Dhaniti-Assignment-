import { useEffect, useState } from "react";

import KPICard from "../Components/KPICards";
import StatusChart from "../Components/StatusChart";
import CourseChart from "../Components/CourseChart";
import TimeChart from "../Components/TimeChart";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH APPLICATIONS
  // ==============================

  useEffect(() => {
    fetch("https://dhaniti-assignment.onrender.com/api/applications?limit=1000")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        return response.json();
      })
      .then((data) => {
        setApplications(data.applications);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard error:", error);
        setLoading(false);
      });
  }, []);

  // ==============================
  // KPI CALCULATIONS
  // ==============================

  const total = applications.length;

  const approved = applications.filter(
    (application) =>
      application.application_status?.trim() === "Approved"
  ).length;

  const underReview = applications.filter(
    (application) =>
      application.application_status?.trim() === "Under Review"
  ).length;

  const rejected = applications.filter(
    (application) =>
      application.application_status?.trim() === "Rejected"
  ).length;

  const totalLoan = applications.reduce(
    (sum, application) =>
      sum +
      Number(
        application.loan_amount_requested_inr || 0
      ),
    0
  );

  // ==============================
  // INSIGHT 1
  // APPROVAL RATE
  // ==============================

  const approvalRate =
    total > 0
      ? ((approved / total) * 100).toFixed(1)
      : 0;

  // ==============================
  // INSIGHT 2
  // HIGHEST AVERAGE LOAN COURSE
  // ==============================

  const courseLoanData = {};

  applications.forEach((application) => {
    const course =
      application.course_name?.trim();

    if (!course) return;

    if (!courseLoanData[course]) {
      courseLoanData[course] = {
        totalLoan: 0,
        count: 0,
      };
    }

    courseLoanData[course].totalLoan += Number(
      application.loan_amount_requested_inr || 0
    );

    courseLoanData[course].count++;
  });

  let highestLoanCourse = "";
  let highestAverageLoan = 0;

  Object.entries(courseLoanData).forEach(
    ([course, data]) => {
      const averageLoan =
        data.totalLoan / data.count;

      if (averageLoan > highestAverageLoan) {
        highestAverageLoan = averageLoan;
        highestLoanCourse = course;
      }
    }
  );

  // ==============================
  // INSIGHT 3
  // PEAK APPLICATION MONTH
  // ==============================

  const monthCounts = {};

  applications.forEach((application) => {
    if (!application.application_date) return;

    const date = new Date(
      application.application_date
    );

    const month = date.toLocaleString("en-US", {
      month: "long",
    });

    monthCounts[month] =
      (monthCounts[month] || 0) + 1;
  });

  let highestMonth = "";
  let highestMonthCount = 0;

  Object.entries(monthCounts).forEach(
    ([month, count]) => {
      if (count > highestMonthCount) {
        highestMonth = month;
        highestMonthCount = count;
      }
    }
  );

  // ==============================
  // INSIGHT 4
  // REJECTED LOAN DEMAND
  // ==============================

  const rejectedApplications =
    applications.filter(
      (application) =>
        application.application_status?.trim() ===
        "Rejected"
    );

  const rejectedLoanTotal =
    rejectedApplications.reduce(
      (sum, application) =>
        sum +
        Number(
          application.loan_amount_requested_inr || 0
        ),
      0
    );

  const rejectedAverageLoan =
    rejectedApplications.length > 0
      ? rejectedLoanTotal /
        rejectedApplications.length
      : 0;

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div className="dashboard">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <h1>
            Education Lending Dashboard
          </h1>

          <p>
            Overview of education-loan applications
          </p>

        </div>

      </div>

      {/* KPI CARDS */}

      <div className="kpi-grid">

        <KPICard
          title="Total Applications"
          value={total}
        />

        <KPICard
          title="Approved Applications"
          value={approved}
        />

        <KPICard
          title="Under Review"
          value={underReview}
        />

        <KPICard
          title="Rejected Applications"
          value={rejected}
        />

        <KPICard
          title="Total Loan Requested"
          value={`₹${totalLoan.toLocaleString(
            "en-IN"
          )}`}
        />

      </div>

      {/* CHARTS */}

      <div className="charts-grid">

        <StatusChart
          applications={applications}
        />

        <CourseChart
          applications={applications}
        />

        <TimeChart
          applications={applications}
        />

      </div>

      {/* BUSINESS INSIGHTS */}

      <div className="insights-section">

        <h2>Business Insights</h2>

        <div className="insights-grid">

          {/* INSIGHT 1 */}

          <div className="insight-card">

            <span className="insight-number">
              01
            </span>

            <div>

              <h3>Approval Rate</h3>

              <p>
                {approved} out of {total} applications
                are approved, resulting in an approval
                rate of {approvalRate}%.
              </p>

            </div>

          </div>

          {/* INSIGHT 2 */}

          <div className="insight-card">

            <span className="insight-number">
              02
            </span>

            <div>

              <h3>
                Highest Average Loan by Course
              </h3>

              <p>

                {highestLoanCourse
                  ? `${highestLoanCourse} has the highest
                     average requested loan amount of
                     ₹${Math.round(
                       highestAverageLoan
                     ).toLocaleString("en-IN")}
                     per application.`
                  : "No course loan data available."}

              </p>

            </div>

          </div>

          {/* INSIGHT 3 */}

          <div className="insight-card">

            <span className="insight-number">
              03
            </span>

            <div>

              <h3>
                Peak Application Month
              </h3>

              <p>

                {highestMonth
                  ? `${highestMonth} recorded the highest
                     number of applications with
                     ${highestMonthCount} applications.`
                  : "No application date data available."}

              </p>

            </div>

          </div>

          {/* INSIGHT 4 */}

          <div className="insight-card">

            <span className="insight-number">
              04
            </span>

            <div>

              <h3>Rejected Loan Demand</h3>

              <p>

                {rejectedApplications.length > 0
                  ? `${rejectedApplications.length}
                     rejected applications requested an
                     average loan amount of
                     ₹${Math.round(
                       rejectedAverageLoan
                     ).toLocaleString("en-IN")}
                     per application.`
                  : "No rejected applications available."}

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* DATA QUALITY */}

      <div className="data-quality-section">

        <h2>Data Quality & Handling</h2>

        <div className="quality-grid">

          <div className="quality-card">

            <h3>Missing Credit Score</h3>

            <p>
              Some applications have no credit score.
              Missing values are displayed as N/A
              instead of being replaced with an
              assumed value.
            </p>

          </div>

          <div className="quality-card">

            <h3>Trailing Whitespace</h3>

            <p>
              Some categorical values contain trailing
              spaces. Values are trimmed before
              grouping them for analysis and charts.
            </p>

          </div>

          <div className="quality-card">

            <h3>Course Data Mismatch</h3>

            <p>
              A course ID and course name mismatch
              exists in the supplied data. The original
              value is preserved and the mismatch is
              treated as a data-quality issue.
            </p>

          </div>

          <div className="quality-card">

            <h3>Suspicious Zero Income</h3>

            <p>
              A zero parent monthly income value is
              present. It is retained for transparency
              and flagged for review rather than being
              automatically corrected.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;