import { useCallback, useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"
import { Authcontext } from "../context/context";
import { Eye,EyeOff } from "lucide-react";
import joi from "joi"
import axios from "axios";

function Signin() {
  const schema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,25}$"
        )
      ),
  });

  const { logged, setLogged } = useContext(Authcontext) || {};
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError,setValidationError] = useState(false)
  const [show,setShow] = useState(false)

  const handelsubmit = useCallback(
    async (e:React.FormEvent) => {
      e.preventDefault();

      const loading = toast.loading("loading..");
      try {
        if (!email.length) {
          return toast.error("Enter  email");
        }
        if (!username.length) {
          return toast.error("Enter username");
        }
        if (!password.length) {
          return toast.error("Enter password");
        }

        const userInput = {
          username: username,
          email: email,
          password: password,
        };

        const result = schema.validate(userInput, { abortEarly: false });
        if (Object.keys(result).includes("error")) {
          setValidationError(true)
        }

        await axios
          .post(`${process.env.BASE_URL}/signin`, userInput)
          .then((response) => {
            if (Object.keys(response.data).includes("token") && setLogged) {
              localStorage.setItem("refreshtoken", response.data.refreshtoken);
              localStorage.setItem("authtoken", response.data.token);
              setLogged(true);
            }
          })
          .catch((err) => {
            if (
              Object.values(err.response.data).includes("Already signed up")
            ) {
              setEmail("");
              setUsername("");
              setPassword("");
              return toast.error("These Email already exists");
            }
            if (
              Object.values(err.response.data).includes("Internal server error")
            ) {
              setEmail("");
              setUsername("");
              setPassword("");
              return toast.error("An Error occured");
            }
            toast.error("An error occured");
            setEmail("");
            setUsername("");
            setPassword("");
          });
      } catch (err) {
        return toast.error("An error occured");
      } finally {
        return toast.dismiss(loading);
      }
    },

    [username, email, password, schema]
  );

  useEffect(() => {
    if (logged) {
      navigate("/home");
    }
  }, [logged]);

  return (
    <>
      <div className="font-display min-h-screen flex flex-col text-white justify-center p-4">
        <form
          action=""
          onSubmit={handelsubmit}
          className=" sm:w-96 mx-auto text-center"
        >
          
          <label className="text-4xl font-bold block">Join the Community</label>
          <label htmlFor="">
            Already have an account ?
            <a href="/login" className="underline hover:text-silver">
              
              Log in
            </a>
          </label>
          <div className="mt-4 rounded-lg bg-neutral-800/50">
            <div className="px-3 py-4">
              <label className="block font-semibold text-left">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="mt-2 w-full h-5 rounded-md px-4 py-5 outline-none bg-zinc-700/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block font-semibold text-left">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="mt-2  w-full h-5 rounded-md px-4 py-5 outline-none bg-zinc-700/50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="block mt-2 font-semibold text-left">
                Password
              </label>
              <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="mt-2 w-full h-5 rounded-md px-4 py-5 mb-2 outline-none bg-zinc-700/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-4 text-gray-400 hover:text-white"
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff size={20}  /> : <Eye size={20} />}
              </button>
</div>
              <p className={ !validationError ? `hidden ` :"block text-start text-red-400/50"}>Password must be 8-25 characters long, include at least one letter, 
                one digit, and one special character</p>

              <div className="flex justify-between items-baseline">
                <button
                  type="submit"
                  className="px-5 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 mt-2 text-white rounded-md  hover:text-white"
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Signin;