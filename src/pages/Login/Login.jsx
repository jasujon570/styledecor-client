import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signIn, logOut, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/dashboard/home";

  const onSubmit = (data) => {
    setLoginError("");

    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;

        const userInfo = { email: loggedUser.email };

        axiosPublic
          .post("/auth/login", userInfo)
          .then((res) => {
            const token = res.data.token;
            if (token) {
              localStorage.setItem("access-token", token);

              navigate(from, { replace: true });
            } else {
              logOut();
              setLoginError(
                "Login successful, but failed to secure session. Please try again."
              );
            }
          })
          .catch((err) => {
            console.error("JWT fetch error:", err);

            logOut();
            setLoginError(
              "Server error during session setup. Please re-login."
            );
          });
      })
      .catch((error) => {
        console.error(error.message);

        setLoginError(
          error.message
            .replace("Firebase: Error (auth/", "")
            .replace(").", "")
            .replace(/-/g, " ")
        );
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col w-full max-w-lg">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary">Login Now!</h1>
        </div>
        <div className="card w-full shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">
                  Email is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered w-full pr-10"
                  {...register("password", { required: true })}
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="text-error text-sm mt-1">
                  Password is required
                </span>
              )}
            </div>

            {loginError && (
              <p className="text-error text-center mt-2 font-medium">
                {loginError}
              </p>
            )}

            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <p className="px-8 pb-4 text-center">
            New to StyleDecor?{" "}
            <Link
              to="/register"
              className="text-secondary font-bold hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
