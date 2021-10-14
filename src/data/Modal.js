// import React, { useState, useEffect } from "react";
// import "./Modal.css";

// const ShowModal = ({ setOpenModal }) => {
//   console.log(setOpenModal);
//   const [temp, setTemp] = useState(0);
//   useEffect(() => {
//     const key = "b448a501ba7b473cbe6103821211410";
//     fetch(
//       `http://api.weatherapi.com/v1/current.json?key=${key}&q=yekaterinburg&aqi=no`
//     )
//       .then((results) => results.json())
//       .then((data) => {
//         const { temp_c } = data.current;
//         setTemp(temp_c);
//       });
//   }, []);
//   return (
//     <div className="modalBackground">
//       <div className="modalContainer">
//         <div className="titleCloseBtn">
//           <button
//             onClick={() => {
//               setOpenModal(false);
//             }}
//           >
//             X
//           </button>
//         </div>
//         <div className="title">
//           <h1>Are You Sure You Want to Continue?</h1>
//         </div>
//         <div className="body">
//           <p>content</p>
//         </div>
//         <div className="footer">
//           <button
//             onClick={() => {
//               setOpenModal(false);
//             }}
//             id="cancelBtn"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShowModal;
