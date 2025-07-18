import "@/styles/global.css";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      window.location.href = "/admin/products";
    } else {
      const data = await res.json();
      setError(data.message ?? "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Logo or Title */}
        <div className="text-center mb-6">
          {/* <img
            src="/logo.png"
            alt="ToolShop Logo"
            className="mx-auto w-12 h-12 mb-3"
          /> */}
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to access admin panel
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>

          {/* Back link */}
          <a
            href="/"
            className="block text-center text-sm text-gray-600 hover:text-blue-600 transition"
          >
            ← Back to homepage
          </a>
        </form>
      </div>
    </div>
  );
}

export { LoginForm };
