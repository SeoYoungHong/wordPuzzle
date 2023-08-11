import React from "react";
import "./questionviewer.css";

const Pdfviewer = (props) => {
  console.log(props)
  return (
    <body style={{ height: 3000 }}>
      <div style={{ height: 30 }}></div>
      <div
        style={{
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <div
          style={{
            width: "90%",
            height: 70,
            borderWidth: 1,
            color: "black",
            borderStyle: "solid",
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <div style={{ fontSize: 30 }}>{props.header}{props.data['start']}에서{props.data['end']}중{props.data['choose']}개</div> */}
          <div style={{ fontSize: 30 }}>{props.header}</div>
        </div>
      </div>
      <div style={{ height: 20 }}></div>
      <div
        style={{
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "90%",
            height: 50,
            borderWidth: 1,
            color: "black",
            borderStyle: "solid",
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ width: "40%", textAlign: "start", fontSize: 30 }}>
            time:
          </div>
          <div style={{ width: "40%", textAlign: "start", fontSize: 30 }}>
            score:
          </div>
        </div>
      </div>

      <div
        style={{
          alignContent: "center",
          paddingTop: 50,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: 1900,
        }}
      >
        {props.cwp}
      </div>
      <br></br>
      <div
        style={{
          alignContent: "center",
          padding: 10,
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {props.hint}
      </div>
      <footer>
        <div style={{
          fontSize:30,
          height:2500,
          marginTop:100
            }}>
        {props.page+1}/ {props.total}
        </div>
        </footer>
      {/* <footer>
        <div style={{ height: 30 }}></div>
        <div
          style={{
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <div
            style={{
              width: "90%",
              height: 70,
              borderWidth: 1,
              color: "black",
              borderStyle: "solid",
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 30 }}>footer자리</div>
          </div>
        </div>
      </footer> */}
    </body>
  );
};

export default Pdfviewer;
