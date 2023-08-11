/* eslint-disable react/no-unknown-property */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
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

  const { register, control, reset, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (!userData?.guid) return;

    const dateOfBirth = new Date(data.age)

    setProfile({
      data: {
        fcm_token: "",
        guid: userData?.guid,
        name: data.name,
        birth_date: dateOfBirth.toISOString(),
        gender: [`${gender}`],
      },
    })
      .then(() => {
        navigate("/profile", { replace: true });

        request({
          method: "GET",
          url: `user/${userData?.guid}`,
        })
          .then((res) => {
            dispatch(userDataActions.setUserData(res?.data?.data?.response));
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

    const date = new Date(userData?.birth_date);
    const formattedDate = date.toISOString().split('T')[0];

    reset({
      name: userData?.name,
      age: formattedDate,
    });
  }, [userData]);

  return (
    <div className={styles.addDataBody}>
      {!userData && <FullScreenSpinner />}
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
              placeholder={`${userData?.phone || ""}`}
            ></InputMask>
          </div>
          <div className={styles.addData}>
            <p>
              {/* static data */}
              date of birth 
            </p>
            {/* <input
              control={control}
              {...register("age")}
              type="number"
              className={styles.ageInput}
            ></input> */}
            <input 
              className={styles.ageInput} 
              {...register("age")}
              type="date" 
            />
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
