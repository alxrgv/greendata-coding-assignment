import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  TextField,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Checkbox,
  Radio,
  Select,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

import type { StoreState } from "store";
import type { EmployeeEntity, EmployeePositionEntity } from "store/models";
import type { WithoutChildren } from "types/children";

import { updatePendingEmployeeAction } from "./state";
import { TabPanel } from "./TabPanel";
import { useEmployeeInformation } from "./context";
import {
  updateEmployeeAction,
  selectedEmployeeSelector,
} from "store/features/employees";
import { selectAllPositions } from "store/features/positions";
import { Gender, EMPTY_EMPLOYEE } from "store/models";

function DescriptionTab(props: WithoutChildren) {
  const dispatch = useDispatch();
  const { pendingEmployee, dispatch: localDispatch } = useEmployeeInformation();

  const selectedEmployee = useSelector<StoreState>((state) =>
    selectedEmployeeSelector(state.employees)
  ) as EmployeeEntity;

  const positions = useSelector<StoreState>((state) =>
    selectAllPositions(state.positions)
  ) as EmployeePositionEntity[];

  const isEditingSelectedEmployee = selectedEmployee !== EMPTY_EMPLOYEE;
  const currentEmployee =
    selectedEmployee !== EMPTY_EMPLOYEE ? selectedEmployee : pendingEmployee;

  const fullnameFilled = currentEmployee.fullname.length !== 0;
  const positionFilled = currentEmployee.position.length !== 0;

  return (
    <TabPanel name="employeeInfo">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth required error={!fullnameFilled}>
            <FormLabel>ФИО</FormLabel>
            <Input
              value={currentEmployee.fullname}
              onChange={({ target: { value } }) =>
                isEditingSelectedEmployee
                  ? dispatch(
                      updateEmployeeAction({
                        id: selectedEmployee.id,
                        changes: {
                          fullname: value,
                        },
                      })
                    )
                  : localDispatch(
                      updatePendingEmployeeAction({
                        changes: {
                          fullname: value,
                        },
                      })
                    )
              }
            />
          </FormControl>
          <FormHelperText error={!fullnameFilled}>
            Поле обязательно для ввода
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required error={!positionFilled}>
            <FormLabel>Должность</FormLabel>
            <Select
              displayEmpty
              value={currentEmployee.position}
              onChange={({ target: { value } }) =>
                isEditingSelectedEmployee
                  ? dispatch(
                      updateEmployeeAction({
                        id: selectedEmployee.id,
                        changes: {
                          position: value as string,
                        },
                      })
                    )
                  : localDispatch(
                      updatePendingEmployeeAction({
                        changes: {
                          position: value as string,
                        },
                      })
                    )
              }
            >
              {positions.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.value}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={!positionFilled}>
              Поле обязательно для ввода
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel>День рождения</FormLabel>
            <DatePicker
              label=" "
              disableMaskedInput
              showDaysOutsideCurrentMonth
              value={currentEmployee.birthday}
              minDate={new Date(1900, 0)}
              maxDate={new Date()}
              onChange={(date) =>
                isEditingSelectedEmployee
                  ? dispatch(
                      updateEmployeeAction({
                        id: selectedEmployee.id,
                        changes: {
                          birthday: date,
                        },
                      })
                    )
                  : localDispatch(
                      updatePendingEmployeeAction({
                        changes: {
                          birthday: date,
                        },
                      })
                    )
              }
              renderInput={(props) => <TextField {...props} helperText="" />}
              inputFormat="dd MMMM yyyy"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel>Пол</FormLabel>
            <RadioGroup
              row
              value={currentEmployee.gender}
              onChange={({ target: { value } }) =>
                isEditingSelectedEmployee
                  ? dispatch(
                      updateEmployeeAction({
                        id: selectedEmployee.id,
                        changes: {
                          gender: (+value as any) as Gender,
                        },
                      })
                    )
                  : localDispatch(
                      updatePendingEmployeeAction({
                        changes: { gender: (+value as any) as Gender },
                      })
                    )
              }
            >
              <FormControlLabel
                value={Gender.Male}
                control={<Radio color="primary" />}
                label="Мужской"
              />
              <FormControlLabel
                value={Gender.Female}
                control={<Radio color="primary" />}
                label="Женский"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormControlLabel
              label="Уволен"
              control={
                <Checkbox
                  checked={!!currentEmployee.isFired}
                  onChange={({ target: { checked } }) =>
                    isEditingSelectedEmployee
                      ? dispatch(
                          updateEmployeeAction({
                            id: selectedEmployee.id,
                            changes: {
                              isFired: +!!checked,
                            },
                          })
                        )
                      : localDispatch(
                          updatePendingEmployeeAction({
                            changes: {
                              isFired: +!!checked,
                            },
                          })
                        )
                  }
                  color="primary"
                />
              }
            />
          </FormControl>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export { DescriptionTab };
