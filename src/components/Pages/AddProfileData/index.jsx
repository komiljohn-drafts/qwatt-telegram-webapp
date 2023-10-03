/* eslint-disable react/no-unknown-property */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
import InputMask from "react-input-mask";
import request from "@/utils/axios";
import { getProfile, setProfile } from "@/services/getProfile";
import styles from "./style.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { userDataActions } from "@/store/slices/userData";

const AddProfileData = () => {
  const [gender, setGender] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData?.data);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fetchedData, setFetchedData] = useState([])

  const { register, control, reset, handleSubmit, formState: { errors } } = useForm();

  const validateAge = (selectedDate) => {
    const today = new Date();
    const selected = new Date(selectedDate);
  
    // Ignore the time of day for comparison
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
  
    // Check if the selected date is in the future
    if (selected > today) {
      return false;
    }
  
    // Calculate age in terms of years, months, and days
    let yearsDiff = today.getFullYear() - selected.getFullYear();
    const monthsDiff = today.getMonth() - selected.getMonth();
    const daysDiff = today.getDate() - selected.getDate();
  
    // Adjust for cases where the birthdate month/day hasn't occurred yet this year
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsDiff--;
    }
  
    return yearsDiff >= 14; // Minimum age requirement
  };  

  const onSubmit = (data) => {
    if (!userData?.guid) return;

    const dateOfBirth = new Date(data.age)
    const isoDate = dateOfBirth.toISOString();
    const formattedDate = isoDate.slice(0,10) +" "+isoDate.slice(11,23)
    setIsProcessing(true)
    setProfile({
      data: {
        fcm_token: "",
        guid: userData?.guid,
        name: data.name,
        birth_date: formattedDate,
        gender: [`${gender}`],
      },
    })
      .then(() => {

        request({
          method: "GET",
          url: `user/${userData?.guid}`,
        })
          .then((res) => {
            dispatch(userDataActions.setUserData(res?.data?.data?.response));
            setIsProcessing(false)
            navigate("/uz/profile", { replace: true })
          })
          .catch((err) => console.log("user data err", err)); // log
      })
      .catch((err) => {
        console.log(err); // log
      });
  };

  useEffect(() => {
    if (fetchedData?.gender?.[0] == 1) {
      setGender(1);
    } else if (fetchedData?.gender?.[0] == 2) {
      setGender(2);
    }

    const date = fetchedData?.birth_date?.slice(0,10);

    reset({
      name: fetchedData?.name,
      age: date,
    });
  }, [fetchedData]);

  useEffect(()=>{
    getProfile(userData?.guid)
    .then((res) => {
      dispatch(userDataActions.setUserData(res?.data?.data?.response))
      setFetchedData(res?.data?.data?.response)
      })
    .catch(() => {
      setErrorAlertOpen(true)
    })
  },[])

  return (
    <div className={styles.addDataBody}>
      {!fetchedData && isProcessing && <FullScreenSpinner />}
      <form
        className="flex flex-col px-4 h-full justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.addDataBox}>
          <div className={styles.addData}>
            <p>{t("name")}</p>
            <input control={control} {...register("name")}></input>
          </div>
          <div className={styles.addData}>
            <p>{t("phone_number")}*</p>
            <InputMask
              mask={"+999 99 999 99 99"}
              disabled={true}
              maskChar={null}
              placeholder={`${fetchedData?.phone || ""}`}
            ></InputMask>
          </div>
          <div className={styles.addData}>
            <p>
              {t("date_of_birth")} 
            </p>
            <input 
              className={styles.ageInput} 
              {...register("age", { validate: validateAge })}
              type="date" 
            />
             {errors.age && <p className={`text-red-500 ${styles.errorMsg}`}>{t("youNeedToBe14YearsOld")}</p>}
          </div>
          <div className={styles.addData}>
            <p>{t("gender")}</p>
            <div className={styles.chooseSex}>
              <div
                onClick={() => {
                  setGender(1);
                }}
                className={gender == 1 ? styles.sexActive : styles.sex}
              >
                {t("male")}
              </div>
              <div
                onClick={() => setGender(2)}
                className={gender == 2 ? styles.sexActive : styles.sex}
              >
                {t("female")}
              </div>
            </div>
          </div>
        </div>
        <button
          className={`w-full bg-[#12ADC1] text-white rounded-[12px] h-[48px] ${styles.saveBtn}`}
          type="submit"
        >
          {t("save")}
        </button>
      </form>
    </div>
  );
};

export default AddProfileData;
