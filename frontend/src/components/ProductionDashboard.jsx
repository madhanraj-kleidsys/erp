
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
} from '@mui/joy';
import {
  Search,
  TrendingUp,
  Warning,
  Schedule,
  CheckCircle,
  Error,
  PendingActions,
} from '@mui/icons-material';
import Header from './Header';
import Sidebar from './Sidebar';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import Alert from '@mui/material/Alert';

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

const processes = ['All', 'Sourcing', 'Fabric Store', 'Cutting', 'VAP / Printing'];
const statuses = ['On-time', 'Delayed', 'Risk'];

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

const ProductionDashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [selectedStyle, setSelectedStyle] = useState(stylesByCustomer[customers[0]][0]);
  const [selectedProcess, setSelectedProcess] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('On-time');
  const [weekSearch, setWeekSearch] = useState('');

  const weeks = generateWeeks();

  // Update style when customer changes
  useEffect(() => {
    setSelectedStyle(stylesByCustomer[selectedCustomer][0]);
  }, [selectedCustomer]);

  // Filter weeks based on search
  const filteredWeeks = weeks.filter(week =>
    week.toLowerCase().includes(weekSearch.toLowerCase())
  );

  // Process data based on filters
  const getVisibleProcesses = () => {
    if (selectedProcess === 'All') {
      return ['Sourcing', 'Fabric Store', 'Cutting', 'VAP / Printing'];
    }
    return [selectedProcess];
  };

  // Calculate planning weeks
  const getPlanningWeeks = () => {
    const baseWeekNum = parseInt(selectedWeek.substring(1));
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
      }
    };
  };

  const planningWeeks = getPlanningWeeks();

  // Mock KPI data
  const kpiData = {
    totalOrders: 245,
    fullOnRisk: 15,
    delayedOrders: 8,
    atRisk: 12
  };

  // Process card data with different progress and colors
  const processCardData = [
    {
      name: 'Sourcing',
      progress: 85,
      color: '#4caf50',
      risk: 'low',
      orders: 45,
      status: 'On Track'
    },
    {
      name: 'Fabric Store',
      progress: 72,
      color: '#2196f3',
      risk: 'medium',
      orders: 34,
      status: 'In Progress'
    },
    {
      name: 'Cutting',
      progress: 55,
      color: '#ff9800',
      risk: 'high',
      orders: 25,
      status: 'Behind'
    },
    {
      name: 'VAP / Printing',
      progress: 48,
      color: '#f44336',
      risk: 'high',
      orders: 20,
      status: 'Critical'
    }
  ];

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
                  boxShadow: '0 4px 20px rgba(8, 179, 241, 0.3)'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography level="h2" sx={{ fontWeight: 'bold', color: '#ffffffff' }}>
                    4 - Week  Production  Planning  Dashboard
                  </Typography>
                  <Box sx={{ textAlign: 'right',mr:5 }}>
                    <Typography level="body-lg" sx={{ color: '#ffffffff' }}>
                      Selected Week : {selectedWeek}
                    </Typography>
                    <Typography level="body-sm" sx={{ color: '#ffffffff' }}>
                      {getWeekDateRange(selectedWeek)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 3, p: 3 }}>
                {/* Left Filter Panel */}
                <Card sx={{ minWidth: 300, height: 'fit-content', boxShadow: 'lg' }}>
                  <CardContent>
                    <Typography level="title-lg" sx={{ mb: 3, color: 'primary.600' }}>
                      Filters
                    </Typography>

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
                    <FormControl>
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
                  </CardContent>
                </Card>

                {/* Main Content */}
                <Box sx={{ flex: 1 }}>
                  {/* KPI Cards */}
                  <Grid container spacing={3} sx={{ mb: 4 }}>

                    <Grid xs={12} sm={6} md={3}>
                      <Card sx={{ boxShadow: 'md', '&:hover': { boxShadow: 'lg' } }}>
                          <AnimatedDot color="#0bf32aff" />
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                            <Typography level="h1" sx={{ mr: 1 }}>
                              {kpiData.totalOrders}
                            </Typography>
                          </Box>

                          {/* <Box sx={{ ml: 2, display: 'flex' }}>
                            <DotLottieReact
                              src="https://lottie.host/fb172969-9a2c-451d-be6f-654c2f88c9a2/v6SRcGqX5F.lottie"
                              loop
                              autoplay
                              style={{ width: 48, height: 48, minWidth: 32, minHeight: 32 }}
                            />
                          </Box>     */}
                          <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                            Total Orders
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>


                    <Grid xs={12} sm={6} md={3}>
                      <Card sx={{ boxShadow: 'md', '&:hover': { boxShadow: 'lg' } }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                          {/* <AnimatedDot color="#f44336" /> */}

                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                            <Typography level="h1" sx={{ color: '#dd0d0dff', mr: 2 }}>
                              {kpiData.fullOnRisk}
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
                              {kpiData.delayedOrders}%
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
                              {kpiData.atRisk}%
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
                        <Grid xs={12} md={4}>
                          <Sheet sx={{ p: 2, borderRadius: 'sm', backgroundColor: 'background.level1' }}>
                            <Typography level="title-sm" sx={{ mb: 2 }}>Process</Typography>
                            {getVisibleProcesses().map((process) => (
                              <Chip key={process} variant="soft" sx={{ mr: 1, mb: 1 }}>
                                {process}
                              </Chip>
                            ))}
                          </Sheet>
                        </Grid>

                        <Grid xs={12} md={4}>
                          <Sheet sx={{ p: 2, borderRadius: 'sm', backgroundColor: 'background.level1' }}>
                            <Typography level="title-sm" sx={{ mb: 2 }}>Focus Week (Delivery)</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              {selectedProcess === 'All' && (
                                <>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography level="body-sm">Sourcing:</Typography>
                                    <Chip size="sm" variant="outlined">{planningWeeks.sourcing.focus}</Chip>
                                  </Box>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography level="body-sm">Fabric Store:</Typography>
                                    <Chip size="sm" variant="outlined">{planningWeeks.fabricStore.focus}</Chip>
                                  </Box>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography level="body-sm">Cutting:</Typography>
                                    <Chip size="sm" variant="outlined">{planningWeeks.cutting.focus}</Chip>
                                  </Box>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography level="body-sm">VAP / Printing:</Typography>
                                    <Chip size="sm" variant="outlined">{planningWeeks.vapPrinting.focus}</Chip>
                                  </Box>
                                  
                                </>
                              )}
                              {selectedProcess !== 'All' && (
                                <Chip variant="soft" color="primary">
                                  {planningWeeks[selectedProcess.toLowerCase().replace(' ', '').replace('/', '')]?.focus || selectedWeek}
                                </Chip>
                              )}
                            </Box>
                          </Sheet>
                        </Grid>

                        <Grid xs={12} md={4}>
                          <Sheet sx={{ p: 2, borderRadius: 'sm', backgroundColor: 'background.level1' }}>
                            <Typography level="title-sm" sx={{ mb: 2 }}>Planning Week (Calendar)</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              {selectedProcess === 'All' && (
                                <>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography level="body-sm">Sourcing:</Typography>
                                    <Chip size="sm" variant="solid">{planningWeeks.sourcing.planning}</Chip>
                                  </Box>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography level="body-sm">Fabric Store:</Typography>
                                    <Chip size="sm" variant="solid">{planningWeeks.fabricStore.planning}</Chip>
                                  </Box>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography level="body-sm">Cutting:</Typography>
                                    <Chip size="sm" variant="solid">{planningWeeks.cutting.planning}</Chip>
                                  </Box>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography level="body-sm">VAP / Printing:</Typography>
                                    <Chip size="sm" variant="solid">{planningWeeks.vapPrinting.planning}</Chip>
                                  </Box>
                                  
                                </>
                              )}
                              {selectedProcess !== 'All' && (
                                <Chip variant="soft" color="success">
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
                    {processCardData
                      .filter(process => selectedProcess === 'All' || process.name === selectedProcess)
                      .map((process, index) => (
                        <Grid key={process.name} xs={12} sm={6} md={3}>
                          <Card
                            sx={{
                              boxShadow: 'lg',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                boxShadow: 'xl',
                                transform: 'translateY(-4px)'
                              }
                            }}
                          >
                            <CardContent>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Typography level="title-md" sx={{ fontWeight: 'bold' }}>
                                  {process.name}
                                </Typography>
                                {process.risk === 'high' && <AnimatedDot color="#f44336" size={10} />}
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
                                      process.status === 'Behind' ? 'warning' : 'danger'
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
      </Box>
    </CssVarsProvider>
  );
};
export default ProductionDashboard;