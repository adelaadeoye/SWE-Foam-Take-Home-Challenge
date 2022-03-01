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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  Paper,
  Grid,
  CardActionArea,
  CardActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
export default function Gallery() {
  const authToken = localStorage.getItem("token");
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  const [open, setOpen] = useState(true);
  const [filter, setFilter] = useState("All");
  const [numberPerPage, setNumberPerPage] = useState(6);
  const [imageUrl, setImageUrl] = useState([]);
  const [filteredImage, setFilteredImage] = useState([]);
  const [user, setUser] = useState("");
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
    axios
      .get("https://us-central1-swe-foam.cloudfunctions.net/api/images")
      .then((res) => {
        setImageUrl(res.data.data);
        setUser(res.data.user);
        setOpen(false)
      })
      .catch((err) => {
        localStorage.clear();
        navigate("/");
      });
  });
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleClassification = (event, image) => {
    let newImage = imageUrl;
    let allUsers = newImage[image.id].users;
    if (
      newImage[image.id].users.filter((e) => e.email === user.email).length > 0
    ) {
      let newUser = newImage[image.id].users.filter(
        (e) => e.email === user.email
      );
      newUser[0].status = event.target.value;
      const newUserIndex = allUsers.findIndex(
        (item) => item.email === newUser[0].email
      );
      allUsers[newUserIndex] = newUser[0];
      newImage[image.id] = {
        id: image.id,
        imageKey: image.imageKey,
        users: allUsers,
      };
    } else {
      allUsers.push({
        email: user.email,
        status: event.target.value,
      });
      newImage[image.id] = {
        id: image.id,
        imageKey: image.imageKey,
        users: allUsers,
      };
    }
    setImageUrl(
      newImage.map((item) => {
        return item;
      })
    );
    axios
      .put(
        `https://us-central1-swe-foam.cloudfunctions.net/api/images/${image.id}`,
        newImage
      )
      .then((res) => {
        console.log("update successfully");
      })
      .catch((err) => {
        console.log("update error");
      });
  };

  useEffect(() => {
    let arr = [];

    imageUrl.forEach((image, index) => {
      image.users.forEach((e) => {
        if (e.email === user.email && e.status === filter) {
          arr.push(image);
        }
      });

      if (filter === "Unclassified") {
        if (!image.users.filter((e) => e.email === user.email).length > 0) {
          arr.push(image);
        }
      }
    });
    setFilteredImage(arr);
    // console.log("count1,count2", arr.length);
  }, [filter, imageUrl]);

  const getImageClass = (image) => {
    let status = "";
    image.users.forEach((item) => {
      if (item.email === user.email) {
        return (status = item.status);
      } else return status;
    });
    return status;
  };
  const handleFilterChange = () => {
    return filter === "All" ? imageUrl : filteredImage;
  };
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Paper
          sx={{
            top: 0,
            left: 0,
            zIndex: 2,
            position: "sticky",
            backgroundColor: "#fafafa",
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
        <Box sx={{ padding: "20px", marginTop: "10px",marginBottom:"5px" }}>
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
            {!!open === false &&
              imageUrl.length > 0 &&
              handleFilterChange()
                .slice((page - 1) * numberPerPage, page * numberPerPage)
                .map((image) => {
                  return (
                    <Grid item xs={12} md={4} sm={6} key={image.imageKey}>
                      <Card sx={{ maxWidth: 350 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="250"
                            image={image.imageKey}
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
                              value={getImageClass(image)}
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
              bottom: 0,
              left: 0,
              zIndex: 1,
              position: "sticky",
              backgroundColor: "#fafafa",
              padding: "5px",
              display: "flex",
              width: "100%",
              marginTop:"10px",
              marginBottom:"10px",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(handleFilterChange().length / numberPerPage)}
                shape="rounded"
                size="large"
                color="primary"
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
