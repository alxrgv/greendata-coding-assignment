import React from "react";
import { useDispatch } from "react-redux";
import {
  makeStyles,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Card,
  CardHeader,
  Divider,
} from "@material-ui/core";

import type { WithoutChildren } from "types/children";

import { useSelector } from "store";
import { updatePendingEmployeeAction } from "./state";
import {
  updateEmployeeAction,
  selectedEmployeeSelector,
  selectAllDenormalizedEmployees,
} from "store/features/employees";
import { ColleagueState, EMPTY_EMPLOYEE } from "store/models";
import { TabPanel } from "./TabPanel";
import { useEmployeeInformation } from "./context";

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    textAlign: "center",
  },
  list: {
    width: "100%",
    overflow: "auto",
    flex: 1,
  },
}));

function ColleaguesTab(props: WithoutChildren) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { pendingEmployee, dispatch: localDispatch } = useEmployeeInformation();

  const selectedEmployee = useSelector((state) =>
    selectedEmployeeSelector(state.employees)
  )!;

  const employees = useSelector((state) =>
    selectAllDenormalizedEmployees(state)
  );

  const employeesCount = employees.length;
  const isEditingSelectedEmployee = selectedEmployee !== EMPTY_EMPLOYEE;
  const employee = isEditingSelectedEmployee
    ? selectedEmployee
    : pendingEmployee;

  return (
    <TabPanel name="employeeColleagues">
      <Card className={classes.card} elevation={0}>
        {employeesCount > 0 ? (
          <>
            <CardHeader
              className={classes.cardHeader}
              subheader={`${employee.colleagues.length} / ${employeesCount}`}
            />
            <Divider />
            <List className={classes.list}>
              {employees.map(({ fullname, position, id: colleagueId }) => {
                return (
                  <ListItem key={colleagueId} component="li">
                    <ListItemIcon>
                      <Checkbox
                        disableRipple
                        checked={
                          employee.colleagues.indexOf(colleagueId) !== -1
                        }
                        onChange={({ target: { checked } }) => {
                          isEditingSelectedEmployee
                            ? dispatch(
                                updateEmployeeAction({
                                  id: selectedEmployee!.id,
                                  changes: {
                                    colleagues: {
                                      id: colleagueId,
                                      state: checked
                                        ? ColleagueState.Added
                                        : ColleagueState.Removed,
                                    },
                                  },
                                })
                              )
                            : localDispatch(
                                updatePendingEmployeeAction({
                                  changes: {
                                    colleagues: {
                                      id: colleagueId,
                                      state: checked
                                        ? ColleagueState.Added
                                        : ColleagueState.Removed,
                                    },
                                  },
                                })
                              );
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={fullname} secondary={position} />
                  </ListItem>
                );
              })}
            </List>
          </>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Typography variant="h5">Нет данных для отображения</Typography>
          </Box>
        )}
      </Card>
    </TabPanel>
  );
}

export { ColleaguesTab };
