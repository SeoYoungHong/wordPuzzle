import React from "react";
import "./questionviewer.css";

const Pdfviewer = (props) => {
  console.log(props);
  return (
    <div >
      <div style={{alignContent:'center', padding:50, justifyContent:'center', display: 'flex', flexDirection:'column', alignItems:'center'}}>{props.cwp}</div>
      <br></br>
      <div style={{alignContent:'center', padding:50, justifyContent:'center', display: 'flex', flexDirection:'row', alignItems:'center'}}>{props.hint}</div>
    </div>
  );
};

export default Pdfviewer;
