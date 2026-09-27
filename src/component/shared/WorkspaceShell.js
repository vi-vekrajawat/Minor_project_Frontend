import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Megaphone, Plus, Search, Trash2, X } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../apis/Backend";
import Backend from "../../apis/Backend";
import { setNotice } from "../redux/NoticeSlice";
import AppSidebar from "./AppSidebar";
import "./WorkspaceShell.css";

const dashboardPathByRole = {
  admin: "/admin",
  teacher: "/teacher-portal",
  student: "/student",
};

const pageNames = {
  "/admin": "Dashboard",
  "/teacher-portal": "Dashboard",
  "/student": "Dashboard",
  "/batch-management": "Batch Management",
  "/add-student": "Add User",
  "/create-batch": "Create Batch",
  "/create-assignment": "Create Assignment",
  "/submitted": "Submitted Work",
  "/submission": "My Assignments",
  "/student-profile": "Profile",
  "/admin-profile": "Profile",
  "/teacher-profile": "Profile",
  "/excel-file": "Student Records",
};

function WorkspaceShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noticeList = [] } = useSelector((store) => store.noticeData);
  const [imageFailed, setImageFailed] = useState(false);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [noticeError, setNoticeError] = useState("");
  let user;
  try {
    user = JSON.parse(sessionStorage.getItem("current-user") || "null");
  } catch {
    user = null;
  }

  useEffect(() => {
    const openNotices = () => {
      setNoticeError("");
      setNoticesOpen(true);
    };
    window.addEventListener("itep:show-notices", openNotices);
    return () => window.removeEventListener("itep:show-notices", openNotices);
  }, []);

  useEffect(() => {
    setNoticesOpen(false);
  }, [location.pathname]);

  if (!user) return <Navigate to="/sign-in" replace />;

  const role = user.role || "student";
  const name = user.name || role;
  const image = user.profile ? `${BASE_URL}/uploads/profile/${user.profile}` : null;
  const activePath = dashboardPathByRole[role] || "/";
  const title = pageNames[location.pathname] || "Notices";

  const deleteNotice = async (noticeId) => {
    try {
      await axios.delete(`${Backend.DELETE_NOTICE}/${noticeId}`);
      dispatch(setNotice(noticeList.filter((notice) => notice._id !== noticeId)));
    } catch (error) {
      setNoticeError(error.response?.data?.message || "Unable to delete this notice.");
    }
  };

  return (
    <div className="workspace-shell">
      <AppSidebar
        user={user}
        role={role}
        activePath={activePath}
        onNotices={() => window.dispatchEvent(new Event("itep:show-notices"))}
      />
      <div className="workspace-main">
        <header className="workspace-header">
          <div className="workspace-welcome">
            <span className="workspace-eyebrow">{title === "Dashboard" ? "Welcome back," : "Workspace"}</span>
            <h1>{title === "Dashboard" ? name : title}</h1>
            <p>{title === "Dashboard" ? "Manage your classes, assignments and notices with ease." : `${name} · ${role}`}</p>
          </div>
          <div className="workspace-header-actions">
            <label className="workspace-search">
              <Search size={17} aria-hidden="true" />
              <input type="search" placeholder="Search students, batches, teachers..." aria-label="Search" />
            </label>
            <button
              type="button"
              className="workspace-icon-button"
              aria-label="Open notices"
              onClick={() => window.dispatchEvent(new Event("itep:show-notices"))}
            >
              <Bell size={18} aria-hidden="true" />
              <span className="workspace-notification-dot" />
            </button>
            <div className="workspace-user">
              {image && !imageFailed ? (
                <img src={image} alt="" onError={() => setImageFailed(true)} />
              ) : (
                <span className={`workspace-user-initial is-${role}`}>{name.charAt(0).toUpperCase()}</span>
              )}
              <span className="workspace-user-copy"><strong>{name}</strong><small>{role}</small></span>
              <ChevronDown size={15} aria-hidden="true" />
            </div>
          </div>
        </header>
        <main className={`workspace-content${location.pathname === "/admin" ? " is-admin-dashboard" : ""}`}>
          {children}
        </main>
      </div>
      {noticesOpen && (
        <div className="workspace-notice-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setNoticesOpen(false);
        }}>
          <section className="workspace-notice-drawer" role="dialog" aria-modal="true" aria-labelledby="workspace-notice-title">
            <header className="workspace-notice-heading">
              <div className="workspace-notice-title-wrap">
                <span className="workspace-notice-icon"><Megaphone size={19} /></span>
                <div>
                  <h2 id="workspace-notice-title">Notices</h2>
                  <p>Updates from your education team</p>
                </div>
              </div>
              <div className="workspace-notice-actions">
                {role === "admin" && (
                  <button type="button" className="workspace-notice-create" onClick={() => navigate(`/create-notice/${user._id}`)}>
                    <Plus size={16} /> Create
                  </button>
                )}
                <button type="button" className="workspace-notice-close" aria-label="Close notices" onClick={() => setNoticesOpen(false)}>
                  <X size={19} />
                </button>
              </div>
            </header>
            {noticeError && <p className="workspace-notice-error" role="alert">{noticeError}</p>}
            <div className="workspace-notice-list">
              {noticeList.length === 0 ? (
                <div className="workspace-notice-empty">
                  <Megaphone size={24} />
                  <strong>No notices yet</strong>
                  <span>New updates will appear here.</span>
                </div>
              ) : noticeList.map((notice) => (
                <article className="workspace-notice-item" key={notice._id}>
                  <div className="workspace-notice-item-top">
                    <h3>{notice.title || "Notice"}</h3>
                    <time>{notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : ""}</time>
                  </div>
                  <p>{notice.description}</p>
                  <div className="workspace-notice-item-bottom">
                    <span>Posted by {notice.createdBy?.name || "Admin"}</span>
                    {role === "admin" && (
                      <button type="button" aria-label={`Delete notice: ${notice.title || "Notice"}`} onClick={() => deleteNotice(notice._id)}>
                        <Trash2 size={15} /> Delete
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default WorkspaceShell;