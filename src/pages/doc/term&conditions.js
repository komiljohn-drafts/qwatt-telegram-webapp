import { useEffect, useState } from "react";

import MobileHeader from "@/components/UI/MobileHeader";
import { getPriceFaq } from "@/services/getPrice";
import styles from "./style.module.scss";

const Termconditions = () => {
  const [data, setData] = useState(null);

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
      <MobileHeader title="Пользовательские соглашения" />

      <div
        className={styles.docHtml}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
};

export default Termconditions;
