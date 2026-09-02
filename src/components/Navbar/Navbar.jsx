import profileimg from "../../assets/profile.png";

function Navbar() {
  return (
    <header className="flex h-[72px] w-full items-center justify-between">
      <div className="text-[28px] font-extrabold tracking-[0.04em] text-[#06283D] sm:text-[32px]">
        GROVIA
      </div>

      <nav className="hidden items-center gap-8 md:flex lg:gap-10">
        <a href="#" className="text-[15px] font-bold text-[#12384a]">
          Home
        </a>
        <a
          href="#"
          className="text-[15px] font-medium text-[#8a9aa4] transition hover:text-[#06283D]"
        >
          Discover
        </a>
        <a
          href="#"
          className="text-[15px] font-medium text-[#8a9aa4] transition hover:text-[#12384a]"
        >
          Wallet
        </a>
        <a
          href="#"
          className="text-[15px] font-medium text-[#8a9aa4] transition hover:text-[#12384a]"
        >
          Portfolio
        </a>
        <a
          href="#"
          className="text-[15px] font-medium text-[#8a9aa4] transition hover:text-[#12384a]"
        >
          Goals
        </a>
      </nav>

      <div className="flex items-center gap-4 sm:gap-5">
        <div className="hidden text-right sm:block">
          <p className="text-[15px] font-bold leading-tight text-[#12384a]">
            Sara Mahmoud
          </p>
          <p className="mt-0.5 text-[11px] font-medium leading-tight text-[#13a5ac]">
            Risk Profile: Balanced
          </p>
        </div>

        <div className="h-11 w-11 overflow-hidden rounded-full bg-[#dbe8ea] ring-2 ring-white">
          <img
            src={profileimg}
            alt="Sara Mahmoud"
            className="h-full w-full object-cover"
          />
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
          className="text-[14px] font-medium text-[#567080] transition hover:text-[#256D85]"
        >
          العربية
        </button>
      </div>
    </header>
  );
}

export default Navbar;
