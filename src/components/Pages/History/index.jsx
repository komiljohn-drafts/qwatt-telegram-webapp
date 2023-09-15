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
import { CircularProgress } from "@mui/material";

const HistoryPage = () => {
  const userData = useSelector((state) => state.userData?.data);
  const [historyData, setHistoryData] = useState([]);
  const [ErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(null);

  const getOrderHistory = (isOnLease, fromEffect = false) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    getOrders({
      data: {
        userId: userData?.guid,
        lease_orders: isOnLease,
        limit: isOnLease ? 100 : 10,
        page: currentPage,
      },
    })
      .then((res) => {
        const response = res?.data?.data?.data?.response;

        if (response?.length >= 0) {
          setHistoryData((old) => [...old, ...sortOrders(response)]);
          if (!isOnLease) {
            setCurrentPage((old) => old + 1);
          }
        }
        if (fromEffect) {
          return res?.data?.data?.data?.count;
        }
      })
      .catch(() => {
        setErrorAlertOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log("total", total); // log
    console.log("historyData?.length", historyData?.length); // log
    if (total === historyData?.length) {
      setHasMore(false);
    }
  }, [total, historyData]);

  // const handleScroll = () => {
  //   if(isLoading) return;
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop >=
  //     document.documentElement.offsetHeight - 100
  //   ) {
  //     console.log("load more");
  //     getOrderHistory(false)
  //   }
  // };

  useEffect(() => {
    // window.addEventListener('scroll', handleScroll);
    setTotal(getOrderHistory(true, true));
    setTotal((old) => old + getOrderHistory(false, true));
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, []);

  if (isLoading && !historyData.length) {
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
            ?.filter((el) => el?.status_name == "In The Lease")
            ?.map((order) => {
              return <ActiveCard key={order?.order_guid} order={order} />;
            })}
          {historyData
            .filter((order) => order.status_name !== "In The Lease")
            ?.map((order) => {
              return <HistoryCard key={order?.order_guid} order={order} />;
            })}
          <div className={styles.loadMoreContainer}>
            <button
              className={styles.loadMore}
              onClick={() => getOrderHistory(false)}
            >
              {isLoading ? (<CircularProgress/>) : "Load more"}
            </button>
          </div>
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
