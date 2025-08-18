
import { Link } from "react-router-dom";

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
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://miro.medium.com/v2/resize:fit:1400/1*NwLwD8boGZ7BdIEwzGrviQ.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "40px 20px",
        }}
      >
        {/* Header */}
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

        {/* Single Portal Card */}
        <div
          className="p-4 text-center portal-card d-flex flex-column align-items-center"
          style={{
            minWidth: "600px",
            maxWidth: "700px",
            borderRadius: "16px",
            // background: "rgba(255,255,255,0.12)",
            // border: "1px solid rgba(255,255,255,0.18)",
            // backdropFilter: "blur(15px)",
            // WebkitBackdropFilter: "blur(15px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            color: "white",
            transition: "all 0.3s ease",
          }}
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

        {/* Key Features */}
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

        {/* Footer */}
        <footer
          style={{
            width: "90%",
            maxWidth: "1200px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "16px",
            padding: "12px 20px",
            textAlign: "center",
            color: "#e5e7eb",
            fontSize: "0.85rem",
            boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
            margin: "40px auto 20px auto",
          }}
        >
          Secure • Modern • Efficient • © 2025 ITEP Assignment
        </footer>
      </div>

      {/* Hover Effects */}
      <style>{`
        .portal-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 25px 50px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.2) inset;
          border: 1px solid rgba(255,255,255,0.3);
        }

        .feature-card {
          border-radius: 12px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          Webkit-backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          margin: 8px;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2) inset;
          border: 1px solid rgba(255,255,255,0.25);
        }

        .portal-btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}

export default Home;
