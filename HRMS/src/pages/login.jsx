import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email or password is missing");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address");
      return;
    }

    // const isDemoAdmin =
    //   email === "eve.holt@reqres.in" && password === "cityslicka";

    try {
      // if (isDemoAdmin) {
      //   const reqresResp = await fetch("https://reqres.in/api/login", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-api-key": "reqres-free-v1",
      //     },
      //     body: JSON.stringify({ email, password }),
      //   });

      //   if (!reqresResp.ok) {
      //     throw new Error("Reqres login failed");
      //   }

      //   const data = await reqresResp.json();
      //   localStorage.setItem("token", data.token);

      //   const demoUser = { email, role: "admin" };
      //   localStorage.setItem("user", JSON.stringify(demoUser));
      //   alert("Demo Admin login success");
      //   return navigate("/home");
      // }

      // // Otherwise → check your local JSON Server for user
      // const localResp = await fetch(
      //   `http://localhost:8000/employees?email=${email}&password=${password}`
      // );
      // const users = await localResp.json();

      // if (users.length === 0) {
      //   alert("User not found or password incorrect");
      //   return;
      // }

      // const user = users[0];

      const response = await axios.post("http://localhost:8000/auth", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log(response);

        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        alert("Local login success");
        navigate("/home");
      }

      // localStorage.setItem("token", "local-login-success");
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({ email: user.email, role: user.userType })
      // );

    
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Something went wrong");
    }
  };


  const verifyToken = async ()=>{
    const token = localStorage.getItem("token");
    try {
      const response =await axios.get("http://localhost:8000",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.status===200){
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      if(error.status===400){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  };

  useEffect(() => {
    verifyToken();
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-4 text-black-600 text-4xl">
          <span>👤</span>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-black-700">
          HRMS Login
        </h2>

        <label className="block text-gray-600 text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label className="block text-gray-600 text-sm mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-green-700 hover:text-black transition hover:cursor-pointer text-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
}
