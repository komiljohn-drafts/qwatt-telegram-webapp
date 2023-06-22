import { useEffect, useState } from "react";

import { getProfile } from "@/services/getProfile";
import { useSelector } from "react-redux";

export const useCheckUserBlocked = () => {
  const userData = useSelector((state) => state.userData?.data);
  const [isBlocked, setIsBlocked] = useState(false);

  const getUserDetails = () => {
    if (!userData?.guid) return;
    getProfile(userData?.guid).then((res) => {
      if (res?.data?.data?.response?.block == true) {
        setIsBlocked(true);
      }
    });
  };

  useEffect(() => {
    getUserDetails();
  }, [userData?.guid]);

  return isBlocked;
};
