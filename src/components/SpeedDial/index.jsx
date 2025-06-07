import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import NightlifeOutlinedIcon from '@mui/icons-material/NightlifeOutlined';

const actions = [
  { icon: <AddCardOutlinedIcon />, name: 'Spending' },
  { icon: <NightlifeOutlinedIcon />, name: 'Session' },
];

export const SpeedDialTooltipOpen = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon style={{color: 'var(--primaryColor)'}}/>}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        FabProps={{
        sx: {
        bgcolor: 'var(--secondaryColor)',
        '&:hover': {
            bgcolor: 'var(--secondaryColor)',
        }
    }
  }}

      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}