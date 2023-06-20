import { Outlet, useMatch } from "react-router-dom";

import MobileHeader from "@/components/UI/MobileHeader";
import ProfilePage from "@/components/Pages/ProfilePage";

const Profile = () => {
  const match = useMatch("/profile");

  if (match) {
    return (
      <div>
        <MobileHeader title="Профиль" path="/" />
        <ProfilePage />
      </div>
    );
  }
  return <Outlet />;
};

export default Profile;
