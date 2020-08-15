import type { EntityBase } from "./EntityBase";
import type { EmployeePosition, EmployeePositionId } from "./EmployeePosition";

export type EmployeeId = string;

export enum ColleagueState {
  Added,
  Removed,
}
export enum IsFiredState {
  No,
  Yes,
}
export enum Gender {
  Male,
  Female,
  Unknown,
}

export interface Employee extends EntityBase<EmployeeId> {
  fullname: string;
  position: EmployeePosition;
  birthday: Date | null;
  gender: Gender;
  isFired: IsFiredState;
  colleagues: Record<string, Employee>;
}

export interface EmployeeEntity
  extends Omit<Employee, "position" | "colleagues"> {
  position: EmployeePositionId;
  colleagues: EmployeeId[];
}

export const EMPTY_ID = "";
export const EMPTY_COLLEAGUES = [];
export const EMPTY_EMPLOYEE: EmployeeEntity = {
  id: EMPTY_ID,
  fullname: "",
  position: "",
  birthday: null,
  gender: Gender.Unknown,
  isFired: IsFiredState.No,
  colleagues: EMPTY_COLLEAGUES,
};
