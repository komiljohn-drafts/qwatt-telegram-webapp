import { useState, useRef, useEffect } from "react";
import { Fab, TextareaAutosize } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
// import QrScan from "react-qr-reader";
import { QrReader } from "react-qr-reader";
import { useTorchLight } from "@blackbox-vision/use-torch-light";
import styles from "./style.module.scss";

export default function QRScanner() {
  const [qrscan, setQrscan] = useState(null);
  //   const handleScan = (data) => {
  //     if (data) {
  //       setQrscan(data);
  //     }
  //   };
  //   const handleError = (err) => {
  //     console.error(err);
  //   };
  ////
  // useEffect(() => {
  //   if (!!qrscan) {
  //     const timeout = setTimeout(() => {
  //       // 👇️ redirects to an external URL
  //       window.location.replace(qrscan);
  //     }, 1000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [qrscan]);
  const streamRef = useRef(null);

  return (
    <div>
      {/* <Link to="/">
        <Fab style={{ marginRight: 10 }} color="primary">
          <ArrowBack />
        </Fab>
      </Link> */}

      <QrReader
        constraints={{ facingMode: "environment" }}
        className={styles.reader}
        onResult={(result, error) => {
          if (!!result) {
            setQrscan(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
}
