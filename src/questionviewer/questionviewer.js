import React from "react";
import "./questionviewer.css";

const Pdfviewer = (props) => {
  console.log(props);
  return (
    <div style={{alignContent:'center', padding:50, justifyContent:'center'}}>
      <div style={{justifyContent:'center'}}>{props.cwp}</div>
      <br></br>
      <div>{props.hint}</div>
    </div>
  );
};

export default Pdfviewer;
