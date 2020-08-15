import React from "react";
import { makeStyles } from "@material-ui/core";

import type { EmployeeInformationTabPanelPossibleValues } from "./context";
import type { WithChildren } from "types/children";

import { useEmployeeInformation } from "./context";

const useStyles = makeStyles((theme) => ({
  tabPanelContainer: {
    flex: 1,
    position: "relative",
  },
  tabPanel: {
    padding: theme.spacing(0, 0.5, 0, 0.5),
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
}));

interface TabPanelProps {
  name: EmployeeInformationTabPanelPossibleValues;
}

function TabPanel({ children, name, ...other }: WithChildren<TabPanelProps>) {
  const classes = useStyles();
  const { currentTab } = useEmployeeInformation();

  const isHidden = currentTab !== name;

  return (
    <div className={classes.tabPanelContainer} hidden={isHidden} {...other}>
      <div className={classes.tabPanel}>{children}</div>
    </div>
  );
}

export { TabPanel };
