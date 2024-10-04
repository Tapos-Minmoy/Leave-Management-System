import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [role, setRole] = useState("applicant");
  const [teacherId, setTeacherId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData =
      role === "applicant"
        ? { teacher_id: Number(teacherId), password }
        : { email, password };

    const endpoint =
      role === "applicant" ? "/api/login/teacher" : "/api/login/";

    try {
      const response = await fetch(`${base_url}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();


      if (result.message == "The user is already logged in") {
        try {
          const responseLogout = await fetch(`${base_url}/api/logout`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${result.session_id}`,
              "Content-Type": "application/json",
            },
          });

          const resultlogout = await responseLogout.json();

          if (responseLogout.ok && resultlogout.message === "Logged out successfully") {
            // Clear all cookies
            Object.keys(Cookies.get()).forEach((cookieName) => {
              Cookies.remove(cookieName);
            });

            try {
              const responselogin = await fetch(`${base_url}${endpoint}` , {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
              });

              const resultlogin = await responselogin.json();
              if (resultlogin.message == "Successfully logged in") {
                // Store the session ID, user, and role in cookies
                Cookies.set("session_id", resultlogin.session_id, { expires: 7 }); // Expires in 7 days
                Object.entries(resultlogin.user).forEach(([key, value]) => {
                  Cookies.set(
                    `user_${key}`,
                    value === null ? "" : value.toString(),
                    { expires: 7 }
                  );
                });

                // Store each field of the role object individually

                Object.entries(resultlogin.roles[0]).forEach(([key, value]) => {
                  Cookies.set(
                    `role_${key}`,
                    value === null ? "" : value.toString(),
                    { expires: 7 }
                  );
                });
                console.log("ok");
                // Redirect to a protected route or dashboard
                const loggedInUserRole = resultlogin.roles[0].role;

                if (resultlogin.roles[0].role === "chairman") navigate("/noc/chairman");
                else if (resultlogin.roles[0].role === "register") navigate("/noc/registrar");
                else if(resultlogin.roles[0].role === "vice_chancellor")navigate("/noc/VC");
                else if (resultlogin.roles[0].role === "Higher Study Branch") navigate("/noc/HigherStudyBranch");
                else navigate("/noc/leaveApplication"); // Adjust the route as necessary
              } else {
                alert(resultlogin.message);
              }
            } catch (error) {
              console.error("Error logging in:", error);
              alert("An error occurred. Please try again.");
            }
          } else {
            alert(resultlogout.message || "Logout failed. Please try again.");
          }
        } catch (error) {
          console.error("Error logging out:", error);
          alert("An error occurred. Please try again.");
        }
      } else if (result.message == "Successfully logged in") {
        // Store the session ID, user, and role in cookies
        console.log(result)
        Cookies.set("session_id", result.session_id, { expires: 7 }); // Expires in 7 days
        Object.entries(result.user).forEach(([key, value]) => {
          Cookies.set(`user_${key}`, value === null ? "" : value.toString(), {
            expires: 7,
          });
        });

        // Store each field of the role object individually
        Object.entries(result.role).forEach(([key, value]) => {
          Cookies.set(`role_${key}`, value === null ? "" : value.toString(), {
            expires: 7,
          });
        });
        // Redirect to a protected route or dashboard
        window.location.reload();
        const loggedInUserRole = Cookies.get("role_role") || "";
        if (loggedInUserRole === "chairman") navigate("/noc/chairman");
        else if (loggedInUserRole === "register") navigate("/noc/registrar");
        else if(loggedInUserRole === "vice_chancellor")navigate("/noc/VC");
        else if (loggedInUserRole === "Higher Study Branch") navigate("/noc/HigherStudyBranch");
        else navigate("/noc/leaveApplication"); // Adjust the route as necessary
        

      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around bg-blue-50 h-screen">
      <div className="flex flex-col justify-center align-center w-full md:w-1/2 p-10 ps-28">
        <p className="font-sans hover:font-serif text-4xl font-bold cursor-pointer ">
          Study Leave
        </p>
        <p className="font-sans hover:font-serif text-4xl font-bold cursor-pointer text-blue-500">
          Application
        </p>
      </div>

      <div>
        <div className="w-full mt-20 md:mt-40 ms-10 md:ms-0 me-0 md:me-52">
          <div className="max-w-md p-10 bg-black rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-white mb-4">Log in</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="roles" className="block font-medium text-white">
                  User name type:
                </label>
                <select
                  id="roles"
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select user name type</option>
                  <option value="applicant">Teachers ID</option>
                  <option value="evaluator">Email</option>
                </select>
              </div>

              {role === "applicant" ? (
                <div>
                  <label
                    htmlFor="teacherId"
                    className="block font-medium text-white"
                  >
                    Teacher ID:
                  </label>
                  <input
                    type="number"
                    id="teacherId"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                    placeholder="Enter your Teacher ID"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium text-white"
                  >
                    Your Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="block font-medium text-white"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-gray-500 rounded focus:ring focus:ring-blue-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-blue-400 hover:bg-blue-500 rounded focus:ring focus:ring-blue-300"
              >
                Log In
              </button>
              <Link
                to="../ForgotPassword"
                className="text-sm mt-2 text-white hover:underline"
              >
                Forgot Password?
              </Link>
              <p className="text-sm text-white">
                Do not have an account?{" "}
                <Link
                  to="../SignUp"
                  className="font-medium text-blue-300 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
