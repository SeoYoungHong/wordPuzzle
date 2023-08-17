import React, { useEffect, useState, useRef, useHistory } from "react";
import NestedGrid2 from "../grid2";

const CwpViewer = (data, page, total, title) => {
  return (
    <body>
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
          <div style={{ fontSize: 30 }}>{title}</div>
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
        {NestedGrid2(data)}
      </div>
      <footer>
        <div
          style={{
            fontSize: 30,
            height: 2500,
            marginTop: 100,
          }}
        >
          {page + 1}/ {total}
        </div>
      </footer>
    </body>
  );
};

export default CwpViewer;
