import "./App.css";

import {
  Button,
  Card,
  CardMedia,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#e8e8e8",
    borderRadius: 4,
    minHeight: 600,
    minWidth: 800,
  },
  paper: {
    display: "flex",
    backgroundColor: "#f5f7f9",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  toolbar: {
    display: "inline-flex",
    flexWrap: "wrap",
    alignSelf: "center",
    padding: 10,
    gap: 12,
  },
  button: {
    minHeight: 40,
    minWidth: 90,
  },
  card: {
    margin: "auto",
  },
  media: {
    minWidth: 470,
    minHeight: 250
  }
}));

function App() {
  const classes = useStyles();
  const [comicId, setComicId] = useState(2043);
  const [loading, setLoading] = useState(true);
  const [comic, setComic] = useState(null);

  const getData = async (comicId) => {
    await fetch(`/${comicId}/info.0.json`, { mode: "cors" })
      .then((res) => res.json())
      .then((json) => {
        setComicId(json.num);
        setLoading(false);
        setComic(json);
      })
      .catch((err) => console.log("Error in fetching data", err));
  };

  useEffect(() => {
    getData(comicId);
  }, [comicId]);

  if (loading)
    return (
      <div>
        <h1> Loading... </h1>{" "}
      </div>
    );

  return (
    <Paper variant={"outlined"} elevation={0} className={classes.paper}>
      <div className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          {comic.safe_title}
        </Typography>
        <div className={classes.toolbar}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              getData(1);
            }}
          >
            <SkipPreviousOutlinedIcon />
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              if (comicId > 1) getData(comicId - 1);
            }}
          >
            <SkipPreviousOutlinedIcon />
            Prev
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              console.log(
                "random number",
                1 + Math.floor(Math.random() * 2042)
              );
              getData(1 + Math.floor(Math.random() * 2042));
            }}
          >
            RANDOM
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              if (comicId < 2043) getData(comicId + 1);
            }}
          >
            <SkipNextOutlinedIcon />
            Next
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              getData(2043);
            }}
          >
            <SkipNextOutlinedIcon />
          </Button>
        </div>

        <Card className={classes.card}>
          <Tooltip
            title={comic.alt}
            className={classes.tooltip}
            placement="bottom"
          >
            <CardMedia
              className={classes.media}
              component="img"
              image={comic.img}
            />
          </Tooltip>
        </Card>
      </div>
    </Paper>
  );
}

export default App;
