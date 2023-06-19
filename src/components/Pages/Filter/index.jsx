import { useDispatch, useSelector } from "react-redux";

import { fitlerActions } from "../../../store/slices/filter.slice";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

const data = [
  {
    guid: "1",
    name: "getPowerBank",
  },
  {
    guid: "2",
    name: "returnPowerBank",
  },
];

const FilterPage = () => {
  const dispatch = useDispatch();
  const { filterId } = useSelector((state) => state.filter);
  const { t } = useTranslation();

  const handleClick = (filterId) => {
    dispatch(fitlerActions.setFilterId(filterId));
  };

  const handleResetFilter = () => {
    dispatch(fitlerActions.resetFilter()); // Dispatch the action to reset the filter in Redux
  };

  return (
    <div>
      <div>
        <button className={styles.resetFilter} onClick={handleResetFilter}>
          {t("resetFilter")}
        </button>
      </div>
      <div className={`${styles.radioBtnWrap}`}>
        {data?.map((item) => (
          <label
            key={item.guid}
            className={`${styles.control} border-b border-b-[#F4F4F4] py-2 items-center`}
            htmlFor={item.guid}
          >
            {t(item?.name)}
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
