import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { mainTableConfig, nestedTableConfig } from "./config";
import type { StoreState } from "store";
import type { Employee, EmployeeId, EmployeeEntity } from "store/models";
import type { WithoutChildren } from "types/children";

import {
  markEmployeeIdAsSelectedAction,
  selectedEmployeeIdSelector,
  selectDenormalizedEmployee,
} from "store/features/employees";

const useRowStyles = makeStyles({
  root: {
    cursor: "pointer",
  },
  noGutters: {
    paddingBottom: 0,
    paddingTop: 0,
  },
});

interface TableRowProps {
  data: EmployeeEntity;
}

function TableRow({ data }: WithoutChildren<TableRowProps>) {
  const classes = useRowStyles();
  const dispatch = useDispatch();

  const currentDenormalizedEmployee = useSelector<StoreState>((state) =>
    selectDenormalizedEmployee(state, data)
  ) as Employee;

  const selectedEmployeeId = useSelector<StoreState>((state) =>
    selectedEmployeeIdSelector(state.employees)
  ) as EmployeeId;

  const [expanded, expand] = React.useState(false);

  const toggle = useCallback(() => {
    expand((expanded) => {
      if (expanded) {
        dispatch(markEmployeeIdAsSelectedAction(""));
      } else {
        dispatch(markEmployeeIdAsSelectedAction(data));
      }

      return !expanded;
    });
  }, [data, dispatch]);

  useEffect(() => {
    if (selectedEmployeeId !== data.id) {
      if (expanded) {
        expand(false);
      }
    }
  }, [data.id, expanded, selectedEmployeeId]);

  const colleaguesKeys = Object.keys(currentDenormalizedEmployee.colleagues);

  return (
    <React.Fragment>
      <MuiTableRow
        className={classes.root}
        selected={expanded}
        hover={true}
        onClick={toggle}
      >
        <TableCell>
          <IconButton size="small">
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {mainTableConfig.map((cell) => {
          const { selector, render } = cell;
          return (
            <TableCell key={cell.key} align={cell.cellAlign}>
              {render(selector(currentDenormalizedEmployee))}
            </TableCell>
          );
        })}
      </MuiTableRow>
      <MuiTableRow>
        <TableCell className={classes.noGutters} colSpan={6}>
          <Collapse in={expanded} timeout="auto">
            {expanded ? (
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Коллеги
                </Typography>
                <Table>
                  <TableHead>
                    <MuiTableRow>
                      {nestedTableConfig.map((cell) => (
                        <TableCell key={cell.key} align={cell.titleAlign}>
                          {cell.title}
                        </TableCell>
                      ))}
                    </MuiTableRow>
                  </TableHead>
                  <TableBody>
                    {colleaguesKeys.length > 0 ? (
                      colleaguesKeys.map((colleagueKey: string) => {
                        const colleague =
                          currentDenormalizedEmployee.colleagues[colleagueKey];

                        return (
                          <MuiTableRow key={colleague.id}>
                            {nestedTableConfig.map((cell) => {
                              const { selector, render } = cell;
                              return (
                                <TableCell
                                  key={cell.key}
                                  align={cell.cellAlign}
                                >
                                  {render(selector(colleague))}
                                </TableCell>
                              );
                            })}
                          </MuiTableRow>
                        );
                      })
                    ) : (
                      <MuiTableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          colSpan={2}
                          align="center"
                        >
                          Коллеги отсутствуют
                        </TableCell>
                      </MuiTableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            ) : null}
          </Collapse>
        </TableCell>
      </MuiTableRow>
    </React.Fragment>
  );
}

export { TableRow };
