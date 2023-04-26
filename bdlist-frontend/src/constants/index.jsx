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

const adminActions = [
  { icon: <LogoutIcon />, name: 'Logout', operation: 'logout' },
  // { icon: <InfoIcon />, name: 'About', operation: 'about' },
  { icon: <BugReportIcon />, name: 'Bug Report', operation: 'report' },
  { icon: <QrCode2Icon />, name: 'Manage QR', operation: 'qr' },
  { icon: <EditIcon />, name: 'Edit Session', operation: 'edit' },
  { icon: <PrivacyTipIcon />, name: 'User Details', operation: 'details' },
  { icon: <AddBoxIcon />, name: 'Create Session', operation: 'create' },
];

const userActions = [
  { icon: <LogoutIcon />, name: 'Logout', operation: 'logout' },
  { icon: <BugReportIcon />, name: 'Bug Report', operation: 'report' },
  // { icon: <InfoIcon />, name: 'About', operation: 'about' },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const RE = /^\d+(,\d+)*$/; //Format for input e.g. 1,2,3,4

export { adminActions, userActions, ERROR, SUCCESS, WARNING, admin, Alert, RE };
