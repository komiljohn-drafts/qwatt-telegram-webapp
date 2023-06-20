import { BackIcon } from "@/screen-capture/icons";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const MobileHeader = ({ title, path }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
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
        <BackIcon />
      </button>
      <div>{title}</div>
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
