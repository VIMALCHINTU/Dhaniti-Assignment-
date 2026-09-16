import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function TimeChart({ applications }) {

  const monthCounts = {};

  applications.forEach((application) => {

    if (!application.application_date) {
      return;
    }

    const date = new Date(
      application.application_date
    );

    const month = date.toLocaleString("en-IN", {
      month: "long"
    });

    monthCounts[month] =
      (monthCounts[month] || 0) + 1;
  });

  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const data = Object.entries(monthCounts)
    .map(([month, count]) => ({
      month,
      count,
      monthNumber: monthOrder.indexOf(month)
    }))
    .sort(
      (a, b) => a.monthNumber - b.monthNumber
    );

  return (
    <div className="chart-card">

      <h2>Applications Over Time</h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="count"
            name="Applications"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TimeChart;