
import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Paper,
  Avatar,
  Button,
  Modal,
  Divider,
  LinearProgress,
  Chip,
  Tabs,
  Tab,
  Drawer,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  ArrowBack,
  Assignment,
  CheckCircle,
  Schedule,
  Menu as MenuIcon
} from "@mui/icons-material";

import cardStyle from "../theme/CardStyles";


export default function TaskScreen({ onBack, onNavChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentFilter, setCurrentFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters = [
    { id: "all", label: "All Tasks", count: 32 },
    { id: "pending", label: "In Progress", count: 18 },
    { id: "completed", label: "Completed", count: 14 },
  ];

  const generateTaskData = () => {
    const tasks = [
      { title: "Cotton Fabric Quality Inspection", type: "Quality Control", priority: "High", assignee: "Ravi Kumar", department: "QC", description: "Inspect cotton fabric batches for color consistency and thread count" },
      { title: "Knitting Machine Calibration", type: "Maintenance", priority: "Medium", assignee: "Suresh Babu", department: "Production", description: "Calibrate knitting machines for new yarn specifications" },
      { title: "Export Documentation Prep", type: "Documentation", priority: "High", assignee: "Priya Singh", department: "Export", description: "Prepare export documents for garment shipment to UK" },
      { title: "Yarn Inventory Audit", type: "Inventory", priority: "Medium", assignee: "Lakshmi Devi", department: "Warehouse", description: "Conduct monthly yarn inventory audit and update system" },
      { title: "Dyeing Process Optimization", type: "Process", priority: "Low", assignee: "Murugan S", department: "Dyeing", description: "Optimize dyeing process to reduce water consumption" },
      { title: "New Buyer Sample Preparation", type: "Sampling", priority: "High", assignee: "Kavitha R", department: "Sampling", description: "Prepare samples for Zara's new collection requirements" },
      { title: "Cutting Room Efficiency Study", type: "Analysis", priority: "Medium", assignee: "Venkat Reddy", department: "Cutting", description: "Analyze cutting room efficiency and recommend improvements" },
      { title: "Worker Safety Training", type: "Training", priority: "High", assignee: "HR Team", department: "HR", description: "Conduct monthly safety training for production workers" },
    ];

    const data = [];
    for (let i = 0; i < 30; i++) {
      const task = tasks[i % tasks.length];
      data.push({
        id: i + 1,
        ...task,
        status: i % 4 === 0 ? "Completed" : i % 4 === 1 ? "In Progress" : "Pending",
        progress: i % 4 === 0 ? 100 : i % 4 === 1 ? Math.floor(Math.random() * 70 + 20) : 0,
        dueDate: `2025-08-${String(15 + (i % 15)).padStart(2, '0')}`,
        startDate: `2025-08-${String(5 + (i % 10)).padStart(2, '0')}`
      });
    }
    return data;
  };

  const allData = generateTaskData();
  const dummyData = {
    all: allData,
    pending: allData.filter(item => item.status === "Pending" || item.status === "In Progress"),
    completed: allData.filter(item => item.status === "Completed"),
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "#f44336";
      case "Medium": return "#ff9800";
      case "Low": return "#4caf50";
      default: return "#2196f3";
    }
  };

  const currentData = dummyData[currentFilter] || [];

  const renderSidebar = () => (
    <Box sx={{ width: 200, p: 1 }}>
      <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem", fontWeight: "bold" }}>
        Task Filters
      </Typography>
      {filters.map((filter) => (
        <Button
          key={filter.id}
          fullWidth
          variant={currentFilter === filter.id ? "contained" : "text"}
          sx={{
            justifyContent: "flex-start",
            mb: 1,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.85rem",
            bgcolor: currentFilter === filter.id ? "#48c6e9" : "transparent",
            color: currentFilter === filter.id ? "white" : "#333",
            "&:hover": { bgcolor: currentFilter === filter.id ? "#44c2fd" : "#e3e3e3" },
          }}
          onClick={() => {
            setCurrentFilter(filter.id);
            setDrawerOpen(false);
          }}
        >
          {filter.label} ({filter.count})
        </Button>
      ))}
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>

      {/* Header */}
      <AppBar position="static" sx={{ background: "linear-gradient(135deg, #48c6e9 0%, #44c2fd 100%)" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onBack} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            KleidSys Technologies - Task Management System
          </Typography>
          {isMobile && (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Menu Bar */}
      <Box sx={{ bgcolor: "#2c5aa0", color: "white", py: 1, px: { xs: 1, sm: 2 }, overflowX: "auto" }}>
        <Box sx={{ display: "flex", gap: { xs: 2, sm: 4 }, alignItems: "center" }}>
          {["SAMSUNG", "SALES", "PRODUCTION", "INVENTORY", "TNA", "PROCUREMENT", "PLANNING", "IE", "QUALITY"].map((item) => (
            <Typography key={item} variant="body2" sx={{ fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
              {item}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ bgcolor: "white", borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ px: 2 }}>
          <Tabs value={3} onChange={(e, newValue) => onNavChange(newValue)}>
            <Tab label="Dashboard" />
            <Tab label="Approvals" />
            <Tab label="Notifications" />
            <Tab label="Tasks" />
          </Tabs>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "flex", minHeight: "calc(100vh - 160px)" }}>
        {/* Sidebar on larger screens */}
        {!isMobile && (
          <Box sx={{ width: 200, bgcolor: "#f5f5f5", borderRight: "1px solid #e0e0e0" }}>
            {renderSidebar()}
          </Box>
        )}

        {/* Drawer for mobile */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { bgcolor: "#f5f5f5" } }}
        >
          {renderSidebar()}
        </Drawer>

        {/* Cards Grid */}
        <Box sx={{ flex: 1, p: { xs: 1, sm: 2 } }}>
          <Grid container spacing={1}>
            {currentData.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item.id}
                display="flex"
                justifyContent="center"
              >
                <Paper
                  elevation={1}
                  sx={{
                    ...cardStyle,
                    width: { xs: "100%", sm: "auto" },
                    maxWidth: { xs: "100%", sm: cardStyle.maxWidth },
                    minWidth: { xs: "100%", sm: cardStyle.minWidth },
                    minHeight: 160,
                    borderLeft: `4px solid ${item.status === "Completed" ? "#66bb6a" : "#48c6e9"}`,
                    "&:hover": { boxShadow: 3, bgcolor: "#f9f9f9" },
                  }}
                  onClick={() => setSelectedItem(item)}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: item.status === "Completed" ? "#66bb6a" : "#48c6e9",
                        width: 28,
                        height: 28,
                        mr: 1,
                      }}
                    >
                      {item.status === "Completed" ? <CheckCircle fontSize="small" /> : <Assignment fontSize="small" />}
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                      {item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title}
                    </Typography>
                  </Box>

                  <Typography color="text.secondary" variant="body2" sx={{ mb: 1, fontSize: "0.75rem", lineHeight: 1.3 }}>
                    {item.assignee} • {item.department}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
                    <Chip
                      label={item.priority}
                      size="small"
                      sx={{
                        bgcolor: getPriorityColor(item.priority),
                        color: "white",
                        fontSize: "0.65rem",
                        height: 20
                      }}
                    />
                    <Chip
                      label={item.type}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.65rem", height: 20 }}
                    />
                  </Box>

                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                      Progress: {item.progress}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        bgcolor: "#e3f2fd",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: item.status === "Completed" ? "#66bb6a" : "#48c6e9",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Paper sx={{
                      px: 1,
                      py: 0.2,
                      bgcolor: item.status === "Completed" ? "#e8f5e8" : item.status === "In Progress" ? "#fff3e0" : "#f3f8ff",
                      color: item.status === "Completed" ? "#2e7d32" : item.status === "In Progress" ? "#f57c00" : "#1976d2",
                      borderRadius: 1,
                    }}>
                      <Typography variant="caption" fontWeight="bold" fontSize="0.65rem">
                        {item.status}
                      </Typography>
                    </Paper>
                    <Typography variant="caption" color="text.secondary" fontSize="0.65rem">
                      Due: {item.dueDate}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Load More */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderColor: "#48c6e9",
                color: "#48c6e9",
                fontWeight: "bold",
                borderRadius: 1,
                "&:hover": { bgcolor: "#48c6e9", color: "white" },
              }}
            >
              Load More Tasks ({currentData.length} of {currentData.length + 100})
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)}>
        <Paper sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 600 },
          p: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#48c6e9" }}>
            Task Details
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {selectedItem && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {selectedItem.title}
                </Typography>
                <Typography sx={{ mb: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  {selectedItem.description}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Type:</strong> {selectedItem.type}</Typography>
                <Typography><strong>Priority:</strong> {selectedItem.priority}</Typography>
                <Typography><strong>Department:</strong> {selectedItem.department}</Typography>
                <Typography><strong>Start Date:</strong> {selectedItem.startDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><strong>Assignee:</strong> {selectedItem.assignee}</Typography>
                <Typography><strong>Due Date:</strong> {selectedItem.dueDate}</Typography>
                <Typography><strong>Status:</strong> {selectedItem.status}</Typography>
                <Typography><strong>Progress:</strong> {selectedItem.progress}%</Typography>
              </Grid>
              <Grid item xs={12}>
                <LinearProgress
                  variant="determinate"
                  value={selectedItem.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "#e3f2fd",
                    "& .MuiLinearProgress-bar": { bgcolor: "#48c6e9" },
                  }}
                />
              </Grid>
            </Grid>
          )}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button variant="contained" sx={{ bgcolor: "#48c6e9" }}>Update Progress</Button>
            <Button variant="outlined" sx={{ ml: "auto" }} onClick={() => setSelectedItem(null)}>
              Close
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}
