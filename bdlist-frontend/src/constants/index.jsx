import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const ERROR = 'error';
const SUCCESS = 'success';
const WARNING = 'warning';

const admin = 'ADMIN';

const adminActions = [
  { icon: <LogoutIcon />, name: 'Logout', operation: 'logout' },
  { icon: <InfoIcon />, name: 'About', operation: 'about' },
  { icon: <EditIcon />, name: 'Edit Session', operation: 'edit' },
  { icon: <PrivacyTipIcon />, name: 'User Details', operation: 'details' },
  { icon: <AddBoxIcon />, name: 'Create Session', operation: 'create' },
];

const userActions = [
  { icon: <LogoutIcon />, name: 'Logout', operation: 'logout' },
  { icon: <InfoIcon />, name: 'About', operation: 'about' },
];

export { adminActions, userActions, ERROR, SUCCESS, WARNING, admin };
