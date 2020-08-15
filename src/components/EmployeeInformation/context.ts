import { createContext, useContext } from "react";

import type { Dispatch } from "react";
import type { EmployeeEntity } from "store/models";

import { EMPTY_EMPLOYEE } from "store/models";

export type EmployeeInformationTabPanelPossibleValues =
  | "employeeInfo"
  | "employeeColleagues";

interface EmployeeInformationContext {
  pendingEmployee: EmployeeEntity;
  currentTab: EmployeeInformationTabPanelPossibleValues;
  dispatch: Dispatch<any>;
}

const initialState: EmployeeInformationContext = {
  currentTab: "employeeInfo",
  pendingEmployee: EMPTY_EMPLOYEE,
  dispatch: () => {},
};

const EmployeeInformationContext = createContext(initialState);

function useEmployeeInformation(): EmployeeInformationContext {
  return useContext(EmployeeInformationContext);
}

export { EmployeeInformationContext, useEmployeeInformation };
