
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  Option,
  Input,
  Grid,
  LinearProgress,
  Chip,
  Sheet,
  FormControl,
  FormLabel,
  Autocomplete,
  extendTheme,
  IconButton,
  Modal,
  ModalDialog,
  Divider,
} from '@mui/joy';
import {
  Search,
  TrendingUp,
  Warning,
  Schedule,
  CheckCircle,
  Error,
  PendingActions,
  FilterList,
  Close,
} from '@mui/icons-material';
import Header from './Header';
import Sidebar from './Sidebar';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

// Custom theme with professional colors
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#08b3f1',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        success: {
          500: '#4caf50',
        },
        warning: {
          500: '#ff9800',
        },
        danger: {
          500: '#f44336',
        }
      },
    },
  },
});

// Mock data
const customers = [
  'H&M',
  'WALMART',
  'GROUPE AUCHAN',
  'MAX HOLDINGS & INVESTMENTS LTD',
  'KMART AUSTRALIA LIMITED'
];

const stylesByCustomer = {
  'H&M': ['Basic T-Shirt', 'Denim Jacket', 'Summer Dress', 'Casual Pants'],
  'WALMART': ['Polo Shirt', 'Cargo Pants', 'Hoodie', 'Jeans'],
  'GROUPE AUCHAN': ['Formal Shirt', 'Blazer', 'Trousers', 'Skirt'],
  'MAX HOLDINGS & INVESTMENTS LTD': ['Designer Top', 'Premium Jeans', 'Silk Scarf', 'Leather Jacket'],
  'KMART AUSTRALIA LIMITED': ['Kids T-Shirt', 'School Uniform', 'Baby Onesie', 'Sports Wear']
};

const processes = ['All', 'Sourcing', 'Fabric Store', 'Cutting', 'VAP / Printing', 'Risk Alert'];
const statuses = ['On-time', 'Delayed', 'Risk'];

// Mock data that changes based on filters
const mockDataByFilters = {
  'H&M': {
    'On-time': {
      kpi: { totalOrders: 245, fullOnRisk: 15, delayedOrders: 8, atRisk: 12 },
      processes: [
        { name: 'Sourcing', progress: 85, color: '#4caf50', risk: 'low', orders: 45, status: 'On Track' },
        { name: 'Fabric Store', progress: 72, color: '#2196f3', risk: 'medium', orders: 34, status: 'In Progress' },
        { name: 'Cutting', progress: 55, color: '#ff9800', risk: 'high', orders: 25, status: 'Behind' },
        { name: 'VAP / Printing', progress: 48, color: '#f44336', risk: 'high', orders: 20, status: 'Critical' },
        { name: 'Risk Alert', progress: 20, color: '#e91e63', risk: 'critical', orders: 8, status: 'Alert' }
      ]
    },
    'Delayed': {
      kpi: { totalOrders: 180, fullOnRisk: 25, delayedOrders: 18, atRisk: 22 },
      processes: [
        { name: 'Sourcing', progress: 65, color: '#ff9800', risk: 'medium', orders: 32, status: 'Behind' },
        { name: 'Fabric Store', progress: 45, color: '#f44336', risk: 'high', orders: 28, status: 'Critical' },
        { name: 'Cutting', progress: 30, color: '#f44336', risk: 'critical', orders: 18, status: 'Critical' },
        { name: 'VAP / Printing', progress: 25, color: '#e91e63', risk: 'critical', orders: 12, status: 'Alert' },
        { name: 'Risk Alert', progress: 45, color: '#e91e63', risk: 'critical', orders: 15, status: 'Alert' }
      ]
    },
    'Risk': {
      kpi: { totalOrders: 120, fullOnRisk: 45, delayedOrders: 35, atRisk: 40 },
      processes: [
        { name: 'Sourcing', progress: 40, color: '#f44336', risk: 'critical', orders: 20, status: 'Critical' },
        { name: 'Fabric Store', progress: 25, color: '#e91e63', risk: 'critical', orders: 15, status: 'Alert' },
        { name: 'Cutting', progress: 15, color: '#e91e63', risk: 'critical', orders: 8, status: 'Alert' },
        { name: 'VAP / Printing', progress: 10, color: '#e91e63', risk: 'critical', orders: 5, status: 'Alert' },
        { name: 'Risk Alert', progress: 80, color: '#e91e63', risk: 'critical', orders: 25, status: 'Alert' }
      ]
    }
  },
  'WALMART': {
    'On-time': {
      kpi: { totalOrders: 320, fullOnRisk: 12, delayedOrders: 5, atRisk: 8 },
      processes: [
        { name: 'Sourcing', progress: 90, color: '#4caf50', risk: 'low', orders: 65, status: 'On Track' },
        { name: 'Fabric Store', progress: 85, color: '#4caf50', risk: 'low', orders: 52, status: 'On Track' },
        { name: 'Cutting', progress: 78, color: '#2196f3', risk: 'medium', orders: 38, status: 'In Progress' },
        { name: 'VAP / Printing', progress: 72, color: '#2196f3', risk: 'medium', orders: 28, status: 'In Progress' },
        { name: 'Risk Alert', progress: 10, color: '#4caf50', risk: 'low', orders: 3, status: 'On Track' }
      ]
    },
    'Delayed': {
      kpi: { totalOrders: 280, fullOnRisk: 20, delayedOrders: 15, atRisk: 18 },
      processes: [
        { name: 'Sourcing', progress: 70, color: '#ff9800', risk: 'medium', orders: 48, status: 'Behind' },
        { name: 'Fabric Store', progress: 60, color: '#ff9800', risk: 'medium', orders: 42, status: 'Behind' },
        { name: 'Cutting', progress: 45, color: '#f44336', risk: 'high', orders: 28, status: 'Critical' },
        { name: 'VAP / Printing', progress: 35, color: '#f44336', risk: 'high', orders: 20, status: 'Critical' },
        { name: 'Risk Alert', progress: 30, color: '#f44336', risk: 'high', orders: 12, status: 'Critical' }
      ]
    },
    'Risk': {
      kpi: { totalOrders: 200, fullOnRisk: 35, delayedOrders: 28, atRisk: 32 },
      processes: [
        { name: 'Sourcing', progress: 50, color: '#f44336', risk: 'high', orders: 35, status: 'Critical' },
        { name: 'Fabric Store', progress: 35, color: '#e91e63', risk: 'critical', orders: 25, status: 'Alert' },
        { name: 'Cutting', progress: 25, color: '#e91e63', risk: 'critical', orders: 18, status: 'Alert' },
        { name: 'VAP / Printing', progress: 20, color: '#e91e63', risk: 'critical', orders: 12, status: 'Alert' },
        { name: 'Risk Alert', progress: 65, color: '#e91e63', risk: 'critical', orders: 22, status: 'Alert' }
      ]
    }
  },
  'GROUPE AUCHAN': {
    'On-time': {
      kpi: { totalOrders: 180, fullOnRisk: 10, delayedOrders: 6, atRisk: 9 },
      processes: [
        { name: 'Sourcing', progress: 88, color: '#4caf50', risk: 'low', orders: 38, status: 'On Track' },
        { name: 'Fabric Store', progress: 75, color: '#2196f3', risk: 'medium', orders: 32, status: 'In Progress' },
        { name: 'Cutting', progress: 68, color: '#2196f3', risk: 'medium', orders: 28, status: 'In Progress' },
        { name: 'VAP / Printing', progress: 60, color: '#ff9800', risk: 'medium', orders: 22, status: 'Behind' },
        { name: 'Risk Alert', progress: 15, color: '#4caf50', risk: 'low', orders: 5, status: 'On Track' }
      ]
    },
    'Delayed': {
      kpi: { totalOrders: 150, fullOnRisk: 18, delayedOrders: 12, atRisk: 15 },
      processes: [
        { name: 'Sourcing', progress: 65, color: '#ff9800', risk: 'medium', orders: 28, status: 'Behind' },
        { name: 'Fabric Store', progress: 50, color: '#f44336', risk: 'high', orders: 25, status: 'Critical' },
        { name: 'Cutting', progress: 40, color: '#f44336', risk: 'high', orders: 20, status: 'Critical' },
        { name: 'VAP / Printing', progress: 30, color: '#e91e63', risk: 'critical', orders: 15, status: 'Alert' },
        { name: 'Risk Alert', progress: 35, color: '#f44336', risk: 'high', orders: 10, status: 'Critical' }
      ]
    },
    'Risk': {
      kpi: { totalOrders: 110, fullOnRisk: 30, delayedOrders: 25, atRisk: 28 },
      processes: [
        { name: 'Sourcing', progress: 45, color: '#f44336', risk: 'high', orders: 22, status: 'Critical' },
        { name: 'Fabric Store', progress: 30, color: '#e91e63', risk: 'critical', orders: 18, status: 'Alert' },
        { name: 'Cutting', progress: 20, color: '#e91e63', risk: 'critical', orders: 12, status: 'Alert' },
        { name: 'VAP / Printing', progress: 15, color: '#e91e63', risk: 'critical', orders: 8, status: 'Alert' },
        { name: 'Risk Alert', progress: 70, color: '#e91e63', risk: 'critical', orders: 18, status: 'Alert' }
      ]
    }
  }
};

// Generate weeks for current year
const generateWeeks = () => {
  const weeks = [];
  for (let i = 1; i <= 52; i++) {
    weeks.push(`W${i.toString().padStart(2, '0')}`);
  }
  return weeks;
};

// Get current week
const getCurrentWeek = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const week = Math.floor(diff / oneWeek);
  return `W${week.toString().padStart(2, '0')}`;
};

// Get week date range
const getWeekDateRange = (week) => {
  const weekNum = parseInt(week.substring(1));
  const year = new Date().getFullYear();
  const startDate = new Date(year, 0, 1 + (weekNum - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const options = { month: 'short', day: 'numeric' };
  return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}, ${year}`;
};

// Calculate focus weeks
const calculateFocusWeek = (baseWeek, offset) => {
  const weekNum = parseInt(baseWeek.substring(1));
  const newWeek = weekNum + offset;
  return `W${newWeek.toString().padStart(2, '0')}`;
};

// Animated dot component
const AnimatedDot = ({ color, size = 10 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: color,
      animation: 'pulse 2s infinite',
      '@keyframes pulse': {
        '0%': {
          transform: 'scale(1)',
          opacity: 1,
        },
        '50%': {
          transform: 'scale(1.5)',
          opacity: 0.7,
        },
        '100%': {
          transform: 'scale(1)',
          opacity: 1,
        },
      },
    }}
  />
);

// Animated Progress Bar Component
const AnimatedProgressBar = ({ progress, color, label }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>
        {label}
      </Typography>
      <Typography level="body-sm" sx={{ color: color, fontWeight: 'bold' }}>
        {progress}%
      </Typography>
    </Box>
    <LinearProgress
      determinate
      value={progress}
      sx={{
        '--LinearProgress-thickness': '6px',
        '--LinearProgress-progressColor': color,
        borderRadius: '3px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        animation: 'progressGlow 3s ease-in-out infinite',
        '@keyframes progressGlow': {
          '0%': {
            boxShadow: '0 0 5px rgba(0,0,0,0.2)',
          },
          '50%': {
            boxShadow: `0 0 10px ${color}40`,
          },
          '100%': {
            boxShadow: '0 0 5px rgba(0,0,0,0.2)',
          },
        },
      }}
    />
  </Box>
);

const ProductionDashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [selectedStyle, setSelectedStyle] = useState(stylesByCustomer[customers[0]][0]);
  const [selectedProcess, setSelectedProcess] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('On-time');
  const [weekSearch, setWeekSearch] = useState('');
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const weeks = generateWeeks();

  // Update style when customer changes
  useEffect(() => {
    setSelectedStyle(stylesByCustomer[selectedCustomer][0]);
  }, [selectedCustomer]);

  // Filter weeks based on search
  const filteredWeeks = weeks.filter(week =>
    week.toLowerCase().includes(weekSearch.toLowerCase())
  );

  // Get current data based on filters
  const getCurrentData = () => {
    const customerData = mockDataByFilters[selectedCustomer] || mockDataByFilters['H&M'];
    const statusData = customerData[selectedStatus] || customerData['On-time'];
    return statusData;
  };

  const currentData = getCurrentData();

  // Process data based on filters
  const getVisibleProcesses = () => {
    if (selectedProcess === 'All') {
      return ['Sourcing', 'Fabric Store', 'Cutting', 'VAP / Printing', 'Risk Alert'];
    }
    return [selectedProcess];
  };

  // Calculate planning weeks
  const getPlanningWeeks = () => {
    return {
      sourcing: {
        focus: calculateFocusWeek(selectedWeek, 4),
        planning: calculateFocusWeek(selectedWeek, 3), // -1 from focus week
      },
      fabricStore: {
        focus: calculateFocusWeek(selectedWeek, 3),
        planning: calculateFocusWeek(selectedWeek, 3),
      },
      cutting: {
        focus: calculateFocusWeek(selectedWeek, 2),
        planning: calculateFocusWeek(selectedWeek, 2),
      },
      vapPrinting: {
        focus: calculateFocusWeek(selectedWeek, 2),
        planning: calculateFocusWeek(selectedWeek, 2),
      },
      riskAlert: {
        focus: calculateFocusWeek(selectedWeek, 2),
        planning: calculateFocusWeek(selectedWeek, 2),
      }
    };
  };

  const planningWeeks = getPlanningWeeks();

  // Filter Modal Component
  const FilterModal = () => (
    <Modal open={filterModalOpen} onClose={() => setFilterModalOpen(false)}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography level="title-lg" sx={{ color: 'primary.600' }}>
            Filters
          </Typography>
          <IconButton 
            variant="plain" 
            onClick={() => setFilterModalOpen(false)}
          >
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Calendar Week Filter */}
        <FormControl sx={{ mb: 3 }}>
          <FormLabel>Calendar Week</FormLabel>
          <Autocomplete
            placeholder="Search week (e.g., W34)"
            options={filteredWeeks}
            value={selectedWeek}
            onChange={(event, newValue) => newValue && setSelectedWeek(newValue)}
            onInputChange={(event, newValue) => setWeekSearch(newValue)}
            renderInput={(params) => (
              <Input
                {...params}
                startDecorator={<Search />}
              />
            )}
          />
        </FormControl>

        {/* Customer Filter */}
        <FormControl sx={{ mb: 3 }}>
          <FormLabel>Customer</FormLabel>
          <Select
            value={selectedCustomer}
            onChange={(event, newValue) => setSelectedCustomer(newValue)}
          >
            {customers.map((customer) => (
              <Option key={customer} value={customer}>
                {customer}
              </Option>
            ))}
          </Select>
        </FormControl>

        {/* Style/Article Filter */}
        <FormControl sx={{ mb: 3 }}>
          <FormLabel>Style/Article</FormLabel>
          <Select
            value={selectedStyle}
            onChange={(event, newValue) => setSelectedStyle(newValue)}
          >
            {stylesByCustomer[selectedCustomer].map((style) => (
              <Option key={style} value={style}>
                {style}
              </Option>
            ))}
          </Select>
        </FormControl>

        {/* Process Filter */}
        <FormControl sx={{ mb: 3 }}>
          <FormLabel>Process</FormLabel>
          <Select
            value={selectedProcess}
            onChange={(event, newValue) => setSelectedProcess(newValue)}
          >
            {processes.map((process) => (
              <Option key={process} value={process}>
                {process}
              </Option>
            ))}
          </Select>
        </FormControl>

        {/* Status Filter */}
        <FormControl sx={{ mb: 3 }}>
          <FormLabel>Status</FormLabel>
          <Select
            value={selectedStatus}
            onChange={(event, newValue) => setSelectedStatus(newValue)}
          >
            {statuses.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <IconButton 
            variant="soft" 
            color="primary"
            onClick={() => setFilterModalOpen(false)}
            sx={{ px: 3 }}
          >
            Apply Filters
          </IconButton>
        </Box>
      </ModalDialog>
    </Modal>
  );

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh", bgcolor: "white" }}>
        <Sidebar sx={{ flexShrink: 0, width: { xs: 60, sm: 220 } }} />
        <Box sx={{ flexGrow: 1, p: 1, overflowY: "auto" }}>
          <Header />
          <Box component="main"
            className="MainContent"
            sx={{
              pt: {
                xs: 'calc(12px + var(--Header-height))',
                sm: 'calc(12px + var(--Header-height))',
                md: 3,
              },
              pb: { xs: 2, sm: 2, md: 1 },
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              gap: 1,
            }}
          >
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
              {/* Header */}
              <Box
                sx={{
                  background: '#10b4f0ff',
                  color: 'white',
                  p: 3,
                  boxShadow: '0 4px 20px rgba(8, 179, 241, 0.3)',
                  position: 'relative'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                      variant="soft"
                      color="neutral"
                      onClick={() => setFilterModalOpen(true)}
                      sx={{ 
                        backgroundColor: 'rgba(255,255,255,0.2)', 
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' } 
                      }}
                    >
                      <FilterList />
                    </IconButton>
                    <Typography level="h2" sx={{ fontWeight: 'bold', color: '#ffffffff' }}>
                      4 - Week Production Planning Dashboard
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right', mr: 5 }}>
                    <Typography level="body-lg" sx={{ color: '#ffffffff' }}>
                      Selected Week : {selectedWeek}
                    </Typography>
                    <Typography level="body-sm" sx={{ color: '#ffffffff' }}>
                      {getWeekDateRange(selectedWeek)}
                    </Typography>
                    <Typography level="body-xs" sx={{ color: '#ffffffff', mt: 0.5 }}>
                      {selectedCustomer} | {selectedStyle} | {selectedStatus}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Filter Modal */}
              <FilterModal />

              <Box sx={{ p: 3 }}>
                {/* KPI Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid xs={12} sm={6} md={3}>
                    <Card sx={{ boxShadow: 'md', '&:hover': { boxShadow: 'lg' } }}>
                      <AnimatedDot color="#0bf32aff" />
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                          <Typography level="h1" sx={{ mr: 1 }}>
                            {currentData.kpi.totalOrders}
                          </Typography>
                        </Box>
                        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                          Total Orders
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid xs={12} sm={6} md={3}>
                    <Card sx={{ boxShadow: 'md', '&:hover': { boxShadow: 'lg' } }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                          <Typography level="h1" sx={{ color: '#dd0d0dff', mr: 2 }}>
                            {currentData.kpi.fullOnRisk}
                          </Typography>
                        </Box>
                        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                          Order Full on Risk
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid xs={12} sm={6} md={3}>
                    <Card sx={{ boxShadow: 'md', '&:hover': { boxShadow: 'lg' } }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <AnimatedDot color="#ffc400ff" />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                          <Typography level="h1" sx={{ color: '#ffc400ff' }}>
                            {currentData.kpi.delayedOrders}%
                          </Typography>
                        </Box>
                        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                          Delayed Orders
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid xs={12} sm={6} md={3}>
                    <Card sx={{ boxShadow: 'md', '&:hover': { boxShadow: 'lg' } }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                          <Typography level="h1" sx={{ color: '#ff0303ff', mr: 1 }}>
                            {currentData.kpi.atRisk}%
                          </Typography>
                          <AnimatedDot color="#f44336" />
                        </Box>
                        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                          At Risk (a-2 Process Delays )
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Process Planning Section */}
                <Card sx={{ mb: 4, boxShadow: 'lg' }}>
                  <CardContent>
                    <Typography level="title-lg" sx={{ mb: 3, color: 'primary.600' }}>
                      Process Planning
                    </Typography>

                    <Grid container spacing={3}>
                      {/* Process Names */}
                      <Grid xs={12} md={4}>
                        <Sheet sx={{ p: 3, borderRadius: 'sm', backgroundColor: 'background.level1', height: '100%' }}>
                          <Typography level="title-sm" sx={{ mb: 2, fontWeight: 'bold' }}>Process</Typography>
                          {getVisibleProcesses().map((process) => (
                            <Chip key={process} variant="soft" sx={{ mr: 1, mb: 1, fontSize: '0.875rem' }}>
                              {process}
                            </Chip>
                          ))}
                        </Sheet>
                      </Grid>

                      {/* Focus Week */}
                      <Grid xs={12} md={4}>
                        <Sheet sx={{ p: 3, borderRadius: 'sm', backgroundColor: 'background.level1', height: '100%' }}>
                          <Typography level="title-sm" sx={{ mb: 2, fontWeight: 'bold' }}>Focus Week (Delivery)</Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {selectedProcess === 'All' && (
                              <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography level="body-sm">Sourcing:</Typography>
                                  <Chip size="sm" variant="outlined" sx={{ fontWeight: 'bold' }}>{planningWeeks.sourcing.focus}</Chip>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography level="body-sm">Fabric Store:</Typography>
                                  <Chip size="sm" variant="outlined" sx={{ fontWeight: 'bold' }}>{planningWeeks.fabricStore.focus}</Chip>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography level="body-sm">Cutting:</Typography>
                                  <Chip size="sm" variant="outlined" sx={{ fontWeight: 'bold' }}>{planningWeeks.cutting.focus}</Chip>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography level="body-sm">VAP / Printing:</Typography>
                                  <Chip size="sm" variant="outlined" sx={{ fontWeight: 'bold' }}>{planningWeeks.vapPrinting.focus}</Chip>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography level="body-sm">Risk Alert:</Typography>
                                  <Chip size="sm" variant="outlined" sx={{ fontWeight: 'bold' }}>{planningWeeks.riskAlert.focus}</Chip>
                                </Box>
                              </>
                            )}
                            {selectedProcess !== 'All' && (
                              <Chip variant="soft" color="primary" sx={{ alignSelf: 'flex-start' }}>
                                {planningWeeks[selectedProcess.toLowerCase().replace(' ', '').replace('/', '')]?.focus || selectedWeek}
                              </Chip>
                            )}
                          </Box>
                        </Sheet>
                      </Grid>

                      {/* Planning Week with Animated Progress Bars */}
                      <Grid xs={12} md={4}>
                        <Sheet sx={{ p: 3, borderRadius: 'sm', backgroundColor: 'background.level1', height: '100%' }}>
                          <Typography level="title-sm" sx={{ mb: 2, fontWeight: 'bold' }}>Planning Week (Calendar)</Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {selectedProcess === 'All' && (
                              <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                  <Typography level="body-sm">Sourcing:</Typography>
                                  <Chip size="sm" variant="solid" sx={{ fontWeight: 'bold' }}>{planningWeeks.sourcing.planning}</Chip>
                                </Box>
                                <AnimatedProgressBar 
                                  progress={currentData.processes.find(p => p.name === 'Sourcing')?.progress || 0} 
                                  color={currentData.processes.find(p => p.name === 'Sourcing')?.color || '#4caf50'}
                                  label=""
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                  <Typography level="body-sm">Fabric Store:</Typography>
                                  <Chip size="sm" variant="solid" sx={{ fontWeight: 'bold' }}>{planningWeeks.fabricStore.planning}</Chip>
                                </Box>
                                <AnimatedProgressBar 
                                  progress={currentData.processes.find(p => p.name === 'Fabric Store')?.progress || 0} 
                                  color={currentData.processes.find(p => p.name === 'Fabric Store')?.color || '#2196f3'}
                                  label=""
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                  <Typography level="body-sm">Cutting:</Typography>
                                  <Chip size="sm" variant="solid" sx={{ fontWeight: 'bold' }}>{planningWeeks.cutting.planning}</Chip>
                                </Box>
                                <AnimatedProgressBar 
                                  progress={currentData.processes.find(p => p.name === 'Cutting')?.progress || 0} 
                                  color={currentData.processes.find(p => p.name === 'Cutting')?.color || '#ff9800'}
                                  label=""
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                  <Typography level="body-sm">VAP / Printing:</Typography>
                                  <Chip size="sm" variant="solid" sx={{ fontWeight: 'bold' }}>{planningWeeks.vapPrinting.planning}</Chip>
                                </Box>
                                <AnimatedProgressBar 
                                  progress={currentData.processes.find(p => p.name === 'VAP / Printing')?.progress || 0} 
                                  color={currentData.processes.find(p => p.name === 'VAP / Printing')?.color || '#f44336'}
                                  label=""
                                />
                              </>
                            )}
                            {selectedProcess !== 'All' && (
                              <Chip variant="soft" color="success" sx={{ alignSelf: 'flex-start' }}>
                                {planningWeeks[selectedProcess.toLowerCase().replace(' ', '').replace('/', '')]?.planning || selectedWeek}
                              </Chip>
                            )}
                          </Box>
                        </Sheet>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Process Cards */}
                <Typography level="title-lg" sx={{ mb: 3, color: 'primary.600' }}>
                  Production Status
                </Typography>
                <Grid container spacing={3}>
                  {currentData.processes
                    .filter(process => selectedProcess === 'All' || process.name === selectedProcess)
                    .map((process, index) => (
                    <Grid key={process.name} xs={12} sm={6} md={6} lg={4} xl={process.name === 'Risk Alert' ? 12 : 3}>
                      <Card
                        sx={{
                          boxShadow: 'lg',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backgroundColor: process.name === 'Risk Alert' ? '#fff5f5' : 'background.surface',
                          border: process.name === 'Risk Alert' ? '2px solid #ff4757' : 'none',
                          '&:hover': {
                            boxShadow: 'xl',
                            transform: 'translateY(-4px)'
                          }
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography 
                              level="title-md" 
                              sx={{ 
                                fontWeight: 'bold',
                                color: process.name === 'Risk Alert' ? '#ff4757' : 'inherit'
                              }}
                            >
                              {process.name}
                            </Typography>
                            {(process.risk === 'high' || process.risk === 'critical') && 
                              <AnimatedDot color="#f44336" size={10} />}
                            {process.risk === 'medium' && <AnimatedDot color="#ff9800" size={8} />}
                          </Box>

                          <Typography level="h2" sx={{ mb: 1, color: process.color }}>
                            {process.orders}
                          </Typography>
                          <Typography level="body-sm" sx={{ color: 'text.secondary', mb: 2 }}>
                            Total Orders
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography level="body-sm">Progress</Typography>
                              <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>
                                {process.progress}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              determinate
                              value={process.progress}
                              sx={{
                                '--LinearProgress-thickness': '8px',
                                '--LinearProgress-progressColor': process.color,
                                borderRadius: '4px'
                              }}
                            />
                          </Box>
                          <Chip
                            size="sm"
                            variant="soft"
                            color={
                              process.status === 'On Track' ? 'success' :
                              process.status === 'In Progress' ? 'primary' :
                              process.status === 'Behind' ? 'warning' : 
                              process.status === 'Critical' ? 'danger' : 'danger'
                            }
                          >
                            {process.status}
                          </Chip>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default ProductionDashboard;