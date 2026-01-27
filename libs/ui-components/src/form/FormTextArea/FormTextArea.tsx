'use client';

import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material';

export type FormTextAreaProps = Omit<TextFieldProps, 'variant' | 'multiline'> & {
  name: string;
  rows?: number;
};

export function FormTextArea({ name, rows = 4, ...props }: FormTextAreaProps) {
  return <TextField fullWidth multiline rows={rows} name={name} variant="outlined" {...props} />;
}
