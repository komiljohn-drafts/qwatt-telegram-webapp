import { useEffect, useState } from "react";

import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
import MobileHeader from "@/components/UI/MobileHeader";
import { getTariffs } from "@/services/getTariffs";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

const Tarif = () => {
  const [data, setData] = useState(null);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    getTariffs({
      data: {
        documents_type: "pricing",
        description_language: "russian",
      },
    })
      .then((res) => {
        if(res.data.data.response[0].description){
          setData(res.data.data.response[0].description);
        } else {
          setErrorAlertOpen(true)
        }
      })
      .catch(() => {
        setErrorAlertOpen(true);
      });
  }, []);

  return (
    <div>
      <MobileHeader title={t("tariffs")} />

      {!data && <FullScreenSpinner />}

      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
      />

      <div
        className={styles.priceHtml}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
};

export default Tarif;
