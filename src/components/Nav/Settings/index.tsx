import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import {
  isStaticBackground,
  setVolume,
  setShortBreakDuration,
  setLongBreakDuration,
} from "../../../actions/settings";
import "./Settings.css";
// @ts-ignore
import alarm from "../../../sounds/alarm.wav";
Modal.setAppElement("#root");

const customStyles: Modal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(71, 71, 71, 0.911)",
    zIndex: 1000,
  },
  content: {
    top: "300px",
    left: "50%",
    right: "100px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#242424",
    color: "var(--gainsboro)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    maxWidth: "800px",
  },
};
const alarmSound = new Audio(alarm);

const Settings = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settingsReducer);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  function handleChangeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setVolume(Number(e.target.value) / 100));
  }
  function handleClickUseStaticBackground(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (e.target.checked === true) {
      dispatch(isStaticBackground(true));
      return;
    }
    dispatch(isStaticBackground(false));
  }
  function handleClickTestVolume(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    alarmSound.volume = settings.volume;
    alarmSound.play();
  }
  function handleChangeShortBreakDuration(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    dispatch(setShortBreakDuration(Number(e.target.value)));
  }
  function handleChangeLongBreakDuration(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    dispatch(setLongBreakDuration(Number(e.target.value)));
  }
  return (
    <>
      <button
        data-tip="Settings"
        data-delay-show="1000"
        className="settings-button"
        onClick={openModal}
      >
        <i className="fas fa-cog"></i>
      </button>
      <ReactTooltip disable={isMobile} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-top">
          <h2>Settings</h2>
          <button onClick={closeModal} className="modal-close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form className="settings-form">
          <label htmlFor="volume">Alarm volume</label>
          <div className="volume-wrapper">
            <input
              type="range"
              min="0"
              max="100"
              name="volume"
              value={settings.volume * 100}
              className="volume-slider"
              onChange={(e) => handleChangeVolume(e)}
            />
            <button
              className="test-volume-button"
              onClick={(e) => handleClickTestVolume(e)}
            >
              <i className="fas fa-play"></i>
            </button>
          </div>
          <div className="options-wrapper">
            <label htmlFor="short-break-time">Short break time (minutes)</label>
            <input
              type="number"
              name="short-break-time"
              min="1"
              max="15"
              value={settings.shortBreakDuration}
              onChange={(e) => handleChangeShortBreakDuration(e)}
              className="short-break-time-input"
            />
          </div>
          <div className="options-wrapper">
            <label htmlFor="long-break-time">Long break time (minutes)</label>
            <input
              type="number"
              name="long-break-time"
              min="1"
              max="60"
              value={settings.longBreakDuration}
              onChange={(e) => handleChangeLongBreakDuration(e)}
              className="long-break-time-input"
            />
          </div>
          <div className="options-wrapper">
            <label htmlFor="enable-static-background">
              Use static background when timer is running
            </label>
            <input
              type="checkbox"
              name="enable-static-background"
              className="enable-static-bg-checkbox"
              checked={settings.staticBackground}
              onChange={(e) => handleClickUseStaticBackground(e)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Settings;
