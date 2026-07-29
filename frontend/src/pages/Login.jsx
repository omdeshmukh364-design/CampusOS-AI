import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-cyan-50">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-purple-400/20 blur-[140px]" />

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex items-center justify-center px-20 relative z-10"
        >
          <div>

            <div className="flex items-center gap-4">

              <div className="bg-blue-600 p-5 rounded-2xl shadow-xl">
                <GraduationCap className="text-white" size={40} />
              </div>

              <h1 className="text-6xl font-extrabold text-slate-900">
                CampusOS.AI
              </h1>

            </div>

            <h2 className="mt-8 text-3xl font-semibold leading-relaxed text-slate-700">
              The AI Operating System
              <br />
              for Modern Campuses
            </h2>

            <div className="mt-8 h-1 w-44 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              Experience an intelligent campus ecosystem powered by AI.
              Manage academics, placements, attendance, study planning
              and productivity—all from one unified platform.
            </p>

          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center p-8 relative z-10"
        >

          <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/80 p-10 shadow-2xl backdrop-blur-2xl">

            <h2 className="text-center text-4xl font-bold text-slate-800">
              Welcome Back 👋
            </h2>

            <p className="mt-3 mb-8 text-center text-slate-500">
              Login to continue to CampusOS.AI
            </p>

            {/* Email */}
            <label className="font-medium text-slate-700">
              College Email
            </label>

            <div className="relative mt-2">

              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                type="email"
                placeholder="you@college.edu"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
              />

            </div>

            {/* Password */}

            <label className="mt-6 block font-medium text-slate-700">
              Password
            </label>

            <div className="relative mt-2">

              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
  type={showPassword ? "text" : "password"}
  placeholder="Enter password"
  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
/>

<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
>
  {showPassword ? (
    <Eye size={20} />
  ) : (
    <EyeOff size={20} />
  )}
</button>

            </div>

            <div className="mt-3 flex justify-end">

              <button className="text-sm font-medium text-blue-600 hover:underline">
                Forgot Password?
              </button>

            </div>

            {/* Login */}

            <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl">
              Login
            </button>

            {/* Divider */}

            <div className="my-6 flex items-center">

              <div className="flex-1 border-t border-slate-300"></div>

              <span className="px-4 text-sm text-slate-400">
                OR
              </span>

              <div className="flex-1 border-t border-slate-300"></div>

            </div>

            {/* Google */}

            <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-100">

              <FcGoogle size={24} />

              Continue with Google

            </button>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Login;