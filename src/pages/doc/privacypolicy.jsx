import { useEffect, useState } from "react";

import MobileHeader from "@/components/UI/MobileHeader";
import { getPriceFaq } from "@/services/getPrice";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  const getPrivacyPolicy = () => {
    getPriceFaq({
      data: {
        documents_type: "privacypolicy",
        description_language: "russian",
      },
    }).then((res) => {
      setData(res?.data?.data?.response[0].description);
    });
  };

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  return (
    <div>
      <MobileHeader title={t("data_processing")} />

      <div
        className={styles.docHtml}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
};

export default PrivacyPolicy;
