import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
// const Hint = (data) => {
//   return (
//     <Box sx={{ flexGrow: 0 }}>
//       <Grid container spacing={0}>
//         <Grid container item spacing={0}>
//           <React.Fragment>
//             <Grid item xs={0} style={{ color: "black" }}>
//               <div>가로</div>
//               {data["hor"].map((e) => {
//                 return (
//                   <div style={{ color: "black" }}>
//                     {e["num"]} {e["wordStr"]}
//                   </div>
//                 );
//               })}
//             </Grid>

//             <Grid item xs={0} style={{ color: "black" }}>
//               <div>세로</div>
//               {data["ver"].map((e) => {
//                 console.log(e);
//                 return (
//                   <div style={{ color: "black" }}>
//                     {e["num"]} {e["wordStr"]}
//                   </div>
//                 );
//               })}
//             </Grid>
//           </React.Fragment>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
function FormRow({ data }) {
  return (
    <React.Fragment>
      <Grid item xs={5} style={{ color: "black" }}>
        <div
          style={{
            borderWidth: 1,
            color: "black",
            borderStyle: "solid",
          }}
        >
          <div>가로</div>
          <br></br>
          <div style={{ columns: 2 }}>
            {data["hor"].map((e) => {
              return (
                <div style={{ color: "black" }}>
                  {e["num"]}. {e["wordStr"]}
                </div>
              );
            })}
          </div>
        </div>
      </Grid>

      <Grid item xs={5} style={{ color: "black" }}>
        <div
          style={{
            borderWidth: 1,
            color: "black",
            borderStyle: "solid",
          }}
        >
          <div>세로</div>
          <br></br>
          <div style={{ columns: 2 }}>
            {data["ver"].map((e) => {
              return (
                <div style={{ color: "black" }}>
                  {e["num"]} {e["wordStr"]}
                </div>
              );
            })}
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
}

export default function Hint(data) {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={1}>
          <FormRow data={data}></FormRow>
        </Grid>
      </Grid>
    </Box>
  );
}
// export default Hint;