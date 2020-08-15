import { createAction, createReducer } from "@reduxjs/toolkit";

import type { EmployeeUpdate } from "store/features/employees";

import { ColleagueState } from "store/models";
import { EMPTY_EMPLOYEE } from "store/models";

export const clearPendingEmployeeAction = createAction("pendingEmployee/clear");
export const updatePendingEmployeeAction = createAction<
  Omit<EmployeeUpdate, "id">
>("pendingEmployee/update");

export const employeeInfoReducer = createReducer(EMPTY_EMPLOYEE, (builder) => {
  builder
    .addCase(clearPendingEmployeeAction, (state) => {
      Object.assign(state, EMPTY_EMPLOYEE);
    })
    .addCase(updatePendingEmployeeAction, (state, { payload }) => {
      const { changes } = payload;

      if ("colleagues" in changes) {
        const { id: colleagueId, state: colleagueState } = changes.colleagues!;

        if (colleagueState === ColleagueState.Added) {
          state.colleagues.push(colleagueId);
        } else {
          state.colleagues = state.colleagues.filter(
            (id) => id !== colleagueId
          );
        }
      } else {
        Object.assign(state, changes);
      }
    });
});
