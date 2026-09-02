function Footer() {
  return (
    <footer className="mt-5 bg-[#062c3d] px-8 py-8 text-white sm:px-10">
      <div className="grid gap-8 sm:grid-cols-[1fr_auto_auto]">
        {/* Brand */}
        <div>
          <div className="text-xl font-extrabold">GROVIA</div>

          <p className="mt-3 max-w-xs text-[9px] leading-4 text-slate-300">
            Automated portfolio allocation powered by advanced machine learning
            models. Manage your funds optimally.
          </p>
        </div>

        {/* Platform */}
        <div>
          <p className="text-[9px] font-bold">Platform</p>

          <div className="mt-3 space-y-2 text-[8px] text-slate-400">
            <p>Discover</p>
            <p>Markets</p>
            <p>Pricing</p>
            <p>FAQ</p>
          </div>
        </div>

        {/* Legal */}
        <div>
          <p className="text-[9px] font-bold">Legal</p>

          <div className="mt-3 space-y-2 text-[8px] text-slate-400">
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>Disclaimer</p>
          </div>
        </div>
      </div>

      <div className="mt-7 border-t border-white/10 pt-5 text-center text-[8px] text-slate-500">
        © 2026 Grovia Technologies. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
