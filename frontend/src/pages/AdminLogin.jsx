import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      // Check admin role
      if (response.data.user.role !== "admin") {
        setErrorMessage("Access denied! Only admin can login.");
        setLoading(false);
        return;
      }

      // Save token and user
      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/admin");

    } catch (error) {
      console.error(error);

      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center px-4 py-10">

      {/* Background Decoration */}

      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>


      {/* LOGIN CARD */}

      <div className="relative w-full max-w-md">

        {/* Logo / Icon */}

        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg shadow-blue-600/30">

            👑

          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-5">

            Admin Portal

          </h1>

          <p className="text-slate-400 mt-2">

            Login to manage your media platform

          </p>

        </div>


        {/* FORM CARD */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">

          <h2 className="text-2xl font-bold text-white">

            Welcome Back 👋

          </h2>

          <p className="text-slate-400 text-sm mt-2 mb-6">

            Enter your credentials to access the dashboard.

          </p>


          {/* ERROR MESSAGE */}

          {errorMessage && (

            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-5 text-sm">

              ⚠️ {errorMessage}

            </div>

          )}


          <form onSubmit={handleLogin} className="space-y-5">


            {/* EMAIL */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">

                Email Address

              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2">

                  📧

                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">

                Password

              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2">

                  🔒

                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-900/70 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-3.5 pl-12 pr-14 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

                {/* SHOW / HIDE PASSWORD */}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-lg shadow-blue-600/20 hover:scale-[1.02]"
            >

              {loading ? "Logging in..." : "Login to Dashboard →"}

            </button>

          </form>


          {/* SECURITY TEXT */}

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">

            <span>🔐</span>

            <span>Secure Admin Access</span>

          </div>

        </div>


        {/* BACK TO WEBSITE */}

        <button
          onClick={() => navigate("/")}
          className="w-full mt-6 text-slate-400 hover:text-white transition text-sm"
        >

          ← Back to Website

        </button>

      </div>

    </div>
  );
}

export default AdminLogin;