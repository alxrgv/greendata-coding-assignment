import { format, isDate } from "date-fns";
import { ru } from "date-fns/locale";

import type { ReactNode } from "react";
import type { TableCellProps } from "@material-ui/core";
import type { Employee } from "store/models";
import type { PropTypeExtractor } from "types/global";

import { Gender } from "store/models";

export interface CellConfig {
  key: string;
  title: string;
  cellAlign: TableCellProps["align"];
  titleAlign: TableCellProps["align"];
  selector: (emp: Employee) => PropTypeExtractor<Employee>;
  render: (value: any) => ReactNode;
}

const undefinedStringifiedValue = "Не указано";
export const mainTableConfig: CellConfig[] = [
  {
    key: "fullname",
    title: "ФИО",
    cellAlign: "left",
    titleAlign: "center",
    selector: (emp) => emp.fullname,
    render: (value: string) => value,
  },
  {
    key: "gender",
    title: "Пол",
    cellAlign: "right",
    titleAlign: "center",
    selector: (emp) => emp.gender,
    render: (value: Gender) => {
      if (value === Gender.Unknown) {
        return undefinedStringifiedValue;
      } else if (value === Gender.Male) {
        return "Мужской";
      } else {
        return "Женский";
      }
    },
  },
  {
    key: "position",
    title: "Должность",
    cellAlign: "right",
    titleAlign: "center",
    selector: (emp) => emp.position,
    render: (value: string) => value,
  },
  {
    key: "birthday",
    title: "Дата рождения",
    cellAlign: "right",
    titleAlign: "right",
    selector: (emp) => emp.birthday,
    render: (value: Date | null) => {
      if (isDate(value)) {
        return format(value as Date, "dd MMMM yyyy", { locale: ru });
      }

      return undefinedStringifiedValue;
    },
  },
  {
    key: "isFired",
    title: "Уволен",
    cellAlign: "center",
    titleAlign: "right",
    selector: (emp) => emp.isFired,
    render: (value: boolean) => (value ? "Да" : "Нет"),
  },
];

export const nestedTableConfig: CellConfig[] = [
  {
    key: "fullname",
    title: "ФИО",
    cellAlign: "center",
    titleAlign: "center",
    selector: (emp) => emp.fullname,
    render: (value: string) => value,
  },
  {
    key: "position",
    title: "Должность",
    cellAlign: "center",
    titleAlign: "center",
    selector: (emp) => emp.position,
    render: (value: string) => value,
  },
];
