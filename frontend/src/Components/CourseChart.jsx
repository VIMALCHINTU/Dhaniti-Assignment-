
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

function CourseChart({ applications }) {

  const courseCounts = {};

  applications.forEach((application) => {
    const course = application.course_name?.trim();

    if (course) {
      courseCounts[course] =
        (courseCounts[course] || 0) + 1;
    }
  });

  const data = Object.entries(courseCounts)
    .map(([course, count]) => ({
      course,
      count
    }))
    .sort((a, b) => b.count - a.count);

  const COLORS = [
    "#4f46e5",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#0891b2",
    "#9333ea"
  ];

  return (
    <div className="chart-card">

      <h2>Applications by Course</h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 50
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="course"
            angle={-30}
            textAnchor="end"
            interval={0}
          />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="count"
            name="Applications"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default CourseChart;
