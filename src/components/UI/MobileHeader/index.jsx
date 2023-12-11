import { BackIcon } from "@/screen-capture/icons"
import PropTypes from "prop-types"
import styles from "./style.module.scss"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const MobileHeader = ({ title, path, isBlueBg = false }) => {
  const navigate = useNavigate()
  const [getElement, setGetElement] = useState("")

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
    <div className={`${styles.header} ${isBlueBg ? styles.blueBg : ""}`}>
      <button
        className={styles.BackIcon}
        onClick={() => {
          if (path) {
            navigate(path)
            return
          }

          navigate(-1)
        }}
      >
        <BackIcon
          color={isBlueBg && getElement === "dark" ? "white" : "#282727"}
        />
      </button>
      <p
        className={
          isBlueBg && getElement === "dark" ? "text-white" : "text-[#282727]"
        }
      >
        {title}
      </p>
      <div></div>
    </div>
  )
}

export default MobileHeader

MobileHeader.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
}

MobileHeader.defaultProps = {
  title: "",
  path: "",
}
