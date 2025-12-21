import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    signIn(email, password)
      .then(() => {
        toast.success("Welcome back!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google");
        navigate(from, { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md backdrop-blur-xl bg-white/80 border border-gray-200 shadow-2xl rounded-3xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-secondary">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Login to continue to{" "}
            <span className="font-semibold">StyleDecor</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full mt-1 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered w-full mt-1 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500 font-medium"
            >
              {error}
            </motion.p>
          )}

          <button className="btn btn-primary w-full rounded-full text-white text-base tracking-wide hover:scale-[1.02] transition-transform">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-xs text-gray-400 my-6">OR</div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-lg text-red-500" />
          <span className="font-medium">Continue with Google</span>
        </button>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-gray-600">
          New here?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
