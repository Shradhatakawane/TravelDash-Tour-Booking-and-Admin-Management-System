import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ LOGIN
    if (isLogin) {
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        alert("Invalid Email or Password ❌");
        return;
      }

      // ✅ Set Role (Shradha = Admin)
      const role =
        user.email?.toLowerCase() === "shradha253@gmail.com"
          ? "admin"
          : "customer";

      const loggedUser = { ...user, role };

      localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
      alert("Login Successful ✅");

      // ✅ Redirect based on role
      if (loggedUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/packages");
      }
    }

    // ✅ REGISTER
    else {
      const alreadyExists = users.find((u) => u.email === formData.email);

      if (alreadyExists) {
        alert("User already exists ❌");
        return;
      }

      const role =
        formData.email?.toLowerCase() === "shradha253@gmail.com"
          ? "admin"
          : "customer";

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration Successful ✅ Now Login");
      setIsLogin(true);

      setFormData({ name: "", email: "", password: "" });
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <div className="auth-box">
        <h2>{isLogin ? "Login 🔑" : "Register 📝"}</h2>

        <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input"
          />

          <button type="submit" className="btn-primary">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            style={{
              color: "#0d6efd",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
