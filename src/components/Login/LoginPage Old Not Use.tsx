import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginUser } from "../../features/auth/authSlice";
import Button from "../../atoms/Button";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const { loading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-level error if present
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

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
      .then(() => navigate("/dashboard"))
      .catch(() => {});
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header text-center bg-primary text-white">
              <h4 className="mb-0">Login</h4>
            </div>
            <div className="card-body">
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
                      {showPassword ? (
                        <EyeSlash size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </span>
                  </div>

                  {/* Error message outside the relative container */}
                  {formErrors.password && (
                    <div className="invalid-feedback d-flex">
                      {formErrors.password}
                    </div>
                  )}
                </div>

                {error && <div className="text-danger mb-3">{error}</div>}

                <Button
                  type="submit"
                  label="Login"
                  className="form-button w-100"
                  disabled={loading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
