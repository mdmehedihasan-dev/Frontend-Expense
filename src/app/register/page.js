"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/feature/Api/authApi";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading, error }] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password }).unwrap();
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md transition-all duration-300 hover:shadow-xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            style={{ backgroundColor: "#1e2939" }}
            className="w-full p-3 text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Polished Login Link Section */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-red-600">
              {error.data?.message ||
                "An unexpected error occurred. Please try again."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}