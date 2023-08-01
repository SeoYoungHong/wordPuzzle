import React, { useEffect, useState, useRef, useHistory } from "react";
import NestedGrid from "../grid";
const Hint = (data) => {
  return (
    <body>
      <div  style={{ color: "black" }}>가로</div>
      {data["hor"].map((e) => {
        return (
          <div style={{ color: "black" }}>
            {e["num"]} {e["wordStr"]}
          </div>
        );
      })}
      <div  style={{ color: "black" }}>세로</div>
      {data["ver"].map((e) => {
        console.log(e);
        return (
          <div style={{ color: "black" }}>
            {e["num"]} {e["wordStr"]}
          </div>
        );
      })}
    </body>
  );
};

export default Hint;
