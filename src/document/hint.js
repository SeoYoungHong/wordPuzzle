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
      <Grid item style={{ color: "black", width:"45%", margin:10, padding:20}}>
        <div
          style={{
            borderWidth: 1,
            color: "black",
            borderStyle: "solid",
          }}
        ><br></br>
          <div>가로</div>
          <br></br>
          <div style={{ columns: 2, padding:20 }}>
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

      <Grid  style={{ color: "black",width:"45%", margin:10 , padding:20}}>
        <div
          style={{
            borderWidth: 1,
            color: "black",
            borderStyle: "solid",
          }}
        ><br></br>
          <div>세로</div>
          <br></br>
          <div style={{ columns: 2, padding:20 }}>
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
    <div style={{width:'100%'}}>
      <Grid container spacing={1}>
        <Grid container item spacing={1} style={{display:'flex', 'justifyContent':'center'}}>
          <FormRow data={data}></FormRow>
        </Grid>
      </Grid>
    </div>
  );
}
// export default Hint;
