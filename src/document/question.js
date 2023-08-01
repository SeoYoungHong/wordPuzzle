import React, { useEffect, useState, useRef, useHistory } from "react";
import NestedGrid from "../grid";

const QuestionViewer = (data) => {
  console.log(data);
  

  return <body>{NestedGrid(data)}</body>;
};

export default QuestionViewer;
