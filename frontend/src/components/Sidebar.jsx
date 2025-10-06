import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import SellRoundedIcon from '@mui/icons-material/SellRounded';

import ColorSchemeToggle from "./ColorSchemaToggle";
import { closeSidebar } from '../../utils';

import { Menu, MenuItem } from "@mui/joy";
import { CleaningServices, Logout } from "@mui/icons-material";
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';

import { useContext } from "react";
import { AuthContext } from "../AuthContext";
const apiUrl = import.meta.VITE_API_URL || 'http://localhost:3000/api';



function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: 'grid',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
          },
          open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
        ]}
      >
        {children}
      </Box>
    </>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const { user, token, onLogout } = useContext(AuthContext);
 
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Read data from localStorage when component mounts
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');

    setName(storedName || 'Guest');
    setEmail(storedEmail || 'No email');
  }, []);

  
 
 
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const otherItems = [
    { label: "Sales Order Report", path: "/salesorderreport" },
    { label: "SKPL Personnel File", path: "/SKPL-Personnel-File" },
    { label: "Production Status", path: "/productionStatus" },
    { label: "Dashboard Status", path: "/productionStatus" },
  ];

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  const filteredOtherItems = otherItems.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    // closeSidebar(); // if you have sidebar toggle
  };

  const [approvalData, setApprovalData] = useState({ codes: [], counts: [], totalCount: 0 });

  useEffect(() => {
    axios.get(`${apiUrl}/approvalCount`)
      .then(({ data }) => {
        setApprovalData({
          codes: data.codes,
          counts: data.count,
          totalCount: data.totalCount,
        });
      })
      .catch(console.error);
  }, []);

  const approvalMap = approvalData.codes.reduce((acc, code, i) => {
    acc[code] = approvalData.counts[i];
    return acc;
  }, {});

  const commonProps = {
    onBack: () => setCurrentPage(0),
    onNavChange: setCurrentPage,
    user,
  };

  return (
    <>
    
      <Sheet
        className="Sidebar"
        sx={{
          position: { xs: 'fixed', md: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
            md: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 10000,
          height: '100dvh',
          width: 'var(--Sidebar-width)',
          top: 0,
          p: 2,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >

        <GlobalStyles
          styles={(theme) => ({
            ':root': {
              '--Sidebar-width': '220px',
              [theme.breakpoints.up('lg')]: {
                '--Sidebar-width': '240px',
              },
            },
          })}
        />

        <Box
          className="Sidebar-overlay"
          sx={{
            position: 'fixed',
            zIndex: 9998,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            opacity: 'var(--SideNavigation-slideIn)',
            backgroundColor: 'var(--joy-palette-background-backdrop)',
            transition: 'opacity 0.4s',
            transform: {
              xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
              lg: 'translateX(-100%)',
            },
          }}
          onClick={() => closeSidebar()}
        />

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {/* <IconButton variant="soft" color="primary" size="sm"> */}
          <Avatar
            variant="outlined"
            size="sm"
            src="https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fHww"
          />
          {/* </IconButton> */}
          <Typography level="title-lg">{name || 'admin'}</Typography>
          <ColorSchemeToggle sx={{ ml: 'auto' }} />
        </Box>



        <Input size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => {
            setTimeout(() => setIsSearchActive(false), 150);
          }} />

        {/* <List> */}
        {isSearchActive && searchTerm.length > 0 && filteredOtherItems.length > 0 && (
          <>
            <Typography level="xs" sx={{ mt: 2, px: 1, color: "#000000ff" }}>
              Search Results :
            </Typography>
            {filteredOtherItems.map(({ label, path }) => (
              <ListItem key={label}>
                <ListItemButton onClick={() => handleNavigation(path)}>
                  <Typography level="title-sm" color='success' sx={{ px: 2 }}  >{label}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
        {/* </List > */}

        <Box
          sx={{
            minHeight: 0,
            overflow: 'hidden auto',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}
        >
          <List
            size="sm"
            sx={{
              gap: 1,
              '--List-nestedInsetStart': '30px',
              '--ListItem-radius': (theme) => theme.vars.radius.sm,
            }}
          >
            <ListItem>
              <ListItemButton
                selected={isActive('/') || isActive('/home')}
                onClick={() => handleNavigation('/')}
              >
                <HomeRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Home</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <NotificationsRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Approvals</Typography>
                    </ListItemContent>
                    <Chip size="sm" color="danger" variant="solid">
                      {approvalData.totalCount}
                    </Chip>
                    <KeyboardArrowDownIcon
                      sx={[
                        open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                      ]}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>

                  {/* <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton onClick={() => handleNavigation('/salesorder2')}>
                    Sales Order 2
                  </ListItemButton>
                  <Chip size="sm" color="success" variant="solid">
                    4
                  </Chip>
                </ListItem> */}

                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton onClick={() => handleNavigation('/salesorder2')}>
                      Sales Order 2
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['SALESOREDR2'] || 0}
                    </Chip>
                  </ListItem>





                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton onClick={() => handleNavigation('/servinvoice')}>
                      Serv Invoice
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['SERVINVOICE'] || 0}

                    </Chip>
                  </ListItem>


                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton onClick={() => handleNavigation('/vendorbill')}>
                      Vendor Bill
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['VENDORBILL'] || 0}

                    </Chip>
                  </ListItem>


                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton onClick={() => handleNavigation('/stkrecpnote')}>
                      STL Recp Note
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['STKRECPNOTE'] || 0}

                    </Chip>
                  </ListItem>


                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton onClick={() => handleNavigation('/stylejobwork')}>
                      Style Job Work
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['STYLEJOBWORK'] || 0}

                    </Chip>
                  </ListItem>


                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton onClick={() => handleNavigation('/ProcureOrder')}>
                      Procure Order
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['PROCUREORDER'] || 0}

                    </Chip>
                  </ListItem>

                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton onClick={() => handleNavigation('/stkRequestNote')}>
                      STK Request Note
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['STKREQUESTNOTE'] || 0}

                    </Chip>
                  </ListItem>

                </List>

              </Toggler>
            </ListItem>
 
            {/* <ListItem>
            <ListItemButton
              selected={isActive('/dashboard')}
              onClick={() => handleNavigation('/dashboard')}
            >
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}

            {/* <ListItem>
            <ListItemButton
              selected={isActive('/approvals')}
              onClick={() => handleNavigation('/approvals')}
            >
              <CheckCircleRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Approvals</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}

            {/* <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <NotificationsRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Notifications</Typography>
                  </ListItemContent>
                  <Chip size="sm" color="danger" variant="solid">
                    8
                  </Chip>
                  <KeyboardArrowDownIcon
                    sx={[
                      open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                    ]}
                  />
                </ListItemButton>
              )}
            >
         <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton onClick={() => handleNavigation('/notifications')}>
                    All Notifications
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Read</ListItemButton>
                  <Chip size="sm" color="success" variant="solid">
                    4
                  </Chip>
                </ListItem>
                <ListItem>
                  <ListItemButton>Unread</ListItemButton>
                  <Chip size="sm" color="danger" variant="solid">
                    4
                  </Chip>
                </ListItem>
              </List> 

             </Toggler> 
          </ListItem> */}

            {/* <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Tasks</Typography>
                  </ListItemContent>
                  <Chip size="sm" color="warning" variant="solid">
                    5
                  </Chip>
                  <KeyboardArrowDownIcon
                    sx={[
                      open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton onClick={() => handleNavigation('/tasks')}>
                    All tasks
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Approved</ListItemButton>
                  <Chip size="sm" color="success" variant="solid">
                    3
                  </Chip>
                </ListItem>
                <ListItem>
                  <ListItemButton>Pending</ListItemButton>
                  <Chip size="sm" color="danger" variant="solid">
                    2
                  </Chip>
                </ListItem>
              </List>
            </Toggler>
          </ListItem> */}

            {/* <ListItem>
            <ListItemButton onClick={() => handleNavigation('/billing')}>
              <AccountBalanceWalletRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" color="success">Billing</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}


            {/* ------------------------------- 3 nav  -------------------------------------------------------- */}



            {/* <ListItem>
            <ListItemButton onClick={() => handleNavigation('/salesorderreport')} >
              <SellRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" color="success">
                  Sales Order Report
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => handleNavigation('/SKPL-Personnel-File')} >
              <SellRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" color="success">
                  SKPL Personnel File
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => handleNavigation('/productionStatus')} >
              <SellRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" color="success">
                  production Status
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}


            {/* ------------------------------- 3 nav  -------------------------------------------------------- */}






            {/*   <ListItem>
            <ListItemButton >
              <ShoppingCartRoundedIcon />
              <ListItemContent
              selected={isActive('/apparel-order')}
              onClick={()=> handleNavigation('/apparel-order')}
              >
                <Typography level="title-sm" >Apparel Order </Typography>
              </ListItemContent>
              
            </ListItemButton>
          </ListItem>


          <ListItem>
            <ListItemButton >
              <ShoppingCartRoundedIcon />
              <ListItemContent
                selected={isActive('/orders')}
                onClick={() => handleNavigation('/orders')}
              >
                <Typography level="title-sm">Orders</Typography>
              </ListItemContent>
              <Chip size="sm" color="success" variant="solid">
                4
              </Chip>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={[open ? { transform: 'rotate(180deg)' } : { transform: 'none' }]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>My profile</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Create a new user</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Roles & permission</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem> */}


          </List>

          {/* <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List> */}
        </Box>
        <Divider />


        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Avatar
            variant="outlined"
            size="sm"
            src="https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fHww"
          />

          <Box sx={{ minWidth: 0, flex: 1 }}>
            {/* <Typography level="title-sm">Madhanraj</Typography> */}
            <Typography level="title-sm">{name || 'Madhanraj'}</Typography>

            <Typography level="body-xs"> {email || "Email not set"} </Typography>
            {/* <Typography>{token || "No token"}</Typography> */}
          </Box>

          {/* <IconButton size="sm" variant="plain" color="neutral" onClick={onLogout}> */}
          <IconButton onClick={onLogout} title="Logout">
            <LogoutRoundedIcon />
          </IconButton>

        </Box>


      </Sheet>

    </>
  );
}

