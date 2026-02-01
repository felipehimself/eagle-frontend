import { Box } from '@mui/material';

export const MrtRowWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={{ mt: '0.625rem', width: '100%' }}>{children}</Box>;
};
