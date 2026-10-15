import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import AuthFormPanel from "../components/organisms/AuthFormPanel";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../lib/validation";

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setFormError("");
    setInfo("");

    const found = {};
    const email = form.email.trim();
    if (!form.name.trim()) found.name = t("auth.errors.nameRequired");
    if (!email) found.email = t("auth.errors.emailRequired");
    else if (!isValidEmail(email)) found.email = t("auth.errors.emailInvalid");
    if (!form.password) found.password = t("auth.errors.passwordRequired");
    else if (form.password.length < 6) found.password = t("auth.errors.passwordShort");
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      const result = await signup(form.name.trim(), email, form.password);

      if (!result.success) {
        const code = result.error.code;
        const known = {
          user_already_exists: "emailExists",
          email_exists: "emailExists",
          email_address_invalid: "emailRejected",
          weak_password: "passwordShort",
          over_email_send_rate_limit: "rateLimit",
          over_request_rate_limit: "rateLimit",
        };
        setFormError(
          known[code]
            ? t(`auth.errors.${known[code]}`)
            : result.error.message || t("auth.errors.generic"),
        );
        return;
      }

      if (result.needsEmailConfirmation) {
        setInfo(t("auth.confirmEmail"));
        return;
      }

      navigate("/account", { replace: true });
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
          data-testid="signup-form"
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-6"
        >
          <div>
            <h1 className="font-heading text-3xl font-medium mb-3">
              {t("auth.signupTitle")}
            </h1>
            <p className="text-sm text-body">{t("auth.signupSubtitle")}</p>
          </div>

          <Input
            variant="underline"
            name="name"
            autoComplete="name"
            aria-label={t("auth.name")}
            placeholder={t("auth.name")}
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />
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
            autoComplete="new-password"
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
          {info && (
            <p role="status" className="text-xs text-success">
              {info}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={submitting}
          >
            {submitting ? t("auth.submitting") : t("auth.createAccount")}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full gap-3"
          >
            <FcGoogle size={20} /> {t("auth.signupWithGoogle")}
          </Button>

          <p className="text-sm text-body text-center">
            {t("auth.alreadyHaveAccount")}{" "}
            <Link to="/login" className="text-ink underline">
              {t("auth.login")}
            </Link>
          </p>
        </form>
      </AuthFormPanel>
    </div>
  );
}
