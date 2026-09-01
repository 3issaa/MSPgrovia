import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const navLinkStyle = ({ isActive }) =>
    `block py-2 px-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "text-[#06283D] font-semibold bg-[#DFF6FF] md:bg-transparent"
        : "text-[#256D85] hover:text-[#06283D] hover:bg-[#DFF6FF] md:hover:bg-transparent"
    }`;

  return (
    <nav className="sticky top-0 z-20 w-full border-b border-[#9CD5FF] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <NavLink to="/" className="group flex items-center gap-2">
          {/* Logo Icon */}
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[#06283D] text-lg text-white shadow-sm transition-all duration-300 group-hover:scale-105">
            {/* Decorative Circle */}
            <div className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-white/10" />

            {/* G */}
            <span className="relative text-lg font-extrabold">G</span>

            {/* Growth Arrow */}
            <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-[#9CD5FF]">
              ↗
            </span>
          </div>

          {/* Brand Name */}
          <span
            className="text-[28px] font-bold italic tracking-[-0.04em] text-[#06283D]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Grovia
          </span>
        </NavLink>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:order-2">
          {/* Get Started */}
          <button
            type="button"
            onClick={() => {
              navigate("/Login");
            }}
            className="rounded-xl bg-[#06283D] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#256D85] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#9CD5FF]"
          >
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#256D85] transition hover:bg-[#DFF6FF] hover:text-[#06283D] focus:outline-none focus:ring-2 focus:ring-[#9CD5FF] md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>

            <svg
              className="h-6 w-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col gap-1 rounded-xl border border-[#9CD5FF] bg-[#DFF6FF] p-3 font-medium md:mt-0 md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0">
            {/* Home */}
            <li>
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
            </li>

            {/* Risk Assessment */}
            <li>
              <NavLink to="/RiskAssessment" className={navLinkStyle}>
                Risk Assessment
              </NavLink>
            </li>

            {/* Recommendations */}
            <li>
              <NavLink to="/Recommendations" className={navLinkStyle}>
                Recommendations
              </NavLink>
            </li>

            {/* Learning Center */}
            <li>
              <NavLink to="/Learn" className={navLinkStyle}>
                Learning Center
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
