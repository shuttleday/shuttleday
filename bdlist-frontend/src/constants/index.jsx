import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import React from 'react';
import MuiAlert from '@mui/material/Alert';
import BugReportIcon from '@mui/icons-material/BugReport';
import WestIcon from '@mui/icons-material/West';

const ERROR = 'error';
const SUCCESS = 'success';
const WARNING = 'warning';

const admin = 'ADMIN';

const ID = 'ID';

const FILE = {
  PDF: 'PDF',
  IMG: 'IMAGE',
};
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
    lore: 'Talented up-and-coming DevOps Engineer from Sunway University with exceptional skills in the field of technology. Always friendly in person with a warm personality, able to speak a few languages such as Tagalog, French, and Korean, and a Big fan of Kpop, and a stan of Le Sserafim with a collection of albums. ',
  },
  {
    name: 'Teh',
    title: 'Frontend Legend',
    image: 'https://github.com/Kirixi.png',
    gradients: 'from-amber-300 via-orange-400 to-red-500',
    lore: 'Talented up-and-coming Frontend Engineer from Australia’s RMIT University with a keen interest in web animations. Always keen to help friends in need, likes to play competitive games like Valorant, casual anime fan, and a K-pop enjoyer especially when it comes to groups like Twice and Aespa.',
  },
];
const adminActions = [
  { icon: <LogoutIcon />, name: 'Logout', operation: 'logout' },
  { icon: <WestIcon />, name: 'Rooms', operation: 'room' },
  { icon: <InfoIcon />, name: 'Credits', operation: 'credits' },
  { icon: <BugReportIcon />, name: 'Bug Report', operation: 'report' },
  { icon: <QrCode2Icon />, name: 'Manage QR', operation: 'qr' },
  { icon: <EditIcon />, name: 'Edit Session', operation: 'edit' },
  { icon: <PrivacyTipIcon />, name: 'User Details', operation: 'details' },
  { icon: <AddBoxIcon />, name: 'Create Session', operation: 'create' },
];

const roomActions = [
  { icon: <LogoutIcon />, name: 'Logout', operation: 'logout' },
  { icon: <InfoIcon />, name: 'Credits', operation: 'credits' },
  { icon: <BugReportIcon />, name: 'Bug Report', operation: 'report' },
];

const userActions = [
  { icon: <LogoutIcon />, name: 'Logout', operation: 'logout' },
  { icon: <WestIcon />, name: 'Rooms', operation: 'room' },
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
  roomActions,
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
  FILE,
};
