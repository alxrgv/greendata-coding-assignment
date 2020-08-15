import React from "react";
import { useSelector, useDispatch } from "react-redux";
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

import type { StoreState } from "store";
import type { Employee, EmployeeEntity } from "store/models";
import type { WithoutChildren } from "types/children";

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

  const selectedEmployee = useSelector<StoreState>((state) =>
    selectedEmployeeSelector(state.employees)
  ) as EmployeeEntity;

  const employees = useSelector<StoreState>((state) =>
    selectAllDenormalizedEmployees(state)
  ) as Employee[];

  const employeesCount = employees.length;
  const isEditingSelectedEmployee = selectedEmployee !== EMPTY_EMPLOYEE;

  return (
    <TabPanel name="employeeColleagues">
      <Card className={classes.card} elevation={0}>
        {employeesCount > 0 ? (
          <>
            <CardHeader
              className={classes.cardHeader}
              subheader={`${selectedEmployee.colleagues.length} / ${employeesCount}`}
            />
            <Divider />
            <List className={classes.list}>
              {employees.map(({ fullname, position, id: colleagueId }) => {
                const employee = isEditingSelectedEmployee
                  ? selectedEmployee
                  : pendingEmployee;
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
                                  id: selectedEmployee.id,
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
