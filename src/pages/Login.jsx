import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthFormPanel from "../components/organisms/AuthFormPanel";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../lib/validation";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setFormError("");

    const found = {};
    const email = form.email.trim();
    if (!email) found.email = t("auth.errors.emailRequired");
    else if (!isValidEmail(email)) found.email = t("auth.errors.emailInvalid");
    if (!form.password) found.password = t("auth.errors.passwordRequired");
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const result = await login(email, form.password);
      if (!result.success) {
        const code = result.error.code;
        setFormError(
          code === "invalid_credentials"
            ? t("auth.errors.invalidCredentials")
            : code === "email_not_confirmed"
              ? t("auth.errors.emailNotConfirmed")
              : code === "over_request_rate_limit"
                ? t("auth.errors.rateLimit")
                : result.error.message || t("auth.errors.generic"),
        );
        return;
      }
      navigate(location.state?.from?.pathname || "/account", { replace: true });
    } catch {
      setFormError(t("auth.errors.generic"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <AuthFormPanel>
        <form
          data-testid="login-form"
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-6"
        >
          <div>
            <h1 className="font-heading text-3xl font-medium mb-3">
              {t("auth.loginTitle")}
            </h1>
            <p className="text-sm text-body">{t("auth.loginSubtitle")}</p>
          </div>

          <Input
            variant="underline"
            type="email"
            name="email"
            autoComplete="email"
            aria-label={t("auth.email")}
            placeholder={t("auth.email")}
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            variant="underline"
            type="password"
            name="password"
            autoComplete="current-password"
            aria-label={t("auth.password")}
            placeholder={t("auth.password")}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          {formError && (
            <p role="alert" className="text-xs text-error">
              {formError}
            </p>
          )}

          <div className="flex items-center gap-10">
            <Button type="submit" variant="primary" size="lg" disabled={submitting}>
              {submitting ? t("auth.submitting") : t("auth.login")}
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
