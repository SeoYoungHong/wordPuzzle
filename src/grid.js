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
          <Grid item xs={0}>
            <Item>{e==undefined?<div style={{background:'black',width:20, height:20}}></div>:<div style={{ width:20, height:20}}>{e['letter']}</div>}</Item>
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
            <Grid container item spacing={1.2}>
              <FormRow row={row}></FormRow>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
