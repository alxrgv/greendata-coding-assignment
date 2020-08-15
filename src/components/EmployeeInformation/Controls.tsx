import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, Paper, Button, Box } from "@material-ui/core";
import clsx from "clsx";

import type { WithoutChildren } from "types/children";

import { useSelector } from "store";
import {
  updatePendingEmployeeAction,
  clearPendingEmployeeAction,
} from "./state";
import { EMPTY_ID, EMPTY_EMPLOYEE } from "store/models";
import { useEmployeeInformation } from "./context";
import {
  selectedEmployeeIdSelector,
  createEmployeeAction,
  removeEmployeeAction,
  markEmployeeIdAsSelectedAction,
} from "store/features/employees";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  box: {
    display: "flex",
    justifyContent: "space-around",
    padding: theme.spacing(2),
  },
  gutter: {
    "& > :first-child": {
      marginRight: theme.spacing(1),
    },
  },
}));

function ControlsBase(props: WithoutChildren) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedEmployeeId = useSelector((state) =>
    selectedEmployeeIdSelector(state.employees)
  );

  const { pendingEmployee, dispatch: localDispatch } = useEmployeeInformation();

  const add = () => {
    dispatch(createEmployeeAction(pendingEmployee));
    localDispatch(updatePendingEmployeeAction({ changes: EMPTY_EMPLOYEE }));
  };

  const remove = () => {
    dispatch(removeEmployeeAction(selectedEmployeeId));
  };

  const clear = () => {
    dispatch(markEmployeeIdAsSelectedAction(EMPTY_ID));
    localDispatch(clearPendingEmployeeAction());
  };

  const canCreateEmployee =
    !selectedEmployeeId &&
    pendingEmployee.fullname !== "" &&
    pendingEmployee.position.length !== 0;

  const canClear =
    selectedEmployeeId ||
    pendingEmployee.fullname !== "" ||
    pendingEmployee.position.length !== 0;

  return (
    <Paper className={classes.root}>
      <Box className={clsx(classes.box, classes.gutter)}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={add}
          disabled={!canCreateEmployee}
        >
          Добавить
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          disabled={!selectedEmployeeId}
          onClick={remove}
        >
          Удалить
        </Button>
      </Box>
      <Box className={classes.box}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={clear}
          disabled={!canClear}
        >
          Очистить
        </Button>
      </Box>
    </Paper>
  );
}

const Controls = memo(ControlsBase);

export { Controls };
