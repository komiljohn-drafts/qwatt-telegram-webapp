import {
  BlurIcon,
  CancelIcon,
  DrawIcon,
  DrawRectangleIcon,
  MarkerIcon,
  MessageIcon,
  TextIcon,
} from "./icons";
import { CircularProgress, Dialog, Popover } from "@mui/material";
import {
  createSubtask,
  createSubtaskFile,
  createSubtaskItem,
  uploadFile,
} from "./services/task";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

import CanvasDraw from "@win11react/react-canvas-draw";
import { DataURIToBlob } from "./utils/convertBase64";
import PropTypes from "prop-types";
import classNames from "classnames";
import html2canvas from "html2canvas";
import styles from "./style.module.scss";

export default function ScreenCaptureContainer({ children }) {
  const [open, setOpen] = useState(false);
  const canvasRef = useRef();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [tool, setTool] = useState("");
  const [image, setImage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const handleClickEditor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEditor = () => {
    setAnchorEl(null);
  };

  const openEditor = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const createNewTask = async () => {
    const canvas = await html2canvas(canvasRef.current.canvasContainer);
    var base64 = canvas.toDataURL("image/png");
    const file = DataURIToBlob(base64);
    const formData = new FormData();
    formData.append("file", file, "image.png");
    setLoading(true);
    try {
      const uploadRes = await uploadFile(formData);
      const result = await createSubtask({
        description: text,
        title,
      });
      await createSubtaskItem({
        ...result.data.data,
      });
      const subtaskFile = await createSubtaskFile(
        { ...uploadRes.data.data },
        result.data.data.id
      );
      if (subtaskFile.status === 201) {
        toast.success("Successfully!");
        canvasRef.current.clear();
      }
    } catch (e) {
      toast.error("Error!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const callback = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.code === "KeyF"
      ) {
        html2canvas(document.body, {
          x: window.scrollX,
          y: window.scrollY,
          width: window.innerWidth,
          height: window.innerHeight,
        }).then((canvas) => {
          setOpen(true);
          setImage(canvas.toDataURL("image/png"));
          // let a = document.createElement('a')
          // a.download = 'ss.png'
          // a.href = canvas.toDataURL('image/png')
          // a.click() // MAY NOT ALWAYS WORK!
        });
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {children}
      <Dialog onClose={handleClose} open={open} keepMounted>
        <div className={styles.modal}>
          <div className={styles.close} onClick={handleClose}>
            <CancelIcon />
          </div>
          <div
            className={classNames(styles.canvas, {
              [styles.isPencil]: tool === "pencil",
            })}
          >
            <CanvasDraw
              brushRadius={2}
              imgSrc={image}
              canvasWidth="80%"
              canvasHeight="100%"
              hideGrid={true}
              disabled={disabled}
              brushColor="#e20613"
              hideInterface={{
                grid: false,
                interface: true,
              }}
              ref={canvasRef}
            />
          </div>

          <div className={styles.tools}>
            <div className={styles.item}>
              <TextIcon />
            </div>
            <div
              className={classNames(styles.item, {
                [styles.active]: tool === "pencil",
              })}
              onClick={() => {
                setDisabled(false);
                setTool("pencil");
              }}
            >
              <MarkerIcon />
            </div>
            <div className={styles.item}>
              <DrawIcon />
            </div>
            <div className={styles.item}>
              <DrawRectangleIcon />
            </div>
            <div className={styles.item}>
              <BlurIcon />
            </div>
            <div
              className={classNames(styles.item, {
                [styles.active]: tool === "description",
              })}
              onClick={(e) => {
                setDisabled(true);
                setTool("description");
                handleClickEditor(e);
              }}
            >
              <MessageIcon />
              {text && <div className={styles.visible} />}
            </div>
            <button onClick={createNewTask}>
              {loading ? (
                <CircularProgress color="inherit" size={15} />
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </Dialog>
      <Popover
        id={id}
        open={openEditor}
        anchorEl={anchorEl}
        onClose={handleCloseEditor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{ horizontal: 320, vertical: 220 }}
      >
        <div className={styles.box}>
          <div className={styles.input}>
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className={styles.input}>
            <label>Description</label>
            <textarea
              className={styles.editor}
              value={text}
              rows={10}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
        </div>
      </Popover>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

ScreenCaptureContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
