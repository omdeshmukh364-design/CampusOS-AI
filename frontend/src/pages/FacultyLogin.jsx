import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

function FacultyLogin({ onBack, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(userCredential.user);

      onLogin(userCredential.user);
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-6">

      <div className="grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left */}

        <div>

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-600 p-4">
              <GraduationCap
                className="text-white"
                size={34}
              />
            </div>

            <h1 className="text-6xl font-bold">
              Campus
              <span className="text-blue-600">
                OS.AI
              </span>
            </h1>

          </div>

          <h2 className="mt-12 text-5xl font-bold leading-tight">

            Faculty Portal

          </h2>

          <p className="mt-8 text-xl text-gray-600 leading-9">

            Manage attendance, assignments,
            marks, notices and student data
            from one intelligent dashboard.

          </p>

        </div>

        {/* Right */}

        <div className="rounded-3xl bg-white p-10 shadow-2xl border">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-blue-600 font-bold tracking-widest uppercase">
                Faculty Login
              </p>

              <h2 className="text-4xl font-bold mt-2">
                Welcome Back 👋
              </h2>

              <p className="text-gray-500 mt-2">
                Login using your Faculty Email
              </p>

            </div>

            <button
              onClick={onBack}
              className="border rounded-xl px-4 py-2 hover:bg-gray-100"
            >
              <ArrowLeft />
            </button>

          </div>

          <div className="mt-10 space-y-6">

            <div>

              <label className="font-medium">
                Faculty Email
              </label>

              <div className="mt-2 flex items-center rounded-xl border bg-blue-50 px-4">

                <Mail className="text-gray-500" />

                <input
                  type="email"
                  placeholder="faculty@college.edu"
                  className="w-full bg-transparent p-4 outline-none"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>

            <div>

              <label className="font-medium">
                Password
              </label>

              <div className="mt-2 flex items-center rounded-xl border bg-blue-50 px-4">

                <Lock className="text-gray-500" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="********"
                  className="w-full bg-transparent p-4 outline-none"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff />
                  ) : (
                    <Eye />
                  )}
                </button>

              </div>

            </div>

            <button
              onClick={login}
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-4 text-white text-lg font-semibold hover:bg-blue-700"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FacultyLogin;