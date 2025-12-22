import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const toastId = toast.loading("Logging you in...");

    signIn(data.email, data.password)
      .then(() => {
        toast.success("Welcome back to StyleDecor!", { id: toastId });
        reset();
        navigate("/");
      })
      .catch((error) => {
        let errorMessage = "Invalid email or password.";
        if (error.code === "auth/wrong-password")
          errorMessage = "Incorrect password.";
        else if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/invalid-email"
        )
          errorMessage = "User not found or invalid credentials.";
        toast.error(errorMessage, { id: toastId });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Signed in with Google successfully!");
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-base-200 to-secondary/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md backdrop-blur-xl bg-white/80 border border-gray-200 shadow-2xl rounded-3xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-secondary">Login</h2>
          <p className="text-sm text-gray-500 mt-2">
            Access your <span className="font-semibold">StyleDecor</span>{" "}
            account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="input input-bordered w-full mt-1 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full mt-1 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
            <div className="text-right mt-1">
              <a className="link link-hover text-sm text-primary/80">
                Forgot password?
              </a>
            </div>
          </div>

          <button className="btn btn-primary w-full mt-2 rounded-full text-white text-base font-semibold hover:scale-[1.02] transition-transform">
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
          New to StyleDecor?{" "}
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
