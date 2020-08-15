import type { EntityBase } from "./EntityBase";

export type EmployeePosition = string;
export type EmployeePositionId = string;

export interface EmployeePositionEntity extends EntityBase<EmployeePositionId> {
  value: EmployeePosition;
}
