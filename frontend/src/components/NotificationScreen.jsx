 

// import React, { useState } from "react";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Grid,
//   Paper,
//   Avatar,
//   Button,
//   Modal,
//   Divider,
//   Tabs,
//   Tab,
//   Badge,
//   Drawer,
// } from "@mui/material";
// import { useTheme, useMediaQuery } from "@mui/material";
// import { ArrowBack, Info, Warning, Error, Menu as MenuIcon } from "@mui/icons-material";
// import cardStyle from "../theme/CardStyles";

// export default function NotificationScreen({ onBack, onNavChange }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [currentFilter, setCurrentFilter] = useState("all");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const filters = [
//     { id: "all", label: "All Notifications", count: 28 },
//     { id: "unread", label: "Unread", count: 18 },
//     { id: "read", label: "Read", count: 10 },
//   ];

//   const generateNotificationData = () => {
//     const notifications = [
//       { type: "warning", title: "Production Line Maintenance", message: "Knitting machine #3 maintenance Sunday 6AM", department: "Production", priority: "High" },
//       { type: "info", title: "Fabric Quality Check Complete", message: "Cotton Batch #FB-2025-045 quality inspection completed - 98% pass rate", department: "Quality", priority: "Medium" },
//       { type: "error", title: "Inventory Alert: Low Stock", message: "Yarn stock for YRN-CTN-001 below minimum threshold - Current: 150kg", department: "Inventory", priority: "High" },
//       { type: "info", title: "Export Order Dispatch", message: "Export Order #EXP-2025-789 dispatched successfully - Track: TRK123456789", department: "Export", priority: "Low" },
//       { type: "warning", title: "Thread Quality Issue", message: "Thread batch #THR-2025-123 failed tensile strength test", department: "Quality", priority: "High" },
//       { type: "info", title: "New Buyer Order Received", message: "H&M placed order for 50,000 units - Order #HM-2025-456", department: "Sales", priority: "Medium" },
//       { type: "error", title: "Power Supply Interruption", message: "Scheduled power maintenance will affect production line 2", department: "Maintenance", priority: "High" },
//       { type: "info", title: "Dyeing Process Complete", message: "Fabric dyeing batch #DYE-2025-089 completed successfully", department: "Dyeing", priority: "Low" },
//     ];
//     const data = [];
//     for (let i = 0; i < 25; i++) {
//       const n = notifications[i % notifications.length];
//       data.push({
//         id: i + 1,
//         ...n,
//         status: i % 3 === 0 ? "Read" : "Unread",
//         date: `${2 + (i % 60)} mins ago`,
//         timestamp: `2025-08-13 ${String(8 + (i % 12)).padStart(2, '0')}:${String(15 + (i % 45)).padStart(2, '0')}:${String(10 + (i % 50)).padStart(2, '0')}`
//       });
//     }
//     return data;
//   };

//   const allData = generateNotificationData();
//   const dummyData = {
//     all: allData,
//     unread: allData.filter(item => item.status === "Unread"),
//     read: allData.filter(item => item.status === "Read"),
//   };
//   const currentData = dummyData[currentFilter] || [];

//   const getTypeIcon = (type) => ({ info: <Info />, warning: <Warning />, error: <Error /> }[type] || <Info />);
//   const getTypeColor = (type) => ({ info: "#2196f3", warning: "#ff9800", error: "#f44336" }[type] || "#2196f3");
//   const getPriorityColor = (priority) => ({ High: "#f44336", Medium: "#ff9800", Low: "#4caf50" }[priority] || "#2196f3");

//   const renderSidebar = () => (
//     <Box sx={{ width: 200, p: 1 }}>
//       <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem", fontWeight: "bold" }}>
//         Filter Notifications
//       </Typography>
//       {filters.map((filter) => (
//         <Button
//           key={filter.id}
//           fullWidth
//           variant={currentFilter === filter.id ? "contained" : "text"}
//           sx={{
//             justifyContent: "flex-start",
//             mb: 1,
//             textTransform: "none",
//             fontWeight: 600,
//             fontSize: "0.85rem",
//             bgcolor: currentFilter === filter.id ? "#48c6e9" : "transparent",
//             color: currentFilter === filter.id ? "white" : "#333",
//             "&:hover": { bgcolor: currentFilter === filter.id ? "#44c2fd" : "#e3e3e3" },
//           }}
//           onClick={() => {
//             setCurrentFilter(filter.id);
//             setDrawerOpen(false);
//           }}
//         >
//           {filter.id === "unread" ? (
//             <Badge badgeContent={filter.count} color="error" sx={{ mr: 1 }}>
//               {filter.label}
//             </Badge>
//           ) : (
//             `${filter.label} (${filter.count})`
//           )}
//         </Button>
//       ))}
//     </Box>
//   );

//   return (
//     <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>

//       {/* Header */}
//       <AppBar position="static" sx={{ background: "linear-gradient(135deg, #48c6e9 0%, #44c2fd 100%)" }}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={onBack} sx={{ mr: 2 }}>
//             <ArrowBack />
//           </IconButton>
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
//             KleidSys Technologies - Notification Center
//           </Typography>
//           {isMobile && (
//             <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
//               <MenuIcon />
//             </IconButton>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* Menu Bar */}
//       <Box sx={{ bgcolor: "#2c5aa0", color: "white", py: 1, px: { xs: 1, sm: 2 }, overflowX: "auto" }}>
//         <Box sx={{ display: "flex", gap: { xs: 2, sm: 4 }, alignItems: "center" }}>
//           {["SAMSUNG", "SALES", "PRODUCTION", "INVENTORY", "TNA", "PROCUREMENT", "PLANNING", "IE", "QUALITY"].map((item) => (
//             <Typography key={item} variant="body2" sx={{ fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
//               {item}
//             </Typography>
//           ))}
//         </Box>
//       </Box>

//       {/* Tabs */}
//       <Box sx={{ bgcolor: "white", borderBottom: 1, borderColor: "divider" }}>
//         <Box sx={{ px: 1 }}>
//           <Tabs value={2} onChange={(e, v) => onNavChange(v)} variant="scrollable" scrollButtons allowScrollButtonsMobile>
//             <Tab label="Dashboard" />
//             <Tab label="Approvals" />
//             <Tab label="Notifications" />
//             <Tab label="Tasks" />
//           </Tabs>
//         </Box>
//       </Box>

//       {/* Main Section */}
//       <Box sx={{ display: "flex", minHeight: "calc(100vh - 160px)" }}>
//         {/* Sidebar visible only on large screens */}
//         {!isMobile && (
//           <Box sx={{ width: 200, bgcolor: "#f5f5f5", borderRight: "1px solid #e0e0e0" }}>
//             {renderSidebar()}
//           </Box>
//         )}

//         {/* Drawer for mobile */}
//         <Drawer
//           anchor="left"
//           open={drawerOpen}
//           onClose={() => setDrawerOpen(false)}
//           ModalProps={{ keepMounted: true }}
//           sx={{ '& .MuiDrawer-paper': { bgcolor: "#f5f5f5" } }}
//         >
//           {renderSidebar()}
//         </Drawer>

//         {/* Cards Grid */}
//         <Box sx={{ flex: 1, p: { xs: 1, sm: 2 } }}>
//           <Grid container spacing={1}>
//             {currentData.map((item) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} display="flex" justifyContent="center">
//                 <Paper
//                   elevation={1}
//                   sx={{
//                     ...cardStyle,
//                     width: { xs: "100%", sm: "auto" },
//                     maxWidth: { xs: "100%", sm: cardStyle.maxWidth },
//                     minWidth: { xs: "100%", sm: cardStyle.minWidth },
//                     borderLeft: `4px solid ${getTypeColor(item.type)}`,
//                     minHeight: 160,
//                     bgcolor: item.status === "Unread" ? "#f3f8ff" : "white",
//                   }}
//                   onClick={() => setSelectedItem(item)}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                     <Avatar sx={{ bgcolor: getTypeColor(item.type), width: 28, height: 28, mr: 1 }}>
//                       {getTypeIcon(item.type)}
//                     </Avatar>
//                     <Typography variant="subtitle2" fontWeight="bold" fontSize="0.8rem">
//                       {item.title.length > 15 ? item.title.substring(0, 15) + "..." : item.title}
//                     </Typography>
//                   </Box>
//                   <Typography color="text.secondary" variant="body2" sx={{ mb: 1, fontSize: "0.75rem", lineHeight: 1.3 }}>
//                     {item.message.length > 50 ? item.message.substring(0, 50) + "..." : item.message}
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
//                     <Paper sx={{
//                       px: 0.5, py: 0.2,
//                       bgcolor: getPriorityColor(item.priority) + "20",
//                       color: getPriorityColor(item.priority),
//                       borderRadius: 1,
//                       fontSize: "0.65rem",
//                     }}>
//                       {item.priority}
//                     </Paper>
//                     <Paper sx={{
//                       px: 0.5, py: 0.2,
//                       bgcolor: "#e3f2fd",
//                       color: "#1976d2",
//                       borderRadius: 1,
//                       fontSize: "0.65rem",
//                     }}>
//                       {item.department}
//                     </Paper>
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography variant="caption" color="text.secondary" fontSize="0.65rem">
//                       {item.date}
//                     </Typography>
//                     <Paper sx={{
//                       px: 1, py: 0.2,
//                       bgcolor: item.status === "Unread" ? "#ffebee" : "#e8f5e8",
//                       color: item.status === "Unread" ? "#d32f2f" : "#2e7d32",
//                       borderRadius: 1,
//                     }}>
//                       <Typography variant="caption" fontWeight="bold" fontSize="0.65rem">
//                         {item.status}
//                       </Typography>
//                     </Paper>
//                   </Box>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Load More */}
//           <Box sx={{ textAlign: "center", mt: 3 }}>
//             <Button variant="outlined" sx={{
//               px: 4, py: 1.5, borderColor: "#48c6e9", color: "#48c6e9", fontWeight: "bold",
//               "&:hover": { bgcolor: "#48c6e9", color: "white" }
//             }}>
//               Load More Notifications ({currentData.length} of {currentData.length + 75})
//             </Button>
//           </Box>
//         </Box>
//       </Box>

//       {/* Modal */}
//       <Modal open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)}>
//         <Paper sx={{
//           position: "absolute",
//           top: "50%", left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "90%", sm: 600 },
//           p: 4,
//           borderRadius: 2,
//         }}>
//           <Typography variant="h5" fontWeight="bold" mb={2} color="#48c6e9">
//             Notification Details
//           </Typography>
//           <Divider sx={{ mb: 3 }} />
//           {selectedItem && (
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant="h6" mb={2}>{selectedItem.title}</Typography>
//                 <Typography sx={{ mb: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
//                   {selectedItem.message}
//                 </Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Department:</strong> {selectedItem.department}</Typography>
//                 <Typography><strong>Priority:</strong> {selectedItem.priority}</Typography>
//                 <Typography><strong>Type:</strong> {selectedItem.type}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography><strong>Status:</strong> {selectedItem.status}</Typography>
//                 <Typography><strong>Time:</strong> {selectedItem.date}</Typography>
//                 <Typography><strong>Timestamp:</strong> {selectedItem.timestamp}</Typography>
//               </Grid>
//             </Grid>
//           )}
//           <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
//             <Button variant="contained" sx={{ bgcolor: "#48c6e9" }}>Mark as Read</Button>
//             <Button variant="outlined" sx={{ ml: "auto" }} onClick={() => setSelectedItem(null)}>Close</Button>
//           </Box>
//         </Paper>
//       </Modal>
//     </Box>
//   );
// }


import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Avatar,
  Button,
  Modal,
  ModalDialog,
  ModalClose,
  Divider,
  Tabs,
  Tab,
  Sheet,
  Chip,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,TabList,
  ListItemContent,
  Input
} from "@mui/joy";
import {
  ArrowBack,
  Info,
  Warning,
  Error,
  Menu as MenuIcon,
  SearchRounded,
  Notifications as NotificationsIcon
} from "@mui/icons-material";


import Header from './Header';
import Sidebar from './Sidebar';
 
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';


export default function NotificationScreen({ onBack, onNavChange, user, onLogout }) {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters = [
    { id: "all", label: "All Notifications", count: 28 },
    { id: "unread", label: "Unread", count: 18 },
    { id: "read", label: "Read", count: 10 },
  ];

//   const navigationItems = [
//     "SAMSUNG", "SALES", "PRODUCTION", "INVENTORY", "TNA", 
//     "PROCUREMENT", "PLANNING", "IE", "QUALITY", "IMPORTS", 
//     "SHIPMENT", "FINANCE", "ADMIN", "MASTERS", "HRMS"
//   ];

  const generateNotificationData = () => {
    const notifications = [
      { type: "warning", title: "Production Line Maintenance", message: "Knitting machine #3 maintenance Sunday 6AM", department: "Production", priority: "High" },
      { type: "info", title: "Fabric Quality Check Complete", message: "Cotton Batch #FB-2025-045 quality inspection completed - 98% pass rate", department: "Quality", priority: "Medium" },
      { type: "error", title: "Inventory Alert: Low Stock", message: "Yarn stock for YRN-CTN-001 below minimum threshold - Current: 150kg", department: "Inventory", priority: "High" },
      { type: "info", title: "Export Order Dispatch", message: "Export Order #EXP-2025-789 dispatched successfully - Track: TRK123456789", department: "Export", priority: "Low" },
      { type: "warning", title: "Thread Quality Issue", message: "Thread batch #THR-2025-123 failed tensile strength test", department: "Quality", priority: "High" },
      { type: "info", title: "New Buyer Order Received", message: "H&M placed order for 50,000 units - Order #HM-2025-456", department: "Sales", priority: "Medium" },
      { type: "error", title: "Power Supply Interruption", message: "Scheduled power maintenance will affect production line 2", department: "Maintenance", priority: "High" },
      { type: "info", title: "Dyeing Process Complete", message: "Fabric dyeing batch #DYE-2025-089 completed successfully", department: "Dyeing", priority: "Low" },
    ];
    const data = [];
    for (let i = 0; i < 25; i++) {
      const n = notifications[i % notifications.length];
      data.push({
        id: i + 1,
        ...n,
        status: i % 3 === 0 ? "Read" : "Unread",
        date: `${2 + (i % 60)} mins ago`,
        timestamp: `2025-08-13 ${String(8 + (i % 12)).padStart(2, '0')}:${String(15 + (i % 45)).padStart(2, '0')}:${String(10 + (i % 50)).padStart(2, '0')}`
      });
    }
    return data;
  };

  const allData = generateNotificationData();
  const dummyData = {
    all: allData,
    unread: allData.filter(item => item.status === "Unread"),
    read: allData.filter(item => item.status === "Read"),
  };
  const currentData = dummyData[currentFilter] || [];

  const getTypeIcon = (type) => ({ info: <Info />, warning: <Warning />, error: <Error /> }[type] || <Info />);
  const getTypeColor = (type) => ({ info: "primary", warning: "warning", error: "danger" }[type] || "primary");
  const getPriorityColor = (priority) => ({ High: "danger", Medium: "warning", Low: "success" }[priority] || "primary");

  const renderSidebar = () => (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography level="h6" sx={{ mb: 2, fontWeight: "bold", color: "#48c6e9" }}>
        Filter Notifications
      </Typography>
      <List>
        {filters.map((filter) => (
          <ListItem key={filter.id}>
            <ListItemButton
              selected={currentFilter === filter.id}
              onClick={() => {
                setCurrentFilter(filter.id);
                setDrawerOpen(false);
              }}
              sx={{
                borderRadius: "sm",
                bgcolor: currentFilter === filter.id ? "primary.100" : "transparent",
                "&:hover": { bgcolor: "primary.50" }
              }}
            >
              <ListItemContent>
                <Typography level="title-sm">
                  {filter.label}
                </Typography>
              </ListItemContent>
              <Chip size="sm" color={filter.id === "unread" ? "danger" : "neutral"} variant="solid">
                {filter.count}
              </Chip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Card floating style (same as dashboard)
  const floatingCardSx = {
    p: 2,
    borderRadius: "md",
    bgcolor: "rgba(255 255 255 / 0.15)",
    // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      borderColor: "rgba(242, 13, 13, 0.3)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    // border: "1px solid rgba(255, 255, 255, 0.18)",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 40px 0 rgba(70, 130, 180, 0.6), 0 0 20px rgba(70, 130, 180, 0.4)",
      borderColor: "rgba(97, 207, 241, 1)",
    },
  };
  return (
         <CssVarsProvider disableTransitionOnChange>
              <CssBaseline />
              <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Header />
                <Sidebar />
    <Sheet
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: " #ffffffff",
        color: "white",
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          py: 2,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(10px)",
          background: "rgba(30 60 114 / 0.85)",
          borderBottom: "1px solid rgba(255 255 255 / 0.15)",
          boxShadow: "0 0 10px rgba(72,198,233,0.7)",
        }}
      >
        <Typography level="h6" fontWeight="lg" sx={{ letterSpacing: "0.1em", fontSize: { xs: '0.8rem', sm: '1rem' } }}>
          KleidSys Technologies - FashionONE | SHAKTHI KNITTING PRIVATE LIMITED
        </Typography>
        {/* <IconButton
          variant="outlined"
          color="neutral"
          onClick={onBack}
          size="sm"
          sx={{
            background: "rgba(255 255 255 / 0.85)",
            color: "#48c6e9",
            "&:hover": {
              background: "rgba(255 255 255 / 1)",
            },
          }}
        >
          <ArrowBack />
        </IconButton> */}
      </Box>

      {/* Navigation Menu */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 1,
          px: 2,
          py: 1,
          background: "rgba(72, 198, 233, 0.15)",
          color: "#073763",
          borderBottom: "1px solid rgba(72,198,233,0.4)",
          fontWeight: "600",
          userSelect: "none",
          whiteSpace: "nowrap",
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        {/* {navigationItems.map((item) => (
          <Typography
            key={item}
            sx={{
              cursor: "pointer",
              py: 0.5,
              px: 1,
              borderRadius: "sm",
              transition: "background-color 0.3s ease",
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              "&:hover": {
                background: "rgba(68, 194, 253, 0.6)",
                color: "white",
              },
            }}
          >
            {item}
          </Typography>
        ))} */}
      </Box>

      {/* Tabs */}
      {/* <Tabs
        value={2}
        onChange={(e, value) => onNavChange(value)}
        sx={{ px: 2, background: "rgba(255 255 255 / 0.1)" }}
      >
        <TabList>
          <Tab value={0}>Dashboard</Tab>
          <Tab value={1}>Approvals</Tab>
          <Tab value={2}>
            <NotificationsIcon sx={{ mr: 1 }} />
            Notifications
          </Tab>
          <Tab value={3}>Tasks</Tab>
        </TabList>
      </Tabs> */}

      {/* Search Bar */}
      <Box sx={{ px: 2, py: 1, background: "rgba(255 255 255 / 0.05)" }}>
        <Input
          size="sm"
          placeholder="Search notifications..."
          startDecorator={<SearchRounded />}
          sx={{
            bgcolor: "rgba(255 255 255 / 0.1)",
            borderColor: "rgba(255 255 255 / 0.2)",
            color: "white",
            '&::placeholder': { color: 'rgba(255 255 255 / 0.7)' }
          }}
        />
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar visible only on large screens */}
        <Box sx={{ 
          display: { xs: 'none', md: 'block' }, 
          width: 250, 
          bgcolor: "rgba(255 255 255 / 0.05)",
          borderRight: "1px solid rgba(255 255 255 / 0.1)",
          backdropFilter: "blur(10px)"
        }}>
          {renderSidebar()}
        </Box>

        {/* Drawer for mobile */}
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{ 
            '& .MuiDrawer-paper': { 
              bgcolor: "rgba(30 60 114 / 0.95)",
              backdropFilter: "blur(12px)",
              color: "white"
            } 
          }}
        >
          {renderSidebar()}
        </Drawer>

        {/* Cards Grid */}
        <Box sx={{ 
          flex: 1, 
          p: 2, 
          background: "rgba(255 255 255 / 0.05)",
          backdropFilter: "blur(10px)",
          overflow: "auto"
        }}>
          <Grid container spacing={2}>
            {currentData.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Sheet
                  sx={{
                    ...floatingCardSx,
                    bgcolor: item.status === "Unread" ? "rgba(255 255 255 / 0.2)" : "rgba(255 255 255 / 0.15)",
                    borderLeft: `4px solid`,
                    borderLeftColor: `var(--joy-palette-${getTypeColor(item.type)}-500)`,
                    minHeight: 180,
                  }}
                  onClick={() => setSelectedItem(item)}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${getTypeColor(item.type)}.500`, 
                        width: 32, 
                        height: 32, 
                        mr: 1.5 
                      }}
                    >
                      {getTypeIcon(item.type)}
                    </Avatar>
                    <Typography level="title-sm" fontWeight="bold">
                      {item.title}
                    </Typography>
                  </Box>
                  
                  <Typography level="body2" sx={{ 
                    mb: 2, 
                    lineHeight: 1.4,
                    color: "text.primary",
                    opacity: 0.9
                  }}>
                    {item.message}
                  </Typography>
                  
                  <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      size="sm"
                      color={getPriorityColor(item.priority)}
                      variant="soft"
                    >
                      {item.priority}
                    </Chip>
                    <Chip
                      size="sm"
                      color="primary"
                      variant="outlined"
                    >
                      {item.department}
                    </Chip>
                  </Box>
                  
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography level="body3" sx={{ opacity: 0.8 }}>
                      {item.date}
                    </Typography>
                    <Chip
                      size="sm"
                      color={item.status === "Unread" ? "danger" : "success"}
                      variant="soft"
                    >
                      {item.status}
                    </Chip>
                  </Box>
                </Sheet>
              </Grid>
            ))}
          </Grid>

          {/* Load More */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                borderWidth: 2,
                "&:hover": {
                  bgcolor: "primary.500",
                  color: "white",
                  borderWidth: 2
                }
              }}
            >
              Load More Notifications ({currentData.length} of {currentData.length + 75})
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)}>
        <ModalDialog
          variant="outlined"
          color="primary"
          sx={{
            background: "#ffffffff",
            border: "1px solid rgba(72,198,233,0.7)",
            backdropFilter: "blur(12px)",
            maxWidth: 600,
            mx: 2,
            color: "white",
          }}
        >
          <ModalClose />
          <Typography level="h4" fontWeight="xl" mb={2} sx={{ color: "#48c6e9" }}>
            Notification Details
          </Typography>
          
          <Divider sx={{ mb: 3 , color:"#000000ff" }} />

          {selectedItem && (
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography level="h6" mb={2}>{selectedItem.title}</Typography>
                <Typography
                  level="body2"
                  sx={{
                    p: 2,
                    background: "rgba(148, 251, 142, 0.25)",
                    color:"#000000ff",
                    borderRadius: "sm",
                    mb: 3
                  }}
                >
                  {selectedItem.message}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography level="body2" mb={1}>
                  <strong>Department:</strong> {selectedItem.department}
                </Typography>
                <Typography level="body2" mb={1}>
                  <strong>Priority:</strong> {selectedItem.priority}
                </Typography>
                <Typography level="body2" mb={1}>
                  <strong>Type:</strong> {selectedItem.type}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography level="body2" mb={1}>
                  <strong>Status:</strong> {selectedItem.status}
                </Typography>
                <Typography level="body2" mb={1}>
                  <strong>Time:</strong> {selectedItem.date}
                </Typography>
                <Typography level="body2" mb={1}>
                  <strong>Timestamp:</strong> {selectedItem.timestamp}
                </Typography>
              </Grid>
            </Grid>
          )}

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button variant="solid" color="primary">
              Mark as Read
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              sx={{ ml: "auto" }}
              onClick={() => setSelectedItem(null)}
            >
              Close
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Sheet>

        </Box >
         </CssVarsProvider>

  );
}