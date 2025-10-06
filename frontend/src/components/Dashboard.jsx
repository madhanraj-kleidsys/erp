import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Modal,
  ModalDialog,
  ModalClose,
  Sheet,
  Grid,
  Button,
  TabList,
} from "@mui/joy";
import {
  Logout,
  Dashboard as DashboardIcon,
  CheckCircle,
  Notifications,
  Assignment,
} from "@mui/icons-material";
import ApprovalScreen from "./ApprovalScreen";
import NotificationScreen from "./NotificationScreen.jsx";
import TaskScreen from "./TaskScreen.jsx";
import Header from './Header';
import Sidebar from './Sidebar';
 
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import SalesOrderReport from "./SalesOrderReport.jsx";
const navigationItems = [
  "SAMSUNG",
  "SALES",
  "PRODUCTION",
  "INVENTORY",
  "TNA",
  "PROCUREMENT",
  "PLANNING",
  "IE",
  "QUALITY",
  "IMPORTS",
  "SHIPMENT",
  "FINANCE",
  "ADMIN",
  "MASTERS",
  "HRMS",
];

const dashboardCards = [
  { title: "APPROVALS", count: "(12)", icon: "🟡", color: "rgba(255,255,255,0.2)", page: 1 },
  { title: "NOTIFICATIONS", count: "", icon: "🔔", color: "rgba(255,255,255,0.2)", page: 2 },
  { title: "Tasks", count: "", icon: "🔺", color: "rgba(255,255,255,0.2)", page: 3 },
  { title: "Billing", count: "", icon: "💵", color: "rgba(255,255,255,0.2)", page: 4 },
  { title: "Sales order Report", count: "", icon: "🧾", color: "rgba(255,255,255,0.2)", page: 5 },
  // { title: "UPCOMING", count: "", icon: "📅", color: "rgba(255,228,181,0.25)", page: 0 },
];

// Card floating style
const floatingCardSx = {
  p: 2,
  borderRadius: "md",
  bgcolor: "rgba(255 255 255 / 0.15)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 40px 0 rgba(70, 130, 180, 0.6), 0 0 20px rgba(70, 130, 180, 0.4)",
    borderColor: "rgba(70, 130, 180, 0.3)",
  },
};

// Small card style
const smallCardSx = {
  p: 1.5,
  borderRadius: "sm",
  border: "1px solid",
  borderColor: "neutral.300",
  minHeight: 120,
  bgcolor: "white",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: "md",
    transform: "translateY(-2px)",
  },
};

export default function Dashboard({ user, onLogout }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleProfileMenuClose();
    onLogout();
  };

  const handleCardClick = (page) => {
    setCurrentPage(page);
  };

  const generateCardData = () => {
    const suppliers = [
      "MUNESWARAN",
      "TEXTILE CORP",
      "FASHION MILL",
      "COIMBATORE MILLS",
      "TIRUPUR TEXTILES",
    ];
    const items = [
      "Cotton Fabric Order",
      "Yarn Supply Request",
      "Garment Accessories",
      "Thread Purchase",
      "Button Supply",
    ];

    return Array.from({ length: 20 }, (_, index) => {
      const supplier = suppliers[index % suppliers.length];
      const item = items[index % items.length];
      const poNumber = `SKPL-BBG-PO-2526-${354 + index}`;

      return {
        id: index + 1,
        supplier,
        item,
        poNumber,
        date: `2025-08-${String(10 + (index % 5)).padStart(2, "0")}`,
        level: index % 2 === 0 ? "Second Level" : "First Level",
        description: `${item} for garment production. Quality requirements: Premium grade material with proper certifications. Delivery timeline: 15-20 business days.`,
        amount: `$${(Math.random() * 10000 + 2000).toFixed(0)}`,
        category: index % 3 === 0 ? "Raw Material" : index % 3 === 1 ? "Accessories" : "Services",
      };
    });
  };

  const cardData = generateCardData();

  // Other screens
  const commonProps = {
    onBack: () => setCurrentPage(0),
    onNavChange: setCurrentPage,
    user,
  };

  return (

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


          
    <Sheet
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(1  #6cf7e9ff 100%)",
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
          // background: "rgba(30 60 114 / 0.85)",
           background: "#48c6e9",
            color: "#ffffffff",
          borderBottom: "1px solid rgba(255 255 255 / 0.15)",
          boxShadow: "0 0 10px rgba(149, 241, 243, 0.7)",
        }}
      >
        <Typography level="h6" fontWeight="lg" sx={{ letterSpacing: "0.1em", fontSize: { xs: '0.8rem', sm: '1.4rem' } }}>
          SKPL - FashionONE | SHAKTHI KNITTING PRIVATE LIMITED
        </Typography>

        <IconButton
          variant="outlined"
          color="primary"
          onClick={handleProfileMenuOpen}
          size="sm"
          sx={{
            background: "rgba(255 255 255 / 0.85)",
            color: "#48c6e9",
            "&:hover": {
              background: "rgba(255 255 255 / 1)",
            },
          }}
        >
          <Avatar sx={{ background: "transparent", color: "#48c6e9", fontSize: '0.8rem' }}>
            {user?.name?.charAt(0) || "U"}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          variant="outlined"
          sx={{
            mt: "45px",
            // background: "rgba(30 60 114 / 0.95)",
           background: "#95c8d5ff",

            backdropFilter: "blur(12px)",
            color: "white",
          }}
        > 
          <MenuItem
            onClick={handleLogout}
            sx={{
              color: "white",
              gap: 1,
              "&:hover": {
                background: "#334448ff",
              },
            }}
          >
            <Logout fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
        
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


      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          background: "rgba(255 255 255 / 0.05)",
          backdropFilter: "blur(10px)",
        }}
      >
        {currentPage === 0 && (
          <>
            {/* Top summary cards */}
            {/* <Grid container spacing={2} sx={{ mb: 5 }}>
              {dashboardCards.map(({ title, count, icon, color, page }, i) => (
                <Grid xs={12} sm={6} md={3} key={i}>
                  <Sheet
                    variant="soft"
                    sx={{
                      ...floatingCardSx,
                      background: color,
                      color: "#073763",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontWeight: "bold",
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      height: 80,
                    }}
                    onClick={() => handleCardClick(page)}
                  >
                    <Box sx={{ fontSize: "1.4rem" }}>{icon}</Box>
                    {title} {count}
                  </Sheet>
                </Grid>
              ))}
            </Grid> */}

            {/* Place your purchase order cards grid here */}
             {/* Smaller Content Cards Grid */}
            <Typography level="h3" sx={{ textAlign: 'center', mt: 4, mb: 3, color: "#000000ff" }}>
           Dashboard
            </Typography>

            
            <Grid container spacing={1} mb={3}>
              {cardData.map((card, index) => (
                <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                  <Sheet
                    variant="outlined"
                    sx={smallCardSx}
                    onClick={() => setSelectedCard(card)}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          mr: 1,
                          fontSize: "1rem",
                          bgcolor: "neutral",
                        }}
                      >
                      🧑🏻
                      </Avatar>
                      <Typography
                        level="body2"
                        sx={{ color:"#11d7ffff" ,fontWeight: "bold", fontSize: "0.8rem" }}
                      >
                        {card.supplier}
                      </Typography>
                    </Box>

                    <Typography
                      level="body3"
                      sx={{
                        bgcolor: "primary.50",
                        px: 0.5,
                        py: 0.2,
                        borderRadius: "xs",
                        display: "inline-block",
                        mb: 1,
                        fontSize: "0.65rem",
                      }}
                    >
                      POM
                    </Typography>

                    <Typography
                      level="body2"
                      sx={{ mb: 1, fontSize: "0.75rem", lineHeight: 1.2 }}
                    >
                      {card.level} : PO No. {card.poNumber} dated{" "}
                      {card.date} for {card.item}. Kindly review
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        level="body3"
                        sx={{ fontSize: "0.65rem" }}
                      >
                        {index + 1}/5
                      </Typography>
                      <Typography
                        level="body3"
                        sx={{ fontSize: "0.65rem", color: "neutral.500" }}
                      >
                        2025-08-12 16:45:{24 + index}0
                      </Typography>
                    </Box>
                  </Sheet>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {currentPage === 1 && <ApprovalScreen {...commonProps} />}
        {currentPage === 2 && <NotificationScreen {...commonProps} />}
        {currentPage === 3 && <TaskScreen {...commonProps} />}
        {currentPage === 4 && <SalesOrderReport { ...commonProps} /> }
      </Box>

      {/* Card Details Modal */}
      <Modal open={Boolean(selectedCard)} onClose={() => setSelectedCard(null)}>
        <ModalDialog
          variant="outlined"
          color="primary"
          sx={{
            background: "rgba(255, 255, 255, 1)",
            border: "1px solid rgba(134, 214, 238, 0.7)",
            backdropFilter: "blur(1px)",
            // maxWidth: 500,
            mx: 2,
          }}
        >
          <ModalClose />
          <Typography
            component="h2"
            level="h4"
            fontWeight="xl"
            mb={2}
            sx={{ color: "#48c6e9" }}
          >
            Purchase Order Details
          </Typography>
          {selectedCard && (
            <Grid container spacing={2}  color="#101010ff">
              <Grid xs={12}>
                <Typography level="h4" mb={2}>
                  PO No. {selectedCard.poNumber}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography mb={1}>
                  <strong>Supplier:</strong> {selectedCard.supplier}
                </Typography>
                <Typography mb={1}>
                  <strong>Item:</strong> {selectedCard.item}
                </Typography>
                <Typography mb={1}>
                  <strong>Level:</strong> {selectedCard.level}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography mb={1} color="#06dd1fff">
                  <strong>Amount:</strong> {selectedCard.amount}
                </Typography>
                <Typography mb={1}>
                  <strong>Date:</strong> {selectedCard.date}
                </Typography>
                <Typography mb={1}>
                  <strong>Category:</strong> {selectedCard.category}
                </Typography>
              </Grid>
              <Grid xs={12}   >
                <Typography color="#12f52dff"
                  sx={{
                    p: 2,
                    background: "rgba(143, 245, 139, 0.43)",
                    
                    borderRadius: 10,
                    fontSize: "0.9rem",
                  }}
                >
                  <strong>Description:</strong> {selectedCard.description}
                </Typography>
              </Grid>
            </Grid>
          )}
          <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: 'wrap' }}>
            <Button variant="solid" color="primary" sx={{ textTransform: "none" }}>
              View Details
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              sx={{ ml: "auto" }}
              onClick={() => setSelectedCard(null)}
            >
              Close
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
      
    </Sheet>
    </Box >
    
    </Box >
     </CssVarsProvider>
  );
}
