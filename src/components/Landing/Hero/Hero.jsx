import { Link } from "react-router-dom";
import Img from "../../../assets/Hero.jpeg";
export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* ================= HERO BACKGROUND ================= */}
      <main className="relative min-h-screen overflow-hidden">
        {/* Hero Image */}
        <img
          src={Img}
          alt="GROVIA"
          className="
            absolute
            inset-0
            z-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* Dark Overlay */}
        <div
          className="
            absolute
            inset-0
            z-10
            bg-gradient-to-r
            from-[#02070b]/95
            via-[#02070b]/60
            to-transparent
          "
        />

        {/* ================= NAVBAR ================= */}
        <nav
          className="
            absolute
            top-0
            left-0
            right-0
            z-30
            flex
            items-center
            justify-between
            px-8
            py-7
            md:px-12
            lg:px-16
          "
        >
          {/* Logo */}
          <Link
            to="/"
            className="
              text-3xl
              tracking-[3px]
              md:text-4xl
            "
          >
            GROVIA
          </Link>
          {/* Center Links */}
          <div className="hidden items-center gap-10 text-sm md:flex">
            <Link
              to="#platform"
              className="text-white transition hover:text-cyan-400"
            >
              Who We Are?
            </Link>

            <Link
              to="/#how-it-works"
              className="text-white transition hover:text-cyan-400"
            >
              How It Works?
            </Link>

            <Link
              to="/#services"
              className="text-white transition hover:text-cyan-400"
            >
              Services
            </Link>
          </div>
          {/* Right Buttons */}
          {/* ================= RIGHT NAVBAR ================= */}
          <div className="flex items-center gap-5">
            {/* Login */}
            <Link
              to="/login"
              className="
      rounded-full
      bg-white
      px-6
      py-3
      text-sm
      font-medium
      text-[#071952]
      transition
      duration-300
      hover:bg-cyan-400
    "
            >
              Log In
            </Link>

            {/* Sign Up */}
            <Link
              to="/register"
              className="
      hidden
      rounded-full
      bg-[#102a3b]
      px-6
      py-3
      text-sm
      font-medium
      text-white
      transition
      duration-300
      hover:bg-[#16435c]
      sm:block
    "
            >
              Sign Up
            </Link>

            {/* Arabic */}
            <button
              type="button"
              className="
    hidden
    ml-10
    text-sm
    font-medium
    text-white
    transition
    duration-300
    hover:text-cyan-400
    md:block
  "
            >
              العربية
            </button>
          </div>
        </nav>

        {/* ================= HERO CONTENT ================= */}
        <section
          className="
            relative
            z-20
            flex
            min-h-screen
            items-center
            px-8
            pb-20
            pt-32
            md:px-12
            lg:px-16
          "
        >
          <div className="max-w-[650px]">
            {/* Heading */}
            <h1
              className="
                max-w-[800px]
                text-5xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-[#00b8c8]
                md:text-6xl
                lg:text-[64px]
              "
            >
              Take Control of Your Money!
            </h1>

            {/* Description */}
            <p className="mt-18 p-4 max-w-[550px] text-m leading-8 text-white md:text-xl ">
              Master investment through expert-led video lectures, real-time
              budgeting, and personalized investment plans coaching to reach
              your goals.
            </p>
            {/* Buttons */}
            <div className="mt-12 flex items-center gap-5">
              {/* Get Started */}
              <Link
                to="/register"
                className="
                  rounded-full
                  bg-[#102a3b]
                  px-8
                  py-5
                  text-base
                  font-semibold
                  text-white
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#16465e]
                "
              >
                Get Started
              </Link>

              {/* Explore */}
              <Link
                to="/#services"
                className="
                  rounded-full
                  bg-white
                  px-8
                  py-5
                  text-base
                  font-semibold
                  text-[#071952]
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#00b8c8]
                "
              >
                Explore
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
