import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            toast.success("Account created successfully!");
            navigate("/");
          })
          .catch((err) => toast.error("Profile update failed"));
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google");
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-base-200 to-secondary/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md backdrop-blur-xl bg-white/80 border border-gray-200 shadow-2xl rounded-3xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-secondary">
            Create Account 🚀
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Join <span className="font-semibold">StyleDecor</span> and get
            started
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="input input-bordered w-full mt-1 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              placeholder="https://image.com/profile.jpg"
              className="input input-bordered w-full mt-1 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              required
            />
          </div>

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
            Create Account
          </button>
        </form>

        <div className="divider text-xs text-gray-400 my-6">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-lg text-red-500" />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="text-center mt-8 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
