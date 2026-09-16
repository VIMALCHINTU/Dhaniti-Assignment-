
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

    // trim handles values like "Approved "
    const status = application.application_status?.trim();

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

  // Colors for each status
  const COLORS = [
    "#22c55e", // Approved
    "#f59e0b", // Under Review
    "#ef4444", // Rejected
    "#3b82f6"  // Submitted
  ];

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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
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
