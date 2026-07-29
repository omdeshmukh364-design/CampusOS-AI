import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  Mail,
  Lock,
  CheckCircle,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import Card from "../components/common/Card";
import Input from "../components/common/Input";

function AdminLogin({ onBack, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (onLogin) {
        onLogin(userCredential.user);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)]">
      {/* Background */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-400/20 blur-[140px]" />

      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-10 lg:grid-cols-2">

        {/* LEFT SECTION */}

        <div>
          <div className="flex items-center gap-4">

            <div className="rounded-3xl bg-blue-600 p-5 shadow-xl">
              <ShieldCheck
                size={42}
                className="text-white"
              />
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900">
              Campus
              <span className="text-blue-600">
                OS
              </span>
              .AI
            </h1>

          </div>

          <h2 className="mt-10 text-5xl font-bold leading-tight text-gray-900">
            Complete Campus
            <br />
            Administration
          </h2>

          <div className="mt-8 h-1 w-40 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
            Manage students, faculty, departments, attendance,
            placements, AI analytics and complete campus
            administration from one dashboard.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500" />
              <span>Manage Students</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500" />
              <span>Manage Faculty</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500" />
              <span>Departments & Subjects</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500" />
              <span>Attendance & Assignments</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500" />
              <span>AI Reports & Analytics</span>
            </div>

          </div>
        </div>

        {/* LOGIN CARD */}

        <Card className="p-10 shadow-2xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Admin Portal
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Welcome Admin 👋
              </h2>

            </div>

            <button
              onClick={onBack}
              className="rounded-full border p-3 transition hover:border-blue-600 hover:text-blue-600"
            >
              <ArrowLeft size={20} />
            </button>

          </div>

          <p className="mt-3 text-gray-500">
            Login using administrator credentials.
          </p>

          <div className="mt-8 space-y-6">

            {/* Email */}

            <div>

              <label className="mb-2 block font-medium">
                Admin Email
              </label>

              <Input
                icon={Mail}
                type="email"
                placeholder="admin@college.edu"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* Password */}

            <div>

              <label className="mb-2 block font-medium">
                Password
              </label>

              <div className="relative">

                <Input
                  icon={Lock}
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Error */}

            {error && (
              <div className="rounded-xl bg-red-100 p-3 text-red-600">
                {error}
              </div>
            )}

            {/* Login Button */}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

            {/* Divider */}

            <div className="flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-300" />

              <span className="text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-300" />

            </div>

            {/* Google */}

            <button
              className="flex w-full items-center justify-center gap-3 rounded-2xl border py-4 transition hover:bg-gray-50"
            >
              <FcGoogle size={22} />

              Continue with Google

            </button>

          </div>

        </Card>

      </div>

    </div>
  );
}

export default AdminLogin;