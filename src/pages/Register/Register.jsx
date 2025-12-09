import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const password = watch("password");

  const onSubmit = (data) => {
    setRegisterError("");

    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
              role: "user",
            };

            axiosPublic
              .post("/auth/register", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    title: "Success!",
                    text: "Registration Successful. Welcome to StyleDecor!",
                    icon: "success",
                    confirmButtonText: "Go to Dashboard",
                  });

                  navigate("/dashboard/home");
                }
              })
              .catch((err) => {
                console.error("DB Save Error:", err);
                logOut();
                setRegisterError("Registration failed. Please try again.");
              });
          })
          .catch((error) => {
            console.error(error.message);
            setRegisterError(
              error.message
                .replace("Firebase: Error (auth/", "")
                .replace(").", "")
                .replace(/-/g, " ")
            );
          });
      })
      .catch((error) => {
        console.error(error.message);
        setRegisterError(
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
          <h1 className="text-5xl font-bold text-secondary">
            Register with StyleDecor!
          </h1>
        </div>
        <div className="card w-full shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-error text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL (Optional)</span>
              </label>
              <input
                type="text"
                placeholder="https://image-link.com"
                className="input input-bordered"
                {...register("photoURL")}
              />
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
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
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-error text-sm mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {registerError && (
              <p className="text-error text-center mt-2 font-medium">
                {registerError}
              </p>
            )}

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-secondary">
                Register
              </button>
            </div>
          </form>

          <p className="px-8 pb-4 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
