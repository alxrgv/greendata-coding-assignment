import React from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow as MUITableRow,
  Paper,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";

import type { WithoutChildren } from "types/children";

import { useSelector } from "store";
import { mainTableConfig } from "./config";
import { TableRow } from "./TableRow";
import { selectAllEmployees } from "store/features/employees";

const useStyles = makeStyles(() => ({
  listContainer: {
    maxHeight: "100%",
    overflow: "auto",
  },
}));

function EmployeesList(props: WithoutChildren) {
  const classes = useStyles();
  const employees = useSelector((state) => selectAllEmployees(state.employees));

  return (
    <Paper className={classes.listContainer}>
      <MUITable stickyHeader>
        <TableHead>
          <MUITableRow>
            <TableCell />
            {mainTableConfig.map((cell) => (
              <TableCell key={cell.key} align={cell.titleAlign}>
                {cell.title}
              </TableCell>
            ))}
          </MUITableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} data={employee} />
          ))}
        </TableBody>
      </MUITable>
      {employees.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          padding={10}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Typography variant="h5">Нет данных для отображения</Typography>
        </Box>
      )}
    </Paper>
  );
}

EmployeesList.whyDidYouRender = true;

export { EmployeesList };
