import { useEffect, useState } from "react";

import ActiveCard from "./ActiveCard";
import HistoryCard from "./HistoryCard";
import { getOrders } from "@/services/setOrder";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";

const HistoryPage = () => {
  const userData = useSelector((state) => state.userData?.data);
  const [historyData, setHistoryData] = useState([]);

  const getOrderHistory = () => {
    getOrders({
      data: {
        with_relations: false,
        user_id: userData?.guid,
      },
    }).then((res) => {
      setHistoryData(res?.data?.data?.response);
    });
  };

  useEffect(() => {
    getOrderHistory();
  }, []);

  return (
    <div>
      {historyData?.length ? (
        <>
          {historyData
            ?.filter((el) => el?.end_time == "")
            ?.map((order) => {
              return <ActiveCard key={order?.guid} order={order} />;
            })}
          {historyData?.map((order) => {
            return <HistoryCard key={order?.guid} order={order} />;
          })}
        </>
      ) : (
        <div className={styles.NoHistory}>
          <div className={styles.NoHistoryBox}>
            <h1 className={styles.header}>Пока ничего не арендовано</h1>
            <p className={styles.text}>
              Арендуйте повербанки и отслеживайте историю аренд здесь.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
