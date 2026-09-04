import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import profileimg from "../../assets/profile.png";
import LogoutModal from "../ui/LogoutModal";
import { getCurrentUser, logout } from "../../utils/auth";
import { useLanguage } from "../../context/LanguageContext";

const navLinkClass = ({ isActive }) =>
  `text-[15px] transition ${
    isActive
      ? "font-bold text-[#12384a]"
      : "font-medium text-[#8a9aa4] hover:text-[#06283D]"
  }`;

function Navbar() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [currentUser] = useState(getCurrentUser);
  const navigate = useNavigate();
  const { isArabic, toggleLanguage } = useLanguage();
  const displayName = currentUser?.name || currentUser?.fullName || (isArabic ? "المستخدم" : "User");

  const handleConfirmLogout = () => {
    logout(); // clears the stored session (see src/utils/auth.js)
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <header className="flex h-[72px] w-full items-center justify-between">
      <div
        onClick={() => navigate("/Home")}
        className="text-[28px] font-extrabold tracking-[0.04em] cursor-pointer text-[#06283D] sm:text-[32px]"
      >
        GROVIA
      </div>

      <nav className="hidden items-center gap-8 md:flex lg:gap-10">
        <NavLink to="/Home" className={navLinkClass}>
          {isArabic ? "الرئيسية" : "Home"}
        </NavLink>
        <NavLink to="/Discover" className={navLinkClass}>
          {isArabic ? "استكشاف" : "Discover"}
        </NavLink>
        <NavLink to="/Wallet" className={navLinkClass}>
          {isArabic ? "المحفظة" : "Wallet"}
        </NavLink>
        <NavLink to="/Portfolio" className={navLinkClass}>
          {isArabic ? "الاستثمارات" : "Portfolio"}
        </NavLink>
        <NavLink to="/Assessment" className={navLinkClass}>
          {isArabic ? "التقييم" : "Assessment"}
        </NavLink>
      
      </nav>

      <div className="flex items-center gap-4 sm:gap-5">
        {/* Profile section with hover dropdown */}
        <div className="group relative">
          <button
            type="button"
            className="flex items-center gap-3 rounded-full py-1 pl-1 pr-2 transition hover:bg-slate-50"
          >
            <div className="hidden text-right sm:block">
              <p className="text-[15px] font-bold leading-tight text-[#12384a]">
                {displayName}
              </p>
              <p className="mt-0.5 text-[11px] font-medium leading-tight text-[#13a5ac]">
                {isArabic ? "ملف المخاطر: متوازن" : "Risk Profile: Balanced"}
              </p>
            </div>

            <div className="h-11 w-11 overflow-hidden rounded-full bg-[#dbe8ea] ring-2 ring-white">
              <img
                src={profileimg}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            </div>

            <ChevronDown className="hidden h-4 w-4 text-[#8a9aa4] transition group-hover:rotate-180 sm:block" />
          </button>

          {/* Invisible bridge keeps the menu open while moving the cursor down to it */}
          <div className="invisible absolute right-0 top-full z-20 w-60 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-bold text-[#12384a]">{displayName}</p>
                <p className="mt-0.5 text-xs font-medium text-[#13a5ac]">
                  {isArabic ? "ملف المخاطر: متوازن" : "Risk Profile: Balanced"}
                </p>
              </div>

              <div className="py-1.5">
                <NavLink
                  to="/Profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#33454f] transition hover:bg-slate-50"
                >
                  <User className="h-4 w-4 text-[#8a9aa4]" />
                  {isArabic ? "ملفي الشخصي" : "My Profile"}
                </NavLink>
                <NavLink
                  to="/Settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#33454f] transition hover:bg-slate-50"
                >
                  <Settings className="h-4 w-4 text-[#8a9aa4]" />
                  {isArabic ? "الإعدادات" : "Settings"}
                </NavLink>
              </div>

              <div className="border-t border-slate-100 py-1.5">
                <button
                  type="button"
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" />
                  {isArabic ? "تسجيل الخروج" : "Log Out"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-[#5b6d78]"
          aria-label="Notifications"
        >
          <i className="fa-regular fa-bell text-lg" />
        </button>

        <button
          type="button"
          data-language-toggle
          onClick={toggleLanguage}
          className="text-[14px] font-medium text-[#567080] transition hover:text-[#256D85]"
        >
          {isArabic ? "English" : "العربية"}
        </button>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </header>
  );
}

export default Navbar;
