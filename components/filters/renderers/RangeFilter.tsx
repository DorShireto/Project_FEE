import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { max, isNumber, toNumber, isNaN } from "lodash";

export default function RangeSlider({
  subFilters,
  title,
  onFilter,
  filterName,
}: any) {
  const [ranges, setRanges] = useState([0, 0]);
  const [currentRanges, setCurrentRanges] = useState([0, 0]);

  useEffect(() => {
    const maxV = max(subFilters?.map((f: any) => f.title)) as number;
    setRanges([0, maxV]);
    setCurrentRanges([0, maxV]);
  }, [subFilters]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const { value } = e.target;
    if (validatePrice(value)) {
      let newCurrRanges = [...currentRanges];
      if (type === "min") {
        newCurrRanges[0] = +value;
      } else {
        newCurrRanges[1] = +value;
      }
      setCurrentRanges(newCurrRanges);

      onFilter({
        value: { ranges, currentRanges: newCurrRanges },
        [filterName]: true,
      });
    }
  };
  const validatePrice = (currentValue: string) => {
    const parsedNumber = toNumber(currentValue);
    return isNumber(parsedNumber) && !isNaN(parsedNumber);
  };

  return (
    <Grid container>
      <Grid item>
        <Typography fontFamily={"Lato"} sx={{ fontWeight: "bold", ml: "2vh" }}>
          {title}
        </Typography>
      </Grid>
      <Grid container item justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            value={currentRanges[0]}
            onChange={(e) => handleChange(e, "min")}
            sx={{ m: 1, width: "5ch" }}
            variant="standard"
            InputProps={{
              style: {
                fontFamily: "Lato",
              },
            }}
          />
        </Grid>
        <Grid item>
          <Typography fontFamily={"Lato"}>To:</Typography>
        </Grid>
        <Grid item>
          <TextField
            error={false}
            value={currentRanges[1]}
            onChange={(e) => handleChange(e, "max")}
            variant="standard"
            sx={{ m: 1, width: "5ch" }}
            InputProps={{
              style: {
                fontFamily: "Lato",
              },
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
