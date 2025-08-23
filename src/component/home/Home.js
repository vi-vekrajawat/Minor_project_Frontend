
import { Link } from "react-router-dom";
import "../home/Home.css"

function Home() {
  const features = [
    {
      title: "Assignments",
      description: "Create, assign, and manage tasks efficiently.",
      icon: "📝",
    },
    {
      title: "Tracking",
      description: "Monitor student progress in real-time.",
      icon: "📊",
    },
    {
      title: "Notifications",
      description: "Receive timely updates and reminders.",
      icon: "🔔",
    },
    {
      title: "Secure Access",
      description: "Role-based secure login for all users.",
      icon: "🔒",
    },
  ];

  return (
    <>
      <div className="main-div">
        <div className="text-center text-white mb-5">
          <img
            src="https://cdn.theorg.com/e3f93e8e-1417-4771-b4ef-283263d4230f_medium.jpg"
            className="img-fluid mb-3"
            style={{ maxHeight: "60px" }}
            alt="ITEP Logo"
          />
          <h2>ITEP-Assignment</h2>
          <span>Modern Assignment Management System for Educational Institutions</span>
        </div>

        <div
          className="p-4 text-center portal-card d-flex flex-column align-items-center div-card-style"
        
        >
          <img
            src="https://play-lh.googleusercontent.com/6kTjj47chEYx1LGlvqGiv661DvAiFrDPkjqaUpKqju-4J38mGBru2wi2S-SrCKZu_NaK=w240-h480-rw"
            className="img-fluid mb-3"
            style={{ maxHeight: "60px" }}
            alt="Portal"
          />
          <h5>Login Portal</h5>
          <p>Select your role to access the system</p>

          <div className="d-flex flex-wrap mt-3 flex-wrap justify-content-center w-100" style={{gap:"35px"}}>
            <Link to="/sign-in">
              <button className="btn btn-success portal-btn">Admin</button>
            </Link>
            <Link to="/sign-in">
              <button className="btn btn-primary portal-btn">Student</button>
            </Link>
            <Link to="/sign-in">
              <button className="btn btn-warning portal-btn">Teacher</button>
            </Link>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center mt-5 gap-3 w-100">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card p-4 text-center d-flex flex-column align-items-center"
              style={{
                minWidth: "200px",
                maxWidth: "250px",
                color: "white",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{feature.icon}</div>
              <h6>{feature.title}</h6>
              <p style={{ fontSize: "0.85rem" }}>{feature.description}</p>
            </div>
          ))}
        </div>

        <footer className="footer">
          Secure • Modern • Efficient • © 2025 ITEP Assignment
        </footer>
      </div>

    
    </>
  );
}

export default Home;
