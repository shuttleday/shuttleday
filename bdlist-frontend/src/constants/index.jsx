import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const ERROR = 'error';
const SUCCESS = 'success';
const WARNING = 'warning';

const actions = [
  {
    icon: <ManageAccountsIcon />,
    name: 'Manage User',
    operation: 'management',
  },
  { icon: <ReceiptIcon />, name: 'Payment History', operation: 'payment' },
  { icon: <InfoIcon />, name: 'User Details', operation: 'details' },
  { icon: <AddBoxIcon />, name: 'Create Session', operation: 'create' },
  { icon: <EditIcon />, name: 'Edit Session', operation: 'edit' },
];

export { actions, ERROR, SUCCESS, WARNING };
