import { Box, Typography } from '@mui/material';

const footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#fffff6',
        textAlign: 'center',
        py: 2,
      }}
    >
    <Typography variant="text" color="textSecondary">
      © {new Date().getFullYear()} Unipin, Inc. All Rights Reserved.
    </Typography>
    </Box>
  );
};

export default footer;