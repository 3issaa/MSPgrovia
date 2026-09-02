function Footer() {
  return (
    <footer className="mt-2 bg-[#062c3d] px-6 py-10 text-white sm:px-10">
      <div className="mx-auto grid max-w-[1180px] gap-10 sm:grid-cols-[1.4fr_auto_auto]">
        <div>
          <div className="text-[22px] font-extrabold tracking-[0.04em]">GROVIA</div>
          <p className="mt-4 max-w-sm text-[13px] leading-6 text-slate-300">
            Automated portfolio allocation powered by advanced machine learning
            models. Manage your funds optimally.
          </p>
        </div>

        <div>
          <p className="text-[14px] font-bold">Platform</p>
          <div className="mt-4 space-y-2.5 text-[13px] text-slate-400">
            <p>Discover</p>
            <p>Markets</p>
            <p>Pricing</p>
            <p>FAQ</p>
          </div>
        </div>

        <div>
          <p className="text-[14px] font-bold">Legal</p>
          <div className="mt-4 space-y-2.5 text-[13px] text-slate-400">
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>Disclaimer</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1180px] border-t border-white/10 pt-5 text-center text-[12px] text-slate-500">
        © 2026 Grovia Technologies. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
