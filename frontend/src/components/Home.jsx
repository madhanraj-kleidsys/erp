import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import {
  Box,
  Typography,
  Sheet, Button, Option, Select, Input,
  Grid, Table
} from "@mui/joy";
import EventIcon from "@mui/icons-material/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Header from './Header';
import Sidebar from './Sidebar';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import Skeleton from '@mui/joy/Skeleton';

function TableSkeleton({ columns = [], rowCount = 6 }) {
  return (
    <ResponsiveTableContainer>
      <StyledTable size="md" variant="plain" borderAxis="bothBetween">

        <tbody>
          {[...Array(rowCount)].map((_, i) => (
            <tr key={i}>
              <td><Skeleton variant="text" width={120} /></td>
              <td><Skeleton variant="text" width={100} /></td>
              {columns.map((_, idx) => (
                <td key={idx}><Skeleton variant="rectangular" width={60} height={24} /></td>
              ))}
              <td><Skeleton variant="rectangular" width={100} height={24} /></td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </ResponsiveTableContainer>
  );
}




const apiUrl = import.meta.VITE_API_URL || 'http://localhost:3000/api';

const Container = styled(Box)`
  padding: 16px;
  background: #e7ebeeff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResponsiveSheet = styled(Sheet)`
  background-color: white;
  border-radius: 1em;
  box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
  padding: 20px;
  width: 100%;
  max-width: 660px;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    padding: 12px;
    max-width: 100%;
  }
`;

const ResponsiveTableContainer = styled(Box)`
  width: 100%;
  max-width: 2200px;
  border-radius: 1em;
  overflow-x: auto;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 15px;
  margin-top: 1rem;
`;

// Smooth table with curved edges
const StyledTable = styled(Table)`
  border-collapse: separate !important;
  border-spacing: 0 !important;
  background-color: #ffffffff;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgb(0 0 0 / 0.2);
  min-width: 400px;

  thead tr th {
    padding: 16px;
    background-color: #08b3f1ff;
    color: #ffffffff;
    font-weight: 700;
    font-size: 1.15rem;
  }

  tbody tr {
    background-color: #ffffffff;
    transition: background-color 0.3s ease;
  }

  tbody tr:hover {
    background-color: #ffffffff;
  }

  tbody tr td {
    padding: 12px 16px;
    text-align: center;
    vertical-align: middle;
    font-weight: 600;
    color: #000000ff;
  }

  /* Rounded corners on corners of first and last td in first and last row */
  tbody tr:first-child td:first-child {
    border-top-left-radius: 1rem;
  }
  tbody tr:first-child td:last-child {
    border-top-right-radius: 1rem;
  }
  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 1rem;
  }
  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 1rem;
  }
`;




const CenterTd = styled.td`
  text-align: center;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  background: #ffffffff;
  border-radius: 0.75rem 0 0 0.75rem;
`;

const months = [
  { name: 'January', value: 1 },
  { name: 'February', value: 2 },
  { name: 'March', value: 3 },
  { name: 'April', value: 4 },
  { name: 'May', value: 5 },
  { name: 'June', value: 6 },
  { name: 'July', value: 7 },
  { name: 'August', value: 8 },
  { name: 'September', value: 9 },
  { name: 'October', value: 10 },
  { name: 'November', value: 11 },
  { name: 'December', value: 12 },
];

export default function Home({ user, onLogout }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  // Handle fetch
  const fetchData = async () => {
    setLoading(true);
    setData([]);
    try {
      const res = await fetch(`${apiUrl}/prodapparelsewing/getByMonthYear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year: Number(year), month: Number(month) })
      });
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      alert('Fetch failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(year, month); // Fetch on mount
  }, []);


  // Group by BUName and LineCode, sum DailyTarget by LineCode
  const grouped = data.reduce((acc, row) => {
    if (!acc[row.BUName]) acc[row.BUName] = {};
    if (!acc[row.BUName][row.LineCode]) acc[row.BUName][row.LineCode] = 0;
    acc[row.BUName][row.LineCode] += row.DailyTarget ?? 0;
    return acc;
  }, {});

  // All line codes, for consistent row order
  const allLineCodes = [
    ...new Set(data.map(row => row.LineCode))
  ].sort();
  // Build a lookup [Business][Line][Week] = DailyTarget
  const lineWeekValues = {};

  // data.forEach(row => {
  //   const business = row.BUName || 'Unknown';
  //   const line = row.LineCode || 'N/A';
  //   const week = Number(row.WeekNo);
  //   if (!lineWeekValues[business]) lineWeekValues[business] = {};
  //   if (!lineWeekValues[business][line]) lineWeekValues[business][line] = {};
  //   lineWeekValues[business][line][week] = row.DailyTarget || 0;
  // });

  data.forEach(row => {
    const business = row.BUName || 'Unknown';
    const line = row.LineCode || 'N/A';
    const week = Number(row.WeekNo);
    if (!lineWeekValues[business]) lineWeekValues[business] = {};
    if (!lineWeekValues[business][line]) lineWeekValues[business][line] = {};
    lineWeekValues[business][line][week] = (lineWeekValues[business][line][week] || 0) + (row.DailyTarget || 0);
  });



  // Grand total
  const grandTotal = Object.values(grouped).flatMap(
    obj => Object.values(obj)
  ).reduce((sum, v) => sum + v, 0);

  // Unique week numbers for pivot table columns
  const weekNumbers = Array.from(
    new Set(
      data
        .map((row) => Number(row.WeekNo))
        .filter((week) => Number.isFinite(week))
    )
  ).sort((a, b) => a - b);

  // Pivot grouping by BU > OC > Week
  const pivotGrouped = data.reduce((acc, row) => {
    const business = (row.BUName && String(row.BUName).trim()) || 'Unknown';
    const order = (row.OCNo && String(row.OCNo).trim()) || 'N/A';
    const week = Number(row.WeekNo);
    const target = Number(row.DailyTarget) || 0;

    if (!acc[business]) {
      acc[business] = {};
    }
    if (!acc[business][order]) {
      acc[business][order] = { weeks: {}, orderTotal: 0 };
    }

    if (Number.isFinite(week)) {
      acc[business][order].weeks[week] =
        (acc[business][order].weeks[week] || 0) + target;
    }

    acc[business][order].orderTotal += target;

    return acc;
  }, {});

  const toIsoDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toISOString().slice(0, 10);
  };

  const dateFormat = (isoDate) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}-${month}-${year}`;
  };
  const pivotAccumulator = data.reduce(
    (acc, row) => {
      const isoDate = toIsoDate(row.ProdDate);
      if (!isoDate) {
        return acc;
      }

      const business = (row.BUName && String(row.BUName).trim()) || 'Unknown';
      const target = Number(row.DailyTarget) || 0;

      if (!acc.byBusiness[business]) {
        acc.byBusiness[business] = { dates: {}, total: 0 };
      }

      acc.byBusiness[business].dates[isoDate] =
        (acc.byBusiness[business].dates[isoDate] || 0) + target;
      acc.byBusiness[business].total += target;

      acc.byDate[isoDate] = (acc.byDate[isoDate] || 0) + target;
      acc.dateKeys.add(isoDate);

      return acc;
    },
    { byBusiness: {}, byDate: {}, dateKeys: new Set() }
  );

  const dateKeys = Array.from(pivotAccumulator.dateKeys).sort(
    (a, b) => new Date(a) - new Date(b)
  );


  const pivotEntries = Object.entries(pivotGrouped).sort((a, b) =>
    a[0].localeCompare(b[0], undefined, { sensitivity: 'base' })
  );
  const hasPivotData = pivotEntries.length > 0 && weekNumbers.length > 0;

  const weekTotals = weekNumbers.reduce((acc, week) => {
    const totalForWeek = data.reduce((sum, row) => {
      const rowWeek = Number(row.WeekNo);
      if (Number.isFinite(rowWeek) && rowWeek === week) {
        const value = Number(row.DailyTarget) || 0;
        return sum + value;
      }
      return sum;
    }, 0);

    acc[week] = totalForWeek;
    return acc;
  }, {});

  const pivotGrandTotal = grandTotal;

  const displayYear =
    data.length > 0 && data[0]?.YearNo !== undefined
      ? Number(data[0].YearNo)
      : year;
  const displayMonth =
    (data.length > 0 && data[0]?.MnthName) ||
    months.find((m) => Number(m.value) === Number(month))?.name ||
    '';

  const pivotAccumulatorEntries = Object.entries(pivotAccumulator.byBusiness).sort((a, b) =>
    a[0].localeCompare(b[0], undefined, { sensitivity: 'base' })
  );

  const dateTotals = pivotAccumulator.byDate;


  const CHUNK_SIZE = 8;
  const [datePage, setDatePage] = useState(0);

  const pagedDateKeys = dateKeys.slice(datePage * CHUNK_SIZE, (datePage + 1) * CHUNK_SIZE);


  return (

    <CssVarsProvider disableTransitionOnChange>

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
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 110,
                p: { xs: 1, sm: 2, md: 3 },
                borderRadius: 'md',
                bgcolor: "rgb(18, 177, 209)",
                color: '#ffffffff',
                mx: { xs: 2, sm: 4, md: 2, lg: 2 },
                mt: { xs: 1, sm: 1, md: 1 },
              }}
            >
              <Typography
                level={{ xs: "h5", sm: "h4", md: "h3" }}
                fontWeight="lg"
                textAlign="center"
                sx={{ fontSize: 20 }}
              >
                SKPL —  product apparel sewing
              </Typography>
            </Box>

            <Container>
              <ResponsiveSheet>
                <Grid container spacing={2} alignItems="center">
                  <Grid xs={12} sm={6} md={3} display="flex" alignItems="center">
                    <EventIcon sx={{ mr: 1, color: "#1976d2" }} />
                    <Input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      sx={{ width: "140%" }}
                      slotProps={{ input: { min: 2020, max: 2100 } }}
                      startDecorator="Year"
                    />
                  </Grid>

                  <Grid xs={12} sm={6} md={4} display="flex" alignItems="center">
                    <CalendarMonthIcon sx={{ mr: 1, color: "#1976d2" }} />
                    <Select
                      value={month}
                      onChange={(_, val) => val && setMonth(val)}
                      sx={{ width: "140%" }}
                    >
                      {months.map((m) => (
                        <Option key={m.value} value={m.value}>
                          {m.name}
                        </Option>
                      ))}
                    </Select>
                  </Grid>


                  <Grid xs={12} sm={12} md={3} textAlign="right" display="flex" justifyContent="flex-end" alignItems="center">

                    <StyledWrapper>
                      <div>
                        <button style={{ color: "#000" }} className="button" onClick={fetchData} loading={loading}>
                          <svg viewBox="0 0 16 16" className="bi bi-lightning-charge-fill" fill="currentColor" height={16} width={15} color="#000" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" /></svg>
                          Fetch
                        </button>
                      </div>
                    </StyledWrapper>
                  </Grid>
                </Grid>
              </ResponsiveSheet>

              {loading ? (
                <TableSkeleton columns={weekNumbers} rowCount={6} />
              ) : (

                <ResponsiveTableContainer>
                  <StyledTable size="md" variant="plain" borderAxis="bothBetween">
                    <thead>
                      <tr>
                        <th>Business Name</th>
                        <th>Line Code</th>
                        {weekNumbers.map(week => (
                          <th key={week} style={{ textAlign: 'center' }}>{week}</th>
                        ))}
                        <th>Total Daily Target</th>
                      </tr>
                    </thead>

                    <tbody>

                      {Object.entries(lineWeekValues).length === 0 && (
                        <tr>
                          <td colSpan={2 + weekNumbers.length + 1} style={{ textAlign: "center", backgroundColor: "#ffffff" }}>
                            <Typography style={{ color: "#ff0000ff" }} >No Data for the selected year & month</Typography>
                          </td>
                        </tr>
                      )}

                      {Object.entries(lineWeekValues).map(([business, lines]) =>
                        Object.entries(lines).map(([line, weekVals], i, arr) => {
                          const lineTotal = weekNumbers.reduce(
                            (sum, week) => sum + (weekVals[week] || 0), 0
                          );
                          return (
                            <tr key={business + line}>
                              {i === 0 && (
                                <td rowSpan={arr.length} style={{ fontWeight: 700, background: '#e7f2ff' }}>{business}</td>
                              )}
                              <td style={{ fontWeight: 600 }}>{line}</td>
                              {weekNumbers.map(week => (
                                <td key={week}>{weekVals[week] || 0}</td>
                              ))}
                              <td style={{ fontWeight: 700, color: "#1a5c1a" }}>{lineTotal}</td>
                            </tr>
                          );
                        })
                      )}


                      {
                        Object.keys(grouped).length > 0 && (
                          <tr>
                            <td colSpan={2} style={{ fontWeight: 700, textAlign: 'center', background: '#f0f7ff',color: '#055a8c' }}>Grand Total</td>
                            {weekNumbers.map(week => {
                              const wTotal = Object.values(lineWeekValues).flatMap(lines =>
                                Object.values(lines).map(weekVals => weekVals[week] || 0)
                              ).reduce((a, b) => a + b, 0);
                              return <td key={week} style={{ fontWeight: 700 }}>{wTotal}</td>;
                            })}
                            <td style={{ fontWeight: 900, color: "#b71c1c" }}>{grandTotal}</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </StyledTable>
                </ResponsiveTableContainer>

              )}


              {hasPivotData && (
                <>
                  <ResponsiveTableContainer>
                    <StyledTable size="md" variant="plain" borderAxis="bothBetween">
                      <thead>
                        {/* <tr>
                          <th rowSpan={2} style={{ textAlign: 'left' }}>
                            Row Labels
                          </th>
                          <th rowSpan={2} style={{ textAlign: 'left' }}>
                            OC No
                          </th>
                          
                          <th colSpan={weekNumbers.length} style={{ textAlign: 'center' }}>
                            Column Labels
                          </th>
                          <th rowSpan={2}>Grand Total</th>
                        </tr>

                        <tr>
                          {weekNumbers.map((week) => (
                            <th key={`week-${week}`}>{week}</th>
                          ))}
                        </tr> */}
                        <tr>
                          <th colSpan={2} style={{ textAlign: 'center' }}>Sum Of Daily Target</th>
                          <th colSpan={weekNumbers.length} style={{ textAlign: 'center' }}>
                            Column Labels
                          </th>
                          <th rowSpan={2} style={{ textAlign: 'center' }}>Grand Total</th>
                        </tr>

                        {/* Second header row - sub level headers */}
                        <tr>
                          <th style={{ textAlign: 'left' }}>Business Name</th>
                          <th style={{ textAlign: 'left' }}>OC No</th>
                          {weekNumbers.map(week => (
                            <th key={week} style={{ textAlign: 'center' }}>{week}</th>
                          ))}
                        </tr>
                      </thead>


                      <tbody>
                        {pivotEntries.map(([business, orders]) => {
                          const orderEntries = Object.entries(orders).sort((a, b) =>
                            a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: 'base' })
                          );

                          const businessWeekTotals = weekNumbers.reduce((acc, week) => {
                            acc[week] = orderEntries.reduce(
                              (sum, [, details]) => sum + (details.weeks[week] ?? 0),
                              0
                            );
                            return acc;
                          }, {});

                          const businessGrandTotal = orderEntries.reduce(
                            (sum, [, details]) => sum + (details.orderTotal ?? 0),
                            0
                          );

                          return (
                            <React.Fragment key={`pivot-${business}`}>
                              <tr>
                                <td
                                  style={{
                                    fontWeight: 700,
                                    textAlign: 'left',
                                    background: '#e7f2ff',
                                    color: '#0a3d62',
                                  }}
                                >
                                  {business}
                                </td>

                                <td style={{ background: '#e7f2ff' }} />
                                {weekNumbers.map((week) => (
                                  <td
                                    key={`${business}-summary-week-${week}`}
                                    style={{ fontWeight: 600, background: '#e7f2ff' }}
                                  >
                                    {businessWeekTotals[week] ?? 0}
                                  </td>
                                ))}
                                <td
                                  style={{
                                    fontWeight: 700,
                                    background: '#d4e7ff',
                                    color: '#b71c1c',
                                  }}
                                >
                                  {businessGrandTotal}
                                </td>
                              </tr>

                              {orderEntries.map(([orderNo, details]) => (
                                <tr key={`${business}-${orderNo}`}>
                                  <td style={{ background: '#ffffffff' }} />
                                  <td
                                    style={{
                                      fontWeight: 600,
                                      textAlign: 'left',
                                      background: '#ffffffff',
                                      paddingLeft: '1.5rem',
                                    }}
                                  >
                                    {orderNo}
                                  </td>
                                  {weekNumbers.map((week) => (
                                    <td key={`${business}-${orderNo}-${week}`} style={{ background: '#ffffffff' }}>
                                      {details.weeks[week] ?? 0}
                                    </td>
                                  ))}
                                  <td style={{ fontWeight: 600, background: '#ffffffff', color: '#0a558c' }}>
                                    {details.orderTotal}
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          );
                        })}
                        {pivotEntries.length > 0 && (
                          <tr>
                            <td
                              colSpan={2}
                              style={{
                                fontWeight: 600,
                                textAlign: 'center',
                                background: '#f0f7ff',
                                color: '#055a8c',
                              }}
                            >
                              Grand Total
                            </td>
                            {weekNumbers.map((week) => (
                              <td key={`week-total-${week}`} style={{ fontWeight: 600, background: '#f0f7ff' }}>
                                {weekTotals[week] ?? 0}
                              </td>
                            ))}
                            <td style={{ fontWeight: 700, background: '#d7e8ff', color: '#c62828' }}>
                              {pivotGrandTotal}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </StyledTable>
                  </ResponsiveTableContainer>
                </>
              )}



              {/* {hasPivotData && (
                <>
                  <ResponsiveTableContainer>
                    <StyledTable size="md" variant="plain" borderAxis="bothBetween">
                      <thead>
                        <tr>
                          <th colSpan={1} style={{ textAlign: 'left', backgroundColor: '#08b3f1' }}>
                            Sum of DailyTarget
                          </th>
                          <th colSpan={dateKeys.length} style={{ textAlign: 'center', backgroundColor: '#08b3f1' }}>
                            Column Labels
                          </th>
                          <th rowSpan={2} style={{ textAlign: 'center', backgroundColor: '#08b3f1' }}>
                            Grand Total
                          </th>
                        </tr>
                        <tr>
                          <th style={{ textAlign: 'left', backgroundColor: '#08b3f1' }}>Business Name</th>
                          {dateKeys.map((key) => (
                            <th key={`date-${key}`} style={{ textAlign: 'center', backgroundColor: '#08b3f1' }}>
                              {dateFormat(key)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {pivotAccumulatorEntries.map(([business, details]) => (
                          <tr key={`pivot-${business}`}>
                            <td
                              style={{
                                fontWeight: 700,
                                textAlign: 'left',
                                background: '#e7f2ff',
                                color: '#0a3d62',
                              }}
                            >
                              {business}
                            </td>
                            {dateKeys.map((key) => (
                              <td key={`${business}-${key}`} style={{ background: '#ffffffff' }}>
                                {details.dates[key] ?? 0}
                              </td>
                            ))}
                            <td style={{ fontWeight: 700, background: '#d4e7ff', color: '#b71c1c' }}>
                              {details.total}
                            </td>
                          </tr>
                        ))}
                        {pivotAccumulatorEntries.length > 0 && (
                          <tr>
                            <td
                              style={{
                                fontWeight: 600,
                                textAlign: 'left',
                                background: '#f0f7ff',
                                color: '#055a8c',
                              }}
                            >
                              Grand Total
                            </td>
                            {dateKeys.map((key) => (
                              <td key={`date-total-${key}`} style={{ fontWeight: 600, background: '#f0f7ff' }}>
                                {dateTotals[key] ?? 0}
                              </td>
                            ))}
                            <td style={{ fontWeight: 700, background: '#d7e8ff', color: '#c62828' }}>
                              {pivotGrandTotal}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </StyledTable>
                  </ResponsiveTableContainer>
                </>
              )} */}

       
              <ResponsiveTableContainer>
                <StyledTable size="md" variant="plain" borderAxis="bothBetween">
                  <thead>
                    <tr>
                      <th colSpan={1} style={{ textAlign: 'left' , fontSize:'11' }} >Sum of Daily Target</th>
                      <th colSpan={pagedDateKeys.length} style={{ textAlign: 'center' }}>Column Labels</th>
                      <th rowSpan={2} style={{ textAlign: 'center' }} > Grand Total</th>
                    </tr>
                    <tr>
                      <th style={{ textAlign: 'left' }}>Business Name</th>
                      {pagedDateKeys.map((key) => (
                        <th key={`date-${key}`} style={{ textAlign: 'center' }}>{dateFormat(key)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pivotAccumulatorEntries.map(([business, details]) => (
                      <tr key={`pivot-${business}`}>
                        <td>{business}</td>
                        {pagedDateKeys.map((key) => (
                          <td key={`${business}-${key}`}>{details.dates[key] ?? 0}</td>
                        ))}
                        <td>{details.total}</td>
                      </tr>
                    ))}
                    {pivotAccumulatorEntries.length > 0 && (
                      <tr>
                        <td style={{color: '#055a8c'}}>Grand Total</td>
                        {pagedDateKeys.map((key) => (
                          <td key={`date-total-${key}`}>{dateTotals[key] ?? 0}</td>
                        ))}
                        <td style={{color: "#b71c1c"}}>{pivotGrandTotal}</td>
                      </tr>
                    )}
                  </tbody>
                </StyledTable>

              </ResponsiveTableContainer>
              
              {dateKeys.length > CHUNK_SIZE && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 ,mt:2}}>
                  <Button
                    variant="outlined"
                    disabled={datePage === 0}
                    onClick={() => setDatePage(datePage - 1)}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={(datePage + 1) * CHUNK_SIZE >= dateKeys.length}
                    onClick={() => setDatePage(datePage + 1)}
                    sx={{ ml: 1 }}
                  >
                    Next
                  </Button>
                </Box>
              )}
            </Container>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}


const StyledWrapper = styled.div`
  .button {
    --bezier: cubic-bezier(0.22, 0.61, 0.36, 1);
    --edge-light: hsla(0, 0%, 50%, 0.8);
    --text-light: rgba(255, 255, 255, 0.4);
    --back-color: 197, 92%; /* blue shade from #149dcfff */
    --lightness: 73%;

    cursor: pointer;
    padding: 0.7em 1em;
    border-radius: 0.5em;
    min-height: 2.4em;
    min-width: 3em;
    display: flex;
    align-items: center;
    gap: 0.5em;

    font-size: 18px;
    letter-spacing: 0.05em;
    line-height: 1;
    font-weight: bold;

    background: linear-gradient(
      140deg,
      hsla(var(--back-color), var(--lightness), 1) min(2em, 20%),
      hsla(var(--back-color), var(--lightness), 0.7) min(8em, 100%)
    );
    color: #fff;
    border: 0;
    box-shadow: inset 0.4px 1px 4px var(--edge-light);

    transition: all 0.1s var(--bezier);
  }

  .button:hover {
    --edge-light: hsla(0, 0%, 50%, 1);
    text-shadow: 0px 0px 10px var(--text-light);
    box-shadow: inset 0.4px 1px 4px var(--edge-light),
      2px 4px 8px rgba(0, 0, 0, 0.3);
  }

  .button:active {
    --text-light: rgba(255, 255, 255, 1);

    background: linear-gradient(
      140deg,
      hsla(var(--back-color), var(--lightness), 1) min(2em, 20%),
      hsla(var(--back-color), var(--lightness), 0.6) min(8em, 100%)
    );
    box-shadow: inset 0.4px 1px 8px var(--edge-light),
      0px 0px 8px hsla(var(--back-color), var(--lightness), 0.6);
    text-shadow: 0px 0px 20px var(--text-light);
    color: #fff;
    letter-spacing: 0.1em;
    transform: scale(1);
  }
`;
