import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FormRow({ row }) {
  
  return (
    <React.Fragment>
      {[...row].map((e) => {
        return (
          <Grid item xs={0.7}>
            {console.log(e)}
            <Item>{e==undefined?'----':e['letter']}</Item>
          </Grid>
        );
      })}
    </React.Fragment>
  );
}

export default function NestedGrid(list) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {list.map((row) => {
          
          return (
            <Grid container item spacing={1}>
              <FormRow row={row}></FormRow>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
