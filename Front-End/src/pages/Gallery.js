/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { s3 } from "../AwsConfig";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  Paper,
  Grid,
  CardActionArea,
  CardActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default function Gallery({ props }) {
  const [open, setOpen] = useState(true);
  const [filter, setFilter] = useState("All");
  const [numberPerPage, setNumberPerPage] = useState(6);
  const [imageUrl, setImageUrl] = useState([]);
  let navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const pageChange = (event, value) => {
    setPage(value);
  };
  const handleChange = (event, type) => {
    type === "filter"
      ? setFilter(event.target.value)
      : setNumberPerPage(event.target.value);
  };
  useEffect(() => {
    s3.listObjects(
      {
        Bucket: process.env.REACT_APP_BUCKET,
      },
      function (err, res) {
        if (err) {
          console.log(err);
        } else {
          setImageUrl(
            // res.Contents.splice(0, 17).map((item,index) => {
            res.Contents.map((item, index) => {
              return { key: item.Key, status: "", id: index };
            })
          );
          setOpen(false);
        }
      }
    );
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleClassification = (event, image) => {
    setImageUrl(
      imageUrl.map((el) =>
        el.key === image.key ? { ...el, status: event.target.value } : el
      )
    );
  };
 
  useEffect(() => {
  if(filter==="Foaming"){
    setImageUrl(imageUrl.filter(image=>{return image.status==="Foaming"}) )
  }
  else if (filter==="Non-Foaming"){
    setImageUrl(imageUrl.filter(image=>{return image.status==="Non-Foaming"}) )

  }
  else if (filter==="Unclassified"){
    setImageUrl(imageUrl.filter(image=>{return image.status==="Unclassified"}) )

  }
  }, [filter])
  
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Paper
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            padding: "5px",
            height: "50px",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
          elevation={2}
        >
          <p style={{ margin: "5px" }}>Welcome</p>
          <p style={{ margin: "5px" }} onClick={() => handleLogout()}>
            Logout
          </p>
        </Paper>
        <Box sx={{ padding: "20px", marginTop: "60px" }}>
          {/* Make this Filter Component */}
          <FormControl
            sx={{
              m: 1,
              minWidth: 200,
              alignContent: "flex-end",
              alignSelf: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter"
              onChange={(event) => handleChange(event, "filter")}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Foaming"}>Foaming</MenuItem>
              <MenuItem value={"Non-Foaming"}>Non-Foaming</MenuItem>
              <MenuItem value={"Unclassified"}>Unclassified</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              m: 1,
              minWidth: 200,
              alignContent: "flex-end",
              alignSelf: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <InputLabel id="demo-simple-select-label">
              Image Per Page
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={numberPerPage}
              label="Image Per Page"
              onChange={(event) => handleChange(event, "perPage")}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            {imageUrl
              .slice((page - 1) * numberPerPage, page * numberPerPage)
              .map((image) => {
                return (
                  <Grid item xs={12} md={4} key={image.key}>
                    <Card sx={{ maxWidth: 350 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="250"
                          image={`https://${process.env.REACT_APP_BUCKET}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/${image.key}`}
                          alt="green iguana"
                         
                        />
                      </CardActionArea>
                      <CardActions>
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            Image Classification
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={image.status}
                            onChange={(event) =>
                              handleClassification(event, image)
                            }
                          >
                            <FormControlLabel
                              value="Foaming"
                              control={<Radio color="success" />}
                              label="Foaming"
                            />
                            <FormControlLabel
                              value="Non-Foaming"
                              control={<Radio color="secondary" />}
                              label="Non-Foaming"
                            />
                          </RadioGroup>
                        </FormControl>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
          {/* Make this pagination Component */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              position: "fixed",
              bottom: 10,
              left: 0,
              right: 0,
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(imageUrl.length / numberPerPage)}
                shape="rounded"
                size="large"
                defaultPage={1}
                siblingCount={5}
                boundaryCount={1}
                page={page}
                onChange={pageChange}
              />
            </Stack>
          </Box>
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>{" "}
      </Container>
    </>
  );
}
