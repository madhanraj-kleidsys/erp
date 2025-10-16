// import React, { useState, useEffect } from "react";
// import styled from 'styled-components';

// import {
//   Box,
//   Typography,
//   Sheet, Button, Option, Select, Input,
//   Grid, Table
// } from "@mui/joy";
// import EventIcon from "@mui/icons-material/Event";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import Header from './Header';
// import Sidebar from './Sidebar';

// import { CssVarsProvider } from '@mui/joy/styles';
// import CssBaseline from '@mui/joy/CssBaseline';

// import Skeleton from '@mui/joy/Skeleton';

// function TableSkeleton({ columns = [], rowCount = 6 }) {
//   return (
//     <ResponsiveTableContainer>
//       <StyledTable size="md" variant="plain" borderAxis="bothBetween">

//         <tbody>
//           {[...Array(rowCount)].map((_, i) => (
//             <tr key={i}>
//               <td><Skeleton variant="text" width={120} /></td>
//               <td><Skeleton variant="text" width={100} /></td>
//               {columns.map((_, idx) => (
//                 <td key={idx}><Skeleton variant="rectangular" width={60} height={24} /></td>
//               ))}
//               <td><Skeleton variant="rectangular" width={100} height={24} /></td>
//             </tr>
//           ))}
//         </tbody>
//       </StyledTable>
//     </ResponsiveTableContainer>
//   );
// }

// const apiUrl = import.meta.env.VITE_API_URL;

// const Container = styled(Box)`
//   padding: 16px;
//   background: #e7ebeeff;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ResponsiveSheet = styled(Sheet)`
//   background-color: white;
//   border-radius: 1em;
//   box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px,
//     rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
//   padding: 20px;
//   width: 100%;
//   max-width: 660px;
//   margin-bottom: 1.5rem;

//   @media (max-width: 600px) {
//     padding: 12px;
//     max-width: 100%;
//   }
// `;

// const ResponsiveTableContainer = styled(Box)`
//   width: 100%;
//   max-width: 2200px;
//   border-radius: 1em;
//   overflow-x: auto;
//   box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 15px;
//   margin-top: 1rem;
// `;

// // Smooth table with curved edges
// const StyledTable = styled(Table)`
//   border-collapse: separate !important;
//   border-spacing: 0 !important;
//   background-color: #ffffffff;
//   border-radius: 1rem;
//   box-shadow: 0px 4px 10px rgb(0 0 0 / 0.2);
//   min-width: 400px;

//   thead tr th {
//     padding: 16px;
//     background-color: #08b3f1ff;
//     color: #ffffffff;
//     font-weight: 700;
//     font-size: 1.15rem;
//   }

//   tbody tr {
//     background-color: #ffffffff;
//     transition: background-color 0.3s ease;
//   }

//   tbody tr:hover {
//     background-color: #ffffffff;
//   }

//   tbody tr td {
//     padding: 12px 16px;
//     text-align: center;
//     vertical-align: middle;
//     font-weight: 600;
//     color: #000000ff;
//   }

//   /* Rounded corners on corners of first and last td in first and last row */
//   tbody tr:first-child td:first-child {
//     border-top-left-radius: 1rem;
//   }
//   tbody tr:first-child td:last-child {
//     border-top-right-radius: 1rem;
//   }
//   tbody tr:last-child td:first-child {
//     border-bottom-left-radius: 1rem;
//   }
//   tbody tr:last-child td:last-child {
//     border-bottom-right-radius: 1rem;
//   }
// `;

// const CenterTd = styled.td`
//   text-align: center;
//   vertical-align: middle;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-weight: 600;
//   background: #ffffffff;
//   border-radius: 0.75rem 0 0 0.75rem;
// `;

// const months = [
//   { name: 'January', value: 1 },
//   { name: 'February', value: 2 },
//   { name: 'March', value: 3 },
//   { name: 'April', value: 4 },
//   { name: 'May', value: 5 },
//   { name: 'June', value: 6 },
//   { name: 'July', value: 7 },
//   { name: 'August', value: 8 },
//   { name: 'September', value: 9 },
//   { name: 'October', value: 10 },
//   { name: 'November', value: 11 },
//   { name: 'December', value: 12 },
// ];

// export default function Home({ user, onLogout }) {
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [month, setMonth] = useState(new Date().getMonth() +0);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);


//   // Handle fetch
//   const fetchData = async () => {
//     setLoading(true);
//     setData([]);
//     try {
//       const res = await fetch(`${apiUrl}/prodapparelsewing/getByMonthYear`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ year: Number(year), month: Number(month) })
//       });
//       const json = await res.json();
//       setData(json.data || []);
//     } catch (err) {
//       alert('Fetch failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(year, month); // Fetch on mount
//   }, []);


//   // Group by BUName and LineCode, sum DailyTarget by LineCode
//   const grouped = data.reduce((acc, row) => {
//     if (!acc[row.BUName]) acc[row.BUName] = {};
//     if (!acc[row.BUName][row.LineCode]) acc[row.BUName][row.LineCode] = 0;
//     acc[row.BUName][row.LineCode] += row.DailyTarget ?? 0;
//     return acc;
//   }, {});

//   // All line codes, for consistent row order
//   const allLineCodes = [
//     ...new Set(data.map(row => row.LineCode))
//   ].sort();
//   // Build a lookup [Business][Line][Week] = DailyTarget
//   const lineWeekValues = {};

//   // data.forEach(row => {
//   //   const business = row.BUName || 'Unknown';
//   //   const line = row.LineCode || 'N/A';
//   //   const week = Number(row.WeekNo);
//   //   if (!lineWeekValues[business]) lineWeekValues[business] = {};
//   //   if (!lineWeekValues[business][line]) lineWeekValues[business][line] = {};
//   //   lineWeekValues[business][line][week] = row.DailyTarget || 0;
//   // });

//   data.forEach(row => {
//     const business = row.BUName || 'Unknown';
//     const line = row.LineCode || 'N/A';
//     const week = Number(row.WeekNo);
//     if (!lineWeekValues[business]) lineWeekValues[business] = {};
//     if (!lineWeekValues[business][line]) lineWeekValues[business][line] = {};
//     lineWeekValues[business][line][week] = (lineWeekValues[business][line][week] || 0) + (row.DailyTarget || 0);
//   });



//   // Grand total
//   const grandTotal = Object.values(grouped).flatMap(
//     obj => Object.values(obj)
//   ).reduce((sum, v) => sum + v, 0);

//   // Unique week numbers for pivot table columns
//   const weekNumbers = Array.from(
//     new Set(
//       data
//         .map((row) => Number(row.WeekNo))
//         .filter((week) => Number.isFinite(week))
//     )
//   ).sort((a, b) => a - b);

//   // Pivot grouping by BU > OC > Week
//   const pivotGrouped = data.reduce((acc, row) => {
//     const business = (row.BUName && String(row.BUName).trim()) || 'Unknown';
//     const order = (row.OCNo && String(row.OCNo).trim()) || 'N/A';
//     const week = Number(row.WeekNo);
//     const target = Number(row.DailyTarget) || 0;

//     if (!acc[business]) {
//       acc[business] = {};
//     }
//     if (!acc[business][order]) {
//       acc[business][order] = { weeks: {}, orderTotal: 0 };
//     }

//     if (Number.isFinite(week)) {
//       acc[business][order].weeks[week] =
//         (acc[business][order].weeks[week] || 0) + target;
//     }

//     acc[business][order].orderTotal += target;

//     return acc;
//   }, {});

//   const toIsoDate = (value) => {
//     if (!value) return null;
//     const date = new Date(value);
//     if (Number.isNaN(date.getTime())) return null;
//     return date.toISOString().slice(0, 10);
//   };

//   const dateFormat = (isoDate) => {
//     if (!isoDate) return '';
//     const [year, month, day] = isoDate.split('-');
//     return `${day}-${month}-${year}`;
//   };
//   const pivotAccumulator = data.reduce(
//     (acc, row) => {
//       const isoDate = toIsoDate(row.ProdDate);
//       if (!isoDate) {
//         return acc;
//       }

//       const business = (row.BUName && String(row.BUName).trim()) || 'Unknown';
//       const target = Number(row.DailyTarget) || 0;

//       if (!acc.byBusiness[business]) {
//         acc.byBusiness[business] = { dates: {}, total: 0 };
//       }

//       acc.byBusiness[business].dates[isoDate] =
//         (acc.byBusiness[business].dates[isoDate] || 0) + target;
//       acc.byBusiness[business].total += target;

//       acc.byDate[isoDate] = (acc.byDate[isoDate] || 0) + target;
//       acc.dateKeys.add(isoDate);

//       return acc;
//     },
//     { byBusiness: {}, byDate: {}, dateKeys: new Set() }
//   );

//   const dateKeys = Array.from(pivotAccumulator.dateKeys).sort(
//     (a, b) => new Date(a) - new Date(b)
//   );


//   const pivotEntries = Object.entries(pivotGrouped).sort((a, b) =>
//     a[0].localeCompare(b[0], undefined, { sensitivity: 'base' })
//   );
//   const hasPivotData = pivotEntries.length > 0 && weekNumbers.length > 0;

//   const weekTotals = weekNumbers.reduce((acc, week) => {
//     const totalForWeek = data.reduce((sum, row) => {
//       const rowWeek = Number(row.WeekNo);
//       if (Number.isFinite(rowWeek) && rowWeek === week) {
//         const value = Number(row.DailyTarget) || 0;
//         return sum + value;
//       }
//       return sum;
//     }, 0);

//     acc[week] = totalForWeek;
//     return acc;
//   }, {});

//   const pivotGrandTotal = grandTotal;

//   const displayYear =
//     data.length > 0 && data[0]?.YearNo !== undefined
//       ? Number(data[0].YearNo)
//       : year;
//   const displayMonth =
//     (data.length > 0 && data[0]?.MnthName) ||
//     months.find((m) => Number(m.value) === Number(month))?.name ||
//     '';

//   const pivotAccumulatorEntries = Object.entries(pivotAccumulator.byBusiness).sort((a, b) =>
//     a[0].localeCompare(b[0], undefined, { sensitivity: 'base' })
//   );

//   const dateTotals = pivotAccumulator.byDate;


//   const CHUNK_SIZE = 6;
//   const [datePage, setDatePage] = useState(0);

//   const pagedDateKeys = dateKeys.slice(datePage * CHUNK_SIZE, (datePage + 1) * CHUNK_SIZE);


//   return (

//     <CssVarsProvider disableTransitionOnChange>

//       <CssBaseline />
//       <Box sx={{ display: "flex", minHeight: "100dvh", bgcolor: "white" }}>
//         <Sidebar sx={{ flexShrink: 0, width: { xs: 60, sm: 220 } }} />
//         <Box sx={{ flexGrow: 1, p: 1, overflowY: "auto" }}>
//           <Header />
//           <Box component="main"
//             className="MainContent"
//             sx={{

//               pt: {
//                 xs: 'calc(12px + var(--Header-height))',
//                 sm: 'calc(12px + var(--Header-height))',
//                 md: 3,
//               },
//               pb: { xs: 2, sm: 2, md: 1 },
//               flex: 1,
//               display: 'flex',
//               flexDirection: 'column',
//               minWidth: 0,
//               gap: 1,
//             }}
//           >
//             <Box
//               sx={{
//                 position: 'sticky',
//                 top: 0,
//                 zIndex: 110,
//                 p: { xs: 1, sm: 2, md: 3 },
//                 borderRadius: 'md',
//                 bgcolor: "rgb(18, 177, 209)",
//                 color: '#ffffffff',
//                 mx: { xs: 2, sm: 4, md: 2, lg: 2 },
//                 mt: { xs: 1, sm: 1, md: 1 },
//               }}
//             >
//               <Typography
//                 level={{ xs: "h5", sm: "h4", md: "h3" }}
//                 fontWeight="lg"
//                 textAlign="center"
//                 sx={{ fontSize: 20 }}
//               >
//                 SKPL —  product apparel sewing
//               </Typography>
//             </Box>

//             <Container>
//               <ResponsiveSheet>
//                 <Grid container spacing={2} alignItems="center">
//                   <Grid xs={12} sm={6} md={3} display="flex" alignItems="center">
//                     <EventIcon sx={{ mr: 1, color: "#1976d2" }} />
//                     <Input
//                       type="number"
//                       value={year}
//                       onChange={(e) => setYear(e.target.value)}
//                       sx={{ width: "140%" }}
//                       slotProps={{ input: { min: 2020, max: 2100 } }}
//                       startDecorator="Year"
//                     />
//                   </Grid>

//                   <Grid xs={12} sm={6} md={4} display="flex" alignItems="center">
//                     <CalendarMonthIcon sx={{ mr: 1, color: "#1976d2" }} />
//                     <Select
//                       value={month}
//                       onChange={(_, val) => val && setMonth(val)}
//                       sx={{ width: "140%" }}
//                     >
//                       {months.map((m) => (
//                         <Option key={m.value} value={m.value}>
//                           {m.name}
//                         </Option>
//                       ))}
//                     </Select>
//                   </Grid>


//                   <Grid xs={12} sm={12} md={3} textAlign="right" display="flex" justifyContent="flex-end" alignItems="center">

//                     <StyledWrapper>
//                       <div>
//                         <button style={{ color: "#000" }} className="button" onClick={fetchData} loading={loading}>
//                           <svg viewBox="0 0 16 16" className="bi bi-lightning-charge-fill" fill="currentColor" height={16} width={15} color="#000" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" /></svg>
//                           Fetch
//                         </button>
//                       </div>
//                     </StyledWrapper>
//                   </Grid>
//                 </Grid>
//               </ResponsiveSheet>

//               {loading ? (
//                 <TableSkeleton columns={weekNumbers} rowCount={6} />
//               ) : (

//                 <ResponsiveTableContainer>
//                   <StyledTable size="md" variant="plain" borderAxis="bothBetween">
//                     <thead>
//                       <tr>
//                         <th>Business Name</th>
//                         <th>Line Code</th>
//                         {weekNumbers.map(week => (
//                           <th key={week} style={{ textAlign: 'center' }}>{week}</th>
//                         ))}
//                         <th>Total Daily Target</th>
//                       </tr>
//                     </thead>

//                     <tbody>

//                       {Object.entries(lineWeekValues).length === 0 && (
//                         <tr>
//                           <td colSpan={2 + weekNumbers.length + 1} style={{ textAlign: "center", backgroundColor: "#ffffff" }}>
//                             <Typography style={{ color: "#ff0000ff" }} >No Data for the selected year & month</Typography>
//                           </td>
//                         </tr>
//                       )}

//                       {Object.entries(lineWeekValues).map(([business, lines]) =>
//                         Object.entries(lines).map(([line, weekVals], i, arr) => {
//                           const lineTotal = weekNumbers.reduce(
//                             (sum, week) => sum + (weekVals[week] || 0), 0
//                           );
//                           return (
//                             <tr key={business + line}>
//                               {i === 0 && (
//                                 <td rowSpan={arr.length} style={{ fontWeight: 700, background: '#e7f2ff' }}>{business}</td>
//                               )}
//                               <td style={{ fontWeight: 600 }}>{line}</td>
//                               {weekNumbers.map(week => (
//                                 <td key={week}>{weekVals[week] || 0}</td>
//                               ))}
//                               <td style={{ fontWeight: 700, color: "#1a5c1a" }}>{lineTotal}</td>
//                             </tr>
//                           );
//                         })
//                       )}


//                       {
//                         Object.keys(grouped).length > 0 && (
//                           <tr>
//                             <td colSpan={2} style={{ fontWeight: 700, textAlign: 'center', background: '#f0f7ff',color: '#055a8c' }}>Grand Total</td>
//                             {weekNumbers.map(week => {
//                               const wTotal = Object.values(lineWeekValues).flatMap(lines =>
//                                 Object.values(lines).map(weekVals => weekVals[week] || 0)
//                               ).reduce((a, b) => a + b, 0);
//                               return <td key={week} style={{ fontWeight: 700 }}>{wTotal}</td>;
//                             })}
//                             <td style={{ fontWeight: 900, color: "#b71c1c" }}>{grandTotal}</td>
//                           </tr>
//                         )
//                       }
//                     </tbody>
//                   </StyledTable>
//                 </ResponsiveTableContainer>

//               )}


//               {hasPivotData && (
//                 <>
//                   <ResponsiveTableContainer>
//                     <StyledTable size="md" variant="plain" borderAxis="bothBetween">
//                       <thead>
//                         {/* <tr>
//                           <th rowSpan={2} style={{ textAlign: 'left' }}>
//                             Row Labels
//                           </th>
//                           <th rowSpan={2} style={{ textAlign: 'left' }}>
//                             OC No
//                           </th>

//                           <th colSpan={weekNumbers.length} style={{ textAlign: 'center' }}>
//                             Column Labels
//                           </th>
//                           <th rowSpan={2}>Grand Total</th>
//                         </tr>

//                         <tr>
//                           {weekNumbers.map((week) => (
//                             <th key={`week-${week}`}>{week}</th>
//                           ))}
//                         </tr> */}
//                         <tr>
//                           <th colSpan={2} style={{ textAlign: 'center' }}>Sum Of Daily Target</th>
//                           <th colSpan={weekNumbers.length} style={{ textAlign: 'center' }}>
//                             Column Labels
//                           </th>
//                           <th rowSpan={2} style={{ textAlign: 'center' }}>Grand Total</th>
//                         </tr>

//                         {/* Second header row - sub level headers */}
//                         <tr>
//                           <th style={{ textAlign: 'left' }}>Business Name</th>
//                           <th style={{ textAlign: 'left' }}>OC No</th>
//                           {weekNumbers.map(week => (
//                             <th key={week} style={{ textAlign: 'center' }}>{week}</th>
//                           ))}
//                         </tr>
//                       </thead>


//                       <tbody>
//                         {pivotEntries.map(([business, orders]) => {
//                           const orderEntries = Object.entries(orders).sort((a, b) =>
//                             a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: 'base' })
//                           );

//                           const businessWeekTotals = weekNumbers.reduce((acc, week) => {
//                             acc[week] = orderEntries.reduce(
//                               (sum, [, details]) => sum + (details.weeks[week] ?? 0),
//                               0
//                             );
//                             return acc;
//                           }, {});

//                           const businessGrandTotal = orderEntries.reduce(
//                             (sum, [, details]) => sum + (details.orderTotal ?? 0),
//                             0
//                           );

//                           return (
//                             <React.Fragment key={`pivot-${business}`}>
//                               <tr>
//                                 <td
//                                   style={{
//                                     fontWeight: 700,
//                                     textAlign: 'left',
//                                     background: '#e7f2ff',
//                                     color: '#0a3d62',
//                                   }}
//                                 >
//                                   {business}
//                                 </td>

//                                 <td style={{ background: '#e7f2ff' }} />
//                                 {weekNumbers.map((week) => (
//                                   <td
//                                     key={`${business}-summary-week-${week}`}
//                                     style={{ fontWeight: 600, background: '#e7f2ff' }}
//                                   >
//                                     {businessWeekTotals[week] ?? 0}
//                                   </td>
//                                 ))}
//                                 <td
//                                   style={{
//                                     fontWeight: 700,
//                                     background: '#d4e7ff',
//                                     color: '#b71c1c',
//                                   }}
//                                 >
//                                   {businessGrandTotal}
//                                 </td>
//                               </tr>

//                               {orderEntries.map(([orderNo, details]) => (
//                                 <tr key={`${business}-${orderNo}`}>
//                                   <td style={{ background: '#ffffffff' }} />
//                                   <td
//                                     style={{
//                                       fontWeight: 600,
//                                       textAlign: 'left',
//                                       background: '#ffffffff',
//                                       paddingLeft: '1.5rem',
//                                     }}
//                                   >
//                                     {orderNo}
//                                   </td>
//                                   {weekNumbers.map((week) => (
//                                     <td key={`${business}-${orderNo}-${week}`} style={{ background: '#ffffffff' }}>
//                                       {details.weeks[week] ?? 0}
//                                     </td>
//                                   ))}
//                                   <td style={{ fontWeight: 600, background: '#ffffffff', color: '#0a558c' }}>
//                                     {details.orderTotal}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </React.Fragment>
//                           );
//                         })}
//                         {pivotEntries.length > 0 && (
//                           <tr>
//                             <td
//                               colSpan={2}
//                               style={{
//                                 fontWeight: 600,
//                                 textAlign: 'center',
//                                 background: '#f0f7ff',
//                                 color: '#055a8c',
//                               }}
//                             >
//                               Grand Total
//                             </td>
//                             {weekNumbers.map((week) => (
//                               <td key={`week-total-${week}`} style={{ fontWeight: 600, background: '#f0f7ff' }}>
//                                 {weekTotals[week] ?? 0}
//                               </td>
//                             ))}
//                             <td style={{ fontWeight: 700, background: '#d7e8ff', color: '#c62828' }}>
//                               {pivotGrandTotal}
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </StyledTable>
//                   </ResponsiveTableContainer>
//                 </>
//               )}



//               {/* {hasPivotData && (
//                 <>
//                   <ResponsiveTableContainer>
//                     <StyledTable size="md" variant="plain" borderAxis="bothBetween">
//                       <thead>
//                         <tr>
//                           <th colSpan={1} style={{ textAlign: 'left', backgroundColor: '#08b3f1' }}>
//                             Sum of DailyTarget
//                           </th>
//                           <th colSpan={dateKeys.length} style={{ textAlign: 'center', backgroundColor: '#08b3f1' }}>
//                             Column Labels
//                           </th>
//                           <th rowSpan={2} style={{ textAlign: 'center', backgroundColor: '#08b3f1' }}>
//                             Grand Total
//                           </th>
//                         </tr>
//                         <tr>
//                           <th style={{ textAlign: 'left', backgroundColor: '#08b3f1' }}>Business Name</th>
//                           {dateKeys.map((key) => (
//                             <th key={`date-${key}`} style={{ textAlign: 'center', backgroundColor: '#08b3f1' }}>
//                               {dateFormat(key)}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {pivotAccumulatorEntries.map(([business, details]) => (
//                           <tr key={`pivot-${business}`}>
//                             <td
//                               style={{
//                                 fontWeight: 700,
//                                 textAlign: 'left',
//                                 background: '#e7f2ff',
//                                 color: '#0a3d62',
//                               }}
//                             >
//                               {business}
//                             </td>
//                             {dateKeys.map((key) => (
//                               <td key={`${business}-${key}`} style={{ background: '#ffffffff' }}>
//                                 {details.dates[key] ?? 0}
//                               </td>
//                             ))}
//                             <td style={{ fontWeight: 700, background: '#d4e7ff', color: '#b71c1c' }}>
//                               {details.total}
//                             </td>
//                           </tr>
//                         ))}
//                         {pivotAccumulatorEntries.length > 0 && (
//                           <tr>
//                             <td
//                               style={{
//                                 fontWeight: 600,
//                                 textAlign: 'left',
//                                 background: '#f0f7ff',
//                                 color: '#055a8c',
//                               }}
//                             >
//                               Grand Total
//                             </td>
//                             {dateKeys.map((key) => (
//                               <td key={`date-total-${key}`} style={{ fontWeight: 600, background: '#f0f7ff' }}>
//                                 {dateTotals[key] ?? 0}
//                               </td>
//                             ))}
//                             <td style={{ fontWeight: 700, background: '#d7e8ff', color: '#c62828' }}>
//                               {pivotGrandTotal}
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </StyledTable>
//                   </ResponsiveTableContainer>
//                 </>
//               )} */}

//               {pivotAccumulatorEntries.length > 0 && dateKeys.length > 0 && (
//                 <>
//                   <ResponsiveTableContainer>
//                     <StyledTable size="md" variant="plain" borderAxis="bothBetween">
//                       <thead>
//                         <tr>
//                           <th colSpan={1} style={{ textAlign: 'left' , fontSize:'11' }} >Sum of Daily Target</th>
//                           <th colSpan={pagedDateKeys.length} style={{ textAlign: 'center' }}>Column Labels</th>
//                           <th rowSpan={2} style={{ textAlign: 'center' }} > Grand Total</th>
//                         </tr>
//                         <tr>
//                           <th style={{ textAlign: 'left' }}>Business Name</th>
//                           {pagedDateKeys.map((key) => (
//                             <th key={`date-${key}`} style={{ textAlign: 'center' }}>{dateFormat(key)}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {pivotAccumulatorEntries.map(([business, details]) => (
//                           <tr key={`pivot-${business}`}>
//                             <td>{business}</td>
//                             {pagedDateKeys.map((key) => (
//                               <td key={`${business}-${key}`}>{details.dates[key] ?? 0}</td>
//                             ))}
//                             <td>{details.total}</td>
//                           </tr>
//                         ))}
//                         {pivotAccumulatorEntries.length > 0 && (
//                           <tr>
//                             <td style={{color: '#055a8c'}}>Grand Total</td>
//                             {pagedDateKeys.map((key) => (
//                               <td key={`date-total-${key}`}>{dateTotals[key] ?? 0}</td>
//                             ))}
//                             <td style={{color: "#b71c1c"}}>{pivotGrandTotal}</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </StyledTable>
//                   </ResponsiveTableContainer>

//                   {dateKeys.length > CHUNK_SIZE && (
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 ,mt:2}}>
//                       <Button
//                         variant="outlined"
//                         disabled={datePage === 0}
//                         onClick={() => setDatePage(datePage - 1)}
//                       >
//                         Prev
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         disabled={(datePage + 1) * CHUNK_SIZE >= dateKeys.length}
//                         onClick={() => setDatePage(datePage + 1)}
//                         sx={{ ml: 1 }}
//                       >
//                         Next--
//                       </Button>
//                     </Box>
//                   )}

//                 </>
//               )}
//             </Container>
//           </Box>
//         </Box>
//       </Box>
//     </CssVarsProvider>
//   );
// }


// const StyledWrapper = styled.div`
//   .button {
//     --bezier: cubic-bezier(0.22, 0.61, 0.36, 1);
//     --edge-light: hsla(0, 0%, 50%, 0.8);
//     --text-light: rgba(255, 255, 255, 0.4);
//     --back-color: 197, 92%; /* blue shade from #149dcfff */
//     --lightness: 73%;

//     cursor: pointer;
//     padding: 0.7em 1em;
//     border-radius: 0.5em;
//     min-height: 2.4em;
//     min-width: 3em;
//     display: flex;
//     align-items: center;
//     gap: 0.5em;

//     font-size: 18px;
//     letter-spacing: 0.05em;
//     line-height: 1;
//     font-weight: bold;

//     background: linear-gradient(
//       140deg,
//       hsla(var(--back-color), var(--lightness), 1) min(2em, 20%),
//       hsla(var(--back-color), var(--lightness), 0.7) min(8em, 100%)
//     );
//     color: #fff;
//     border: 0;
//     box-shadow: inset 0.4px 1px 4px var(--edge-light);

//     transition: all 0.1s var(--bezier);
//   }

//   .button:hover {
//     --edge-light: hsla(0, 0%, 50%, 1);
//     text-shadow: 0px 0px 10px var(--text-light);
//     box-shadow: inset 0.4px 1px 4px var(--edge-light),
//       2px 4px 8px rgba(0, 0, 0, 0.3);
//   }

//   .button:active {
//     --text-light: rgba(255, 255, 255, 1);

//     background: linear-gradient(
//       140deg,
//       hsla(var(--back-color), var(--lightness), 1) min(2em, 20%),
//       hsla(var(--back-color), var(--lightness), 0.6) min(8em, 100%)
//     );
//     box-shadow: inset 0.4px 1px 8px var(--edge-light),
//       0px 0px 8px hsla(var(--back-color), var(--lightness), 0.6);
//     text-shadow: 0px 0px 20px var(--text-light);
//     color: #fff;
//     letter-spacing: 0.1em;
//     transform: scale(1);
//   }
// `;

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  Option,
  Grid,
  LinearProgress,
  Chip,
  FormControl,
  FormLabel,
  Autocomplete,
  IconButton,
  Drawer,
  Divider,
  Sheet,
  Table,
} from "@mui/joy";
import {
  FilterList,
  CalendarMonth,
  BusinessCenter,
  Category,
  Assessment,
  CheckCircle,
  Close,
  TrendingUp,
  Inventory,
  ContentCut,
  Print,
  NotificationImportant,
  ErrorOutline, Warning,
} from "@mui/icons-material";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Header from "./Header";
import Sidebar from "./Sidebar";
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#e3f2fd",
          500: "#2196f3",
          600: "#1976d2",
        },
      },
    },
  },
});

const customers = [
  "H&M",
  "WALMART",
  "GROUPE AUCHAN",
  "MAX HOLDINGS",
  "KMART AUSTRALIA",
];
const stylesByCustomer = {
  "H&M": ["Basic T-Shirt", "Denim Jacket", "Summer Dress", "Casual Pants"],
  "WALMART": ["Polo Shirt", "Cargo Pants", "Hoodie", "Jeans"],
  "GROUPE AUCHAN": ["Formal Shirt", "Blazer", "Trousers", "Skirt"],
  "MAX HOLDINGS": [
    "Designer Top",
    "Premium Jeans",
    "Silk Scarf",
    "Leather Jacket",
  ],
  "KMART AUSTRALIA": [
    "Kids T-Shirt",
    "School Uniform",
    "Baby Onesie",
    "Sports Wear",
  ],
};

const processes = [
  "All",
  "Sourcing",
  "Fabric Store",
  "Cutting",
  "VAP / Printing",
];
const statuses = ["On-time", "Delayed", "Risk"];

const mockDataByFilters = {
  "H&M": {
    "On-time": {
      kpi: { totalOrders: 245, fullOnRisk: 15, delayedOrders: 8, atRisk: 12 },
      processes: [
        { name: "Sourcing", progress: 85, status: "on-track", orders: 45, risk: 4 },
        { name: "Fabric Store", progress: 72, status: "on-track", orders: 34, risk: 6 },
        { name: "Cutting", progress: 55, status: "warning", orders: 25, risk: 9 },
        { name: "VAP / Printing", progress: 48, status: "warning", orders: 20, risk: 11 },
      ],
      riskAlerts: [
        { customer: "H&M", delivery: "W34", action: "Escalate PO" },
        { customer: "WALMART", delivery: "W35", action: "Follow up mill" },
        { customer: "GROUPE AUCHAN", delivery: "W36", action: "Check fabric" },
      ]
    },
    Delayed: {
      kpi: { totalOrders: 180, fullOnRisk: 25, delayedOrders: 18, atRisk: 22 },
      processes: [
        { name: "Sourcing", progress: 65, status: "warning", orders: 32, risk: 8 },
        { name: "Fabric Store", progress: 45, status: "critical", orders: 28, risk: 12 },
        { name: "Cutting", progress: 30, status: "critical", orders: 18, risk: 15 },
        { name: "VAP / Printing", progress: 25, status: "critical", orders: 12, risk: 18 },
      ],
      riskAlerts: [
        { customer: "H&M", delivery: "W33", action: "Urgent review" },
        { customer: "WALMART", delivery: "W34", action: "Expedite fabric" },
        { customer: "MAX HOLDINGS", delivery: "W35", action: "Call supplier" },
        { customer: "KMART AUSTRALIA", delivery: "W36", action: "Schedule meeting" },
      ]
    },
    Risk: {
      kpi: { totalOrders: 120, fullOnRisk: 45, delayedOrders: 35, atRisk: 40 },
      processes: [
        { name: "Sourcing", progress: 40, status: "critical", orders: 20, risk: 15 },
        { name: "Fabric Store", progress: 25, status: "critical", orders: 15, risk: 20 },
        { name: "Cutting", progress: 15, status: "critical", orders: 8, risk: 25 },
        { name: "VAP / Printing", progress: 10, status: "critical", orders: 5, risk: 30 },
      ],
      riskAlerts: [
        { customer: "H&M", delivery: "W32", action: "Critical escalation" },
        { customer: "WALMART", delivery: "W33", action: "Emergency order" },
        { customer: "GROUPE AUCHAN", delivery: "W34", action: "Management review" },
        { customer: "MAX HOLDINGS", delivery: "W34", action: "Rework plan" },
        { customer: "KMART AUSTRALIA", delivery: "W35", action: "Alternative source" },
      ]
    }
  },
  WALMART: {
    "On-time": {
      kpi: { totalOrders: 320, fullOnRisk: 12, delayedOrders: 5, atRisk: 8 },
      processes: [
        { name: "Sourcing", progress: 90, status: "on-track", orders: 65, risk: 2 },
        { name: "Fabric Store", progress: 85, status: "on-track", orders: 52, risk: 3 },
        { name: "Cutting", progress: 78, status: "on-track", orders: 38, risk: 5 },
        { name: "VAP / Printing", progress: 72, status: "warning", orders: 28, risk: 8 },
      ],
      riskAlerts: [
        { customer: "WALMART", delivery: "W36", action: "Monitor progress" },
        { customer: "H&M", delivery: "W37", action: "Quality check" },
      ]
    },
    Delayed: {
      kpi: { totalOrders: 280, fullOnRisk: 20, delayedOrders: 15, atRisk: 18 },
      processes: [
        { name: "Sourcing", progress: 70, status: "warning", orders: 48, risk: 7 },
        { name: "Fabric Store", progress: 60, status: "warning", orders: 42, risk: 10 },
        { name: "Cutting", progress: 45, status: "critical", orders: 28, risk: 13 },
        { name: "VAP / Printing", progress: 35, status: "critical", orders: 20, risk: 16 },
      ],
      riskAlerts: [
        { customer: "WALMART", delivery: "W34", action: "Speed up cutting" },
        { customer: "GROUPE AUCHAN", delivery: "W35", action: "Add resources" },
        { customer: "KMART AUSTRALIA", delivery: "W36", action: "Overtime approval" },
      ]
    },
    Risk: {
      kpi: { totalOrders: 200, fullOnRisk: 35, delayedOrders: 28, atRisk: 32 },
      processes: [
        { name: "Sourcing", progress: 50, status: "critical", orders: 35, risk: 12 },
        { name: "Fabric Store", progress: 35, status: "critical", orders: 25, risk: 18 },
        { name: "Cutting", progress: 25, status: "critical", orders: 18, risk: 22 },
        { name: "VAP / Printing", progress: 20, status: "critical", orders: 12, risk: 28 },
      ],
      riskAlerts: [
        { customer: "WALMART", delivery: "W32", action: "Emergency protocol" },
        { customer: "H&M", delivery: "W33", action: "CEO notification" },
        { customer: "MAX HOLDINGS", delivery: "W34", action: "Contract review" },
        { customer: "GROUPE AUCHAN", delivery: "W34", action: "Penalty waiver" },
      ]
    }
  }
};

const generateWeeks = () => {
  const weeks = [];
  for (let i = 1; i <= 52; i++) {
    weeks.push(`W${i.toString().padStart(2, "0")}`);
  }
  return weeks;
};

const getCurrentWeek = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const week = Math.floor(diff / oneWeek);
  return `W${week.toString().padStart(2, "0")}`;
};

const getWeekDateRange = (week) => {
  const weekNum = parseInt(week.substring(1));
  const year = new Date().getFullYear();
  const startDate = new Date(year, 0, 1 + (weekNum - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const options = { month: "short", day: "numeric" };
  return `${startDate.toLocaleDateString(
    "en-US",
    options
  )} - ${endDate.toLocaleDateString("en-US", options)}, ${year}`;
};

const calculateFocusWeek = (baseWeek, offset) => {
  const weekNum = parseInt(baseWeek.substring(1));
  const newWeek = weekNum + offset;
  return `W${newWeek.toString().padStart(2, "0")}`;
};

const getProcessIcon = (name) => {
  switch (name) {
    case "Sourcing":
      return <TrendingUp sx={{ fontSize: 28, color: "#1fc87e" }} />;
    case "Fabric Store":
      return <Inventory sx={{ fontSize: 28, color: "#1c80fe" }} />;
    case "Cutting":
      return <ContentCut sx={{ fontSize: 28, color: "#ff9800" }} />;
    case "VAP / Printing":
      return <Print sx={{ fontSize: 28, color: "#f44336" }} />;
    default:
      return <Assessment sx={{ fontSize: 28, color: "#475569" }} />;
  }
};

const getLinearBarColor = (percent) => {
  if (percent < 50) return '#ef4444'; // red for <50%
  if (percent >= 50 && percent <= 60) return '#f59e0b'; // yellow
  return '#10b981'; // green for >60%
};


const getProcessIconOg = (name) => {
  switch (name) {
    case "Sourcing":
      return <TrendingUp sx={{ fontSize: 28, color: "#ffffffff" }} />;
    case "Fabric Store":
      return <Inventory sx={{ fontSize: 28, color: "#ffffffff" }} />;
    case "Cutting":
      return <ContentCut sx={{ fontSize: 28, color: "#ffffffff" }} />;
    case "VAP / Printing":
      return <Print sx={{ fontSize: 28, color: "#ffffffff" }} />;
    default:
      return <Assessment sx={{ fontSize: 28, color: "#ffffffff" }} />;
  }
}

const getProcessColor = (name) => {
  switch (name) {
    case "Sourcing":
      return { primary: "#1fc87e", secondary: "#0cba6b", text: "#065f3e" };
    case "Fabric Store":
      return { primary: "#1c80fe", secondary: "#0066cc", text: "#003d7a" };
    case "Cutting":
      return { primary: "#ff9800", secondary: "#f57c00", text: "#e65100" };
    case "VAP / Printing":
      return { primary: "#f44336", secondary: "#d32f2f", text: "#b71c1c" };
    default:
      return { primary: "#475569", secondary: "#334155", text: "#1e293b" };
  }
};

const getProgressColor = (name) => {
  switch (name) {
    case "Sourcing":
      return "#1fc87e";
    case "Fabric Store":
      return "#1c80fe";
    case "Cutting":
      return "#ff9800";
    case "VAP / Printing":
      return "#f44336";
    default:
      return "#475569";
  }
};

const getStatusConfig = (status) => {
  switch (status) {
    case "on-track":
      return {
        color: "#10b981",
        bgColor: "#ecfdf5",
        borderColor: "#10b981",
        cardBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        label: "On Track",
      };
    case "warning":
      return {
        color: "#f59e0b",
        bgColor: "#fffbeb",
        borderColor: "#f59e0b",
        cardBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        label: "At Risk",
      };
    case "critical":
      return {
        color: "#ef4444",
        bgColor: "#fef2f2",
        borderColor: "#ef4444",
        cardBg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        label: "Critical",
      };
    default:
      return {
        color: "#6b7280",
        bgColor: "#f9fafb",
        borderColor: "#6b7280",
        cardBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        label: "Unknown",
      };
  }
};

const RiskBadge = ({ count, color }) => (
  <Box
    sx={{
      position: "absolute",
      top: 12,
      right: 12,
      minWidth: 32,
      height: 32,
      borderRadius: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: 1,
      fontSize: "0.875rem",
      fontWeight: 700,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      animation: "pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "@keyframes pulseRing": {
        "0%, 100%": {
          transform: "scale(1)",
        },
        "50%": {
          transform: "scale(1.05)",
        },
      },
    }}
  >
    {count}
  </Box>
);

const ProductionDashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [selectedStyle, setSelectedStyle] = useState(
    stylesByCustomer[customers[0]][0]
  );
  const [selectedProcess, setSelectedProcess] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("On-time");
  const [weekSearch, setWeekSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const weeks = generateWeeks();

  useEffect(() => {
    setSelectedStyle(stylesByCustomer[selectedCustomer][0]);
  }, [selectedCustomer]);

  const filteredWeeks = weeks.filter((week) =>
    week.toLowerCase().includes(weekSearch.toLowerCase())
  );

  const getCurrentData = () => {
    const customerData =
      mockDataByFilters[selectedCustomer] || mockDataByFilters["H&M"];
    const statusData = customerData[selectedStatus] || customerData["On-time"];
    return statusData;
  };

  const currentData = getCurrentData();

  // const getPlanningWeeks = () => {
  //   return {
  //     sourcing: {
  //       focus: calculateFocusWeek(selectedWeek, 4),
  //       planning: calculateFocusWeek(selectedWeek, 3),
  //     },
  //     fabricStore: {
  //       focus: calculateFocusWeek(selectedWeek, 3),
  //       planning: calculateFocusWeek(selectedWeek, 3),
  //     },

  //     cutting: {
  //       focus: calculateFocusWeek(selectedWeek, 2),
  //       planning: calculateFocusWeek(selectedWeek, 2),
  //     },
  //     vapPrinting: {
  //       focus: calculateFocusWeek(selectedWeek,2),
  //       planning: calculateFocusWeek(selectedWeek, 2),
  //     }
  //     // ,
  //     // riskAlert: {
  //     //   focus: calculateFocusWeek(selectedWeek, 1),
  //     //   planning: calculateFocusWeek(selectedWeek, 1),
  //     // }
  //   };
  // };

  const getPlanningWeeks = () => {
    const weekNum = parseInt(selectedWeek.substring(1));
    return {
      sourcing: {
        focus: `W${(weekNum + 4).toString().padStart(2, "0")}`,
        planning: `W${(weekNum + 3).toString().padStart(2, "0")}`,
      },
      fabricStore: {
        focus: `W${(weekNum + 3).toString().padStart(2, "0")}`,
        planning: `W${(weekNum + 3).toString().padStart(2, "0")}`,
      },
      cutting: {
        focus: `W${(weekNum + 2).toString().padStart(2, "0")}`,
        planning: `W${(weekNum + 2).toString().padStart(2, "0")}`,
      },
      vapPrinting: {
        focus: `W${(weekNum + 2).toString().padStart(2, '0')}`,
        planning: `W${(weekNum + 2).toString().padStart(2, '0')}`,
      }
    };
  };

  const planningWeeks = getPlanningWeeks();

  const getVisibleProcesses = () => {
    if (selectedProcess === "All") {
      return ["Sourcing", "Fabric Store", "Cutting", "VAP / Printing"];
    }
    return [selectedProcess];
  };

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh", bgcolor: "white" }}>
        <Sidebar />
        {/* <Box sx={{ flexGrow: 1, p: 1, overflowY: "auto" }}> */}
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Header />
          {/* <Box
            component="main"
            className="MainContent"
            sx={{
              pt: {
                xs: "calc(12px + var(--Header-height))",
                sm: "calc(12px + var(--Header-height))",
                md: 3,
              },
              pb: { xs: 2, sm: 2, md: 1 },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              gap: 1,
            }}
          > */}
          <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
            {/* <Box
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 110,
                  p: { xs: 1, sm: 2, md: 3 },
                  borderRadius: '22px',
                  background: "#10b4f0ff",
                  color: "white",
                  p: 3,
                  boxShadow: "0 4px 20px rgba(8, 179, 241, 0.3)",
                  position: "relative",
                }}
              > */}
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 110,
                p: { xs: 1, sm: 1, md: 2 },
                borderRadius: "16px",
                display: "flex", background: "#10b4f0ff",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                  variant="outlined"
                  color="primary"
                  onClick={() => setFilterOpen(!filterOpen)}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#eff6ff",
                    "&:hover": { backgroundColor: "#eff6ff" },
                  }}
                >
                  <FilterList />
                </IconButton>
                <Typography
                  level="h3"
                  sx={{ fontWeight: "bold", color: "#ffffffff" }}
                >
                  4 - Week Production Planning Dashboard
                </Typography>
              </Box>

              <Box sx={{ textAlign: "right", mr: 5 }}>
                <Typography level="body-lg" sx={{ color: "#ffffffff" }}>
                  Selected Week : {selectedWeek}
                </Typography>
                <Typography level="body-sm" sx={{ color: "#ffffffff" }}>
                  {getWeekDateRange(selectedWeek)}
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ color: "#ffffffff", mt: 0.5 }}
                >
                  {selectedCustomer} | {selectedStyle} | {selectedStatus}
                </Typography>
              </Box>
            </Box>

            {/* </Box> */}
            {/* Filter Drawer */}
            <Drawer
              anchor="right"
              open={filterOpen}
              onClose={() => setFilterOpen(false)}
              slotProps={{
                backdrop: {
                  sx: {
                    backdropFilter: "none !important",
                    background: "rgba(0,0,0,0.12)",
                  },
                },
                content: {
                  sx: {
                    width: 280,
                    backgroundColor: "white", zIndex: 600,
                  },
                },
              }}
            >


              {/* <Drawer
                anchor="left"  
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                slotProps={{
                  backdrop: {
                    sx: {
                      zIndex: 1401, // higher than MUI AppBar/NavBar (default 1100)
                      backdropFilter: 'none !important',
                      background: 'rgba(0,0,0,0.12)'
                    },
                  },
                  content: {
                    sx: {
                      width: 270,
                      backgroundColor: 'white',
                      zIndex: 600,  // ensure Drawer content stays on top as well
                    }
                  }
                }}
              > */}

              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    level="h4"
                    sx={{ color: "#0f172a", fontWeight: 700 }}
                  >
                    Filters
                  </Typography>
                  <IconButton
                    variant="plain"
                    color="neutral"
                    onClick={() => setFilterOpen(false)}
                    sx={{ borderRadius: "8px" }}
                  >
                    <Close />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <CalendarMonth sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Calendar Week
                  </FormLabel>
                  <Autocomplete
                    placeholder="Search week..."
                    options={filteredWeeks}
                    value={selectedWeek}
                    onChange={(event, newValue) =>
                      newValue && setSelectedWeek(newValue)
                    }
                    onInputChange={(event, newValue) =>
                      setWeekSearch(newValue)
                    }
                    sx={{ "& input": { fontSize: "0.875rem" } }}
                  />
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <BusinessCenter sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Customer
                  </FormLabel>
                  <Select
                    value={selectedCustomer}
                    onChange={(event, newValue) =>
                      setSelectedCustomer(newValue)
                    }
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {customers.map((customer) => (
                      <Option key={customer} value={customer}>
                        {customer}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <Category sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Style/Article
                  </FormLabel>
                  <Select
                    value={selectedStyle}
                    onChange={(event, newValue) => setSelectedStyle(newValue)}
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {stylesByCustomer[selectedCustomer].map((style) => (
                      <Option key={style} value={style}>
                        {style}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ mb: 3 }}>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <Assessment sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Process
                  </FormLabel>
                  <Select
                    value={selectedProcess}
                    onChange={(event, newValue) =>
                      setSelectedProcess(newValue)
                    }
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {processes.map((process) => (
                      <Option key={process} value={process}>
                        {process}
                      </Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      color: "#475569",
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 18, color: "#3b82f6" }} />
                    Status
                  </FormLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(event, newValue) =>
                      setSelectedStatus(newValue)
                    }
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {statuses.map((status) => (
                      <Option key={status} value={status}>
                        {status}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Drawer>

            <Box sx={{ p: { xs: 2, md: 2 } }}>
              {/* KPI Cards - Colorful Style */}
              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      background: "linear-gradient(135deg, #1fc87e 0%, #0cba6b 100%)", // Rich ERP green gradient
                      color: "white",
                      boxShadow: "0 10px 25px rgba(35, 179, 120, 0.18)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 35px rgba(31, 200, 126, 0.20)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        level="body-lg"
                        sx={{
                          fontWeight: 700,
                          color: "#b4f3d2ff", // Minty light green highlight
                          // mb: 1,
                          letterSpacing: 0.5,
                        }}
                      >
                        Total Orders
                      </Typography>
                      <Typography
                        level="h1"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#ffffff",
                        }}
                      >
                        {currentData.kpi.totalOrders}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {/* , justifyContent: 'center' */}
                        <Assessment sx={{ fontSize: 20, color: "#eaffed" }} />
                        <Typography level="body-sm" sx={{ color: "#eaffed" }}>
                          Active production
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      background:
                        "linear-gradient(135deg, #fa3245 0%, #f86998 100%)", // Premium ERP red gradient
                      color: "white",
                      boxShadow: "0 10px 25px rgba(250, 49, 69, 0.18)",
                      position: "relative",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 18px 40px rgba(250, 49, 69, 0.28)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        level="body-lg"
                        sx={{
                          fontWeight: 700,
                          color: "#ffd4db", // Soft pink for highlight
                          // mb:1,
                        }}
                      >
                        Orders Fully on Risk
                      </Typography>
                      <Typography
                        level="h1"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#ffffff",
                        }}
                      >
                        {currentData.kpi.fullOnRisk}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <ErrorOutline
                          sx={{ fontSize: 20, color: "#ffd4db" }}
                        />
                        <Typography level="body-xs" sx={{ color: "#ffe9ec" }}>
                          Requires attention
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      background:
                        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                      color: "#7c2d12",
                      boxShadow: "0 10px 25px rgba(252, 182, 159, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 35px rgba(252, 182, 159, 0.4)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        level="body-lg"
                        sx={{
                          fontWeight: 600, color: "#9a3412",
                          //  mb: 1
                        }}
                      >
                        Delayed Orders
                      </Typography>
                      <Typography level="h1" sx={{ fontWeight: 700, mb: 1 }}>
                        {currentData.kpi.delayedOrders}%
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <ErrorOutline
                          sx={{ fontSize: 20, color: "#9a3412" }}
                        />
                        <Typography level="body-xs" sx={{ color: "#9a3412" }}>
                          Behind schedule
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid xs={12} sm={6} lg={3}>
                  <Card
                    sx={{
                      background:
                        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      color: "#0c4a6e",
                      boxShadow: "0 10px 25px rgba(79, 172, 254, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 35px rgba(79, 172, 254, 0.4)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        level="body-lg"
                        sx={{
                          fontWeight: 600, color: "#075985",
                          // mb: 1
                        }}
                      >
                          At Risk (>2 Process Delays)
                      </Typography>
                      <Typography
                        level="h1"
                        sx={{ fontWeight: 700, mb: 1, color: "#ffff" }}
                      >
                        {currentData.kpi.atRisk}%
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <NotificationImportant
                          sx={{ fontSize: 20, color: "#075985" }}
                        />
                        <Typography level="body-xs" sx={{ color: "#075985" }}>
                          Multiple delays
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Process Planning Section - Table Style */}
              <Card
                variant="outlined"
                sx={{
                  mb: 3,
                  borderColor: "#e2e8f0",
                  backgroundColor: "white",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    level="h4"
                    sx={{ mb: 0.5, color: "#0f172a", fontWeight: 700 }}
                  >
                    Process Planning
                  </Typography>

                  <Box sx={{ overflowX: "auto" }}>
                    <Table
                      sx={{
                        "& thead th": {
                          backgroundColor: "#f8fafc",
                          fontWeight: 700,
                          color: "#475569",
                          borderBottom: "2px solid #e2e8f0",
                          py: 1,
                        },
                        "& tbody td": {
                          py: 1,
                          borderBottom: "1px solid #f1f5f9",
                        },
                        "& tbody tr:hover": {
                          backgroundColor: "#f8fafc",
                        },
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "30%" }}>Process Planning</th>
                          <th style={{ width: "20%", textAlign: "center" }}>
                            Focus Week (Delivery)
                          </th>
                          <th style={{ width: "20%", textAlign: "center" }}>
                            Planning Week (Calendar)
                          </th>
                          <th style={{ width: "30%" }}>Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {getVisibleProcesses().map((processName) => {
                           */}
                        {[
                          "Sourcing",
                          "Fabric Store",
                          "Cutting",
                          "VAP / Printing",
                        ].map((processName) => {
                          const processKey = processName
                            .toLowerCase()
                            .replace(" / ", "")
                            .replace(" ", "");
                          const planData = planningWeeks[processKey] || {
                            focus: selectedWeek,
                            planning: selectedWeek,
                          };
                          const processData = currentData.processes.find(
                            (p) => p.name === processName
                          );
                          const statusConfig = processData
                            ? getStatusConfig(processData.status)
                            : getStatusConfig("on-track");

                          return (
                            <tr key={processName}>
                              <td>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: "10px",
                                      backgroundColor: statusConfig.bgColor,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: statusConfig.color,
                                    }}
                                  >
                                    {getProcessIcon(processName)}
                                  </Box>
                                  <Typography
                                    level="body-md"
                                    sx={{ fontWeight: 600, color: "#0f172a" }}
                                  >
                                    {processName}
                                  </Typography>
                                </Box>
                              </td>
                              <td>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Chip
                                    variant="outlined"
                                    sx={{
                                      borderColor: "#cbd5e1",
                                      color: "#475569",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {planData.focus}
                                  </Chip>
                                </Box>
                              </td>
                              <td>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Chip
                                    variant="solid"
                                    sx={{
                                      backgroundColor: statusConfig.color,
                                      color: "white",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {planData.planning}
                                  </Chip>
                                </Box>
                              </td>
                              <td>
                                <Box sx={{ width: "100%" }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      mb: 0.5,
                                    }}
                                  >
                                    <Typography
                                      level="body-xs"
                                      sx={{ color: "#8b7564ff" }}
                                    >
                                      {processData ? processData.progress : 0}
                                      %
                                    </Typography>
                                  </Box>
                                  <LinearProgress
                                    determinate
                                    value={
                                      processData ? processData.progress : 0
                                    }
                                    sx={{
                                      "--LinearProgress-thickness": "8px",
                                      "--LinearProgress-progressColor":
                                        statusConfig.color,
                                      borderRadius: "4px",
                                      backgroundColor: statusConfig.bgColor,
                                    }}
                                  />
                                </Box>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Box>
                </CardContent>
              </Card>

              <Box sx={{ mb: 1 }}>
                <Typography level="h4" sx={{ color: "#0f172a", fontWeight: 700 }}>
                  Production Status by Process
                </Typography>
                <Typography level="body-sm" sx={{ color: "#64748b", mt: 0.5 }}>
                  Real-time tracking of all production processes
                </Typography>
              </Box>

              {/* 4 Process Cards in Same Row */}
              <Grid container spacing={3} sx={{ mb: 2 }}>
                {currentData.processes
                  .filter((process) => selectedProcess === "All" || process.name === selectedProcess)
                  .map((process) => {
                    const processColors = getProcessColor(process.name);
                    const statusConfig = getStatusConfig(process.status);

                    return (
                      // <Grid key={process.name} xs={12} sm={6} md={3}>
                      //   <Card
                      //     sx={{
                      //       background: "white", cursor: 'pointer',
                      //       border: `2px solid ${processColors.primary}20`,
                      //       boxShadow: `0 4px 12px ${processColors.primary}15`,
                      //       transition: "all 0.3s ease",
                      //       height: "100%",
                      //       "&:hover": {
                      //         transform: "translateY(-5px)",
                      //         boxShadow: `0 12px 24px ${processColors.primary}25`,
                      //         borderColor: processColors.primary,
                      //       },
                      //     }}
                      //   >
                      //       <Box
                      //         sx={{
                      //           width: 44,
                      //           height: 44,
                      //           borderRadius: "16px",
                      //           background: `linear-gradient(135deg, ${processColors.primary} 0%, ${processColors.secondary} 100%)`,
                      //           display: "flex",
                      //           alignItems: "center",
                      //           justifyContent: "center",
                      //           color: "white",
                      //           margin: "0 auto",
                      //           mb: 1,
                      //         }}
                      //       >
                      //         {getProcessIconOg(process.name)}
                      //       </Box>
                      //     <CardContent sx={{ textAlign: "center" }}>
                      //     {/* <CardContent sx={{ textAlign: "center" }}> */}
                      //       {/* Icon */}


                      //       {/* Process Name */}
                      //       <Typography
                      //         level="title-md"
                      //         sx={{
                      //           color: processColors.text,
                      //           fontWeight: 700,
                      //           mb: 2,
                      //         }}
                      //       >
                      //         {process.name}
                      //       </Typography>

                      //       {/* Orders Count */}
                      //       <Typography
                      //         level="h1"
                      //         sx={{
                      //           color: processColors.primary,
                      //           fontWeight: 700,
                      //           mb: 1,
                      //         }}
                      //       >
                      //         {process.orders}
                      //       </Typography>

                      //       {/* Risk Badge */}
                      //       <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
                      //         <Chip
                      //           size="sm"
                      //           sx={{
                      //             backgroundColor: statusConfig.bgColor,
                      //             color: statusConfig.color,
                      //             fontWeight: 700,
                      //             fontSize: "0.75rem",
                      //           }}
                      //         >
                      //           {process.risk} At Risk
                      //         </Chip>
                      //       </Box>

                      //       {/* Progress Bar */}
                      //       <Box>
                      //         <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                      //           <Typography
                      //             level="body-sm"
                      //             sx={{
                      //               color: processColors.text,
                      //               fontWeight: 700,
                      //             }}
                      //           >
                      //             {process.progress}%
                      //           </Typography>
                      //         </Box>

                      //         <LinearProgress
                      //           determinate
                      //           value={process.progress}
                      //           sx={{
                      //             "--LinearProgress-thickness": "8px",
                      //             "--LinearProgress-progressColor": getLinearBarColor(processColors.primary),
                      //             // "--LinearProgress-progressColor":getLinearBarColor(process.progress),
                      //             borderRadius: "4px",
                      //             backgroundColor: `${processColors.primary}20`,
                      //           }}
                      //         />

                      //       </Box>

                      //     </CardContent>
                      //   </Card>
                      // </Grid>
                      <Grid key={process.name} xs={12} sm={6} md={3}>
                        <Card
                          sx={{
                            background: "white",
                            cursor: 'pointer',
                            border: `2px solid ${processColors.primary}20`,
                            boxShadow: `0 4px 12px ${processColors.primary}15`,
                            transition: "all 0.3s ease",
                            height: "100%",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: `0 12px 24px ${processColors.primary}25`,
                              borderColor: processColors.primary,
                            },
                          }}
                        >
                          <CardContent>
                            {/* Top bar: Icon left, Name right */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1,
                                width: "100%",
                              }}
                            >
                              {/* Icon Top Left */}
                              <Box
                                sx={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: "12px",
                                  background: `linear-gradient(135deg, ${processColors.primary} 0%, ${processColors.secondary} 100%)`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                }}
                              >
                                {getProcessIconOg(process.name)}
                              </Box>
                              {/* Process Name Top Right */}
                              <Typography
                                level="title-md"
                                sx={{
                                  color: processColors.text,
                                  fontWeight: 700,
                                  alignSelf: "flex-start",
                                }}
                              >
                                {process.name}
                              </Typography>
                            </Box>

                            {/* Orders Count Centered */}
                            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                              <Typography
                                level="h1"
                                sx={{
                                  color: processColors.primary,
                                  fontWeight: 700,
                                }}
                              >
                                {process.orders}
                              </Typography>
                            </Box>

                            {/* Progress Bar below */}
                            <Box>
                              <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                                <Typography
                                  level="body-sm"
                                  sx={{
                                    color: processColors.text,
                                    fontWeight: 700,
                                  }}
                                >
                                  {process.progress}%
                                </Typography>
                              </Box>
                              <LinearProgress
                                determinate
                                value={process.progress}
                                sx={{
                                  "--LinearProgress-thickness": "8px",
                                  "--LinearProgress-progressColor": getLinearBarColor(processColors.primary),
                                  borderRadius: "4px",
                                  backgroundColor: `${processColors.primary}20`,
                                }}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>

                    );
                  })}
              </Grid>

              {/* Risk Alert Section */}
              <Card
                sx={{
                  background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                  border: "2px solid #ef4444",
                  boxShadow: "0 8px 20px rgba(239, 68, 68, 0.2)",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Warning sx={{ fontSize: 28, color: "#ffffff" }} />
                    </Box>
                    <Box>
                      <Typography level="h4" sx={{ color: "#991b1b", fontWeight: 700 }}>
                        Risk Alert
                      </Typography>
                      <Typography level="body-sm" sx={{ color: "#991b1b" }}>
                        Critical orders requiring immediate attention
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ overflowX: "auto" }}>
                    <Table
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        overflow: "hidden",
                        "& thead th": {
                          backgroundColor: "#fef2f2",
                          // 991b1b
                          fontWeight: 700,
                          color: "#09609eff",
                          borderBottom: "2px solid #fecaca",
                          py: 2,
                          textAlign: "center",
                        },
                        "& tbody td": {
                          py: 2,
                          textAlign: "center",
                          borderBottom: "1px solid #fee2e2",
                          fontWeight: 600,
                        },
                        "& tbody tr:hover": {
                          backgroundColor: "#fef2f2",
                        },
                      }}
                    >
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Delivery</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.riskAlerts && currentData.riskAlerts.map((alert, index) => (
                          <tr key={index}>
                            <td>
                              <Typography level="body-sm" sx={{ fontWeight: 700, color: "#0f172a" }}>
                                {alert.customer}
                              </Typography>
                            </td>
                            <td>
                              <Chip
                                size="sm"
                                variant="solid"
                                sx={{
                                  backgroundColor: "#ef4444",
                                  color: "white",
                                  fontWeight: 700,
                                }}
                              >
                                {alert.delivery}
                              </Chip>
                            </td>
                            <td>
                              <Typography level="body-sm" sx={{ color: "#dc2626", fontWeight: 600 }}>
                                {alert.action}
                              </Typography>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                </CardContent>
              </Card>
            </Box>

          </Box>

          {/* </Box> */}
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default ProductionDashboard;
