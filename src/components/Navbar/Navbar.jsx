function Navbar() {
  return (
    <header className="flex h-14 items-center justify-between rounded-2xl bg-white px-5 shadow-[0_4px_18px_rgba(15,53,69,0.04)]">
      {/* Logo */}
      <div className="text-lg font-extrabold tracking-tight text-[#12384a]">
        GROVIA
      </div>

      {/* Navigation */}
      <nav className="hidden items-center gap-7 text-[10px] font-medium text-slate-400 md:flex">
        <a href="#" className="border-b-2 border-[#12a6ae] pb-2 text-[#12384a]">
          Home
        </a>

        <a href="#">Discover</a>
        <a href="#">Wallet</a>
        <a href="#">Portfolio</a>
        <a href="#">Goals</a>
      </nav>

      {/* User */}
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-[10px] font-bold text-[#12384a]">Sara Mahmoud</p>

          <p className="text-[8px] text-[#13a5ac]">Risk Profile: Balanced</p>
        </div>

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dbe8ea] text-[9px] font-bold text-[#12384a]">
          SM
        </div>

        <button className="text-xs text-slate-400">⌄</button>
      </div>
    </header>
  );
}

export default Navbar;
