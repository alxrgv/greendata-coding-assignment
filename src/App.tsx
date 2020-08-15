import React from "react";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import { ru } from "date-fns/locale";
import { Provider } from "react-redux";
import { Grid, makeStyles } from "@material-ui/core";
import { LocalizationProvider } from "@material-ui/pickers";

import type { WithoutChildren } from "types/children";

import { RandomizeButton } from "components/RandomizeButton";
import { AppHeader } from "components/AppHeader";
import { EmployeesList } from "components/EmployeesList";
import { EmployeeInformation } from "components/EmployeeInformation";

import { store } from "./store";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    maxHeight: "80%",
    "& > :first-child": {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    "& > :last-child": {
      paddingRight: theme.spacing(2),
    },
  },
  employeeListItem: {
    maxHeight: "100%",
  },
  bottomGutter: {
    "& > :first-child": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function App(props: WithoutChildren) {
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils} locale={ru}>
      <Provider store={store}>
        <AppHeader />
        <Grid className={classes.container} container>
          <Grid className={classes.employeeListItem} item xs={12} sm={8}>
            <EmployeesList />
          </Grid>
          <Grid className={classes.bottomGutter} item xs={12} sm={4}>
            <EmployeeInformation />
          </Grid>
        </Grid>
        <RandomizeButton />
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
