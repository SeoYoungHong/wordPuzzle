import React, { useEffect, useState, useRef, useHistory } from "react";
import NestedGrid2 from "../grid2";

const Question = (data) => {

  return <div style={{justifyContent:'center', textAlign:'center'}}>{NestedGrid2(data)}</div>;
};

export default Question;
