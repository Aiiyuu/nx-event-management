'use cliet';

import { Button as MUIButton } from '@mui/material';
import { ButtonProps } from '@mui/material';

export type Props = Omit<ButtonProps, 'variant'> & {
  variant?: 'contained' | 'outlined' | 'text';
};

export function Button({ variant = 'contained', ...props }: Props) {
  return <MUIButton variant={variant} {...props} />;
}
