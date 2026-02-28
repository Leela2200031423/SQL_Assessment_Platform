import "../styles/features.css";

export default function Features() {
  const features = [
    {
      icon: "📚",
      title: "Guided Assignments",
      description: "Step-by-step SQL challenges with schema viewers and hints."
    },
    {
      icon: "⚡",
      title: "Instant Feedback",
      description: "Submit queries and get immediate results on your solutions."
    },
    {
      icon: "📈",
      title: "Track Progress",
      description: "Monitor your learning journey with detailed attempt history."
    }
  ];

  return (
    <section className="features">
      <div className="features-container">
        <h2>Why Choose CipherSQLStudio?</h2>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
