import { LocationIcon, PhoneIcon } from "@/screen-capture/icons";

import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getCards } from "@/services/getCards";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { useState } from "react";

const CloseLocation = ({
  nearestMerchants,
  distance,
  mapRef,
  setOpen,
  setSelectedBranch,
}) => {
  const userData = useSelector((state) => state.userData?.data);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAlertProps, setErrorAlertProps] = useState({})

  function kilometerParseMeter(lat, long) {
    const distanceInMeters = Math.floor(
      distance(parseFloat(lat), parseFloat(long)) * 1000
    );
    return distanceInMeters.toString();
  }

  const handleClick = () => {
    if (!userData?.guid) {
      setErrorAlertOpen(true)
      setErrorAlertProps({
        title: t('attention'),
        errorMessage: t('try_restart')
      })
      return;
    }
    
    getCards({
      data:{
        user: userData?.guid
      }
    })
      .then((res) => {
        if (res?.data?.data?.data?.response.length == 0) {
          navigate("/uz/add-card?from=order");
        } else {
          navigate("/uz/order");
        }
      })
      .catch((err) => {
        setErrorAlertOpen(true);
      });
  };

  return (
    <div className={styles.CloseLocationWrap}>
      <a href="tel:+998954748080" className={styles.circle}>
        <PhoneIcon />
      </a>
      <div className={styles.closeLocations}>
        {nearestMerchants?.map((item, i) => (
          <div
            className={styles.closestBox}
            key={i}
            onClick={() => {
              mapRef.current?.setCenter([item.latitude, item.longitude], 15, {
                duration: 700,
                checkZoomRange: true,
              });
              setOpen((p) => !p);
              setSelectedBranch(item);
            }}
          >
            <LocationIcon />
            <p>{item?.venune_name_in_english}</p>
            <span>{`${kilometerParseMeter(
              item?.latitude,
              item?.longitude
            )} метр `}</span>
          </div>
        ))}
      </div>
      <button onClick={handleClick} className={styles.getButton}>
        {t("get_powerbank")}
      </button>
      <ErrorAlert
          openAlert={isErrorAlertOpen}
          setOpenAlert={setErrorAlertOpen}
          title={errorAlertProps.title}
          errorMesage={errorAlertProps.errorMessage}
        />
    </div>
  );
};

export default CloseLocation;

CloseLocation.propTypes = {
  nearestMerchants: PropTypes.array,
  distance: PropTypes.func,
  mapRef: PropTypes.object,
  setOpen: PropTypes.func,
  setSelectedBranch: PropTypes.func,
};

CloseLocation.defaultProps = {
  nearestMerchants: [],
  distance: () => {},
  mapRef: {},
  setOpen: () => {},
  setSelectedBranch: () => {},
};
