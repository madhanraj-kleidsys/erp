import React, { useRef, useEffect, useState } from "react";
import { Box, Stack, Input, Button, Select, Option, Typography, Card, Grid, Divider, Sheet, CardContent, Checkbox } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import Sidebar from '../Sidebar';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AppointmentOrder from "./AppoinmentOrder";
import ConfirmationOrder from "./confirmationOrder";
import NominaTion from "./NominaTion";
import LetterOfAcceptance from "./LetterOfAcceptance";

import AffirmativeStatement from "./AffirmativeStatement";
import ServiceRecords from "./ServiceRecords";
import CheckList from "./CheckList";
import InductionForm from "./InductionForm";
import EmployeeInformation from "./EmployeeInformation";
import Form11 from "./Form11";
import FormF from "./FormF";
import styled from 'styled-components';

const apiUrl = import.meta.env.VITE_API_URL || `http://localhost:3000/api`;
const Loader = () => (
  <StyledWrapper>
    <div className="loader">
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </StyledWrapper>
);

const EmployeeFilter = () => {

  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  const handleDownloadAllBookletPDF = () => {
    if (!allReportsRef.current || !employee) return;
    setTimeout(() => {

      html2pdf()
        .set({
          margin: 0.2,
          filename: "Employee_All_Reports_Booklet.pdf",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 2, allowTaint: true, useCORS: true },
          jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ['css', 'legacy'], after: '.page-break' },
        })
        .from(allReportsRef.current)
        .save();


    }, 500); // half second delay, adjust as necessary
  };



  //   const checklistRef = useRef();
  // const inductionFormRef = useRef();
  // const ServiceRecordsRef = useRef();
  // const appointmentOrderRef = useRef();
  // const confirmationOrderRef = useRef();
  // const nominationRef = useRef();
  // const letterOfAcceptanceRef = useRef();

  // const Form11Ref = useRef();
  // const FormFRef = useRef();
  // const employeeInfoRef = useRef();
  // const AffirmativeStatementRef = useRef(); 

  const allReportsRef = useRef();

  {/* In render */ }
  <div ref={allReportsRef} style={{ background: "white" }}>
    <CheckList employee={employee} />
    {/* <InductionForm employee={employee} /> */}
    <EmployeeInformation employee={employee} />
    <AppointmentOrder employee={employee} />
    <ConfirmationOrder employee={employee} />
    <NominaTion employee={employee} />
    <LetterOfAcceptance employee={employee} />
    <AffirmativeStatement employee={employee} />
    <ServiceRecords employee={employee} />
    <Form11 employee={employee} />
    <FormF employee={employee} />

  </div>


  const [reportType, setReportType] = useState("CheckList");
  const [filters, setFilters] = useState({
    empId: "",
    empCode: "",
    empName: "",
    MobileNo: "",
    address: "",
    Desg: "",
    Dept: ""
    // dateJoined: "",
  });
  // const [selectAllBooklet, setSelectAllBooklet] = useState(false);

  const handleChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleClear = () => {
    setFilters({ empId: "", empCode: "", empName: "", MobileNo: "", address: "", Desg: "", Dept: "" });
    setEmployee(null);
    setError("");
  };

  const handleSubmit = async () => {
    // Only send non-empty filters
    const query = {};

    if (filters.empName?.trim()) query.empName = filters.empName.trim();
    if (filters.empId?.trim()) query.empId = filters.empId.trim();
    if (filters.empCode?.trim()) query.empCode = filters.empCode.trim();
    if (filters.Desg?.trim()) query.Desg = filters.Desg.trim();
    if (filters.Dept?.trim()) query.Dept = filters.Dept.trim();

    if (filters.MobileNo?.trim()) query.MobileNo = filters.MobileNo.trim();
    if (filters.address?.trim()) query.address = filters.address.trim();

    // Object.entries(filters).forEach(([k, v]) => {
    //     if (v && v.trim()) query[k === "dateJoined" ? "JoiningDate" : k] = v.trim();
    // });

    if (Object.keys(query).length === 0) {
      setError("Please enter at least one filter to search.");
      return;
    }
    setLoading(true);
    setError("");
    setEmployee(null);
    try {
      //"http://localhost:3000/api/appoinmentOrder"
      const response = await fetch(`${apiUrl}/appoinmentOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });

      const data = await response.json();

      if (!data.success || !data.data || data.data.length === 0) {
        setError("No employee found.");
        setEmployee(null);
      } else {
        setEmployee(data.data[0]);
      }
    } catch (err) {
      setError("Failed to fetch data.");
    }
    setLoading(false);
  };


  let showGenerate = Object.values(filters).some((v) => v.trim() !== "");


const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSubmit();
  }
};

  return (

    <CssVarsProvider disableTransitionOnChange >
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
              pb: { xs: 2, sm: 2, md: 2 },
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              gap: 1,
            }}
          >

            <Box
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 110,
                p: { xs: 2, sm: 3, md: 3 },
                bgcolor: "rgb(18, 177, 209)",
                color: "#ffffff",
                mx: { xs: 1, sm: 4, md: 1, lg: 2 },
                // mr:{lg:160},
                mt: { xs: 1, sm: 2, md: 3 },
                borderRadius: 'md',
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography level={{ xs: "h5", sm: "h4", md: "h3" }} sx={{ fontSize: 20 }} fontWeight="lg" textAlign="left">
                Employee - Personal File
              </Typography>
            </Box>

            <Card
              variant="outlined"
              sx={{
                mt: 3,
                // mt: { xs: 1, sm: 2, md: 3 },
                // p: { xs: 2, sm: 3 ,md:3},
                mx: "auto",
                maxWidth: 1620,
                bgcolor: "white",
                p: 3,
                borderRadius: 'md',
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
              }}
            >

              <Grid container spacing={3} alignItems="flex-end">
                {/* <Grid item xs={12} sm={6} md={6}> */}
                <Grid item xs={12} sm={6} md={6} sx={{ position: "relative", maxWidth: "100%" }}>
                  <Typography fontWeight="md" mb={1} sx={{ color: "rgba(14, 142, 168, 1)" }}>
                    Select Report Type
                  </Typography>


                  <Select
                    value={reportType}
                    onChange={(_, value) => setReportType(value)}
                    placeholder="Select Report Type"
                    required
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Option value="AllReports">All Reports</Option>
                    <Option value="CheckList">Check List</Option>
                    <Option value="InductionForm">Induction Form</Option>
                    <Option value="EmployeeInformation">Employee Information</Option>
                    <Option value="appointmentOrder">Appointment Order</Option>
                    <Option value="confirmationOrder">Confirmation Order</Option>
                    <Option value="nomination">Nomination</Option>
                    <Option value="ServiceRecords"> Service Records</Option>
                    <Option value="Form11"> Form11</Option>
                    <Option value="letterOfAcceptance"> Letter of acceptance to receive wages through Bank</Option>
                    <Option value="AffirmativeStatement"> Affirmative Statement</Option>
                    <Option value="FormF"> FormF</Option>

                  </Select>
                </Grid>


                <Grid item xs={12} sm={6} md={12}>
                  <Typography fontWeight="md" mb={1} sx={{ color: "rgba(14, 142, 168, 1)" }}>
                    Enter Filters
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap" gap={2}>
                    <Input onKeyDown={handleKeyDown} 
                      placeholder="Employee ID"
                      value={filters.empId}
                      onChange={handleChange("empId")}
                      sx={{ flex: 1, minWidth: 150 }}
                      clearable
                    />
                    <Input onKeyDown={handleKeyDown} 
                      placeholder="Employee Code"
                      value={filters.empCode}
                      onChange={handleChange("empCode")}
                      sx={{ flex: 1, minWidth: 150 }}
                      clearable
                    />
                    <Input onKeyDown={handleKeyDown} 
                      placeholder="Employee Name"
                      value={filters.empName}
                      onChange={handleChange("empName")}
                      sx={{ flex: 1, minWidth: 150 }}
                      clearable
                    />
                    <Input onKeyDown={handleKeyDown} 
                      placeholder="Phone Number"
                      value={filters.MobileNo}
                      onChange={handleChange("MobileNo")}
                      sx={{ flex: 1, minWidth: 150 }}
                      clearable
                    />
                    <Input onKeyDown={handleKeyDown} 
                      placeholder="Emp Designation"
                      value={filters.Desg}
                      onChange={handleChange("Desg")}
                      sx={{ flex: 1, minWidth: 150 }}
                      clearable
                    />
                    <Input onKeyDown={handleKeyDown} 
                      placeholder="Emp Department"
                      value={filters.Dept}
                      onChange={handleChange("Dept")}
                      sx={{ flex: 1, minWidth: 150 }}
                      clearable
                    />
                    <Input onKeyDown={handleKeyDown} 
                      placeholder="Address"
                      value={filters.address}
                      onChange={handleChange("address")}
                      sx={{ flex: 1, minWidth: 150 }}
                      clearable
                    />
                  </Stack>
                </Grid>
              </Grid>

              {/* <Divider sx={{ my: 3 }} /> */}

              <Stack direction="row" sx={{ mt: 2 }} spacing={2} justifyContent="flex-end">
                <Button onClick={handleClear} variant="outlined" color="neutral">
                  Clear
                </Button>
                
                <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

                  <Button type="submit" className="no-print"
                    // onClick={handleSubmit}
                    variant="solid"
                    loading={loading}
                    disabled={!showGenerate || loading}
                    sx={{ bgcolor: "#12B1D1", "&:hover": { bgcolor: "#0b8cb1" } }}
                  >
                    {loading ? "Loading..." : "Generate Report"}
                  </Button>

                </Box>
              </Stack>

              {reportType === "AllReports" && employee && (
                <Button onClick={handleDownloadAllBookletPDF} sx={{ mt: 2 }}>
                  Download All Reports PDF
                </Button>
              )}


              {error && (
                <Typography color="danger" fontSize={14} mt={2} textAlign="center">
                  {error}
                </Typography>
              )}
            </Card>


          </Box>

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 6 }}>
              <Loader />
            </Box>
          )}

          {!loading && employee && reportType === "AllReports" && (
            <Box ref={allReportsRef} sx={{ bgcolor: 'white' }}>
              {/* className="page-break" */}
              <Box className="page-break" ><CheckList employee={employee} isBooklet={true} /></Box>
              <Box className="page-break"><InductionForm employee={employee} isBooklet={true} /></Box>
              <Box className="page-break"><EmployeeInformation employee={employee} isBooklet={true} /></Box>
              <Box className="page-break"><AppointmentOrder employee={employee} isBooklet={true} /></Box>
              <Box  ><ConfirmationOrder employee={employee} isBooklet={true} /></Box>
              <Box  ><NominaTion employee={employee} isBooklet={true} /></Box>
              <Box   ><LetterOfAcceptance employee={employee} isBooklet={true} /></Box>
              <Box ><AffirmativeStatement employee={employee} isBooklet={true} /></Box>
              <Box  ><ServiceRecords employee={employee} isBooklet={true} /></Box>
              <Box  ><Form11 employee={employee} isBooklet={true} /></Box>
              <Box  ><FormF employee={employee} isBooklet={true} /></Box>
            </Box>

            //   <Box ref={allReportsRef} sx={{ bgcolor: 'white' }}>
            //   <Box ><CheckList employee={employee} isBooklet={true} /></Box>
            //   <Box ><InductionForm employee={employee} isBooklet={true} /></Box>
            //   <Box ><EmployeeInformation employee={employee} isBooklet={true} /></Box>
            //   <Box ><AppointmentOrder employee={employee} isBooklet={true} /></Box>
            //   <Box ><ConfirmationOrder employee={employee} isBooklet={true} /></Box>
            //   <Box ><NominaTion employee={employee}  isBooklet={true} /></Box>
            //   <Box ><LetterOfAcceptance employee={employee} isBooklet={true} /></Box>
            //   <Box ><AffirmativeStatement employee={employee} isBooklet={true} /></Box>
            //   <Box ><ServiceRecords employee={employee} isBooklet={true} /></Box>
            //   <Box ><Form11 employee={employee} isBooklet={true} /></Box>
            //   <Box ><FormF employee={employee}  isBooklet={true} /></Box>
            // </Box>
          )}


          {/* {!loading && employee && reportType === "AllReports" && (
  <Box ref={allReportsRef} sx={{ bgcolor: 'white' }}>
    <CheckList employee={employee} isBooklet={true} />
    <InductionForm employee={employee} isBooklet={true} />
    <EmployeeInformation employee={employee} isBooklet={true} />
    <AppointmentOrder employee={employee} isBooklet={true} />
    <ConfirmationOrder employee={employee} isBooklet={true} />
    <NominaTion employee={employee}  isBooklet={true}/>
    <LetterOfAcceptance employee={employee} isBooklet={true}/>
    <AffirmativeStatement employee={employee} isBooklet={true} />
    <ServiceRecords employee={employee} isBooklet={true} />
    <Form11 employee={employee} isBooklet={true} />
    <FormF employee={employee}  isBooklet={true}/>
  </Box>
)} */}

          {/* { !selectAllBooklet && (
      <>  */}
          {!loading && employee && reportType === "CheckList" && (
            <CheckList employee={employee} />
          )}
          {!loading && employee && reportType === "InductionForm" && (
            <InductionForm employee={employee} />
          )}
          {!loading && employee && reportType === "EmployeeInformation" && (
            <EmployeeInformation employee={employee} />
          )}

          {!loading && employee && reportType === "appointmentOrder" && (
            <AppointmentOrder employee={employee} />
          )}
          {!loading && employee && reportType === "confirmationOrder" && (
            <ConfirmationOrder employee={employee} />
          )}
          {!loading && employee && reportType === "nomination" && (
            <NominaTion employee={employee} />
          )}
          {!loading && employee && reportType === "letterOfAcceptance" && (
            <LetterOfAcceptance employee={employee} />
          )}

          {!loading && employee && reportType === "AffirmativeStatement" && (
            <AffirmativeStatement employee={employee} />
          )}
          {!loading && employee && reportType === "ServiceRecords" && (
            <ServiceRecords employee={employee} />
          )}
          {!loading && employee && reportType === "FormF" && (
            <FormF employee={employee} />
          )}
          {!loading && employee && reportType === "Form11" && (
            <Form11 employee={employee} />
          )}
          {/* </>
    )} */}

          {/* {selectAllBooklet && ( */}
          {/* <Box ref={allReportsRef} sx={{ position: 'absolute', top: -9999, left: -9999, pointerEvents: 'none', opacity: 0 }}>
        <div ref={checklistRef}><CheckList employee={employee} /></div>
        <div ref={inductionFormRef}><InductionForm employee={employee} /></div>
        <div ref={employeeInfoRef}><EmployeeInformation employee={employee} /></div>
        <div ref={appointmentOrderRef}><AppointmentOrder employee={employee} /></div>
        <div ref={confirmationOrderRef}><ConfirmationOrder employee={employee} /></div>
        <div ref={nominationRef}><NominaTion employee={employee} /></div>
        <div ref={letterOfAcceptanceRef}><LetterOfAcceptance employee={employee} /></div>

        <div ref={AffirmativeStatementRef}><AffirmativeStatement employee={employee} /></div>
        <div ref={ServiceRecordsRef}><ServiceRecords employee={employee} /></div>
        <div ref={Form11Ref}><Form11 employee={employee} /></div>
        <div ref={FormFRef}><FormF employee={employee} /></div>
      </Box> */}

          {/* )} */}
        </Box>
      </Box>

    </CssVarsProvider>
  );
};

const StyledWrapper = styled.div`
  .loader {
    height: 30px;
    display: inline-block;
  }

  .loader > div {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    box-shadow: 0 0 10px orange;
    background: #67daeeff;
    float: left;
    margin: 5px;
    transform: scale(2);
  }

  .loader > div:nth-child(1) {
    animation: anm-BL-53-move1 1s infinite linear;
  }

  .loader > div:nth-child(2) {
    animation: anm-BL-53-move2 1s infinite linear;
    animation-delay: 0.2s;
  }

  .loader > div:nth-child(3) {
    animation: anm-BL-53-move3 1s infinite linear;
    animation-delay: 0.3s;
  }

  .loader > div:nth-child(4) {
    animation: anm-BL-53-move4 1s infinite linear;
    animation-delay: 0.4s;
  }

  .loader > div:nth-child(5) {
    animation: anm-BL-53-move5 1s infinite linear;
    animation-delay: 0.5s;
  }

  @keyframes anm-BL-53-move1 {
    50% {
      background: #67daeeff;
      transform: scale(1);
    }
  }

  @keyframes anm-BL-53-move2 {
    50% {
      background: #67daeeff;
      transform: scale(1);
    }
  }

  @keyframes anm-BL-53-move3 {
    50% {
      background: #67daeeff;
      transform: scale(1);
    }
  }

  @keyframes anm-BL-53-move4 {
    50% {
      background: #67daeeff;
      transform: scale(1);
    }
  }

  @keyframes anm-BL-53-move5 {
    50% {
      background: #67daeeff;
      transform: scale(1);
    }
  }
   
}

`;
export default EmployeeFilter;