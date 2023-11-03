import { BackIcon } from "@/screen-capture/icons";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const MobileHeader = ({ title, path, isBlueBg = false }) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.header} ${isBlueBg ? styles.blueBg : ""}`}>
      <button
        className={styles.BackIcon}
        onClick={() => {
          if (path) {
            navigate(path);
            return;
          }

          navigate(-1);
        }}
      >
        <BackIcon color={isBlueBg ? "white" : "#282727"} />
      </button>
      <div className={isBlueBg ? "text-white" : ""}>{title}</div>
      <div></div>
    </div>
  );
};

export default MobileHeader;

MobileHeader.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
};

MobileHeader.defaultProps = {
  title: "",
  path: "",
};
