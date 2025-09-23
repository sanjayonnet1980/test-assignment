import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeSlash,
  Google,
  Facebook,
  Twitter,
} from "react-bootstrap-icons";
import Button from "../../atoms/Button";
import "./LoginPage.css"; // Custom styles
import { loginUser } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { loading, error } = useAppSelector((state) => state.auth);
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedUsername && savedPassword) {
      setFormData({ username: savedUsername, password: savedPassword });
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { username?: string; password?: string } = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    const password = formData.password.trim();

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must include at least one uppercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "Password must include at least one special character";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        if (rememberMe) {
          localStorage.setItem("rememberedUsername", formData.username);
          localStorage.setItem("rememberedPassword", formData.password);
        } else {
          localStorage.removeItem("rememberedUsername");
          localStorage.removeItem("rememberedPassword");
        }
        navigate("/dashboard");
      })

      .catch(() => {});
  };

  return (
    <div className="login-container d-flex flex-wrap">
      <div className="login-left">
        <img
          src="/images/loginImage.jpg"
          alt="loginScreen"
          className="login-image"
          width={750}
          height={780}
        />
      </div>

      <div className="login-right">
        <h2>Welcome to Sanjay! 👋</h2>
        <p>Unlock the performance of your team and start the adventure.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              className={`form-control input-lg ${
                formErrors.username ? "is-invalid" : ""
              }`}
              value={formData.username}
              onChange={handleChange}
            />
            {formErrors.username && (
              <div className="invalid-feedback d-flex">
                {formErrors.username}
              </div>
            )}
          </div>

          <div className="mb-3">
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`form-control input-lg ${
                  formErrors.password ? "" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />

              {/* 👁️ Toggle Icon */}
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#10096cff",
                }}
              >
                {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* Error message outside the relative container */}
            {formErrors.password && (
              <div className="invalid-feedback d-flex">
                {formErrors.password}
              </div>
            )}
          </div>

          <div className="form-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember Me
            </label>

            <a href="/">Forgot Password?</a>
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <Button
            type="submit"
            label="Login"
            className="form-button w-100"
            disabled={loading}
          />

          {/* <p className="account-prompt">
            Don’t have an account? <a href="/register">Create an account</a>
          </p> */}

          <div className="social-login">
            <span>or</span>
            <div className="icons">
              <Google size={20} />
              <Facebook size={20} />
              <Twitter size={20} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
