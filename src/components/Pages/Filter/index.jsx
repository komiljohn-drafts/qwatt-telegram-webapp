import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fitlerActions } from "../../../store/slices/filter.slice";
import { getVenueList } from "@/services/getMerchant";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

const FilterPage = () => {
  const dispatch = useDispatch();
  const { filterIds } = useSelector((state) => state.filters);
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const getFilterVenueList = () => {
    getVenueList().then((res) => {
      setData(res?.data?.data?.response);
    });
  };

  const handleClick = (filterId) => {
    dispatch(fitlerActions.setFilterId(filterId));
  };

  const handleResetFilter = () => {
    dispatch(fitlerActions.resetFilter()); // Dispatch the action to reset the filter in Redux
  };

  useEffect(() => {
    getFilterVenueList();
  }, []);

  return (
    <div>
      <div>
        <button className={styles.resetFilter} onClick={handleResetFilter}>
          {t("resetFilter")}
        </button>
      </div>
      <div className={styles.radioBtnWrap}>
        {data?.map((item) => (
          <label key={item.guid} className={styles.control} htmlFor={item.guid}>
            {item?.name}
            <input
              type="checkbox"
              name="filter"
              id={item.guid}
              onClick={() => handleClick(item.guid)}
              checked={filterIds.includes(item.guid)}
            />
            <span className={styles.customRadio}></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;
