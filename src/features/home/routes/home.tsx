import { Box } from '@mui/material';

export const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <figure style={{ marginTop: '-5rem' }}>
        <img
          style={{ transform: 'scale(0.8)' }}
          src='/assets/images/logo1.png'
        />
      </figure>
    </Box>
  );
};
