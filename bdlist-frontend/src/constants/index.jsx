import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import React from 'react';
import MuiAlert from '@mui/material/Alert';
import BugReportIcon from '@mui/icons-material/BugReport';

const ERROR = 'error';
const SUCCESS = 'success';
const WARNING = 'warning';

const admin = 'ADMIN';

const ID = 'ID';

const tokens = {
  google: 'gtoken',
  refresh: 'refreshToken',
  jwt: 'jwtToken_Login',
};

const info = [
  {
    name: 'Pie',
    title: 'DevOps God',
    image: 'https://github.com/PScoriae.png',
    gradients: 'from-green-400 via-blue-500 to-purple-500',
    lore: "Once upon a time, there was a brilliant DevOps Engineer named Pierre, who had acquired his technical mastery at the prestigious Lancaster University. But Pierre was no ordinary engineer. He had a deep love for the magical world of Kpop and was a fervent follower of the legendary LE SSERAFIM. Pie's combination of technological expertise and his passion for pop culture made him a truly unique hero, whose presence in any project was said to bring a touch of magic and diversity. His legend continues to inspire and captivate those who are fortunate enough to cross paths with him.",
  },
  {
    name: 'Teh',
    title: 'Frontend Legend',
    image: 'https://github.com/Kirixi.png',
    gradients: 'from-amber-300 via-orange-400 to-red-500',
    lore: "Legend has it that there was a talented Frontend Engineer by the name of Teh, who hailed from the renowned RMIT University. Teh possessed an extraordinary skill set that allowed them to create stunning user interfaces and engaging web experiences. But Teh was more than just a technical genius. It was rumored that Teh was a devoted follower of the Kpop group, TWICE, and he would often be found passionately singing along to their favorite songs. Teh's love for music and technology brought a unique energy to their work and inspired those around them. The legend of Teh lives on as a testament to the power of pursuing one's passions",
  },
];
const adminActions = [
  { icon: <LogoutIcon />, name: 'Logout', operation: 'logout' },
  { icon: <InfoIcon />, name: 'Credits', operation: 'credits' },
  { icon: <BugReportIcon />, name: 'Bug Report', operation: 'report' },
  { icon: <QrCode2Icon />, name: 'Manage QR', operation: 'qr' },
  { icon: <EditIcon />, name: 'Edit Session', operation: 'edit' },
  { icon: <PrivacyTipIcon />, name: 'User Details', operation: 'details' },
  { icon: <AddBoxIcon />, name: 'Create Session', operation: 'create' },
];

const userActions = [
  { icon: <LogoutIcon />, name: 'Logout', operation: 'logout' },
  { icon: <BugReportIcon />, name: 'Bug Report', operation: 'report' },
  { icon: <InfoIcon />, name: 'Credits', operation: 'credits' },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const RE = /^\d+(,\d+)*$/; //Format for input e.g. 1,2,3,4

const ACTIONS = {
  SUCCESS: 'FETCH_DATA_SUCCESS',
  FAILURE: 'FETCH_DATA_FAILURE',
  EDIT: 'EDIT_DATA',
};
//Modal style
const styleImage = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 360, sm: 450, md: 900 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
};

const operations = {
  leave: 'LEAVING',
  delete: 'DELETING',
  create: 'CREATE',
  edit: 'EDIT',
};
export {
  adminActions,
  userActions,
  ERROR,
  SUCCESS,
  WARNING,
  admin,
  Alert,
  RE,
  info,
  styleImage,
  ACTIONS,
  operations,
  ID,
  tokens,
};
