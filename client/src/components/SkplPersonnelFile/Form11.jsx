import React, { useRef } from "react";
import { Box, Typography, Button } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';


function getMemberTitle(employee) {
    if (employee.Gender === "MALE") return "Mr.";
    if (employee.Gender === "FEMALE") return "Mrs.";
    return "Ms.";
};

export default function EPFForm11({ employee, isBooklet }) {
    const printRef = useRef();

    const handleDownloadPDF = () => {
        if (!printRef.current) return;
        html2pdf()
            .set({
                margin: 0.2,
                filename: "Form11.pdf",
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
        link.download = "Form11.png";
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
                            {/* Controls for Download */}
                            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
                                <Button variant="solid" onClick={handleDownloadPDF}>Download PDF</Button>
                                <Button variant="solid" onClick={handleDownloadPNG}>Download as PNG</Button>
                            </Box>
                        </>)}
                    {/* Appointment Order Report */}
                    <Box
                        ref={printRef}
                        sx={{
                            // borderRadius: 2, border: '2px solid #000000ff',
                            // bgcolor: "#fff",
                            // width: "780px",
                            // minHeight: "1123px",
                            // maxWidth: 1500,
                            // margin: "auto",
                            // boxShadow: 2, p: 0.3,
                            // position: "relative",
                            // boxSizing: "border-box",
                            // overflowX: "hidden",color:"#000"

                            width: "780px",
                            border: "2px solid #000000ff",
                            borderRadius: 2,
                            mx: "auto",
                            my:1,color:"#000",
                            boxSizing: "border-box",
                            fontFamily: "'Noto Sans', Arial, sans-serif",
                            bgcolor: "#fff", overFlowX: "hidden"
                        }}
                    >
                        {/* Top Section */}
                        <Box color="#000" sx={{ textAlign: "center", mb: 0.5 }}>
                            <Typography color="#000" fontSize={10} fontWeight="bold">Form No. 11 (NEW)</Typography>
                            <Typography color="#000" fontSize={10}>Declaration Form</Typography>
                            <Typography color="#000" fontSize={10}>(To be retained by the Employer for future reference)</Typography>
                        </Box>
                        <Box color="#000" sx={{ textAlign: "center", mb: 1 }}>
                            <Typography fontSize={10} color="#000" fontWeight="bold">Employee Provident Fund Organization</Typography>
                            <Typography fontSize={10} color="#000" fontWeight="bold">The Employee Provident Fund Scheme,1952 (PARAGRAPH-34 & 57 ) &<br />
                                The Employees Pension Scheme,1995 (PARAGRAPH-24)</Typography>
                        </Box>
                        <Typography fontSize={10} sx={{ mb: 0.6, color: "#000" }}>
                            DECLARATION BY A PERSON TAKING UP EMPLOYMENT IN AN ESTABLISHMENT ON WHICH EPFS 1952 and/or EPS 1995 IS APPLICABLE
                        </Typography>

                        {/* Table Section */}
                        <table style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: 10,
                            marginBottom: "1em"
                        }}>
                            <tbody>
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px", width: "55%" }}>
                                        <b>1) Name of the Member</b>
                                    </td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        {employee.EmpName}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <b>2) Father's Name / Spouse Name</b> <br />(Please tick whichever is possible)
                                    </td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        {employee.FathersName}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}><b>3) Date of Birth</b></td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        {employee.DateOfBirth}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <b>4) Gender (Male / Female / Transgender) </b> <br />
                                    </td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        {employee.Gender} <br />
                                    </td>
                                </tr>
                                <tr>

                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <b>5) Marital Status</b>
                                    </td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        {employee.MaritalStatus}
                                    </td>
                                </tr>

                                {/* <tr>
                        <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                            <b>6) Email Id</b><br />
                        </td>
                        <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                            {employee?.PersonalEmailID || "not available"} <br />
                        </td>
                    </tr> */}

                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <b>6)  <br />
                                            <Box style={{ marginLeft: 16 }}>
                                                (a) Email Id : <br />
                                                (b) Mobile No : <br />
                                            </Box> </b>
                                    </td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}><br />
                                        {employee.PersonalEmailID}  <br />
                                        {employee.PersonalMobileNo} <br />
                                    </td>
                                </tr>

                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <b>7) Whether earlier a member of the Employees Provident Fund Scheme,1952</b>
                                    </td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        Yes ‎ ‎ ‎ ‎ ‎ ‎ ‎  No
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <b>8) Whether earlier a member of the Employees Pension Scheme,1995</b>
                                    </td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        Yes ‎ ‎ ‎ ‎ ‎ ‎ ‎   No
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <b>9) Previous employment details: [if Yes to 7 and/or * above]<br />
                                            <Box style={{ marginLeft: 16 }}>
                                                a) Universal Account Number : <br />
                                                b) Previous PF Account Number : <br />
                                                c) Date of exit from previous employment:(DD/MM/YYYY) <br />
                                                d) Scheme Certificate No. (if issued) <br />
                                                e) Pension Payment Order No. (if issued)
                                            </Box> </b>
                                    </td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <b>10)</b> <br />
                                        <Box style={{ marginLeft: 16 }}>
                                            <b> a) International Worker</b> <br />
                                            <b>b) If yes, state country of origin (India/Name of the country)</b> <br />
                                            <b>c) Passport No.</b> <br />
                                            <b>d) Validity of passport [(DD/MM/YYYY) to (DD/MM/YYYY) ]</b> <br />
                                        </Box>
                                    </td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}>
                                        <b>11) KYC details : (Attach Self-attested copies of following KYC)
                                            <br /> a) Bank Account No. & IFS Code <br />b) AADHAR Number <br />c) Permanent Account Number (if available)
                                        </b>
                                    </td>
                                    <td style={{ border: "1px solid #000", padding: "3px 8px" }}><br />
                                        {employee.BankAccountNo}<br />
                                        {employee.AadharNo}<br />
                                        {employee?.PAN || "null"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* Undertaking */}
                        <Box sx={{ height: 2, bgcolor: 'black', width: '100%' }} />
                        <Box textAlign="center" sx={{ fontSize: 10, mt: 0.5 }} >
                            <b>Undertaking</b>
                            <Box sx={{ height: 2, bgcolor: 'black', width: '100%' }} />
                        </Box>
                        <Box sx={{ fontSize: 10, mb: 1 }}>

                            <ol style={{ marginLeft: 20, marginTop: 4 }}>
                                <li>Certified that the particulars are true to the best of my knowledge.</li>
                                <li>
                                    I hereby authorize the EPFO to use my Aadhaar/Identity for KYC, e-KYC purpose for service delivery
                                </li>
                                <li>
                                    Kindly transfer the funds and service details, if applicable, from the previous PF account as declared above to the present P.F Account (The
                                    transfer would by possible only if the identified KYC detail approved by previos employer has been verified by present employer using his Digital
                                    Signature Certificate)
                                </li>
                                <li>
                                    In case of changes in above details, the same will be intimated to employer at the earliest.

                                </li>
                            </ol>
                        </Box>

                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box marginLeft={8}>
                                    <Typography color="#000" fontSize={10}><b>Date:</b> {new Date().toLocaleDateString()}</Typography>
                                    <Typography color="#000" marginTop={1} fontSize={10}><b>Place:</b> {employee.Addr ? employee.Addr.split(" - ")[0].split(",").pop().trim() : " "}</Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography fontSize={12} sx={{ mr: 6, mt: 3, color: "#000" }}><b> Signature of Member</b></Typography>
                                    {/* Drawing a signature line */}
                                    {/* <Box sx={{ width: 160, borderBottom: "1px solid #333", mx: "auto" }} /> */}
                                </Box>
                            </Box>
                        </Box>

                        {/* Declaration by Employer */}
                        <Typography fontWeight="bold" textAlign="center" color="#000" fontSize={10}>
                            <b>   <u>DECLARATION BY PRESENT EMPLOYER</u> </b>
                        </Typography>
                        {/* Main Section */}
                        <Box sx={{ fontSize: 10, mb: 0.5 }}>
                            <ol style={{ listStyle: "upper-alpha", marginLeft: 18, paddingLeft: 0, marginBottom: 0 }}>
                                <li style={{ marginBottom: 10 }}>
                                    The member {getMemberTitle(employee)} <b>{employee.EmpName}</b> has joined on <b>{employee.JoiningDate}</b> and has been allotted PF Number.
                                </li>
                                <li style={{ marginBottom: 10 }}>
                                    In case the person was earlier not a member of EPF Scheme,1952 and EPS,1995:
                                    <Box sx={{ ml: 1, mt: 1 }}>
                                        <span>(Post allotment of UAN ) The allotted for the member is</span>
                                        <br />
                                        <span>Please Tick the Appropriate Option :</span>
                                        <Box component="ul" sx={{ pl: 3, my: 1 }} style={{ listStyle: "none" }}>
                                            <li style={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 16, height: 16,
                                                        border: "1.2px solid #111",
                                                        display: "inline-block",
                                                        ml: 5, mr: 1, mb: 1
                                                    }}
                                                /> Have not been uploaded
                                            </li>
                                            <li style={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 16, height: 16,
                                                        border: "1.2px solid #111",
                                                        display: "inline-block",
                                                        ml: 5, mr: 1, mb: 1
                                                    }}
                                                /> Have been uploaded but not approved
                                            </li>
                                            <li style={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 16, height: 16,
                                                        border: "1.2px solid #111",
                                                        display: "inline-block",
                                                        ml: 5, mr: 1, mb: 1
                                                    }}
                                                /> Have been uploaded but approved with DSC
                                            </li>
                                        </Box>
                                    </Box>
                                </li>
                                <li>
                                    In case the person was earlier a member of EPF Scheme,1952 and EPS,1995:<br />
                                    <Box sx={{ ml: 1 }}>
                                        The above PF Account number/UAN of the member as mentioned in (A) above has been tagged with his/her UAN/Previous Member ID as declared by Member.<br /><br />
                                        As the DSC of establishment are not registered with EPFO, the member has been informed to file physical claim (Form - 13) for transfer of funds from his previous establishment
                                    </Box>
                                </li>
                            </ol>
                        </Box>
                        {/* Date, Place, Signature */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", mt: 3, mb: 0.5 }}>
                            <Box sx={{ fontSize: 13, width: "52%", textAlign: "left" }}>
                                <Box sx={{ mb: 0.5 }}>
                                    <b>Date&nbsp;&nbsp;&nbsp;:</b> {new Date().toLocaleDateString()}
                                </Box>
                                <Box sx={{ mb: 1 }}>
                                    <b>Place&nbsp;:</b> {employee.Addr ? employee.Addr.split(" - ")[0].split(",").pop().trim() : " "}
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: 13, flex: 1, textAlign: "right", mr: 5 }}>
                                <b>Signature of employer with seal of establishment</b>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>

    );
}
