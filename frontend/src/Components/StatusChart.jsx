import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function StatusChart({ applications }) {
  const statusCounts = {
    Approved: 0,
    "Under Review": 0,
    Rejected: 0,
    Submitted: 0
  };

  applications.forEach((application) => {
    const status = application.application_status;

    if (statusCounts[status] !== undefined) {
      statusCounts[status]++;
    }
  });

  const data = Object.entries(statusCounts)
    .map(([name, value]) => ({
      name,
      value
    }))
    .filter((item) => item.value > 0);

  return (
    <div className="chart-card">

      <h2>Applications by Status</h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default StatusChart;