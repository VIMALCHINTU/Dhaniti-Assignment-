import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default CourseChart;