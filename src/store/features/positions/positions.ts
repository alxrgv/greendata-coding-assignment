import { nanoid } from "nanoid";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { EmployeePositionEntity } from "store/models";

import { positions } from "store/initial";

const positionsInitialState: {
  ids: number[];
  entities: string[];
} = positions.reduce(
  (acc, value) => {
    const id = nanoid();

    acc.entities[id] = { id, value };
    acc.ids.push(id);

    return acc;
  },
  { ids: [], entities: {} }
);

export const positionsAdapter = createEntityAdapter<EmployeePositionEntity>({
  sortComparer: (a, b) => a.value.localeCompare(b.value),
});

export const { reducer } = createSlice({
  name: "positions",
  initialState: positionsAdapter.getInitialState({
    ...positionsInitialState,
  }),
  reducers: {},
});

export type PositionsReducer = typeof reducer;
