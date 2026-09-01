export default function Footer() {
  return (
    <footer className="w-full border-t border-[#9CD5FF] bg-[#DFF6FF]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              {/* Logo */}
              <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[#06283D] text-lg text-white shadow-sm">
                <div className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-white/10" />

                <span className="relative text-lg font-extrabold">G</span>

                <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-[#9CD5FF]">
                  ↗
                </span>
              </div>

              {/* Brand Name */}
              <h2 className="text-xl font-bold tracking-tight text-[#06283D]">
                Grovia
              </h2>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-[#256D85]">
              © 2024 Grovia.
              <br />
              Smart investing made simple.
              <br />
              Investments involve risk.
            </p>
          </div>

          {/* First Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[#06283D]">
              Company
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <a
                href="#"
                className="w-fit text-sm text-[#256D85] transition hover:text-[#06283D]"
              >
                About Us
              </a>

              <a
                href="#"
                className="w-fit text-sm text-[#256D85] transition hover:text-[#06283D]"
              >
                Regulatory Disclosure
              </a>
            </div>
          </div>

          {/* Second Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[#06283D]">
              Support & Legal
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <a
                href="#"
                className="w-fit text-sm text-[#256D85] transition hover:text-[#06283D]"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="w-fit text-sm text-[#256D85] transition hover:text-[#06283D]"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="w-fit text-sm text-[#256D85] transition hover:text-[#06283D]"
              >
                Help Center
              </a>

              <a
                href="#"
                className="w-fit text-sm text-[#256D85] transition hover:text-[#06283D]"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-[#9CD5FF] pt-6">
          <div className="flex flex-col gap-3 text-xs text-[#256D85] md:flex-row md:items-center md:justify-between">
            <p>Built for beginner investors.</p>

            <p className="text-[#06283D]/60">
              Learn • Understand • Invest • Grow
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
