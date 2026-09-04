import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as saveSession } from "../../utils/auth";
import { apiRequest } from "../../utils/api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    if (!agreedToTerms) {
      nextErrors.terms =
        "You must agree to the Terms of Service and Privacy Policy";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { token, user } = await apiRequest("/auth/register", { method: "POST", body: JSON.stringify({ fullName: formData.name, email: formData.email, password: formData.password }) });
      saveSession(token, { name: user.fullName, email: user.email });
      navigate("/Home");
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f6f7] px-4 py-3 sm:px-6">
      {/* ================= CARD ================= */}
      <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white shadow-sm">
        <div className="flex w-full flex-col px-6 py-8 sm:px-10 md:px-12">
          {/* ================= HEADER ================= */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#082f44] sm:text-4xl">
              Create Free Account
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-5 text-[#78909c]">
              Join thousands of experts and beginner investors scaling their
              portfolios.
            </p>
          </div>

          {/* ================= GENERAL FORM ERROR ================= */}
          {formError && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
              {formError}
            </div>
          )}

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="mt-5" noValidate>
            {/* ================= FULL NAME ================= */}
            <div className="mb-8">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-[#082f44]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`h-11 w-full rounded-xl border-2 px-4 text-sm text-[#18394b] outline-none transition placeholder:text-[#9aa7ae] focus:ring-2 focus:ring-[#082f44]/10 ${
                  errors.name ? "border-rose-400" : "border-[#082f44]"
                }`}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1.5 text-xs font-medium text-rose-500"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* ================= EMAIL ================= */}
            <div className="mb-8">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-[#082f44]"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`h-11 w-full rounded-xl border-2 px-4 text-sm text-[#18394b] outline-none transition placeholder:text-[#9aa7ae] focus:ring-2 focus:ring-[#082f44]/10 ${
                  errors.email ? "border-rose-400" : "border-[#082f44]"
                }`}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1.5 text-xs font-medium text-rose-500"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* ================= PASSWORD ================= */}
            <div className="mb-8">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-[#082f44]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`h-11 w-full rounded-xl border-2 px-4 pr-12 text-sm text-[#18394b] outline-none transition placeholder:text-[#9aa7ae] focus:ring-2 focus:ring-[#082f44]/10 ${
                    errors.password ? "border-rose-400" : "border-[#082f44]"
                  }`}
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#082f44]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                      <path d="M9.88 4.24A9.7 9.7 0 0 1 12 4c7 0 10 8 10 8a16.4 16.4 0 0 1-3.17 4.24" />
                      <path d="M6.61 6.61C4.62 8 2 12 2 12s3 8 10 8a9.8 9.8 0 0 0 4.39-1.03" />
                    </svg>
                  ) : (
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1.5 text-xs font-medium text-rose-500"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* ================= TERMS ================= */}
            <div className="mb-4 flex flex-col items-center">
              <label className="flex cursor-pointer items-center gap-2 text-center">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (errors.terms)
                      setErrors((prev) => ({ ...prev, terms: undefined }));
                  }}
                  aria-invalid={Boolean(errors.terms)}
                  className="h-4 w-4 shrink-0 cursor-pointer accent-[#082f44]"
                />

                <span className="text-xs font-semibold text-[#18394b]">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1.5 text-xs font-medium text-rose-500">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* ================= DIVIDER ================= */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#dfe4e7]" />

              <span className="text-xs text-[#9ba8ae]">or</span>

              <div className="h-px flex-1 bg-[#dfe4e7]" />
            </div>

            {/* ================= SOCIAL LOGIN ================= */}
            <div className="flex gap-3">
              {/* Google */}
              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-3 rounded-full border-2 border-[#082f44] text-sm font-semibold text-[#082f44] transition duration-300 hover:bg-[#f5f8fa]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21.35 12.27c0-.77-.07-1.52-.23-2.23H12v4.22h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.38Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 21.67c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.67Z"
                    fill="#34A853"
                  />
                  <path
                    d="M6.54 13.76A5.85 5.85 0 0 1 6.23 12c0-.61.1-1.2.31-1.76V7.71H3.29A9.73 9.73 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.29l3.25-2.53Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 6.21c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.3 14.63 2.33 12 2.33a9.74 9.74 0 0 0-8.71 5.38l3.25 2.53C7.31 7.93 9.46 6.21 12 6.21Z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>

              {/* Apple */}
              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-3 rounded-full border-2 border-[#082f44] text-sm font-semibold text-[#082f44] transition duration-300 hover:bg-[#f5f8fa]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25Z" />
                </svg>
                Sign in with Apple
              </button>
            </div>

            {/* ================= GET STARTED ================= */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-full bg-[#082f44] text-base font-bold text-white transition duration-300 hover:bg-[#0d405b] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
              >
                {isSubmitting ? "Creating account..." : "Get Started"}
              </button>
            </div>

            {/* ================= SIGN IN ================= */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <p className="text-xs text-[#78909c]">Already have an account?</p>

              <Link
                to="/Login"
                className="text-xs font-bold text-[#082f44] transition hover:text-cyan-500"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
