import { Outlet, useMatch } from "react-router-dom";

import MobileHeader from "@/components/UI/MobileHeader";
import ProfilePage from "@/components/Pages/ProfilePage";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const match = useMatch("/profile");

  if (match) {
    return (
      <div>
        <MobileHeader title={t("profile")} path="/" />
        <ProfilePage />
      </div>
    );
  }
  return <Outlet />;
};

export default Profile;
