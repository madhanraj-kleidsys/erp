import React, { useRef, useState } from "react";
import { Box, Typography, Table, Button, Checkbox } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import reportLogo from '../../assets/reportLogo.png'

const checklistItems = [
  "EMPLOYEE DETAILS",
  "APPLICATION WITH EMPLOYEE INFORMATION AND SKILL ASSESSMENT DETAILS",
  "BIO-DATA FORM WITH PHOTOGRAPHS",
  "INDUCTION TRAINING",
  "APPOINTMENT ORDER",
  "CONFIRMATION ORDER",
  "NOMINATION FORM - No.34",
  "FORM F - FRESH NOMINATION",
  "PERSONAL NOMINATION",
  "SERVICE RECORD",
  "AGE PROOF DOCUMENTS (AADHAR CARD / VOTER ID / MARK SHEET WITH PHOTO / DOCTOR CERTIFICATE)",
  "PF DECLARATION FORM - FORM 2",
  "ESI DECLARATION FORM - FORM 1",
  "FORM NO.11",
  "ACCEPTANCE LETTER FROM EMPLOYEE TO CREDIT HIS WAGE IN BANK",
  "AFFIRMATIVE STATEMENT"
];

export default function PersonalFileChecklist({ employee, isBooklet }) {
  const [selectedChecklistItems, setSelectedChecklistItems] = useState(checklistItems.map(f => f));

  const printRef = useRef();

  const handleDownloadPDF = () => {
    if (!printRef.current) return;
    html2pdf()
      .set({
        margin: 0.2,
        filename: "checkList.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] }
      })
      .from(printRef.current)
      .save();
  };

  const handleDownloadPNG = async () => {
    const canvas = await html2canvas(printRef.current);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "checkList.png";
    link.click();
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* <Sidebar sx={{ flexShrink: 0, width: { xs: 60, sm: 220 } }} /> */}
        <Box sx={{ flexGrow: 1, p: 1, bgcolor: 'white', overflowY: 'auto' }}>
          <Header />

          {!isBooklet && (
            <>
              <Checkbox
                label="Select All"
                checked={selectedChecklistItems.length === checklistItems.length}
                indeterminate={selectedChecklistItems.length > 0 && selectedChecklistItems.length < checklistItems.length}
                onChange={e =>
                  setSelectedChecklistItems(
                    e.target.checked ? checklistItems.map(f => f) : []
                  )
                }
              />


              <br /> <br />

              {checklistItems.map((field) => (

                <Checkbox

                  label={field}
                  checked={selectedChecklistItems.includes(field)}
                  onChange={e => {
                    if (e.target.checked) {
                      // Add key only if not already there (prevent duplicates)
                      if (!selectedChecklistItems.includes(field)) {
                        setSelectedChecklistItems([...selectedChecklistItems, field]);
                      }
                    } else {
                      setSelectedChecklistItems(selectedChecklistItems.filter(f => f !== field));
                    }
                  }}
                  sx={{ mr: 2, mb: 3 }}
                />


              ))}



              <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }} >
                <Button variant="solid" onClick={handleDownloadPDF}>Download PDF</Button>
                <Button variant="solid" onClick={handleDownloadPNG}>Download as PNG</Button>
              </Box>

            </>)}

          <Box ref={printRef}
            sx={{
              width: "780px",
              border: "2px solid #000000ff",
              borderRadius: 2,
              mx: "auto",
              my: 3,
              boxSizing: "border-box",
              fontFamily: "'Noto Sans', Arial, sans-serif",
              bgcolor: "#fff", overFlowX: "hidden"
            }}
          >

            <Box display="flex" alignItems="center" justifyContent="space-between"  >
              {/* Logo on the left */}
              <Box mt={2} ml={5} >
                <img
                  src={reportLogo || employee?.ComLogo}
                  alt="Company Logo"
                  style={{ maxHeight: 44 }}
                />
              </Box>

              {/* Company details centered */}
              <Box mr={19} textAlign="center" color="rgba(0, 0, 0, 1)">
                <Typography mt={1} fontWeight="bold" color="#000" fontSize={16}>
                  {employee?.BUName || 'Business NAme Unavailable'}
                </Typography>
                <Typography fontWeight="xl" color="#000" fontSize={14} mb={1}>
                  {employee?.CmpName || 'Company name Unavailable'}
                </Typography>
                <Typography fontSize={12} color="#000">
                  {employee?.Addr || 'Address unavailable'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ height: 2, bgcolor: 'black', width: '100%', mt: 1 }} />

            {/* Employee Info grid */}
            <Box sx={{ display: "flex", my: 1, }}>
              <Box sx={{ flex: 1, color: "#000", ml: 5 }}>
                <Typography color="#000" fontWeight="bold" fontSize={10}>Emp No : {employee.EmpCode}</Typography>
                <Typography color="#000" fontWeight="bold" fontSize={10}>Emp Name : {employee.EmpName}</Typography>
              </Box>
              {/* Right column */}
              <Box sx={{ flex: 1, color: "#000" }}>
                <Typography color="#000" fontWeight="bold" fontSize={10}>Designation : <span style={{ fontWeight: "normal" }}>{employee.Desg}</span></Typography>
                <Typography color="#000" fontWeight="bold" fontSize={10}>Department : <span style={{ fontWeight: "normal" }}>{employee.Dept}</span></Typography>
              </Box>
            </Box>

            {/* Checklist Table */}
            <Table
              borderAxis="x"
              sx={{
                fontSize: 10,
                border: "none",
                "& th, & td": { borderColor: "#222" }
              }}
            >
              <thead color="#000">
                <tr color="#000">
                  <th style={{ width: 40, textAlign: "center", color: "#000" }}>S No</th>
                  <th style={{ width: 320, textAlign: "left", color: "#000" }}>CHECKLIST OF PERSONAL FILE - CONTENTS</th>
                  <th style={{ width: 60, textAlign: "center", color: "#000" }}>TICK (√)</th>
                  <th style={{ textAlign: "left", color: "#000" }}>REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {checklistItems
                  .filter(field => selectedChecklistItems.includes(field))
                  .map((item, i) => (
                    <tr color="#000" key={i}>
                      <td style={{ color: "#000", textAlign: "center" }}>{i + 1}</td>
                      <td style={{ paddingLeft: 10, color: "#000" }}>{item}</td>
                      <td style={{ textAlign: "center", color: "#000" }}>
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            border: "1.6px solid #444",
                            borderRadius: "2px",
                            mx: "auto",
                          }}
                        />
                      </td>
                      <td />
                    </tr>
                  ))}
              </tbody>
            </Table>

            {/* Signature Footer */}
            <Box
              sx={{
                minHeight:10,
                py: 2,
                px: 2,
                mt: 8,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between", color: "#000"
              }}
            >
              <Typography color="#000" fontWeight="bold" fontSize={10}>Employee Signature</Typography>
              <Typography color="#000" fontWeight="bold" fontSize={10}>Management</Typography>
            </Box>

          </Box>

        </Box>
      </Box>
    </CssVarsProvider>
  );
}
