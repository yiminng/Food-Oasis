import React from "react";
import clsx from 'clsx';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDefaultLocation } from "hooks/location";

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  headerHolder: {
    backgroundColor: palette.primary.contrast,
    marginBottom: 0,
  },
  header: {
    minHeight: "60px",
    padding: "0 1.5em 0 0",
    [breakpoints.down("xs")]: {
      padding: "0 0.5em 0 0",
      minHeight: "45px",
    },
  },
  content: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: "90px",
    height: "60px",
    margin: "0 .5rem",
    "&:hover": {
      filter: "brightness(1.2)",
    },
    [breakpoints.down("xs")]: {
      height: "45px",
    },
  },
  tagline: {
    color: palette.text.primary,
    paddingLeft: "9px",
    lineHeight: "1.5",
  },
  italic: {
    fontStyle: "italic",
  },
}));

export default function Header() {
  const classes = useStyles();
  const defaultLocation = useDefaultLocation();

  return (
    <AppBar position="sticky" className={classes.headerHolder}>
      <Toolbar className={classes.header}>
        <div className={classes.content}>
        <Typography className={classes.tagline}>
            Food Oasis - {defaultLocation.name}
          </Typography>
          <Typography variant="subtitle1" className={clsx(classes.tagline, classes.italic)}>
            Your free food directory
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}
