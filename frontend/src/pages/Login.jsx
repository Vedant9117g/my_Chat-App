import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [input, setInput] = useState({ name: "", email: "", password: "", gender: "male" });

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isSignup) {
      await registerUser(input);
    } else {
      await loginUser({ email: input.email, password: input.password });
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
      setIsSignup(false); // Redirect user to login after signup
    }
    if (registerError) {
      toast.error(registerError.data?.message || "Signup Failed");
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data?.message || "Login Failed");
    }
  }, [registerIsSuccess, registerData, registerError, loginIsSuccess, loginData, loginError, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          {isSignup ? "Create an Account" : "Welcome Back!"}
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          {isSignup ? "Sign up to get started" : "Sign in to continue"}
        </p>

        <form className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeInputHandler}
                  placeholder="John Doe"
                  className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">Gender</label>
                <select
                  name="gender"
                  value={input.gender}
                  onChange={changeInputHandler}
                  className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeInputHandler}
              placeholder="example@mail.com"
              className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={changeInputHandler}
              placeholder="••••••••"
              className="w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={registerIsLoading || loginIsLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium text-lg hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center"
          >
            {registerIsLoading || loginIsLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
              </>
            ) : (
              isSignup ? "Sign Up" : "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600 dark:text-gray-400">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => setIsSignup(!isSignup)} className="text-blue-500 hover:underline ml-1">
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
