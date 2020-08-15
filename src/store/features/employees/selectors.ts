import { createSelector, Dictionary } from "@reduxjs/toolkit";

import type { StoreState } from "store";
import type {
  EmployeeId,
  EmployeeEntity,
  EmployeePositionEntity,
} from "store/models";

import { employeeAdapter } from "./employees";
import { EMPTY_ID, EMPTY_EMPLOYEE } from "store/models";
import { reducer } from "./employees";

const selectors = employeeAdapter.getSelectors();

const getEmployeeFromProps = (store: StoreState, employee: EmployeeEntity) =>
  employee;
const employeeEntitiesSelector = (state: StoreState) =>
  state.employees.entities;
const positionEntitiesSelector = (state: StoreState) =>
  state.positions.entities;

const denormalizeEmployee = (
  emp: EmployeeEntity,
  employeeEntities: Dictionary<EmployeeEntity>,
  positionEntites: Dictionary<EmployeePositionEntity>
) => {
  const employeePosition = positionEntites[emp.position]!.value;
  const colleagues = emp.colleagues.reduce((acc, colleagueKey) => {
    const { colleagues, ...colleague } = employeeEntities[colleagueKey]!;
    const colleaguePosition = positionEntites[colleague.position]!.value;

    (acc as any)[colleagueKey] = {
      ...colleague,
      position: colleaguePosition,
    };
    return acc;
  }, {});

  return {
    ...emp,
    position: employeePosition,
    colleagues,
  };
};

export const selectDenormalizedEmployee = createSelector(
  employeeEntitiesSelector,
  positionEntitiesSelector,
  getEmployeeFromProps,
  (
    employeeEntities: Dictionary<EmployeeEntity>,
    positionEntites: Dictionary<EmployeePositionEntity>,
    employeeFromProps: EmployeeEntity
  ) => {
    return denormalizeEmployee(
      employeeFromProps,
      employeeEntities,
      positionEntites
    );
  }
);
export const selectAllDenormalizedEmployees = createSelector(
  employeeEntitiesSelector,
  positionEntitiesSelector,
  (
    employeeEntities: Dictionary<EmployeeEntity>,
    positionEntites: Dictionary<EmployeePositionEntity>
  ) => {
    return Object.keys(employeeEntities)!.map((employeeKey: EmployeeId) =>
      denormalizeEmployee(
        employeeEntities[employeeKey]!,
        employeeEntities,
        positionEntites
      )
    );
  }
);

export const isSomeoneSelectedSelector = (state: ReturnType<typeof reducer>) =>
  state.selectedEmployeeId !== EMPTY_ID;
export const selectedEmployeeSelector = (state: ReturnType<typeof reducer>) => {
  if (state.selectedEmployeeId === EMPTY_ID) {
    return EMPTY_EMPLOYEE;
  }

  return state.entities[state.selectedEmployeeId];
};
export const selectedEmployeeIdSelector = (state: ReturnType<typeof reducer>) =>
  state.selectedEmployeeId;

export const selectEmployeeById = selectors.selectById;
export const selectAllEmployees = selectors.selectAll;
export const selectTotalEmployees = selectors.selectTotal;
