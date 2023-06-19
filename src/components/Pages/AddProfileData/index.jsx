/* eslint-disable react/no-unknown-property */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import InputMask from "react-input-mask";
import request from "@/utils/axios";
import { setProfile } from "@/services/getProfile";
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

  console.log("userData", userData);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!userData?.guid) return;

    setProfile({
      data: {
        fcm_token: "",
        guid: userData?.guid,
        name: data.name,
        birth_date: data.age,
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
            navigate("/profile");
          })
          .catch((err) => console.log("user data err", err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userData?.gender?.[0] == 1) {
      setGender(1);
    } else if (userData?.gender?.[0] == 2) {
      setGender(2);
    }
    reset({
      name: userData?.name,
      age: userData?.birth_date,
    });
  }, [userData]);

  return (
    <div className={styles.addDataBody}>
      <form
        className="flex flex-col px-4 h-full justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.addDataBox}>
          <div className={styles.addData}>
            <p>{t("name")}</p>
            <input
              control={control}
              {...register("name", { required: true, minLength: 3 })}
              placeholder="Kamoliddin"
            ></input>
            {errors.name && (
              <p className="text-red-600 !mt-2">First name is required</p>
            )}
          </div>
          <div className={styles.addData}>
            <p>{t("phoneNumber")}*</p>
            <InputMask
              mask={"+999 99 999 99 99"}
              disabled={true}
              maskChar={null}
              placeholder={`${userData?.phone || ""}`}
            ></InputMask>
          </div>
          <div className={styles.addData}>
            <p>{t("age")}</p>
            <input
              control={control}
              {...register("age", { required: true, min: 5, max: 99 })}
              placeholder="19"
              type="number"
              className={styles.ageInput}
            ></input>
            {errors.age && (
              <p className="text-red-600 !mt-2">Age must be between 5 and 99</p>
            )}
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
          className="w-full bg-[#12ADC1] text-white rounded-[12px] h-[48px]"
          type="submit"
        >
          {t("save")}
        </button>
      </form>
    </div>
  );
};

export default AddProfileData;
