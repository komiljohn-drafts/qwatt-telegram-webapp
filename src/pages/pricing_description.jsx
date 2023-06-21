import { useEffect, useState } from "react";

import MobileHeader from "@/components/UI/MobileHeader";
import { getTariffs } from "@/services/getTariffs";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

const Tarif = () => {
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    getTariffs({
      data: {
        documents_type: "pricing",
        description_language: "russian",
      },
    }).then((res) => {
      setData(res.data.data.response[0].description);
    });
  }, []);

  return (
    <div>
      <MobileHeader title={t("tariffs")} />

      <div
        className={styles.priceHtml}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
};

export default Tarif;
