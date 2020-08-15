import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

import type { WithoutChildren } from "types/children";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
}));

function AppHeader(props: WithoutChildren) {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Список сотрудников
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export { AppHeader };
