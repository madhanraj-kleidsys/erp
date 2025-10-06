import * as React from "react";
import Table from '@mui/joy/Table'; 
import {
    Box,
    Typography,
    Sheet,
    Grid,
} from "@mui/joy";
// Sample data: Replace with API response
const data = [
  { BUName: "BLOOMSBURG", LineCode: "C1", DailyTarget: 22800 },
  { BUName: "BLOOMSBURG", LineCode: "C2", DailyTarget: 22800 },
  { BUName: "BLOOMSBURG", LineCode: "C3", DailyTarget: 22800 },
  { BUName: "BLOOMSBURG", LineCode: "C4", DailyTarget: 22800 },
  { BUName: "BLOOMSBURG", LineCode: "C5", DailyTarget: 22800 },
  // ... add more as needed, 0 for lines with no values in your screenshot
];

export default function PivotSummaryTable({ sourceData }) {
  // Group by BUName
  const grouped = {};
  (sourceData || data).forEach(row => {
    if (!grouped[row.BUName]) grouped[row.BUName] = [];
    grouped[row.BUName].push(row);
  });

  // Compute totals
  const getTotal = arr => arr.reduce((sum, r) => sum + (r.DailyTarget || 0), 0);
  const grandTotal = Object.values(grouped).reduce(
    (sum, arr) => sum + getTotal(arr), 0
  );

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

    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Table variant="outlined" size="sm" sx={{ minWidth: 400 }}>
        <thead>
          <tr>
            <th>BUName</th>
            <th>LineCode</th>
            <th>DailyTarget</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([bu, lines]) => (
            <React.Fragment key={bu}>
              <tr>
                <td rowSpan={lines.length + 1}>
                  <Typography level="title-md">{bu}</Typography>
                </td>
                <td colSpan={2}></td>
                <td>
                  <Typography fontWeight="bold">{getTotal(lines)}</Typography>
                </td>
              </tr>
              {lines.map(line => (
                <tr key={line.LineCode}>
                  <td>{line.LineCode}</td>
                  <td>{line.DailyTarget || 0}</td>
                  <td></td>
                </tr>
              ))}
            </React.Fragment>
          ))}
          <tr>
            <td colSpan={3} align="right">
              <Typography fontWeight="bold">Grand Total</Typography>
            </td>
            <td>
              <Typography fontWeight="bold">{grandTotal}</Typography>
            </td>
          </tr>
        </tbody>
      </Table>
    </Box>

// Usage: Pass your API array as sourceData or let it use the sample
export default PivotSummaryTable;

    </Sheet>
                </Box >

            </Box >
        </CssVarsProvider>
    );
}
