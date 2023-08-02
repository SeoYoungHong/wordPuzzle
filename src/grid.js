import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
// import { color } from "html2canvas/dist/types/css/types/color";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  variant: "outlined",
  square: true,
}));

function FormRow({ row }) {
  return (
    <React.Fragment>
      {[...row].map((e) => {
        return (
          <Grid item xs={0}>
            <div
              style={{
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "#fff",
                textAlign: "center",
                fontsize: 1,
              }}
            >
              {e == undefined ? (
                <div
                  style={{
                    background: "#767676",
                    width: 35,
                    height: 35,
                    borderWidth: 1,
                    borderColor: "#767676",

                    borderStyle: "solid",
                  }}
                ></div>
              ) : (
                <div
                  style={{
                    width: 35,
                    height: 35,
                    borderWidth: 1,
                    borderColor: "black",
                    color: "black",
                    borderStyle: "solid",
                  }}
                >
                  {e["letter"] ? e["letter"] : e}
                </div>
              )}
            </div>
          </Grid>
        );
      })}
    </React.Fragment>
  );
}

export default function NestedGrid(list) {
  return (
    <div style={{display:'flex', width:'fit-content', justifyContent:'center'}}>
      <Grid container spacing={0}>
        {list.map((row) => {
          return (
            <Grid container item spacing={0} >
              <FormRow row={row}></FormRow>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
