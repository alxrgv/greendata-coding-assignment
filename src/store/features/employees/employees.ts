import { nanoid } from "nanoid";
import {
  createAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import type { Update } from "@reduxjs/toolkit";
import type { EmployeeEntity, EmployeeId } from "store/models";

import { ColleagueState } from "store/models";

export const employeeAdapter = createEntityAdapter<EmployeeEntity>({
  sortComparer: (a, b) => a.fullname.localeCompare(b.fullname),
});

export const createEmployeeAction = createAction(
  "employee/add",
  (employee: EmployeeEntity) => ({
    payload: ({
      ...employee,
      ...(employee.id === "" && { id: nanoid() }),
    } as any) as EmployeeEntity,
  })
);
export const createManyEmployeeAction = createAction<EmployeeEntity[]>(
  "employee/addMany"
);
export const removeEmployeeAction = createAction<EmployeeId>("employee/remove");

export type ColleaguesUpdate = {
  colleagues: {
    id: EmployeeId;
    state: ColleagueState;
  };
};
export type EmployeeWithoutColleagues = Omit<EmployeeEntity, "colleagues">;
export type EmployeeUpdate =
  | Update<EmployeeWithoutColleagues>
  | Update<ColleaguesUpdate>;
export const updateEmployeeAction = createAction<EmployeeUpdate>(
  "employee/update"
);
export const markEmployeeIdAsSelectedAction = createAction<
  EmployeeId | EmployeeEntity
>("employee/select");

export const { reducer } = createSlice({
  name: "employees",
  initialState: {
    ...employeeAdapter.getInitialState({
      selectedEmployeeId: "",
    }),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployeeAction, (state, { payload }) => {
        employeeAdapter.addOne(state, payload);

        state.selectedEmployeeId = payload.id;
      })
      .addCase(createManyEmployeeAction, (state, { payload }) => {
        employeeAdapter.addMany(state, payload);
      })
      .addCase(removeEmployeeAction, (state, { payload }) => {
        state.selectedEmployeeId = "";

        // remove all entries pointing to employee
        // eslint-disable-next-line array-callback-return
        Object.keys(state.entities).map((entityKey) => {
          const entity = state.entities[entityKey]!;

          const filteredColleagues = entity.colleagues.filter(
            (id) => id !== payload
          );

          if (filteredColleagues.length !== entity.colleagues.length) {
            entity.colleagues = filteredColleagues;
          }
        });

        employeeAdapter.removeOne(state, payload);
      })
      .addCase(updateEmployeeAction, (state, { payload }) => {
        const { id, changes } = payload;

        if ("colleagues" in changes) {
          const {
            id: colleagueId,
            state: colleagueState,
          } = changes.colleagues!;

          if (colleagueState === ColleagueState.Added) {
            state.entities[id]!.colleagues.push(colleagueId);
          } else {
            state.entities[id]!.colleagues = state.entities[
              id
            ]!.colleagues.filter((id) => id !== colleagueId);
          }
        } else {
          employeeAdapter.updateOne(
            state,
            payload as Update<EmployeeWithoutColleagues>
          );
        }
      })
      .addCase(markEmployeeIdAsSelectedAction, (state, { payload }) => {
        if (typeof payload === "string") {
          state.selectedEmployeeId = payload;
        } else {
          state.selectedEmployeeId = payload.id;
        }
      });
  },
});

export type EmployeeSliceReducer = typeof reducer;
