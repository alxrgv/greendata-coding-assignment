import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as employeeReducer } from "./features/employees";
import { reducer as positionReducer } from "./features/positions";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    positions: positionReducer,
  },
  middleware: getDefaultMiddleware({
    thunk: false,
    immutableCheck: false,
    serializableCheck: false,
  }),
});

type StoreState = ReturnType<typeof store.getState>;

export { store };
export type { StoreState };
