import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { SaxHome2Linear } from "@meysam213/iconsax-react";
import { SaxInfoCircleLinear } from "@meysam213/iconsax-react";
import { SaxProfile2UserLinear } from "@meysam213/iconsax-react";
import { SaxCalendarTickTwotone } from "@meysam213/iconsax-react";
import { SaxUserTwotone } from "@meysam213/iconsax-react";
import { SaxGalleryLinear } from "@meysam213/iconsax-react";
import ProfileDropDown from "./ProfileDropDown";
import Search from "../Search";
import { isSocietyRole } from "../../services/api";
import { LayoutDashboard, Users, Settings, BookOpen, FileText, Library, ClipboardList } from "lucide-react";

/* ── Obsidian Silk Navbar ────────────────────────────────────────────────── */

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-white"
        : "text-[#a0a0a0] hover:text-white"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `text-2xl font-semibold transition-colors duration-200 ${isActive ? "text-white" : "text-[#a0a0a0] hover:text-white"}`;

  const path = location.pathname;
  let navLinks = [];

  if (path.startsWith("/faculty-dashboard")) {
    navLinks = [
      { to: "/faculty-dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, exact: true },
      { to: "/faculty-dashboard/society", label: "Society Details", icon: <FileText className="w-4 h-4" /> },
      { to: "/faculty-dashboard/members", label: "Members", icon: <Users className="w-4 h-4" /> },
      { to: "/faculty-dashboard/settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
    ];
  } else if (path.startsWith("/university-admin")) {
    navLinks = [
      { to: "/university-admin", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, exact: true },
      { to: "/university-admin/colleges", label: "Colleges", icon: <Library className="w-4 h-4" /> },
      { to: "/university-admin/students", label: "Students", icon: <Users className="w-4 h-4" /> },
      { to: "/university-admin/settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
    ];
  } else if (path.startsWith("/college-admin")) {
    navLinks = [
      { to: "/college-admin", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, exact: true },
      { to: "/college-admin/societies", label: "Societies", icon: <BookOpen className="w-4 h-4" /> },
      { to: "/college-admin/students", label: "Students", icon: <Users className="w-4 h-4" /> },
      { to: "/college-admin/settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
    ];
  } else {
    navLinks = [
      { to: "/", label: "Home", icon: <SaxHome2Linear className="w-4 h-4" />, exact: true },
      { to: "/about", label: "About", icon: <SaxInfoCircleLinear className="w-4 h-4" /> },
      ...(user ? [
        { to: "/team", label: "Team", icon: <SaxProfile2UserLinear className="w-4 h-4" /> },
        { to: "/events", label: "Events", icon: <SaxCalendarTickTwotone className="w-4 h-4" /> },
        { to: "/gallery", label: "Gallery", icon: <SaxGalleryLinear className="w-4 h-4" /> },
      ] : []),
      ...(user ? [
        { to: "/my-interview", label: "Interviews", icon: <ClipboardList className="w-4 h-4" /> },
      ] : []),
      { to: "/contact", label: "Contact", icon: <SaxUserTwotone className="w-4 h-4" /> },
    ];
  }

  return (
    <>
      {/* ── Main Navbar Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none w-[97%] mx-auto">
        <div
          className="w-full max-w-screen-xl relative px-4 sm:px-6 h-14 flex items-center justify-between rounded-3xl pointer-events-auto"
          style={{
            background: "rgba(42, 40, 54, 0.8)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
            borderRight: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-black font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #ffffff, #d4d4d4)" }}
            >
              S
            </div>
            <span
              className="font-semibold text-base tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff, #c6c6c7)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SocConnect
            </span>
          </NavLink>

          {/* Desktop Nav Links */}
          <nav className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
            {navLinks.map(({ to, label, icon, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) => navLinkClass({ isActive })}
              >
                {({ isActive }) => (
                  <>
                    {icon}
                    <span>{label}</span>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                        style={{ boxShadow: "0 0 4px rgba(255,255,255,0.8)" }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right: Search + Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {user && (
              <Search
                variant="navbar"
                placeholder="Search members…"
                className="shrink-0"
              />
            )}

            {authLoading ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              <ProfileDropDown onLogout={logout} isDarkNavbar={true} />
            ) : (
              <>
                <NavLink to="/login">
                  <button
                    className="px-4 py-1.5 rounded-full text-sm font-medium text-white/80 hover:text-white transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.18)" }}
                  >
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup">
                  <button
                    className="px-4 py-1.5 rounded-full text-sm font-medium text-white/80 hover:text-white transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.18)" }}
                  >
                    Signup
                  </button>
                </NavLink>
                <NavLink to="/register">
                  <button
                    className="px-4 py-1.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-gray-100 transition-all duration-200"
                    style={{ boxShadow: "0 0 16px rgba(255,255,255,0.15)" }}
                  >
                    Register
                  </button>
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Right: avatar + hamburger */}
          <div className="sm:hidden flex items-center gap-2 z-50">
            {authLoading ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              <ProfileDropDown
                onLogout={logout}
                isDarkNavbar={true}
                avatarOnly
                showChevron
                onBeforeToggle={() => {
                  if (isMenuOpen) setIsMenuOpen(false);
                }}
              />
            ) : null}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#a0a0a0] hover:text-white focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Backdrop ── */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 sm:hidden"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* ── Mobile Slide-in Menu ── */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out sm:hidden ${
          isMenuOpen ? "translate-x-40" : "translate-x-full"
        }`}
        style={{
          background: "rgba(34, 33, 45, 0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <ul className="flex flex-col ml-8 mt-8 justify-center h-full gap-8">
          {navLinks.map(({ to, label, exact }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={exact}
                className={mobileNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}

          {/* Auth buttons in mobile menu */}
          <li className="mt-2 flex flex-col gap-3">
            {user ? (
              <>
                {isSocietyRole(user.accountType) && (
                  <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <button
                      className="py-3 px-8 rounded-full font-medium text-white/80"
                      style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      Dashboard
                    </button>
                  </NavLink>
                )}
                <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <button
                    className="py-3 px-8 rounded-full font-medium text-white/80"
                    style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    Profile
                  </button>
                </NavLink>
                <button
                  onClick={async () => {
                    await logout();
                    setIsMenuOpen(false);
                    navigate("/");
                  }}
                  className="w-fit py-3 px-8 rounded-full font-medium text-white/60 hover:text-white transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="w-fit">
                  <button
                    className="py-3 px-8 rounded-full font-medium text-white/80 hover:text-white transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup" onClick={() => setIsMenuOpen(false)} className="w-fit">
                  <button
                    className="py-3 px-8 rounded-full font-medium text-white/80 hover:text-white transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    Signup
                  </button>
                </NavLink>
                <NavLink to="/register" onClick={() => setIsMenuOpen(false)} className="w-fit">
                  <button className="py-3 px-8 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors">
                    Register
                  </button>
                </NavLink>
              </>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
