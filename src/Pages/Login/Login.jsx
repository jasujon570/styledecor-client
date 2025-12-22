import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

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
        if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password.";
        } else if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/invalid-email"
        ) {
          errorMessage = "User not found or invalid credentials.";
        }
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
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-200">
      <div className="hidden lg:flex flex-col justify-center px-16 bg-linear-to-br from-primary to-secondary text-primary-content">
        <h1 className="text-5xl font-extrabold mb-6">Welcome Back</h1>
        <p className="text-lg max-w-md leading-relaxed">
          Login to manage your smart home and ceremony decoration bookings with
          StyleDecor.
        </p>
      </div>

      <div className="flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl rounded-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
            <p className="text-center text-sm opacity-70 mb-6">
              Access your StyleDecor account
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  placeholder="Your password"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <div className="text-right mt-1">
                  <a className="link link-hover text-sm">Forgot password?</a>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Login
              </button>
            </form>

            <div className="divider">OR</div>

            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-info w-full"
            >
              Continue with Google
            </button>

            <p className="text-center text-sm mt-6">
              New to StyleDecor?{" "}
              <Link to="/register" className="link link-primary font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
