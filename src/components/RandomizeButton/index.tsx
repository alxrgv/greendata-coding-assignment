import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab, Tooltip, makeStyles } from "@material-ui/core";
import { nanoid } from "nanoid";
import Autorenew from "@material-ui/icons/Autorenew";

import type { StoreState } from "store";
import type { EmployeePositionEntity, EmployeeEntity } from "store/models";

import { Gender, IsFiredState } from "store/models";
import { selectAllPositions } from "store/features/positions";
import { createManyEmployeeAction } from "store/features/employees";

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

function RandomizeButton() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const availablePositions = useSelector<StoreState>((state) =>
    selectAllPositions(state.positions)
  ) as EmployeePositionEntity[];

  const generateRandomEmployees = async () => {
    const Faker = await import("faker/locale/ru");

    const min = 3;
    const max = 10;
    const employeeCount = Math.floor(Math.random() * (max - min + 1) + min);

    const employees: EmployeeEntity[] = [];
    for (let index = 0; index < employeeCount; index++) {
      const sex = Faker.random.number({
        min: 0,
        max: 1,
      });
      const fullname = `${Faker.name.firstName(sex)} ${Faker.name.lastName(
        sex
      )}`;
      const position = Faker.random.arrayElement(availablePositions);
      const birthday = Faker.date.between("01/01/1950", "01/01/2002");
      const isFired = Faker.random.boolean();

      employees.push({
        id: nanoid(36),
        fullname,
        birthday,
        isFired: isFired ? IsFiredState.Yes : IsFiredState.No,
        position: position.id,
        gender: sex === 0 ? Gender.Male : Gender.Female,
        colleagues: null as any,
      });
    }

    for (let index = 0; index < employees.length; index++) {
      const employee = employees[index];

      const colleagues = employees.reduce(
        (acc: EmployeeEntity["id"][], item) => {
          if (Math.round(Math.random()) || item.id === employee.id) {
            return acc;
          }

          return acc.concat(item.id);
        },
        []
      );
      employee.colleagues = colleagues;
    }

    dispatch(createManyEmployeeAction(employees));
  };

  return (
    <Tooltip title="Заполнить случайными значениями">
      <Fab
        color="primary"
        className={classes.absolute}
        onClick={generateRandomEmployees}
      >
        <Autorenew />
      </Fab>
    </Tooltip>
  );
}

export { RandomizeButton };
