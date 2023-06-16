import { useEffect, useState } from "react";

import MobileHeader from "@/components/UI/MobileHeader";
import { getPriceFaq } from "@/services/getPrice";
import styles from "./style.module.scss";

const Faq = () => {
  const [data, setData] = useState(null);

  const getFaq = () => {
    getPriceFaq({
      data: {
        documents_type: "faq",
        description_language: "russian",
      },
    }).then((res) => {
      setData(res?.data?.data?.response[0].description);
    });
  };

  useEffect(() => {
    getFaq();
  }, []);

  return (
    <div>
      <MobileHeader title="Обработка данных" />

      <div
        className={styles.docHtml}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
};

export default Faq;
