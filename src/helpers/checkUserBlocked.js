import { useEffect, useState } from "react";

import { getProfile } from "@/services/getProfile";
import { useSelector } from "react-redux";

export const CheckUserBlocked = () => {
  const userData = useSelector((state) => state.userData?.data);
  const [isBlocked, setIsBlocked] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = () => {
    if (!userData?.guid) return;
    getProfile(userData?.guid).then((res) => {
      setUserDetails(res?.data?.data?.response);
      console.log("user details", res);
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (userDetails?.block == true) {
      setIsBlocked(true);
    }
  }, [userData?.guid]);

  console.log("user check", isBlocked);

  return isBlocked;
};
