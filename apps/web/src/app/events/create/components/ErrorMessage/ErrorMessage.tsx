import { Typography } from '@mui/material';

interface Props {
  field: string;
  fieldErrors: Record<string, string> | null;
}

export const ErrorMessage = ({ field, fieldErrors }: Props) => {
  if (!fieldErrors || !fieldErrors[field]) return null;
  return (
    <Typography
      variant="caption"
      color="error"
      sx={{ mt: 0.5, ml: 1, fontWeight: 'bold', display: 'block' }}
    >
      {fieldErrors[field]}
    </Typography>
  );
};
