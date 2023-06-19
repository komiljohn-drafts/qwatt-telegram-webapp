import { LightingIcon, LocationIcon } from "@/screen-capture/icons";

import PropTypes from "prop-types";
import request from "@/utils/axios";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

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

  function kilometerParseMeter(lat, long) {
    const distanceInMeters = Math.floor(
      distance(parseFloat(lat), parseFloat(long)) * 1000
    );
    return distanceInMeters.toString();
  }

  const handleClick = () => {
    if (!userData?.guid) {
      return;
    }
    request
      .post("get-list/credit_card_list", {
        data: {
          with_relations: false,
          user_id: userData?.guid,
        },
      })
      .then((res) => {
        if (res?.data?.data?.count == 0) {
          navigate("/add-card?from=order");
        } else {
          navigate("/order");
        }
      })
      .catch((err) => {
        console.log("my cards error", err);
      });
  };

  return (
    <div className={styles.CloseLocationWrap}>
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
        <LightingIcon /> {t("getPowerBank")}
      </button>
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
