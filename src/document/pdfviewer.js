import React ,{useHistory}from "react";
import NestedGrid from "../grid";
import CwpViewer from "./cwpviewer";
function PDFviewer(props) {

  const viewer = props.data.length!=0?CwpViewer(props.data[0]['cwg']['ownerMap']):null;
  return <div>
    
    {viewer}</div>;
}

export default PDFviewer;
