import axios from "axios";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from "react-hot-toast";
import Joi from "joi";
import { Eye,EyeOff} from "lucide-react";
import { Authcontext } from "../context/context";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logged, setLogged } = useContext(Authcontext) || {};
  const [validationError, setValidationError] = useState(false);
  const [show, setShow] = useState(false);

  
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().pattern(
      new RegExp(
        "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,25}$"
      )
    ),
  });

  const handleSubmit = useCallback(
    async (e:FormEvent) => {
      e.preventDefault();
      setValidationError(false); 

      const userInput = {
        email: email.trim(), 
        password: password,
      };
      
      if (!userInput.email) {
        toast.error("Enter the email");
        return;
      }
      if (!userInput.password) {
        toast.error("Enter the password");
        return;
      }

      try {
        const { error } = schema.validate(userInput, { abortEarly: false });
        if (error) {
          setValidationError(true);
          return;
        }

        const response = await axios.post(
          `${process.env.BASE_URL}/login`,
          userInput
        );

        if (response.data.token) {
          localStorage.setItem("authtoken", response.data.token);
          localStorage.setItem("refreshtoken", response.data.refreshtoken);
          if(setLogged)
          setLogged(true);
        }
      } catch (error) {
        const errorMessage = (error as any).response?.data;
        
        if (errorMessage?.["User not found"]) {
          toast.error("User not found");
        } else if (errorMessage?.["Incorrect password"]) {
          toast.error("Incorrect password");
        } else {
          toast.error("An error occurred");
        }
      }
    },
    [email, password, schema, setLogged]
  );

  useEffect(() => {
    if (logged) {
      navigate("/home");
    }
  }, [logged, navigate]); 
  return (
    <div className="min-h-screen flex flex-col justify-center text-white font-display p-4">
      <form className="sm:w-96 mx-auto text-center" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold block mb-2">Welcome back.</h1>
        <p>
          Don't have an account?{" "}
          <a href="/signin" className="underline hover:text-silver">
            Sign up
          </a>
        </p>

        <div className="mt-4 w-full rounded-lg bg-neutral-800/50">
          <div className="px-3 py-4">
            <label htmlFor="email" className="block font-semibold text-left">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="mt-2 hover:outline-none focus:outline-none bg-zinc-700/50 w-full h-5 rounded-md px-4 py-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="block mt-2 font-semibold text-left">
              Password
            </label>
            <div className="relative w-full">
              <input
                id="password"
                type={show ? "text" : "password"}
                placeholder="Password"
                className="mt-2 hover:outline-none focus:outline-none text-white bg-zinc-700/50 w-full h-5 rounded-md px-4 py-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-4 text-gray-400 hover:text-white"
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {validationError && (
              <p className="text-red-400/50 text-sm mt-2 text-left">
                Password must be 8-25 characters long, include at least one letter, 
                one digit, and one special character
              </p>
            )}

            <div className="flex justify-between items-baseline">
              <button
                type="submit"
                className="px-5 py-3 mt-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 
                          text-white hover:text-white transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;