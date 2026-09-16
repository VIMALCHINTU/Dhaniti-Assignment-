function KPICard({ title, value }) {
  return (
    <div className="kpi-card">

      <p className="kpi-title">
        {title}
      </p>

      <h2 className="kpi-value">
        {value}
      </h2>

    </div>
  );
}

export default KPICard;