import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Sheet, Table, Button, Chip, Grid, AspectRatio } from '@mui/joy';
import { styled } from '@mui/joy/styles';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

import Header from './Header';
import Sidebar from './Sidebar';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

// Joy-only cell styles
const LabelCell = styled('td')({ fontWeight: 'bold', backgroundColor: '#f7f7f7', width: 220 });
const RightAlignedCell = styled('td')({ textAlign: 'right', whiteSpace: 'nowrap' });

const formatDate = (s) => {
  if (!s) return '-';
  const d = new Date(s);
  return isNaN(d) ? s : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};
const formatCurrency = (n, c = 'INR') => {
  if (n === null || n === undefined || isNaN(n)) return '-';
  try { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: c }).format(Number(n)); }
  catch { return new Intl.NumberFormat('en-IN').format(Number(n)); }
};

export default function SalesOrdersJoy({ apiUrl }) {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState('list');
  const [loading, setLoading] = useState(!!apiUrl);
  const [error, setError] = useState(null);

  const reportRef = useRef(null);

  useEffect(() => {
    if (!apiUrl) return;
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const json = await res.json();
        const arr = Array.isArray(json.data) ? json.data : (json.data ? [json.data] : []);
        if (!json.success) throw new Error(json.message || 'Failed to fetch data');
        if (!ignore) setRows(arr);
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [apiUrl]);

  const openDetail = (row) => { setSelected(row); setView('detail'); };
  const backToList = () => { setSelected(null); setView('list'); };

  // Export handlers ...

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let y = 10;
    if (imgHeight < pageHeight - 20) {
      pdf.addImage(imgData, 'PNG', 10, y, imgWidth, imgHeight);
    } else {
      let position = 0;
      while (position < imgHeight) {
        pdf.addImage(imgData, 'PNG', 10, 10 - position, imgWidth, imgHeight);
        position += pageHeight - 20;
        if (position < imgHeight) pdf.addPage();
      }
    }
    pdf.save(`${selected?.DocNo || 'order'}.pdf`);
  };

  const handleDownloadPNG = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 1 });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${selected?.DocNo || 'order'}.png`;
    link.click();
  };

  const handleDownloadXLSX = () => {
    if (!selected) return;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([selected]);
    XLSX.utils.book_append_sheet(wb, ws, 'Order');
    XLSX.writeFile(wb, `${selected.DocNo || 'order'}.xlsx`, { compression: true });
  };

  const handleDownloadCSV = () => {
    if (!selected) return;
    const obj = selected;
    const headers = Object.keys(obj).join(',');
    const values = Object.values(obj).map(v =>
      (typeof v === 'string' && v.includes(',')) ? `"${v.replace(/"/g, '""')}"` : v
    ).join(',');
    const csv = `${headers}\n${values}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${selected.DocNo || 'order'}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (!reportRef.current) return;
    const w = window.open('', '_blank', 'width=1024,height=768');
    if (!w) return;
    const styles = `
      <style>
        @page { size: A4; margin: 12mm; }
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
        .print-header { text-align:center; margin-bottom:8px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 6px; font-size: 12px; }
        thead { background: #eaf6ff; }
      </style>`;
    w.document.write(`<!doctype html><html><head><title>${selected?.DocNo || 'Order'}</title>${styles}</head><body>${reportRef.current.outerHTML}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
    w.close();
  };

  const brandColor = '#77d7fa';

  return (
    <CssVarsProvider disableTransitionOnChange >
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100vh'
        }}>
          <Header />
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 110,
              p: { xs: 1, sm: 2, md: 3 },
              borderRadius: 'md',
              bgcolor: brandColor,
              color: '#032a40',
              mx: { xs: 2, sm: 4, md: 8, lg: 10 },
              mt: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <Typography
              level={{ xs: "h5", sm: "h4", md: "h3" }}
              fontWeight="lg"
              textAlign="center"
            >
              KleidSys Technologies — Sales Order Report System
            </Typography>
          </Box>
          
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
            <Box component="main"
              className="MainContent"
              sx={{
                p: { xs: 2, md: 6 },
                pt: {
                  xs: 'calc(12px + var(--Header-height ))',
                  sm: 'calc(12px + var(--Header-height))',
                  md: 3
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
              <Box sx={{ p: 2 }}>
                {/* LIST VIEW */}
                {view === 'list' && (
                  <Box>
                    <Typography level="h4" sx={{ mb: 1 }}>Sales Orders</Typography>
                    {loading && <Typography>Loading…</Typography>}
                    {error && <Typography color="danger" sx={{ mb: 1 }}>{error}</Typography>}
                    <Sheet variant="outlined" sx={{ borderRadius: 8, overflowX: 'auto' }}>
                      <Table hoverRow stickyHeader>
                        <thead>
                          <tr>
                            <th>DocNo</th>
                            <th>Company</th>
                            <th>Business Unit</th>
                            <th>Address</th>
                            <th>DocDate</th>
                            <th>Customer</th>
                            <th>Season</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>OrdQty</th>
                            <th style={{ textAlign: 'right' }}>TotalCostCC</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r, i) => (
                            <tr key={r.DocNo ?? i} onClick={() => openDetail(r)} style={{ cursor: 'pointer' }} title="Click to view report">
                              <td>{r.DocNo}</td>
                              <td>{r.CoName}</td>
                              <td>{r.BUName}</td>
                              <td>{r.BUAddress}</td>
                              <td>{formatDate(r.DocDate)}</td>
                              <td>{r.CustomerName}</td>
                              <td>{r.Season}</td>
                              <td>
                                <Chip size="sm" color={String(r.DocStatus).toLowerCase().includes('cancel') ? 'danger' : 'primary'} variant="soft">
                                  {r.DocStatus}
                                </Chip>
                              </td>
                              <td style={{ textAlign: 'right' }}>{r.OrdQty}</td>
                              <td style={{ textAlign: 'right' }}>{formatCurrency(r.TotalCostCC, r.OrderCurrency)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Sheet>
                  </Box>
                )}

                {/* DETAIL VIEW */}
                {view === 'detail' && selected && (
                  <Sheet variant="outlined" sx={{ p: 2, borderRadius: 2, boxShadow: 'md', maxWidth: { xs: '100%', sm: '80%', md: 1100 }, mx: 'auto' }}>
                    {/* Top bar */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography level="h5">Order Report: {selected.DocNo}</Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button size="sm" variant="soft" onClick={backToList}>Back</Button>
                        <Button size="sm" color="primary" onClick={handlePrint}>Print</Button>
                        <Button size="sm" onClick={handleDownloadPDF}>PDF</Button>
                        <Button size="sm" onClick={handleDownloadPNG}>PNG</Button>
                        <Button size="sm" onClick={handleDownloadXLSX}>Excel</Button>
                        <Button size="sm" onClick={handleDownloadCSV}>CSV</Button>
                      </Box>
                    </Box>

                    {/* Printable content wrapper */}
                    <Box ref={reportRef}>
                      {/* Company banner */}
                      <Sheet
                        variant="soft"
                        sx={{
                          mb: 2,
                          p: 2,
                          borderRadius: 1,
                          bgcolor: brandColor,
                          color: '#042b42',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 240 }}>
                          <AspectRatio ratio="1" variant="outlined" sx={{ width: 64, borderRadius: '50%', bgcolor: '#fff' }}>
                            <img
                              src={selected.ImageURI || ''}
                              alt="Logo"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          </AspectRatio>
                          <Box>
                            <Typography level="h5" fontWeight="lg">{selected.CoName || 'Company'}</Typography>
                            <Typography level="body3">{selected.BUName || ''}</Typography>
                            <Typography level="body3">{selected.BUAddress || ''}</Typography>
                          </Box>
                        </Box>

                        <Box sx={{ ml: 'auto', minWidth: 160, textAlign: 'center' }}>
                          <Sheet variant="outlined" sx={{ p: 1, borderRadius: 1, bgcolor: '#ffffffcc' }}>
                            <Typography fontWeight="lg">SALES ORDER BUDGET</Typography>
                          </Sheet>
                          <Box sx={{ mt: 1 }}>
                            <AspectRatio ratio="16/10" variant="outlined">
                              <img
                                src={selected.AttachmentURI || ''}
                                alt="Attachment"
                                onError={(e) => { e.currentTarget.src = ''; e.currentTarget.alt = 'No Image Attached'; }}
                              />
                            </AspectRatio>
                          </Box>
                        </Box>
                      </Sheet>

                      {/* Meta sections */}
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid xs={12} md={6}>
                          <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                            <Typography level="body2"><strong>Order No:</strong> {selected.DocNo || 'N/A'}</Typography>
                            <Typography level="body2"><strong>Order Date:</strong> {formatDate(selected.DocDate)}</Typography>
                            <Typography level="body2"><strong>Order Status:</strong> {selected.DocStatus || 'INITIAL'}</Typography>
                            <Typography level="body2"><strong>Approval Status:</strong> {selected.WFStatus || 'UNINITIALISED'}</Typography>
                            <Typography level="body2"><strong>Buyer Reference:</strong> {selected.BuyerPONo || 'N/A'}</Typography>
                            <Typography level="body2"><strong>Buyer PO Date:</strong> {formatDate(selected.BuyerPODate)}</Typography>
                          </Sheet>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                            <Typography level="body2"><strong>Created By:</strong> {selected.CreatedBy || 'System Admin'}</Typography>
                            <Typography level="body2"><strong>Customer Name:</strong> {selected.CustomerName || 'N/A'}</Typography>
                            <Typography level="body2"><strong>Season:</strong> {selected.Season || 'N/A'}</Typography>
                            <Typography level="body2"><strong>Merchandiser Name:</strong> {selected.MerchandiserName || 'N/A'}</Typography>
                            <Typography level="body2"><strong>Ex-Factory Date:</strong> {formatDate(selected.ExFactoryDate)}</Typography>
                            <Typography level="body2"><strong>Final Delivery Date:</strong> {formatDate(selected.FinalDeliveryDate)}</Typography>
                          </Sheet>
                        </Grid>
                      </Grid>

                      {/* Key metrics */}
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid xs={12} md={4}>
                          <Sheet variant="soft" sx={{ p: 2, borderRadius: 1, textAlign: 'center' }}>
                            <Typography fontWeight="lg" sx={{ mb: 0.5 }}>Order Qty</Typography>
                            <Typography level="h4" color="primary">{selected.OrdQty ?? '-'}</Typography>
                          </Sheet>
                        </Grid>
                        <Grid xs={12} md={4}>
                          <Sheet variant="soft" sx={{ p: 2, borderRadius: 1, textAlign: 'center' }}>
                            <Typography fontWeight="lg" sx={{ mb: 0.5 }}>Qty with Excess (%)</Typography>
                            <Typography level="h5" color="primary">{(selected.OrderLevelExcessPercent ?? 0) + ' %'}</Typography>
                          </Sheet>
                        </Grid>
                        <Grid xs={12} md={4}>
                          <Sheet variant="soft" sx={{ p: 2, borderRadius: 1, textAlign: 'center' }}>
                            <Typography fontWeight="lg" sx={{ mb: 0.5 }}>Production Qty</Typography>
                            <Typography level="h4" color="primary">{selected.PrdQty ?? '-'}</Typography>
                          </Sheet>
                        </Grid>
                      </Grid>

                      {/* Budgeting Summary */}
                      <Typography level="body1" fontWeight="lg" sx={{ mb: 1 }}>Budgeting Summary</Typography>
                      <Table size="sm" variant="outlined" sx={{ borderRadius: 1, mb: 2 }}>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th style={{ textAlign: 'right' }}>Amount</th>
                            <th style={{ textAlign: 'right' }}>% of Total</th>
                            <th style={{ textAlign: 'right' }}>Per Garment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { label: 'Fabric Cost', value: selected.FabricCost },
                            { label: 'Flat Knit Cost', value: selected.FlatknitCost || 0 },
                            { label: 'Trim Cost', value: selected.TrimCost },
                            { label: 'CM Cost', value: selected.CMTCost },
                            { label: 'Value Additions', value: selected.ValueAdditions },
                            { label: 'Other Costs', value: selected.OtherCost },
                            { label: 'Total Cost', value: selected.TotalCost },
                          ].map(({ label, value }) => (
                            <tr key={label}>
                              <LabelCell>{label}</LabelCell>
                              <RightAlignedCell>{formatCurrency(value, selected.OrderCurrency)}</RightAlignedCell>
                              <RightAlignedCell>0.000%</RightAlignedCell>
                              <RightAlignedCell>0</RightAlignedCell>
                            </tr>
                          ))}
                          <tr style={{ background: '#f7f7f7' }}>
                            <LabelCell>Total</LabelCell>
                            <RightAlignedCell>{formatCurrency(selected.TotalCost, selected.OrderCurrency)}</RightAlignedCell>
                            <RightAlignedCell>0.000%</RightAlignedCell>
                            <RightAlignedCell>0</RightAlignedCell>
                          </tr>
                        </tbody>
                      </Table>

                      {/* Budget Summary (simple) */}
                      <Grid container spacing={2}>
                        <Grid xs={12} md={6}>
                          <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                            <Typography color={'primary'}><strong>Booked Value</strong></Typography>
                            <Typography color={'success'}>{formatCurrency(selected.BookedValue, selected.OrderCurrency)}</Typography>
                          </Sheet>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                            <Typography color={'primary'}><strong>Budgeted Value</strong></Typography>
                            <Typography color={'success'}>{formatCurrency(selected.BudgetValue, selected.OrderCurrency)}</Typography>
                          </Sheet>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                            <Typography><strong>Margin / Garment</strong></Typography>
                            <Typography>{formatCurrency(selected.MarginPerGmt, selected.OrderCurrency)}</Typography>
                          </Sheet>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                            <Typography><strong>Margin % / Garment</strong></Typography>
                            <Typography color={(selected.MarginPerGmtPercent ?? 0) > 0 ? 'success' : 'danger'}>
                              {selected.MarginPerGmtPercent ? `${Number(selected.MarginPerGmtPercent).toFixed(2)} %` : '-'}
                            </Typography>
                          </Sheet>
                        </Grid>
                        <Grid xs={12}>
                          <Sheet variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                            <Typography color={'warning'}><strong>Total Margin</strong></Typography>
                            <Typography color={'success'}>{formatCurrency(selected.TotalMargin, selected.OrderCurrency)}</Typography>
                          </Sheet>
                        </Grid>
                      </Grid>

                      <Grid container sx={{ mb: 2 }} >
                        <Typography level="body1" fontWeight="lg" sx={{ mt: 4, mb: 5, mr: 50 }} > Prepared by </Typography >
                        <Typography level="body1" fontWeight="lg" sx={{ mt: 4, mb: 5, mr: 50 }}> Received By </Typography>
                        <Typography level="body1" fontWeight="lg" sx={{ mt: 4, mb: 5 }} > Approved By </Typography>
                      </Grid>
                    </Box>
                  </Sheet>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
