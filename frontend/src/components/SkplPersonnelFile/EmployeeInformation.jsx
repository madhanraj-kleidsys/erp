import React, { useRef, useState } from "react";
import { Box, Typography, Button, Divider, Sheet, Stack, Input, Checkbox } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import reportLogo from '../../assets/reportLogo.png';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";



const contactDetailsFields = [
  { label: "PRESENT ADDRESS", key: "CurrentAddress" },
  { label: "PERMANENT ADDRESS", key: "PermanentAddress" },
];

const contactDetails = [
  { label: "TELEPHONE : ", key: "Telephone" },
  { label: "MOBILE : ", key: "MobileNo" },
  { label: "EMAIL ID : ", key: "EmailID" },
  { label: "AADHAR NO : ", key: "AadharNo" }
];

const NomineeDetails = [
  { label: "NOMINEE DETAILS", key: "NomineeDetails" }
]
// Demo employee data
const employee = {
  EmpCode: "101277",
  EmpName: "RAMYA NATARAJ",
  FatherName: "NATARAJ",
  MotherName: "",
  SpouseName: "",
  Gender: "FEMALE",
  MaritalStatus: "UNMARRIED",
  Religion: "",
  MotherTongue: "",
  BloodGroup: "",
  DOB: "21 May 2005",
  DOJ: "04 Jul 2025",
  DateOfConfirmation: "",
  Dept: "MERCHANDISING",
  NatureOfWork: "JUNIOR MERCHANDISER",
  Desg: "JUNIOR MERCHANDISER",
  Category: "OFFICE STAFF",
  Grade: "NA",
  WorkingHours: "08:30:00 TO 17:30:00",
  IntervalTime: "",
  Shift: "GENERAL SHIFT",
  Gross: "15000.00",
  PFNo: "",
  PFEff: "",
  ESINo: "",
  ESIDispensary: "",
  MediclaimNo: "",
  Pan: "",
  CurrentAddress: "4/312 A, CHINNA VADAMBACHERI, SULUR TK, COIMBATORE , Tamil Nadu - 641669, INDIA",
  PermanentAddress: "4/312 A, CHINNA VADAMBACHERI, SULUR TK, COIMBATORE , Tamil Nadu - 641669, INDIA",
  Telephone: "",
  MobileNo: "",
  EmailID: "",
  AadharNo: "235654310765",
  NomineeDetails: "",
  DateOfEntry: "04 Jul 2025",
  ModifiedOn: "2025-08-21 10:47:38.673"
};

export default function EmployeeInfoSheet({ employee, isBooklet }) {

  const getWorkingHours = (start, end) => {
    // const start = employee.ShiftStartTime;
    // const end = employee.ShiftEndTime;
    if (!start || !end) {
      return "working hrs unavailable";
    }
    else {
      const [start1, m1] = start.split(":").map(Number);
      const [end1, min2] = end.split(":").map(Number);

      const startMins = start1 * 60 + m1;
      const endMinsss = end1 * 60 + min2;

      var totalHrs = endMinsss - startMins;
      if (totalHrs < 0) {
        totalHrs += 24 * 60;
      }
      else {
        const hrs = Math.floor(totalHrs / 60);
        const mins = totalHrs % 60;
        return ` ${hrs} hours and ${mins} minutes `;

      }
    }
  };

  const finalWorkingHours = getWorkingHours(employee.ShiftStartTime, employee.ShiftEndTime);

  const personalInfoFields = [
    { label: "EMPLOYEE NO", key: "EmpCode" },
    { label: "EMPLOYEE NAME", key: "EmpName" },
    { label: "FATHER NAME", key: "FatherName" },
    { label: "MOTHER NAME", key: "MotherName" },
    { label: "SPOUSE NAME", key: "SpouseName" },
    { label: "GENDER", key: "Gender" },
    { label: "MARITAL STATUS", key: "MaritalStatus" },
    { label: "RELIGION", key: "Religion" },
    { label: "MOTHER TONGUE", key: "MotherTongue" },
    { label: "BLOOD GROUP", key: "BloodGroup" },
    { label: "DATE OF BIRTH", key: "DateOfBirth" },
    { label: "DATE OF JOINING", key: "JoiningDate" },
    { label: "DATE OF CONFIRMATION", key: "DateOfConfirmation" },
    { label: "DEPARTMENT", key: "Dept" },
    { label: "NATURE OF WORK", key: "NatureOfWork" },
    { label: "DESIGNATION", key: "Desg" },
    { label: "CATEGORY", key: "EmpCategory" },
    { label: "GRADE", key: "Grade" },
    { label: "WORKING HOURS", key: "WorkingHours", value: finalWorkingHours },
    // { label: "WORKING HOURS", value: finalWorkingHours },

    { label: "INTERVAL TIME", key: "IntervalTime" },
    { label: "SHIFT / RELAY", key: "Shift" },
    { label: "GROSS SALARY", key: "Gross" },
    { label: "PF NUMBER", key: "PFNo" },
    { label: "PF EFFECTIVE", key: "PFEff" },
    { label: "ESI NUMBER", key: "ESINo" },
    { label: "ESI DISPENSARY", key: "ESIDispensary" },
    { label: "MEDICLAIM NUMBER", key: "MediclaimNo" },
    { label: "PAN NO", key: "Pan" }
  ];

  const [selectedFields, setSelectedFields] = useState(personalInfoFields.map(f => f.key));
  const [selectContact, setSelectedContact] = useState(contactDetailsFields.map(c => c.key));
  const [selectedContactDetails, setSelectedContactDetails] = useState(contactDetails.map(f => f.key));

  const printRef = useRef();

  const handleDownloadPDF = () => {
    if (!printRef.current) return;
    html2pdf()
      .set({
        margin: 0.2,
        filename: "Employee_Information.pdf",
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
    link.download = "Employee_information.png";
    link.click();
  };


  // const handleDownloadExcel = () => {
  //   const table = printRef.current;
  //   const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
  //   const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const blob = new Blob([wbout], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   });
  //   saveAs(blob, "EmployeeInformation.xlsx");
  // };

  return (

    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* <Sidebar sx={{ flexShrink: 0, width: { xs: 60, sm: 220 } }} /> */}
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'white', overflowY: 'auto' }}>
          <Header />
          {!isBooklet && (
            <>
              {/* <Checkbox sx={{ mr: 3 }}
                label="Select All PERSONAL INFORMATION"
                checked={selectedFields.length === personalInfoFields.length}
                indeterminate={selectedFields.length > 0 && selectedFields.length < personalInfoFields.length}
                onChange={e =>
                  setSelectedFields(
                    e.target.checked ? personalInfoFields.map(f => f.key) : []
                  )
                }
              />
              <br /> <br />

              {personalInfoFields.map((field) => (
                <Checkbox
                  key={field.key}
                  label={field.label}
                  checked={selectedFields.includes(field.key)}
                  onChange={e => {
                    if (e.target.checked) {
                      setSelectedFields([...selectedFields, field.key]); // add key to selected
                    } else {
                      setSelectedFields(selectedFields.filter(f => f !== field.key)); // remove key
                    }
                  }}
                  sx={{ mr: 2, mb: 3 }}
                />
              ))} 

              <br />
              <Box sx={{ height: 2, bgcolor: 'black', width: '100%' }} />
              <br />

             <Box sx={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>

         
                <Box sx={{ flex: 1 }}>

                  <Checkbox sx={{ mr: 3 }}
                    label="Select All Address"
                    checked={selectContact.length === contactDetailsFields.length}
                    indeterminate={selectContact.length > 0 && selectContact.length < contactDetailsFields}
                    onChange={e =>
                      setSelectedContact(
                        e.target.checked ? contactDetailsFields.map(d => d.key) : []
                      )
                    }
                  />
                  <br /> <br />

                  {contactDetailsFields.map((field) => (
                    <Checkbox

                      key={field.key}
                      label={field.label}
                      checked={selectContact.includes(field.key)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedContact([...selectContact, field.key]);
                        } else {
                          setSelectedContact(selectContact.filter(c => c !== field.key))
                        }
                      }}
                      sx={{ mr: 2, mb: 3 }}
                    />
                  ))}
                  <br /> <br />
                </Box>
                <Box sx={{ flex: 1 }}>


                  <Checkbox sx={{ mr: 3 }}
                    label="Select All contact details"
                    checked={selectedContactDetails.length === contactDetails.length}
                    indeterminate={selectedContactDetails.length > 0 && selectedContactDetails.length < contactDetails}
                    onChange={e =>
                      setSelectedContactDetails(
                        e.target.checked ? contactDetails.map(d => d.key) : []
                      )
                    }
                  />
                  <br /> <br />

                  {contactDetails.map((field) => (
                    <Checkbox
                      key={field.key}
                      label={field.label}
                      checked={selectedContactDetails.includes(field.key)}
                      onChange={e => {
                        if (e.target.checked)
                          setSelectedContactDetails([...selectedContactDetails, field.key]);
                        else
                          setSelectedContactDetails(selectedContactDetails.filter(k => k !== field.key));
                      }}
                      sx={{ mr: 2, mb: 1 }}
                    />
                  ))}

                </Box>
                
              </Box>

              <Box sx={{ height: 2, bgcolor: 'black', width: '100%' }} />
              <br />
 */}
              {/* Controls for Download */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
                <Button variant="solid" onClick={handleDownloadPDF}>Download PDF</Button>
                {/* <Button variant="solid" onClick={handleDownloadExcel}>Download Excel</Button> */}
                <Button variant="solid" onClick={handleDownloadPNG}>Download as PNG</Button>
              </Box>
            </>)}

          <Box
            ref={printRef}
            sx={{
              // borderRadius: 2, border: '2px solid #000000ff',
              // bgcolor: "#fff",
              // width: "780px",
              // minHeight: "1123px",
              // maxWidth: 1000,
              // margin: "auto",
              // mx: "auto",
              // boxShadow: 2, p: 0.3,
              // position: "relative",
              // boxSizing: "border-box",
              // overflowX: "hidden",

              width: "750px",
              border: "2px solid #000000ff",
              borderRadius: 2,
              mx: "auto",
              boxSizing: "border-box",
              fontFamily: "'Noto Sans', Arial, sans-serif",
              bgcolor: "#fff", overFlowX: "hidden"
            }}
          >

            <Box mb={2} color="rgba(0, 0, 0, 1)">
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
                    {employee.BUName}
                  </Typography>
                  <Typography fontWeight="xl" color="#000" fontSize={14} mb={1}>
                    {employee.CmpName}
                  </Typography>
                  <Typography fontSize={12} color="#000">
                    {employee.Addr}
                  </Typography>

                </Box>

              </Box>

              <Box
                sx={{
                  width: "720px",
                  bgcolor: "#fff",
                  border: "1.5px solid #222",
                  mx: "auto",
                  my: 1,
                  fontFamily: "'Noto Sans', Arial, sans-serif"
                }}
              >
                {/* Table header */}
                <Box sx={{ borderBottom: "1.4px solid #222", color: "#000" }}>
                  <Typography
                    fontWeight="bold"
                    sx={{ px: 2, py: 0.5, textAlign: "center", color: '#000', letterSpacing: 1, fontSize: 11 }}
                  >
                    EMPLOYEE INFORMATION
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", borderBottom: "1.2px solid #000000ff" }}>
                  {/* Left Side Table */}
                  <Box sx={{ flex: 1.2, borderRight: "1.2px solid #000000ff", maxWidth: 450 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                      <thead>
                        <tr>
                          <Box sx={{ flex: 1, borderRight: "1.2px solid #000000ff", minWidth: 0 }}>

                            <th style={{ borderBottom: "1px solid #000000ff", width: 44, textAlign: "center" }}>S No</th>
                          </Box>
                          <th style={{ borderBottom: "1px solid #222", textAlign: "left", paddingLeft: 6 }}>PERSONAL INFORMATION</th>
                        </tr>
                      </thead>

                      {/* <tbody>
                        {personalInfoFields.map((field, idx) => (
                          <tr key={field.key || field.label}>
                            <td style={{ textAlign: "center", border: "none", borderBottom: "1px dotted #999", borderRight: "1.2px solid #000", width: "44px" }}>{idx + 1}</td>

                            <td
                              style={{
                                border: "none",
                                borderBottom: "1px dotted #999",
                                padding: "0 8px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  alignItems: "center",
                                  textAlign: "left"
                                }}
                              >
                                <span style={{ fontWeight: "normal" }}>{field.label}</span>
                                <span style={{ fontWeight: 500, marginLeft: "1rem", minWidth: "150px", textAlign: "left" }}>
                                  {field.value !== undefined ? field.value : (employee[field.key] || "")}
                                </span>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody> */}


                      <tbody>
                        {personalInfoFields
                          .filter(field => selectedFields.includes(field.key)) // <-- filter by selected keys
                          .map((field, idx) => (
                            <tr key={field.key || field.label}>
                              <td style={{ textAlign: "center", border: "none", borderBottom: "1px dotted #999", borderRight: "1.2px solid #000", width: "44px" }}>
                                {idx + 1}
                              </td>
                              <td style={{ border: "none", borderBottom: "1px dotted #999", padding: "0 8px", whiteSpace: "nowrap" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", textAlign: "left" }}>
                                  <span style={{ fontWeight: "normal" }}>{field.label}</span>
                                  <span style={{ fontWeight: 500, marginLeft: "1rem", minWidth: "170px", textAlign: "left" }}>
                                    {field.value !== undefined ? field.value : (employee[field.key] || "")}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </Box>

                  {/* Right Side Table */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                      <thead>
                        <tr>
                          <Box sx={{ flex: 1, borderRight: "1.2px solid #000000ff", minWidth: 0 }}>
                            <th style={{ borderBottom: "1px solid #222", width: 44, textAlign: "center" }}>S No</th>
                          </Box>
                          <th style={{ borderBottom: "1px solid #222", textAlign: "left", paddingLeft: 6 }}>CONTACT DETAILS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {contactDetailsFields.map((field, idx) => (
                          <tr key={field.key}>
                            <td style={{ textAlign: "center", border: "none", borderBottom: "1px dotted #999", borderRight: "1.2px solid #000", width: "44px" }}>{idx + 29}</td>
                            <td
                              style={{
                                border: "none",
                                borderBottom: "1px dotted #999",
                                padding: "0 0 0 6px",
                                wordBreak: "break-word"
                              }}
                            >
                              <b> {field.label} </b> <br />

                              <span style={{ fontWeight: 450, fontSize: 8 }}>{employee[field.key] || ""}</span>
                              <br /> <br /> <br /> <br />
                            </td>
                          </tr>
                        ))} */}

                        {contactDetailsFields
                          .filter(field => selectContact.includes(field.key))  // filter only selected
                          .map((field, idx) => (
                            <tr key={field.key || idx}>
                              <td style={{ textAlign: "center", border: "none", borderBottom: "1px dotted #999", borderRight: "1.2px solid #000", width: "44px" }}>
                                {idx + 29}
                              </td>
                              <td style={{ border: "none", borderBottom: "1px dotted #999", padding: "0 0 0 6px", wordBreak: "break-word" }}>
                                <b>{field.label}</b><br />
                                <span style={{ fontWeight: 450, fontSize: 8 }}>{employee[field.key] || ""}</span><br /><br /><br /><br />
                              </td>
                            </tr>
                          ))}



                      </tbody>

                      <tbody>
                        {/* {contactDetails.map((field, idx) => (
                          <tr key={field.key}>
                            <td style={{ textAlign: "center", border: "none", borderBottom: "1px dotted #999", borderRight: "1.2px solid #000", width: "44px" }}>{idx + 31}</td>

                            <td
                              style={{
                                border: "none",
                                borderBottom: "1px dotted #999",
                                padding: "0 0 0 2px",
                                display: "flex",
                                justifyContent: "space-between",
                                whiteSpace: "pre-wrap"
                              }}
                            >
                              {field.label}
                              <span style={{ fontWeight: 500, marginRight: 60 }}>
                                {field.value !== undefined ? field.value : (employee[field.key] || "")}
                              </span>
                            </td>
                          </tr>
                        ))} */}

                        {contactDetails
                          .filter(field => selectedContactDetails.includes(field.key))
                          .map((field, idx) => (
                            <tr key={field.key}>
                              <td style={{ textAlign: "center", border: "none", borderBottom: "1px dotted #999", borderRight: "1.2px solid #000", width: "44px" }}>
                                {idx + 31}
                              </td>
                              <td
                                style={{
                                  border: "none",
                                  borderBottom: "1px dotted #999",
                                  padding: "0 0 0 2px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  whiteSpace: "pre-wrap"
                                }}
                              >
                                {field.label}
                                <span style={{ fontWeight: 500, marginRight: 60 }}>
                                  {field.value !== undefined ? field.value : (employee[field.key] || "")}
                                </span>
                              </td>
                            </tr>
                          ))}

                      </tbody>

                      <tbody>
                        {NomineeDetails.map((field, idx) => (
                          <tr key={field.key}>
                            <td style={{ textAlign: "center", border: "none", borderBottom: "2px solid #000", borderRight: "1.2px solid #000", width: "44px" }}>{idx + 35}</td>
                            <td
                              style={{
                                border: "none", borderBottom: "2px solid #000",
                                padding: "0 0 0 6px",
                                wordBreak: "break-word"
                              }}
                            >
                              <b> {field.label} </b> <br />
                              <span style={{ fontWeight: 450, fontSize: 8 }}>{employee[field.key] || ""}</span>
                              <br /> <br /> <br /> <br />
                              <br /> <br /> <br /> <br />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>

                </Box>
                {/* Footer */}

              </Box>
              <Box mt={10} sx={{ display: "flex", color: '#000', fontSize: 10, justifyContent: "space-between", px: 2, py: 1, alignItems: "flex-end" }}>
                <span fontWeight="bold"  >
                  <b>DATE OF ENTRY :</b> {employee.JoiningDate}<br />
                  <b>MODIFIED ON :</b> {new Date().toLocaleDateString()}
                </span>
                <Typography fontWeight="bold" sx={{ pr: 2, color: '#000' }}>
                  AUTHORISED SIGNATORY
                </Typography>
              </Box>
            </Box>

          </Box>

        </Box>

      </Box>
    </CssVarsProvider>
  );
}
