import React, { useReducer, useState } from "react";
import { makeStyles, Typography, Paper, Tab, Tabs } from "@material-ui/core";

import type { WithoutChildren } from "types/children";
import type { EmployeeInformationTabPanelPossibleValues } from "./context";

import { employeeInfoReducer } from "./state";
import { ColleaguesTab } from "./ColleaguesTab";
import { DescriptionTab } from "./DescriptionTab";
import { EmployeeInformationContext } from "./context";
import { EMPTY_EMPLOYEE } from "store/models";
import { Controls } from "./Controls";

const minMaxHeight = "34rem";
const useStyles = makeStyles((theme) => ({
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: minMaxHeight,
    maxHeight: minMaxHeight,
    padding: theme.spacing(2),
  },
}));

const EmployeeInformationContextProvider = EmployeeInformationContext.Provider;

function EmployeeInformation(props: WithoutChildren) {
  const classes = useStyles();

  const [currentTab, setCurrentTab] = useState<
    EmployeeInformationTabPanelPossibleValues
  >("employeeInfo");

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newValue: EmployeeInformationTabPanelPossibleValues
  ) => {
    setCurrentTab(newValue);
  };

  const [pendingEmployee, dispatch] = useReducer(
    employeeInfoReducer,
    EMPTY_EMPLOYEE
  );

  const value: EmployeeInformationContext = {
    dispatch,
    currentTab,
    pendingEmployee,
  };

  return (
    <EmployeeInformationContextProvider value={value}>
      <Paper className={classes.infoContainer} elevation={1}>
        <Typography variant="h6" gutterBottom>
          Данные о сотруднике
        </Typography>
        <Tabs centered value={currentTab} onChange={handleTabChange}>
          <Tab value="employeeInfo" label="Описание" wrapped />
          <Tab value="employeeColleagues" label="Коллеги" wrapped />
        </Tabs>
        <DescriptionTab />
        <ColleaguesTab />
      </Paper>
      <Controls />
    </EmployeeInformationContextProvider>
  );
}

export { EmployeeInformation };
