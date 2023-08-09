import { useEffect, useState } from "react";

import ActiveCard from "./ActiveCard";
import ErrorAlert from "@/components/UI/ErrorAlert/ErrorAlert";
import FullScreenSpinner from "@/components/atoms/FullScreenSpinner";
import HistoryCard from "./HistoryCard";
import { getOrders } from "@/services/setOrder";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { sortOrders } from "@/helpers/sortOrders";

const HistoryPage = () => {
  const userData = useSelector((state) => state.userData?.data);
  const [historyData, setHistoryData] = useState(null);
  const [ErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const { t } = useTranslation();

  const getOrderHistory = () => {
    getOrders({
      data: {
        userId: userData?.guid
      }
    })
      .then((res) => {
        if(res?.data?.data?.data?.response?.length >= 0){
          setHistoryData(sortOrders(res?.data?.data?.data?.response));
        } else if(res?.data?.data?.data?.response == null){
          setHistoryData([])
        } else {
          setErrorAlertOpen(true);
        }
      })
      .catch(() => {
        setErrorAlertOpen(true);
      });
  };

  useEffect(() => {
    getOrderHistory();
  }, []);

  if (!historyData) {
    return (
      <>
        <ErrorAlert
          openAlert={ErrorAlertOpen}
          setOpenAlert={setErrorAlertOpen}
        />
        <FullScreenSpinner />
      </>
    );
  }

  return (
    <div>
      {historyData?.length ? (
        <>
          {historyData
            ?.filter((el) => el?.end_time == "")
            ?.map((order) => {
              return <ActiveCard key={order?.order_guid} order={order} />;
            })}
          {historyData?.map((order) => {
            return <HistoryCard key={order?.order_guid} order={order} />;
          })}
        </>
      ) : (
        <div className={styles.NoHistory}>
          <div className={styles.NoHistoryBox}>
            <h1 className={styles.header}>{t("no_orders")}</h1>
            <p className={styles.text}>{t("make_order")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
