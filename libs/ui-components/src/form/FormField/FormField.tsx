'use-client';

import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material';

export type FormFieldProps = Omit<TextFieldProps, 'variant'> & {
  name: string;
};

export const FormField = ({ name, ...props }: FormFieldProps) => {
  return <TextField fullWidth name={name} variant="outlined" {...props} />;
};
