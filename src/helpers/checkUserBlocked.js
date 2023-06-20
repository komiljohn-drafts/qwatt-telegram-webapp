import { useEffect, useState } from "react";

import { getProfile } from "@/services/getProfile";
import { useSelector } from "react-redux";

export const CheckUserBlocked = () => {
  const userData = useSelector((state) => state.userData?.data);
  const [isBlocked, setIsBlocked] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  console.log("user check", userDetails);

  const getUserDetails = () => {
    if (!userData?.guid) return;
    getProfile(userData?.guid).then((res) => {
      setUserDetails(res?.data?.data?.response?.[0]);
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (userDetails?.blocked == true) {
      setIsBlocked(true);
    }
  }, [userData?.guid]);

  return isBlocked;
};
