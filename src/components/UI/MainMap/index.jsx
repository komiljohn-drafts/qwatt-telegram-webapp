import { AnimatePresence, motion } from "framer-motion"
import {
  AppStoreIcon,
  DocumentsIcon,
  FaqIcon,
  HistoryIcon,
  MenuIcon,
  MyCardIcon,
  MyTarifIcon,
  PhoneIconSquare,
  PlayMarketIcon,
  ProfileIcon,
  XDarkIcon,
  XWhiteIcon,
  starIcon,
} from "@/screen-capture/icons"
import {
  Clusterer,
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps"
import { useRef, useState } from "react"

import CloseLocation from "./CloseLocation"
import ErrorAlert from "../ErrorAlert/ErrorAlert"
import FullScreenSpinner from "@/components/atoms/FullScreenSpinner"
import MapPopup from "./MapPopup"
import OrderInfo from "./OrderInfo"
import { getMerchantList } from "@/services/getMerchant"
import img from "@/assets/images/loc.png"
import { locationActions } from "@/store/userLocation/location"
import { orderDetailsActions } from "@/store/Order/orderDetails"
import styles from "./style.module.scss"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { getOrders } from "@/services/setOrder"
import { userDataActions } from "@/store/slices/userData"
import { getBonus } from "@/services/getProfile"
import PercentPng from "@/assets/images/percent.png"

const MainMap = () => {
  const mapRef = useRef()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { locationIds } = useSelector((state) => state.locations)
  const userData = useSelector((state) => state.userData?.data)
  const orderData = useSelector((state) => state.orderDetails?.data)

  const [bonus, setBonus] = useState("")
  const [getElement, setGetElement] = useState("")
  const [data, setData] = useState(null)
  const [isOpen, setOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState({})
  const [nearestMerchants, setNearestMerchants] = useState([])
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false)

  // console.log("userData", userData) // log
  // const [ymaps, setYmaps] = useState("");
  // const [notAllowed, setNotAllowed] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const tele = window.Telegram?.WebApp;
  //     tele.isClosingConfirmationEnabled = true;
  //   }
  // }, []);

  const variants = {
    initial: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  const menuItems = [
    {
      text: "profile",
      // route: "/uz/profile",
      route: "/uz/",
      icon: <ProfileIcon />,
    },
    {
      text: "bonuses",
      route: "/uz/bonuses",
      icon: <img src={PercentPng} />,
    },
    {
      text: "order_history",
      route: "/uz/history",
      icon: <HistoryIcon />,
    },
    {
      text: "my_cards",
      // route: "/uz/my-cards",
      route: "/uz/",
      icon: <MyCardIcon />,
    },
    {
      text: "tariffs",
      route: "/uz/pricing_description",
      icon: <MyTarifIcon />,
    },
    {
      text: "documentation",
      route: "/uz/doc",
      icon: <DocumentsIcon />,
    },
    {
      text: "faq",
      route: "/uz/faq",
      icon: <FaqIcon />,
    },
    {
      text: "contact_us",
      route: "/uz/contact_us",
      icon: <PhoneIconSquare />,
    },
  ]

  const fetchBonus = () => {
    if (!userData?.guid) {
      setErrorAlertOpen(true)
      return
    }
    getBonus({
      data: {
        offset: 1,
        limit: 10,
        user_id: [userData?.guid],
      },
    })
      .then((res) => {
        if (res?.status === "OK") {
          if (res?.data?.data?.response?.length > 0) {
            setBonus(res?.data?.data?.response?.[0]?.balance)
          } else {
            setBonus(0)
          }
        } else {
          setErrorAlertOpen(true)
        }
      })
      .catch((err) => {
        setErrorAlertOpen(true)
      })
  }

  useEffect(() => {
    getMerchantList()
      .then((res) => {
        // let filteredData = [];

        // filter is disabled for now. It might be activated again
        // if (filterId == 1) {
        //   res?.data?.data?.response?.forEach((merchant) => {
        //     if (merchant?.allavailableslots > 0) {
        //       filteredData.push(merchant);
        //     }
        //   });
        // }

        // if (filterId == 2) {
        //   res?.data?.data?.response?.forEach((merchant) => {
        //     if (merchant?.allreturnableslots > 0) {
        //       filteredData.push(merchant);
        //     }
        //   });
        // }

        // setData(
        //   filteredData?.length == 0 ? res?.data?.data?.response : filteredData
        // );
        setData(res?.data?.data?.data?.response)
        // console.log("res?.data?.data?.response", res?.data?.data?.response) // log
      })
      .catch((err) => {
        console.log("merchant err", err) // log
        setErrorAlertOpen(true)
      })
    // }, [filterId]);
  }, [])

  console.log("data => ", data)

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    function success(pos) {
      const crd = pos.coords
      dispatch(
        locationActions.setLocationId({
          lat: crd.latitude,
          long: crd.longitude,
        })
      )
      // setNotAllowed(false);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`)
      // setNotAllowed(true);
    }
    if (!locationIds?.lat && !locationIds?.long)
      navigator.geolocation.getCurrentPosition(success, error, options)
  }, [locationIds?.lat, locationIds?.long])

  ////
  const distance = useCallback(
    (merchantLat, merchantLong) => {
      if (!locationIds.lat && !locationIds.long) return

      let userLocationLat = locationIds.lat
      let userLocationLong = locationIds.long
      let r = 6371
      userLocationLong = (userLocationLong * Math.PI) / 180
      merchantLong = (merchantLong * Math.PI) / 180
      userLocationLat = (userLocationLat * Math.PI) / 180
      merchantLat = (merchantLat * Math.PI) / 180

      let nearbyLong = merchantLong - userLocationLong
      let nearbyLat = merchantLat - userLocationLat

      let a =
        Math.pow(Math.sin(nearbyLat / 2), 2) +
        Math.cos(userLocationLat) *
          Math.cos(merchantLat) *
          Math.pow(Math.sin(nearbyLong / 2), 2)
      let c = 2 * Math.asin(Math.sqrt(a))
      return c * r
    },

    [locationIds.lat, locationIds.long]
  )

  const sortMerchants = useCallback(
    (merchants) => {
      const merchantSort = merchants?.slice() // in order to make copy by values
      merchantSort?.sort((a, b) => {
        const distanceA = distance(
          parseFloat(a.latitude),
          parseFloat(a.longitude)
        )
        const distanceB = distance(
          parseFloat(b.latitude),
          parseFloat(b.longitude)
        )
        return distanceA - distanceB
      })
      if (merchantSort?.length > 0) {
        for (let i = 0; i < 10; i++) {
          setNearestMerchants((prevState) => [...prevState, merchantSort[i]])
        }
      }
    },
    [distance]
  )

  useEffect(() => {
    if (data?.length > 0 && locationIds.lat) {
      sortMerchants(data)
    }
  }, [data, sortMerchants, locationIds])

  useEffect(() => {
    if (!userData?.guid) return

    fetchBonus()
    getOrders({
      data: {
        userId: userData?.guid,
        lease_orders: true,
        limit: 100,
        page: 1,
      },
    })
      .then((res) => {
        if (res.data?.data?.data?.response == null) {
          dispatch(
            orderDetailsActions?.setOrderDetails({
              userID: userData?.guid,
              orders: [],
            })
          )
        }

        dispatch(userDataActions?.setUserDebt(res.data?.data?.data?.in_debt))

        // this is used because we need to append not set
        let existingOrders =
          orderData?.userID != userData?.guid ? orderData?.orders : []

        res.data?.data?.data?.response?.forEach((ord) => {
          if (ord?.status_name == "In The Lease") {
            existingOrders.push(ord)
          }
        })
        dispatch(
          orderDetailsActions?.setOrderDetails({
            userID: userData.guid,
            orders: existingOrders,
          })
        )
      })
      .catch((err) => {
        console.log("order list err", err) // log
      })
  }, [userData])

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

  const changeTheme = () => {
    const current = document.documentElement.getAttribute("data-theme")
    document.documentElement.setAttribute(
      "data-theme",
      current === "dark" ? "light" : "dark"
    )
  }

  return (
    <div style={{ position: "relative" }}>
      {!data && <FullScreenSpinner />}
      <div className={styles.headerNav}>
        <div
          className={`${styles.openSidebar} cursor-pointer`}
          onClick={() => setMenuVisible(true)}
        >
          <MenuIcon />
        </div>
        <div className={styles.theme_change} onClick={changeTheme}></div>
        {/* <div className={styles.openFilter} onClick={() => navigate("/filter")}>
          <FilterIcon />
          <div className={filterId ? styles.circle : styles.hidden}></div>
        </div> */}
      </div>
      {isOpen && <MapPopup selectedBranch={selectedBranch} setOpen={setOpen} />}
      <AnimatePresence>
        {menuVisible && (
          <motion.div
            initial="initial"
            animate="visible"
            variants={variants}
            transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
            exit={{ y: "50%", opacity: 0, transition: { duration: 0.1 } }}
            style={{
              zIndex: 1001,
              position: "absolute",
              width: "100%",
              backgroundColor: getElement === "dark" ? "#242429" : "#fff",
              height: "100vh",
              overflow: "hidden",
            }}
            onTransitionEnd={() => setMenuVisible(false)}
          >
            <div className={styles.menu}>
              <div className={styles.menuHeader}>
                <button
                  className={styles.xIcon}
                  onClick={() => setMenuVisible(false)}
                >
                  {getElement === "dark" ? <XWhiteIcon /> : <XDarkIcon />}
                </button>
                <div
                  className={styles.bonus}
                  onClick={() => navigate("/uz/bonuses")}
                >
                  {starIcon()} {bonus}
                </div>
              </div>
              <div className={styles.menuWrap}>
                {menuItems.map((item) => (
                  <div
                    key={item.text}
                    className={styles.menuItem}
                    onClick={() => navigate(item.route)}
                  >
                    <div className={styles.menuIcon}>{item.icon}</div>
                    <p className={styles.menuText}>{t(item.text)}</p>
                  </div>
                ))}

                <div className={styles.downloadApp}>
                  <p
                    onClick={() => {
                      dispatch(
                        userDataActions.setUserData({
                          ...userData,
                          token: "token-poken",
                        })
                      )
                    }}
                  >
                    {t("download_app")}
                  </p>
                  <div className={styles.apps}>
                    <div
                      onClick={() =>
                        window.open(
                          "https://apps.apple.com/us/app/q-watt-powerbank-sharing/id6444178516",
                          "_blank"
                        )
                      }
                    >
                      <AppStoreIcon />
                    </div>
                    <div
                      onClick={() => {
                        window.open(
                          "https://play.google.com/store/apps/details?id=com.q.watt",
                          "_blank"
                        )
                      }}
                    >
                      <PlayMarketIcon />
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <YMaps
        query={{
          apikey: "3a5e488d-cfcc-485f-8a89-4b6d4123730c",
          load: "util.bounds",
        }}
      >
        <Map
          onClick={() => setOpen(() => false)}
          defaultState={{
            center: [41.312278, 69.28236],
            zoom: 10,
            controls: [],
          }}
          width={"100%"}
          height={"100vh"}
          instanceRef={mapRef}
          // onLoad={(ymaps) => setYmaps(ymaps)}
          options={{
            suppressMapOpenBlock: true,
            controls: [],
          }}
        >
          <GeolocationControl
            options={{
              position: {
                bottom: "calc(50vh - 52px)",
                right: 16,
              },
              size: "40px",
            }}
          />
          <Clusterer
            options={{
              // preset: "islands#lightBlueClusterIcons'",
              color: "black",
              groupByCoordinates: true,
              clusterDisableClickZoom: true,
              clusterHideIconOnBalloonOpen: true,
              geoObjectHideIconOnBalloonOpen: true,
              clusterIconContentLayout: null,
            }}
          >
            {data?.map((branch, i) => (
              <Placemark
                key={i}
                geometry={[branch.latitude, branch.longitude]}
                onClick={() => {
                  setSelectedBranch(branch)
                  mapRef.current?.setCenter(
                    [branch.latitude, branch.longitude],
                    15,
                    {
                      duration: 700,
                      // checkZoomRange: true,
                    }
                  )
                  setOpen((p) => !p)
                }}
                options={{
                  iconLayout: "default#image",
                  iconImageHref: img,
                  iconImageSize: [50, 50],
                  iconImageOffset: [-30, -30],
                }}
                properties={{
                  iconCaption: branch.name,
                }}
              />
            ))}
          </Clusterer>

          <ZoomControl
            options={{
              position: {
                bottom: "50vh",
                right: 16,
              },
              size: "40px",
              marginBottom: "50%",
              width: "40px",
              height: "40px",
              cornerRadius: "50%",
            }}
          />
        </Map>
      </YMaps>

      {orderData?.userID == userData?.guid && <OrderInfo />}
      <ErrorAlert
        openAlert={isErrorAlertOpen}
        setOpenAlert={setErrorAlertOpen}
      />

      <CloseLocation
        nearestMerchants={nearestMerchants}
        distance={distance}
        mapRef={mapRef}
        setOpen={setOpen}
        setSelectedBranch={setSelectedBranch}
      />
    </div>
  )
}

export default MainMap
