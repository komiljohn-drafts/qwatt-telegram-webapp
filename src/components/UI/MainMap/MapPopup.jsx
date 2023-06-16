import { AnimatePresence, motion } from "framer-motion";
import {
  DestinationIcon,
  QwattBlueIcon,
  QwattYellowIcon,
  XIcon,
} from "@/screen-capture/icons";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { getPrice } from "@/services/getPrice";
import styles from "./style.module.scss";

const MapPopup = ({ selectedBranch, setOpen }) => {
  // const [touchStart, setTouchStart] = useState(null);
  // const [touchEnd, setTouchEnd] = useState(null);
  const [data, setData] = useState(null);
  const variants = {
    initial: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    // transitionEnd: { display: "none" },
  };

  // const { data } = useObjectList({
  //   tableSlug: "/pricing_descs",
  //   projectId: "4dbfb907-8b4b-460b-906b-cc81c58e656c",
  //   data: {
  //     with_relations: false,
  //     merchant_pricing_id: selectedBranch?.merchant_pricing_id,
  //     pricing_languages: "russian",
  //   },
  //   getListParams: {
  //     onSuccess: () => {},
  //     onError: () => {},
  //     select: (data) => data.data.data.response,
  //   },
  // });

  useEffect(() => {
    getPrice({
      data: {
        with_relations: false,
        merchant_pricing_id: selectedBranch?.merchant_pricing_id,
        pricing_languages: "russian",
      },
    }).then((res) => {
      setData(res?.data?.data?.response);
    });
  }, [selectedBranch]);

  return (
    <AnimatePresence mode="wait">
      <div />
      <motion.div
        className={styles.popUpWrap}
        initial="initial"
        animate="visible"
        variants={variants}
        transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
        exit={{ y: "50%", opacity: 0, transition: { duration: 0.1 } }}
      >
        <div className={styles.popUpDash}>
          <span></span>
        </div>
        <div className={styles.xIcon}>
          <span onClick={() => setOpen(() => false)}>
            <XIcon />
          </span>
        </div>
        <div>
          <h1 className={styles.street}>
            {selectedBranch?.venune_name_in_english}
          </h1>
          <p className={styles.adress}>
            {selectedBranch?.detail_address_in_english}
          </p>
        </div>
        <div className={styles.iconInfo}>
          <div className={styles.iconWrap}>
            <div className={styles.icon}>
              <QwattBlueIcon />
              <span>{selectedBranch?.allavailableslots}</span>
            </div>
            <p>брать</p>
          </div>
          <div className={styles.iconWrap}>
            <div className={styles.icon}>
              <QwattYellowIcon />
              <span>{selectedBranch?.allreturnableslots}</span>
            </div>
            <p>вернуть</p>
          </div>
          <div className={styles.iconWrap2}>
            <div className={styles.icon}>
              <DestinationIcon />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.PriceText}>Цена</div>
          <div>
            {data?.map((item) => (
              <div className={styles.tarif} key={item?.guid}>
                <div>{item?.title}</div>

                <div className={styles.tarifLine}></div>
                <div>{item?.pricing}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MapPopup;

MapPopup.propTypes = {
  selectedBranch: PropTypes.object,
  setOpen: PropTypes.func,
};

MapPopup.defaultProps = {
  selectedBranch: {},
  setOpen: () => {},
};
