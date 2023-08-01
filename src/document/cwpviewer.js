import React, { useEffect, useState, useRef, useHistory } from "react";
import NestedGrid from "../grid";

const CwpViewer=(data) =>{
    return <body >
        {NestedGrid(data)}
    </body>

}

export default CwpViewer