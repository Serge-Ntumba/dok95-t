import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import "./Modal.css";

const ShowModal = ({ setOpenModal, setCloseModal }) => {
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    const key = "b448a501ba7b473cbe6103821211410";
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${key}&q=yekaterinburg&aqi=no`
    )
      .then((results) => results.json())
      .then((data) => {
        const { temp_c } = data.current;
        setTemp(temp_c);
      });
  }, []);

  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setCloseModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1> Погода в Екатеринбург:</h1>
          </div>
          <div className="body">
            <p>{temp} °C</p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setCloseModal(false);
              }}
              id="cancelBtn"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ShowModal;
