import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#f6f7f8]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}
