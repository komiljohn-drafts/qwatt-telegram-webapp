import { useEffect, useState } from "react";

import MobileHeader from "@/components/UI/MobileHeader";
import { getPriceFaq } from "@/services/getPrice";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

const Termconditions = () => {
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  const getTermconditions = () => {
    getPriceFaq({
      data: {
        documents_type: "term&conditions",
        description_language: "russian",
      },
    }).then((res) => {
      setData(res?.data?.data?.response[0].description);
    });
  };

  useEffect(() => {
    getTermconditions();
  }, []);

  return (
    <div>
      <MobileHeader title={t("userAgreements")} />

      <div
        className={styles.docHtml}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
};

export default Termconditions;
