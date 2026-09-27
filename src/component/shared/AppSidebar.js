import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  UsersRound,
  UserRound,
} from "lucide-react";
import { BASE_URL } from "../../apis/Backend";
import "./AppSidebar.css";

const menuByRole = {
  admin: [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
    { label: "Batch Management", to: "/batch-management", icon: UsersRound },
    { label: "Student Records", to: "/excel-file", icon: FileSpreadsheet },
    { label: "Profile", to: "/admin-profile", icon: UserRound },
  ],
  teacher: [
    { label: "Dashboard", to: "/teacher-portal", icon: LayoutDashboard },
    { label: "Create Assignment", to: "/create-assignment", icon: ClipboardCheck },
    { label: "Submitted Work", to: "/submitted", icon: ClipboardList },
    { label: "Profile", to: "/teacher-profile", icon: UserRound },
  ],
  student: [
    { label: "Dashboard", to: "/student", icon: LayoutDashboard },
    { label: "My Assignments", to: "/submission", icon: ClipboardList },
    { label: "Profile", to: "/student-profile", icon: UserRound },
  ],
};

function AppSidebar({ user, role, activePath, onNotices }) {
  const [collapsed, setCollapsed] = useState(false);
  const [noticeActive, setNoticeActive] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const navigate = useNavigate();
  const profileImage = user?.profile ? `${BASE_URL}/uploads/profile/${user.profile}` : null;
  const FallbackIcon = role === "admin"
    ? ShieldCheck
    : role === "student"
      ? GraduationCap
      : UserRound;
  const links = menuByRole[role] || [];

  const logOut = () => {
    sessionStorage.removeItem("current-user");
    navigate("/sign-in");
  };

  return (
    <aside className={`app-sidebar${collapsed ? " is-collapsed" : ""}`} aria-label="Main navigation">
      <div className="app-sidebar-top">
        <NavLink className="app-sidebar-brand" to={activePath} aria-label="ITEP home">
          <span className="app-sidebar-mark"><BookOpen size={19} strokeWidth={2.4} /></span>
          <span className="app-sidebar-brand-name">ITEP</span>
        </NavLink>
        <button
          type="button"
          className="app-sidebar-collapse"
          onClick={() => setCollapsed((current) => !current)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="app-sidebar-profile">
        {profileImage && !imageFailed ? (
          <img
            src={profileImage}
            alt=""
            className="app-sidebar-avatar"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className={`app-sidebar-avatar app-sidebar-avatar-fallback is-${role}`} aria-hidden="true">
            <FallbackIcon size={34} strokeWidth={1.6} />
          </span>
        )}
        <div className="app-sidebar-identity">
          <strong>{user?.name || role}</strong>
          <span>{user?.email || ""}</span>
        </div>
      </div>

      <nav className="app-sidebar-menu">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={label}
            className={({ isActive }) =>
              `app-sidebar-link${isActive ? " is-active" : ""}`
            }
          >
            <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className={`app-sidebar-link${noticeActive ? " is-active" : ""}`}
          onClick={() => {
            setNoticeActive(true);
            onNotices?.();
          }}
          title="Notices"
        >
          <Bell size={21} strokeWidth={1.8} aria-hidden="true" />
          <span>Notices</span>
        </button>
      </nav>

      <button type="button" className="app-sidebar-link app-sidebar-logout" onClick={logOut} title="Log out">
        <LogOut size={21} strokeWidth={1.8} aria-hidden="true" />
        <span>Log out</span>
      </button>
    </aside>
  );
}

export default AppSidebar;