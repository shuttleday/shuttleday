import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import ReceiptIcon from '@mui/icons-material/Receipt';

const ERROR = 'error';
const SUCCESS = 'success';
const WARNING = 'warning';

const admin = 'ADMIN';

const actions = [
  { icon: <ReceiptIcon />, name: 'Payment History', operation: 'payment' },
  { icon: <InfoIcon />, name: 'User Details', operation: 'details' },
  { icon: <AddBoxIcon />, name: 'Create Session', operation: 'create' },
  { icon: <EditIcon />, name: 'Edit Session', operation: 'edit' },
];

export { actions, ERROR, SUCCESS, WARNING, admin };
