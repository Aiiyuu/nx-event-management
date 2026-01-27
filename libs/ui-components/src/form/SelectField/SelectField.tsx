'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectProps } from '@mui/material';

export type SelectOption = {
  label: string;
  value: string | number;
};

export type SelectFieldProps = Omit<SelectProps, 'variant'> & {
  name: string;
  label: string;
  options: SelectOption[];
};

export function SelectField({ name, label, options, ...props }: SelectFieldProps) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>

      <Select name={name} label={label} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
