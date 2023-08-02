import React, { useEffect, useState, useRef, useHistory } from "react";
import NestedGrid from "../grid";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Question = (data) => {
  console.log(data);

  return <div>{NestedGrid(data)}</div>;
};

export default Question;
