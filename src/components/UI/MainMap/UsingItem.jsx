import { LightingIcon, LocationIcon } from "@/screen-capture/icons";
import React from "react";
import styles from "./style.module.scss";

const UsingItem = () => {
  return (
    <div className={styles.usingItemCard}>
      <div className={styles.header}>
        <div className={styles.used}>Используется</div>
        <div className={styles.howGet}>Как сдать повербанк?</div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyInfo}>
          <div>Используется:</div>
          <div>04:03:13</div>
        </div>
        <div className={styles.bodyInfo}>
          <div>Сумма аренды:</div>
          <div>10 000 сум</div>
        </div>
        <div className={styles.bodyInfo}>
          <div>Место аренды:</div>
          <div>Университет МГИМО </div>
        </div>
      </div>
    </div>
  );
};

export default UsingItem;
