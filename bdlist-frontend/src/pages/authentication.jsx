import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

const Authentication = () => {
  return (
    <Stack
      spacing={2}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Card
        justifyContent='center'
        alignItems='center'
        sx={{ maxWidth: 340, height: 400 }}
        variant='outlined'
      >
        <CardContent>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
              mt: 14,
            }}
          >
            <TextField
              fullWidth
              label='Code'
              id='fullWidth'
              color='secondary'
            />
          </Box>
        </CardContent>
        <Box textAlign='center'>
          <Button variant='contained' color='success' maxWidth='100%'>
            Enter
          </Button>
        </Box>
      </Card>
    </Stack>
  );
};

export default Authentication;
