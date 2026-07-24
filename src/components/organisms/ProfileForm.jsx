import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useAuth } from "../../context/AuthContext";
import { useProfile, useUpdateProfile } from "../../hooks/useProfile";

export default function ProfileForm() {
  const { t } = useTranslation();
  const { user, login, updatePassword } = useAuth();

  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);
  const updateProfileMutation = useUpdateProfile(user?.id);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!profile) return;
    setForm((f) => ({
      ...f,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      address: profile.address,
    }));
  }, [profile]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCancel = () => {
    if (!profile) return;
    setForm((f) => ({
      ...f,
      firstName: profile.firstName,
      lastName: profile.lastName,
      address: profile.address,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const wantsPasswordChange =
      form.newPassword || form.confirmPassword || form.currentPassword;

    if (wantsPasswordChange) {
      if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
        setError("Fill in all three password fields to change your password.");
        return;
      }
      if (form.newPassword !== form.confirmPassword) {
        setError("New password and confirmation do not match.");
        return;
      }

      const verify = await login(form.email, form.currentPassword);
      if (!verify.success) {
        setError("Current password is incorrect.");
        return;
      }

      const passwordResult = await updatePassword(form.newPassword);
      if (!passwordResult.success) {
        setError(passwordResult.error.message);
        return;
      }
    }

    try {
      await updateProfileMutation.mutateAsync({
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
      });
      setForm((f) => ({
        ...f,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setSuccess("Changes saved.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (profileLoading) {
    return (
      <div className="border border-line rounded-sm p-8 max-w-3xl text-sm text-body">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="border border-line rounded-sm p-8 max-w-3xl">
      <h2 className="text-primary font-medium mb-6">
        {t("account.editProfile")}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <Input
            label={t("account.lastName")}
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          <Input
            label={t("account.email")}
            name="email"
            value={form.email}
            disabled
          />
          <Input
            label={t("account.address")}
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Add your address"
          />
        </div>

        <div>
          <p className="text-sm text-ink mb-4">
            {t("account.passwordChanges")}
          </p>
          <div className="flex flex-col gap-4">
            <Input
              type="password"
              name="currentPassword"
              placeholder={t("account.currentPassword")}
              value={form.currentPassword}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="newPassword"
              placeholder={t("account.newPassword")}
              value={form.newPassword}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder={t("account.confirmNewPassword")}
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <p className="text-xs text-error">{error}</p>}
        {success && <p className="text-xs text-success">{success}</p>}

        <div className="flex items-center justify-end gap-6">
          <Button type="button" variant="text" onClick={handleCancel}>
            {t("account.cancel")}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending
              ? "Saving…"
              : t("account.saveChanges")}
          </Button>
        </div>
      </form>
    </div>
  );
}
