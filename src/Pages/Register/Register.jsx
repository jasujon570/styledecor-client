import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const uploadImageAndGetURL = async (imageFile) => {
    console.log("Image upload simulated:", imageFile);
    return "https://i.ibb.co/nPMgR6v/profile.png";
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating your StyleDecor account...");

    try {
      const photoURL = await uploadImageAndGetURL(data.image[0]);
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, photoURL);

      toast.success("Welcome to StyleDecor!", { id: toastId });
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed", { id: toastId });
    }
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
        <h1 className="text-5xl font-extrabold mb-6">Join StyleDecor</h1>
        <p className="text-lg leading-relaxed max-w-md">
          Book premium smart home & ceremony decoration services with ease.
          Create your account and transform your events beautifully.
        </p>
      </div>

      <div className="flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl rounded-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-2">
              Create Account
            </h2>
            <p className="text-center text-sm opacity-70 mb-6">
              Get started with StyleDecor today
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="input input-bordered w-full"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                <label className="label">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-primary w-full"
                  {...register("image", {
                    required: "Profile image is required",
                  })}
                />
                {errors.image && (
                  <p className="text-error text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Register
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
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
