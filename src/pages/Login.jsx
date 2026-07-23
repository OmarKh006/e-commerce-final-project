import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthFormPanel from "../components/organisms/AuthFormPanel";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((s) => s.login);
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.identifier || !form.password) {
      setError("Please fill in both fields.");
      return;
    }

    const result = await login(form.identifier, form.password);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    const redirectTo = location.state?.from?.pathname || "/account";
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <AuthFormPanel>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <h1 className="font-heading text-3xl font-medium mb-3">
              {t("auth.loginTitle")}
            </h1>
            <p className="text-sm text-body">{t("auth.loginSubtitle")}</p>
          </div>

          <Input
            variant="underline"
            name="identifier"
            placeholder={t("auth.emailOrPhone")}
            value={form.identifier}
            onChange={handleChange}
          />
          <Input
            variant="underline"
            type="password"
            name="password"
            placeholder={t("auth.password")}
            value={form.password}
            onChange={handleChange}
          />

          {error && <p className="text-xs text-error">{error}</p>}

          <div className="flex items-center gap-10">
            <Button type="submit" variant="primary" size="lg">
              {t("auth.login")}
            </Button>
            <Link to="#" className="text-sm text-primary">
              {t("auth.forgotPassword")}
            </Link>
          </div>
        </form>
      </AuthFormPanel>
    </div>
  );
}
