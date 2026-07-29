
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function StudentLogin({ onBack, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleLogin = async () => {
  console.log("Login clicked");

  if (!email || !password) {
    setError("Please enter email and password");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    console.log("Logged In");
    console.log(user);

    // ✅ Save user in localStorage
    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }));

    alert("Login Successful!");

    if (onLogin) {
      onLogin(user);
    }

  } catch (error) {
    console.error(error);
    alert(error.code);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)]">

      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-purple-400/20 blur-[140px]" />

      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-10 lg:grid-cols-[0.95fr_0.95fr]">

        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-600 p-5 shadow-xl">
              <GraduationCap size={38} className="text-white" />
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900">
              Campus<span className="text-blue-600">OS</span>.AI
            </h1>

          </div>

          <h2 className="mt-8 text-4xl font-bold text-gray-900 leading-snug">
            The AI Operating System
            <br />
            for Modern Campuses
          </h2>

          <div className="mt-8 h-1 w-40 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />

          <p className="mt-8 text-lg leading-8 text-gray-600 max-w-xl">
            Experience an intelligent campus ecosystem powered by AI.
            Manage academics, attendance, placements, study planning,
            and productivity from one elegant platform.
          </p>

        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-10 shadow-2xl">

            <div className="flex justify-between items-center">

              <div>
                <p className="uppercase text-sm tracking-widest text-blue-600 font-semibold">
                  Student Portal
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  Welcome Back 👋
                </h2>
              </div>

              <button
                onClick={onBack}
                className="flex items-center gap-2 rounded-full border px-4 py-2 hover:border-blue-600 hover:text-blue-600"
              >
                <ArrowLeft size={18} />
                Back
              </button>

            </div>

            <p className="mt-3 text-gray-500">
              Login to continue to CampusOS.AI
            </p>

            <div className="mt-8 space-y-5">

              <div>
  <label className="mb-2 block text-sm font-medium text-[#111827]">
    College Email
  </label>

  <Input
    type="email"
    placeholder="you@college.edu"
    icon={Mail}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>

              <div>

                <label className="block mb-2 font-medium">
                  Password
                </label>

                <div className="relative">

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    icon={Lock}
                     value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                  <button
                    onClick={() => setShowPassword(!showPassword)}
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

            </div>

            {error && (
              <div className="mt-5 rounded-lg bg-red-100 p-3 text-red-600">
                {error}
              </div>
            )}

            <button className="mt-4 text-sm text-blue-600 hover:underline">
              Forgot Password?
            </button>

            <Button
              onClick={handleLogin}
              className="mt-8 w-full"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </Button>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-gray-500">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            <Button
              variant="secondary"
              className="w-full gap-3"
            >
              <FcGoogle size={22} />
              Continue with Google
            </Button>

          </Card>
        </motion.div>

      </div>

    </div>
  );
}

export default StudentLogin;