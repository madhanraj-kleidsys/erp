// import * as React from 'react';
// import Avatar from '@mui/joy/Avatar';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Chip from '@mui/joy/Chip';
// import Divider from '@mui/joy/Divider';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import Link from '@mui/joy/Link';
// import Input from '@mui/joy/Input';
// import Modal from '@mui/joy/Modal';
// import ModalDialog from '@mui/joy/ModalDialog';
// import ModalClose from '@mui/joy/ModalClose';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
// import Table from '@mui/joy/Table';
// import Sheet from '@mui/joy/Sheet';
// import Checkbox from '@mui/joy/Checkbox';
// import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
// import Typography from '@mui/joy/Typography';
// import Menu from '@mui/joy/Menu';
// import MenuButton from '@mui/joy/MenuButton';
// import MenuItem from '@mui/joy/MenuItem';
// import Dropdown from '@mui/joy/Dropdown';

// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import SearchIcon from '@mui/icons-material/Search';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
// import BlockIcon from '@mui/icons-material/Block';
// import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

// const rows = [
//   {
//     id: 'INV-1234',
//     date: 'Feb 3, 2023',
//     status: 'Refunded',
//     customer: {
//       initial: 'O',
//       name: 'Olivia Ryhe',
//       email: 'olivia@email.com',
//     },
//   },
//   {
//     id: 'INV-1233',
//     date: 'Feb 3, 2023',
//     status: 'Paid',
//     customer: {
//       initial: 'S',
//       name: 'Steve Hampton',
//       email: 'steve.hamp@email.com',
//     },
//   },
//   {
//     id : 'INV-1232',
//     date : 'Feb 3,2020',
//     status:'Cancelled',
//     customer :{
//       initial : 'M',
//       name:'Madhan',
//       email:'madhan@gmail.com'
//     }
//   }
 
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc' 
//     ? (a, b) => descendingComparator(a, b, orderBy) 
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function RowMenu() {
//   return (
//     <Dropdown>
//       <MenuButton
//         slots={{ root: IconButton }}
//         slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
//       >
//         <MoreHorizRoundedIcon />
//       </MenuButton>
//       <Menu size="sm" sx={{ minWidth: 140 }}>
//         <MenuItem>Edit</MenuItem>
//         <MenuItem>Rename</MenuItem>
//         <MenuItem>Move</MenuItem>
//         <Divider />
//         <MenuItem color="danger">Delete</MenuItem>
//       </Menu>
//     </Dropdown>
//   );
// }

// export default function OrderTable() {
//   const [order, setOrder] = React.useState('desc');
//   const [selected, setSelected] = React.useState([]);
//   const [open, setOpen] = React.useState(false);
  
//   const renderFilters = () => (
//     <>
//       <FormControl size="sm">
//         <FormLabel>Status</FormLabel>
//         <Select
//           size="sm"
//           placeholder="Filter by status"
//           slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
//         >
//           <Option value="paid">Paid</Option>
//           <Option value="pending">Pending</Option>
//           <Option value="refunded">Refunded</Option>
//           <Option value="cancelled">Cancelled</Option>
//         </Select>
//       </FormControl>
//       <FormControl size="sm">
//         <FormLabel>Category</FormLabel>
//         <Select size="sm" placeholder="All">
//           <Option value="all">All</Option>
//           <Option value="refund">Refund</Option>
//           <Option value="purchase">Purchase</Option>
//           <Option value="debit">Debit</Option>
//         </Select>
//       </FormControl>
//       <FormControl size="sm">
//         <FormLabel>Customer</FormLabel>
//         <Select size="sm" placeholder="All">
//           <Option value="all">All</Option>
//           <Option value="olivia">Olivia Rhye</Option>
//           <Option value="steve">Steve Hampton</Option>
//           <Option value="ciaran">Ciaran Murray</Option>
//           <Option value="marina">Marina Macdonald</Option>
//           <Option value="charles">Charles Fulton</Option>
//           <Option value="jay">Jay Hoper</Option>
//         </Select>
//       </FormControl>
//     </>
//   );
  
//   const statusIconMap = {
//     Paid: <CheckRoundedIcon />,
//     Refunded: <AutorenewRoundedIcon />,
//     Cancelled: <BlockIcon />,
//   };

//   const statusColorMap = {
//     Paid: 'success',
//     Refunded: 'neutral',
//     Cancelled: 'danger',
//   };

//   return (
//     <>
//       <Sheet
//         className="SearchAndFilters-mobile"
//         sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
//       >
//         <Input
//           size="sm"
//           placeholder="Search"
//           startDecorator={<SearchIcon />}
//           sx={{ flexGrow: 1 }}
//         />
//         <IconButton size="sm" variant="outlined" color="neutral" onClick={() => setOpen(true)}>
//           <FilterAltIcon />
//         </IconButton>
//         <Modal open={open} onClose={() => setOpen(false)}>
//           <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
//             <ModalClose />
//             <Typography id="filter-modal" level="h2">
//               Filters
//             </Typography>
//             <Divider sx={{ my: 2 }} />
//             <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               {renderFilters()}
//               <Button color="primary" onClick={() => setOpen(false)}>
//                 Submit
//               </Button>
//             </Sheet>
//           </ModalDialog>
//         </Modal>
//       </Sheet>
      
//       <Box
//         className="SearchAndFilters-tabletUp"
//         sx={{
//           borderRadius: 'sm',
//           py: 2,
//           display: { xs: 'none', sm: 'flex' },
//           flexWrap: 'wrap',
//           gap: 1.5,
//           '& > *': {
//             minWidth: { xs: '120px', md: '160px' },
//           },
//         }}
//       >
//         <FormControl sx={{ flex: 1 }} size="sm">
//           <FormLabel>Search for order</FormLabel>
//           <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
//         </FormControl>

//         {renderFilters()}
//       </Box>
      
//       <Sheet
//         className="OrderTableContainer"
//         variant="outlined"
//         sx={{
//           display: { xs: 'none', sm: 'initial' },
//           width: '100%',
//           borderRadius: 'sm',
//           flexShrink: 1,
//           overflow: 'auto',
//           minHeight: 0,
//         }}
//       >
//         <Table
//           aria-labelledby="tableTitle"
//           stickyHeader
//           hoverRow
//           sx={{
//             '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
//             '--Table-headerUnderlineThickness': '1px',
//             '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
//             '--TableCell-paddingY': '4px',
//             '--TableCell-paddingX': '8px',
//           }}
//         >
//           <thead>
//             <tr>
//               <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
//                 <Checkbox
//                   size="sm"
//                   indeterminate={selected.length > 0 && selected.length !== rows.length}
//                   checked={selected.length === rows.length}
//                   onChange={(event) => {
//                     setSelected(event.target.checked ? rows.map(row => row.id) : []);
//                   }}
//                   color={selected.length > 0 || selected.length === rows.length ? 'primary' : undefined}
//                   sx={{ verticalAlign: 'text-bottom' }}
//                 />
//               </th>
//               <th style={{ width: 120, padding: '12px 6px' }}>
//                 <Link
//                   underline="none"
//                   color="primary"
//                   component="button"
//                   onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
//                   endDecorator={<ArrowDropDownIcon />}
//                   sx={[
//                     {
//                       fontWeight: 'lg',
//                       '& svg': {
//                         transition: '0.2s',
//                         transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
//                       },
//                     },
//                     order === 'desc'
//                       ? { '& svg': { transform: 'rotate(0deg)' } }
//                       : { '& svg': { transform: 'rotate(180deg)' } },
//                   ]}
//                 >
//                   Invoice
//                 </Link>
//               </th>
//               <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
//               <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
//               <th style={{ width: 240, padding: '12px 6px' }}>Customer</th>
//               <th style={{ width: 140, padding: '12px 6px' }}> </th>
//             </tr>
//           </thead>
//           <tbody>
//             {[...rows].sort(getComparator(order, 'id')).map(row => (
//               <tr key={row.id}>
//                 <td style={{ textAlign: 'center', width: 120 }}>
//                   <Checkbox
//                     size="sm"
//                     checked={selected.includes(row.id)}
//                     color={selected.includes(row.id) ? 'primary' : undefined}
//                     onChange={(event) => {
//                       setSelected(ids =>
//                         event.target.checked
//                           ? ids.concat(row.id)
//                           : ids.filter(itemId => itemId !== row.id)
//                       );
//                     }}
//                     slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
//                     sx={{ verticalAlign: 'text-bottom' }}
//                   />
//                 </td>
//                 <td>
//                   <Typography level="body-xs">{row.id}</Typography>
//                 </td>
//                 <td>
//                   <Typography level="body-xs">{row.date}</Typography>
//                 </td>
//                 <td>
//                   <Chip
//                     variant="soft"
//                     size="sm"
//                     startDecorator={
//                       {
//                         Paid: <CheckRoundedIcon />,
//                         Refunded: <AutorenewRoundedIcon />,
//                         Cancelled: <BlockIcon />,
//                       }[row.status]
//                     }
//                     color={
//                       {
//                         Paid: 'success',
//                         Refunded: 'neutral',
//                         Cancelled: 'danger',
//                       }[row.status]
//                     }
//                   >
//                     {row.status}
//                   </Chip>
//                 </td>
//                 <td>
//                   <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//                     <Avatar size="sm">{row.customer.initial}</Avatar>
//                     <div>
//                       <Typography level="body-xs">{row.customer.name}</Typography>
//                       <Typography level="body-xs">{row.customer.email}</Typography>
//                     </div>
//                   </Box>
//                 </td>
//                 <td>
//                   <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//                     <Link level="body-xs" component="button">
//                       Download
//                     </Link>
//                     <RowMenu />
//                   </Box>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Sheet>
//       <Box
//         className="Pagination-laptopUp"
//         sx={{
//           pt: 2,
//           gap: 1,
//           [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
//           display: {
//             xs: 'none',
//             md: 'flex',
//           },
//         }}
//       >
//         <Button size="sm" variant="outlined" color="neutral" startDecorator={<KeyboardArrowLeftIcon />}>
//           Previous
//         </Button>

//         <Box sx={{ flex: 1 }} />
//         {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
//           <IconButton
//             key={page}
//             size="sm"
//             variant={Number(page) ? 'outlined' : 'plain'}
//             color="neutral"
//           >
//             {page}
//           </IconButton>
//         ))}
//         <Box sx={{ flex: 1 }} />
//         <Button size="sm" variant="outlined" color="neutral" endDecorator={<KeyboardArrowRightIcon />}>
//           Next
//         </Button>
//       </Box>
//     </>
//   );
// }



import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import Breadcrumbs from '@mui/joy/Breadcrumbs';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Header from './Header';
import Sidebar from './Sidebar';



const rows = [
  {
    id: 'INV-1234',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'O',
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
  },
  {
    id: 'INV-1233',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'S',
      name: 'Steve Hampton',
      email: 'steve.hamp@email.com',
    },
  },
  {
    id : 'INV-1232',
    date : 'Feb 3,2020',
    status:'Cancelled',
    customer :{
      initial : 'M',
      name:'Madhan',
      email:'madhan@gmail.com'
    }
  }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' 
    ? (a, b) => descendingComparator(a, b, orderBy) 
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable() {
  const [order, setOrder] = React.useState('desc');
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  
  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </>
  );
  
  return (
    <>
 <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
       


    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link underline="none" color="neutral" href="#some-link" aria-label="Home">
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="#some-link"
            sx={{ fontSize: 12, fontWeight: 500 }}
          >
            Dashboard
          </Link>
          <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
            Orders
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2" component="h1">
          Orders
        </Typography>
        <Button color="primary" startDecorator={<DownloadRoundedIcon />} size="sm">
          Download PDF
        </Button>
      </Box>


      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton size="sm" variant="outlined" color="neutral" onClick={() => setOpen(true)}>
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>

        {renderFilters()}
      </Box>
      
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size="sm"
                  indeterminate={selected.length > 0 && selected.length !== rows.length}
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(event.target.checked ? rows.map(row => row.id) : []);
                  }}
                  color={selected.length > 0 || selected.length === rows.length ? 'primary' : undefined}
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: 'lg',
                      '& svg': {
                        transition: '0.2s',
                        transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                      },
                    },
                    order === 'desc'
                      ? { '& svg': { transform: 'rotate(0deg)' } }
                      : { '& svg': { transform: 'rotate(180deg)' } },
                  ]}
                >
                  Invoice
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
              <th style={{ width: 240, padding: '12px 6px' }}>Customer</th>
              <th style={{ width: 140, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {[...rows].sort(getComparator(order, 'id')).map(row => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? 'primary' : undefined}
                    onChange={(event) => {
                      setSelected(ids =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter(itemId => itemId !== row.id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.date}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Paid: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Paid: 'success',
                        Refunded: 'neutral',
                        Cancelled: 'danger',
                      }[row.status]
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{row.customer.initial}</Avatar>
                    <div>
                      <Typography level="body-xs">{row.customer.name}</Typography>
                      <Typography level="body-xs">{row.customer.email}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Link level="body-xs" component="button">
                      Download
                    </Link>
                    <RowMenu />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button size="sm" variant="outlined" color="neutral" startDecorator={<KeyboardArrowLeftIcon />}>
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
        <Button size="sm" variant="outlined" color="neutral" endDecorator={<KeyboardArrowRightIcon />}>
          Next
        </Button>
      </Box>

       </Box>
      </Box>
    </CssVarsProvider>


    </>
  );
}
