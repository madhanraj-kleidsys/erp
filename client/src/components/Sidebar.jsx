import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from 'axios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { AuthContext } from "../AuthContext";

import ColorSchemeToggle from "./ColorSchemaToggle";
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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
            '& > *': { overflow: 'hidden' },
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
  const { user, onLogout } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [approvalData, setApprovalData] = useState({ codes: [], counts: [], totalCount: 0 });

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    setName(storedName || 'Guest');
    setEmail(storedEmail || 'No email');
  }, []);

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

  const otherItems = [
    { label: "Sales Order Report", path: "/salesorderreport" },
    { label: "SKPL Personnel File", path: "/SKPL-Personnel-File" },
    { label: "Production Status", path: "/productionStatus" },
    // { label: "Sourcing", path: "/sourcing" },
    // { label: "Fabric Store", path: "/FabricDash" },
    // { label: "Cuttings", path: "/CuttingDashboard" },
    // { label: "VAP (printings)", path: "/vaprinting" },
    // { label: "Risk Summary", path: "/risksummary" }
  ];

  const filteredOtherItems = otherItems.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false); // Close sidebar after navigation
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  const approvalMap = approvalData.codes.reduce((acc, code, i) => {
    acc[code] = approvalData.counts[i];
    return acc;
  }, {});

  return (
    <>
      {/* Toggle Button - Always visible on left side */}
      {!sidebarOpen && (
        <IconButton
          onClick={() => setSidebarOpen(true)}
          sx={{
            alignItems: 'stretch',
            position: 'fixed',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10001,
            bgcolor: '#19139b98',
            color: '#ffffffff',
            borderRadius: '0 8px 8px 0',
            width: 39,
            height: 200,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: '#b0ade9e3',
              color:'#000'
            }
          }}
        >
          <Typography
            sx={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize:15,
              color: '#ffffffff',
              mt: 1, ml: 1, mr: -1,
              userSelect: 'none',
              whiteSpace: 'nowrap',
              '&:hover': {
              bgcolor: '#b0ade9e3',
              color:'#000'
            }
            }}>
            Click to open sidebar
          </Typography>
          <KeyboardArrowRightIcon sx={{ fontSize: 30, color: "#000000ff", mt: 'auto', mb: 'auto','&:hover': {
              color:'#ffffffff'
            } }} />
        </IconButton>
      )}

      {/* Overlay - Click outside to close */}
      {sidebarOpen && (
        <Box
          onClick={() => setSidebarOpen(false)}
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        />
      )}

      {/* Sidebar */}
      <Sheet
        className="Sidebar"
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: '240px',
          zIndex: 10000,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRight: '1px solid',
          borderColor: 'divider',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Close button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Avatar
              variant="outlined"
              size="sm"
              src="https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fHww"
            />
            <Typography level="title-lg">{name || 'admin'}</Typography>
          </Box>
          <ColorSchemeToggle sx={{ ml: 'auto' }} />
          <IconButton onClick={() => setSidebarOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setTimeout(() => setIsSearchActive(false), 150)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filteredOtherItems.length > 0) {
              e.preventDefault();
              handleNavigation(filteredOtherItems[0].path);
              setIsSearchActive(false);
            }
          }}
        />

        {/* Search Results */}
        {isSearchActive && searchTerm.length > 0 && filteredOtherItems.length > 0 && (
          <>
            <Typography level="body-xs" sx={{ px: 1, color: "#666" }}>
              Search Results:
            </Typography>
            {filteredOtherItems.map(({ label, path }) => (
              <ListItem key={label}>
                <ListItemButton onClick={() => handleNavigation(path)}>
                  <Typography level="title-sm" color='success'>{label}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}

        {/* Navigation List */}
        <Box sx={{ minHeight: 0, overflow: 'hidden auto', flexGrow: 1 }}>
          <List size="sm" sx={{ gap: 1 }}>
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

            {/* Approvals Nested */}
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
                      sx={[open ? { transform: 'rotate(180deg)' } : { transform: 'none' }]}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <ListItem>
                    <ListItemButton onClick={() => handleNavigation('/servinvoice')}>
                      Serv Invoice
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['SERVINVOICE'] || 0}
                    </Chip>
                  </ListItem>

                  <ListItem>
                    <ListItemButton onClick={() => handleNavigation('/vendorbill')}>
                      Vendor Bill
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['VENDORBILL'] || 0}
                    </Chip>
                  </ListItem>

                  <ListItem>
                    <ListItemButton onClick={() => handleNavigation('/stkrecpnote')}>
                      STL Recp Note
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['STKRECPNOTE'] || 0}
                    </Chip>
                  </ListItem>

                  <ListItem>
                    <ListItemButton onClick={() => handleNavigation('/stylejobwork')}>
                      Style Job Work
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['STYLEJOBWORK'] || 0}
                    </Chip>
                  </ListItem>

                  <ListItem>
                    <ListItemButton onClick={() => handleNavigation('/ProcureOrder')}>
                      Procure Order
                    </ListItemButton>
                    <Chip size="sm" color="success" variant="solid">
                      {approvalMap['PROCUREORDER'] || 0}
                    </Chip>
                  </ListItem>

                  <ListItem>
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
          </List>
        </Box>

        <Divider />

        {/* User Info */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">{name || 'Admin'}</Typography>
            <Typography level="body-xs">{email || "Email not set"}</Typography>
          </Box>
          <IconButton onClick={handleLogout} title="Logout">
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </Sheet>
    </>
  );
}
