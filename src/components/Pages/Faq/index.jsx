import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
import { getFaqs } from "@/services/getPrice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styles from './Faq.module.scss';
import { DownIcon, UpIcon } from "@/screen-capture/icons";

const FaqPage = () => {
  const [data, setData] = useState(null);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const userTelegramData = useSelector((state) => state.userTelegramData?.data);
  const [openCard, setOpenCard] = useState(null);

  const sendMsg = (msg) => {
    fetch(`https://api.telegram.org/bot5933951945:AAGVK6UU0GhoLrnGDPzQ22V681pYr4j-N5E/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: "1780780393",
          text: msg,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log("Message sent successfully", data);
        })
        .catch(error => {
          console.error("Error sending message", error);
        });
  }
  
  const { t } = useTranslation();

  const getFaq = () => {
    sendMsg(userTelegramData?.language_code)
    getFaqs({
      data: {
        language: userTelegramData?.language_code,
        // language: 'russian',
        type: "Faq"
      }
    })
      .then((res) => {
        if(res?.data?.data?.data?.response){
          console.log(res?.data?.data?.data?.response);
          setData(res?.data?.data?.data?.response);
        } else if(res?.data?.data?.data?.error) {
          setErrorAlertOpen(true);
        }
      })
      .catch(() => {
        setErrorAlertOpen(true);
      });
  };

  useEffect(() => {
    getFaq();
  }, []);

  if (!data) return <FullScreenSpinner />
  return (
    <div className={styles.faqWrapper}>
      {data?.map((item, index) => (
        <div key={index} className={styles.questionCard}>
          
          <p className={styles.question}>{item.title}</p>

          <div className={`${styles.openCard} ${openCard == index ? '' : styles.card}`}>
            <p className={styles.answer}>{item.description}</p>
          </div>

          <div className={styles.moreWrap}>
            <div onClick={() => setOpenCard(oldV => oldV == index ? null : index)}>
              {openCard != index ? t("more") : t("close")}
            </div>
            {openCard != index ? <DownIcon /> : <UpIcon />}
          </div>
        </div>
      ))}

      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
      />

    </div>
  );
};

export default FaqPage;
