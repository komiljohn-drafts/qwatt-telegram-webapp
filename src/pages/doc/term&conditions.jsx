import { useEffect, useState } from "react";

import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
import MobileHeader from "@/components/UI/MobileHeader";
import { getPriceFaq } from "@/services/getPrice";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

const Termconditions = () => {
  const [data, setData] = useState(null);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const { t } = useTranslation();

  const getTermconditions = () => {
    getPriceFaq({
      data: {
        documents_type: "term&conditions",
        description_language: "russian",
      },
    })
      .then((res) => {
        if (res?.data?.data?.response[0]?.description){
          setData(res?.data?.data?.response[0]?.description);
        } else {
          setErrorAlertOpen(true);
        }
      })
      .catch(() => {
        setErrorAlertOpen(true);
      });
  };

  useEffect(() => {
    getTermconditions();
  }, []);

  return (
    <div>
      <MobileHeader title={t("user_agreements")} />

      {!data && <FullScreenSpinner />}

      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
      />

      <div
        className={styles.docHtml}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
};

export default Termconditions;
