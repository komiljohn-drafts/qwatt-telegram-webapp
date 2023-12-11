import { AnimatePresence, motion } from "framer-motion"
import {
  DestinationIcon,
  QwattBlueIcon,
  QwattYellowIcon,
  XDarkIcon,
  XWhiteIcon,
} from "@/screen-capture/icons"
import { useEffect, useState } from "react"

import PropTypes from "prop-types"
import { getPrice } from "@/services/getPrice"
import styles from "./style.module.scss"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import request from "@/utils/axios"
import { useNavigate } from "react-router-dom"
import ErrorAlert from "../ErrorAlert/ErrorAlert"

const MapPopup = ({ selectedBranch, setOpen }) => {
  // const [touchStart, setTouchStart] = useState(null);
  // const [touchEnd, setTouchEnd] = useState(null);

  const userData = useSelector((state) => state.userData?.data)
  const [getElement, setGetElement] = useState("")
  const [errorAlertOpen, setErrorAlertOpen] = useState(false)
  const [errorAlertProps, setErrorAlertProps] = useState({})
  const [data, setData] = useState(null)
  const { t } = useTranslation()
  const variants = {
    initial: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    // transitionEnd: { display: "none" },
  }
  const navigate = useNavigate()

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

  const handleClick = () => {
    if (!userData?.guid) {
      setErrorAlertOpen(true)
      setErrorAlertProps({
        title: t("attention"),
        errorMessage: t("try_restart"),
      })
      return
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
          navigate("/uz/add-card?from=order")
        } else {
          navigate("/uz/order")
        }
      })
      .catch((err) => {
        console.log("my cards error", err) // log
      })
  }

  const handleRouteToDestination = () => {
    const destCoordinates = `${selectedBranch.latitude},${selectedBranch.longitude}`
    window.Telegram.WebApp.openLink(
      `https://maps.google.com/maps?q=${destCoordinates}`
    )
  }

  useEffect(() => {
    getPrice({
      data: {
        with_relations: false,
        merchant_pricing_id: selectedBranch?.merchant_pricing_id,
        pricing_languages: "russian",
      },
    }).then((res) => {
      setData(res?.data?.data?.response)
    })
  }, [selectedBranch])

  useEffect(() => {
    const theme = document?.documentElement?.getAttribute("data-theme")

    if (theme) {
      setGetElement(theme)
    }

    const observer = new MutationObserver((mutations) => {
      const themeMutation = mutations.find(
        (mutation) =>
          mutation.attributeName === "data-theme" &&
          mutation.target === document.documentElement
      )

      if (themeMutation) {
        setGetElement(themeMutation.target.getAttribute("data-theme"))
      }
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

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
        <ErrorAlert
          openAlert={errorAlertOpen}
          setOpenAlert={setErrorAlertOpen}
          title={errorAlertProps.title}
          errorMesage={errorAlertProps.errorMessage}
        />
        {/* <div className={styles.popUpDash}>
          <span></span>
        </div> */}
        <div className={styles.xIcon}>
          <span onClick={() => setOpen(() => false)}>
            {getElement === "dark" ? <XWhiteIcon /> : <XDarkIcon />}
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
          <div className={styles.verticalLine}></div>
          <div className={styles.iconWrap}>
            <div className={styles.icon}>
              <QwattYellowIcon />
              <span>{selectedBranch?.allreturnableslots}</span>
            </div>
            <p>вернуть</p>
          </div>
          <div className={styles.verticalLine}></div>
          <div onClick={handleRouteToDestination} className={styles.iconWrap2}>
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
                <p>{item?.title}</p>

                <div className={styles.tarifLine}></div>
                <span className="font-medium">{item?.pricing}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleClick} className={styles.getButton}>
          {t("get_powerbank")}
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

export default MapPopup

MapPopup.propTypes = {
  selectedBranch: PropTypes.object,
  setOpen: PropTypes.func,
}

MapPopup.defaultProps = {
  selectedBranch: {},
  setOpen: () => {},
}
