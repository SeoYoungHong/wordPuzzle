import React, { useEffect, useState, useRef, useHistory } from "react";
import NestedGrid from "../grid";

const Question = (data) => {
  console.log(data);
  

  return <div >{NestedGrid(data)}</div>;
};

export default Question;
