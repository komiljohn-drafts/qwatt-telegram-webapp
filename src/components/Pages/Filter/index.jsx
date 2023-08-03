import { useDispatch, useSelector } from "react-redux";

import { fitlerActions } from "../../../store/slices/filter.slice";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const data = [
  {
    guid: "1",
    name: "take_powerbank",
  },
  {
    guid: "2",
    name: "return_powerbank",
  },
];

const FilterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filterId } = useSelector((state) => state.filter);
  const { t } = useTranslation();

  const handleClick = (filterId) => {
    dispatch(fitlerActions.setFilterId(filterId));
    navigate("/");
  };

  const handleResetFilter = () => {
    dispatch(fitlerActions.resetFilter());
    navigate("/");
  };

  return (
    <div>
      <div>
        <button className={styles.resetFilter} onClick={handleResetFilter}>
          {t("reset_filter")}
        </button>
      </div>
      <div className={`${styles.radioBtnWrap}`}>
        {data?.map((item) => (
          <label
            key={item.guid}
            className={`${styles.control} border-b border-b-[#F4F4F4] py-3 items-center`}
            htmlFor={item.guid}
          >
            <p>{t(item?.name)}</p>
            <input
              type="checkbox"
              className="self-center"
              name="filter"
              id={item.guid}
              onClick={() => handleClick(item.guid)}
              checked={filterId == item.guid}
            />
            <span className={styles.customRadio}></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;
