import React, { useRef } from "react";
import { Box, Typography, Button, Table } from "@mui/joy";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Header from '../Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

// function getMemberEnglish(employee) {
//     if (employee.Gender === "MALE") return "Mr.";
//     if (employee.Gender === "FEMALE") return "Shri / Shrimati / Kumar.";
// };

// function getMemberTamil(employee) {
//     if (employee.Gender === "MALE") return "திரு.";
//     if (employee.Gender === "FEMALE") return "ஸ்ரீ / ஸ்ரீமதி / குமாரி.";
// };

const companyAddress = {
    title1: "FORM F / படிவம் F / फॉर्म F",
    title2: "[See sub-rule (1) of rule 6] / [விதி 6 இன் துணை விதி (1) ஐப் பார்க்கவும்] / [नियम 6 का उपनियम (1) देखें]",
    title3: "NOMINATION / நியமனம் / नामांकन",
    title4: "Statement / அறிக்கை / कथन",
    title5: "Part B (EPS) (Para 18)",
    title6: "CERTIFICATE BY EMPLOYER",
};

const checklistStatement = [
    { key: "EmpName", labels: ["Employee Name", "பணியாளர் பெயர்", "कर्मचारी का नाम"] },
    { key: "Gender", labels: ["Gender", "பாலினம்", "लिंग"] },
    { key: "Religion", labels: ["Religion", "மதம்", "धर्म"] },
    { key: "Dept", labels: ["Department", "துறை", "विभाग"] },
    { key: "Desg", labels: ["Designation (Post)", "பதவி", "पद/पदनाम"] },
    { key: "JoiningDate", labels: ["Joining Date", "நியமனம் தேதி", "अपॉइंटमेंट की तिथि"] },
    { key: "PermanentAddress", labels: ["Permanent Address", "நிரந்தர முகவரி", "स्थायी पता"] }
];

const nominationFields = [
    { label: ["Name (in Block letters) / பெயர் (தடித்த எழுத்துக்களில்) / नाम (स्पष्ट अक्षरों में) "], key: "EmpName" },
    { label: ["Father’s / Husband’s Name / தந்தை / கணவர் பெயர் / पिता/ पति का नाम "], key: "FathersName" },
    { label: ["Date of Birth / பிறந்த தேதி / जन्म तिथि"], key: "DateOfBirth" },
    { label: [" Gender / பாலினம் / लिंग"], key: "Gender" },
    { label: ["Marital Status / திருமண நிலை / वैवाहिक स्थिति"], key: "MaritalStatus" },
    { label: ["Account No / கணக்கு எண் / खाता नंबर"], key: "BankAccountNo" },
    { label: ["Permanent Address / நிலையான முகவரி / स्थायी पता"], key: "PermanentAddress" },
    { label: ["Joining Date / சேர்ந்த தேதி / में शामिल होने की तारीख"], key: "EstNameAddr" },
    { label: ["Joining Date / சேர்ந்த தேதி / में शामिल होने की तारीख"], key: "DateOfJoining" }
];
const nominations = [
    {
        name: "",
        address: "",
        relationship: "",
        dob: "",
        proportion: "",
        guardianName: ""
    }
];

const filleRs = {
    To: "To / பெறுநர் / प्राप्तकर्ता ,"
};

const checklist = [
    {
        label: [
            "I hereby certify that the person(s) mentioned is/are member(s) of my family within the meaning of Cl. (h) of Sec. 2 of the Payment of Gratuity Act, 1972",
            "குறிப்பிடப்பட்ட நபர்(கள்) எனது குடும்பத்தில் உறுப்பினர்(கள்) என்று இதன் மூலம் சான்றளிக்கிறேன். 1972 ஆம் ஆண்டு பணிக்கொடை செலுத்தும் சட்டத்தின் பிரிவு 2 இன் Cl. (h) இன் அர்த்தத்திற்குள்.",
            "मैं एतद्द्वारा प्रमाणित करता/करती हूँ कि उल्लिखित व्यक्ति/व्यक्तियाँ मेरे परिवार के सदस्य हैं ग्रेच्युटी भुगतान अधिनियम, 1972 की धारा 2 के खंड (एच) के अर्थ के अंतर्गत"
        ]
    },

    {
        label: [
            "I hereby declare that I have no family within the meaning of Cl. (h) of Sec.2 of the said Act",
            "மேற்கூறிய சட்டத்தின் பிரிவு 2 இன் Cl. (h) இன் அர்த்தத்திற்குள் எனக்கு குடும்பம் இல்லை என்று இதன்மூலம் அறிவிக்கிறேன்.",
            "मैं एतद्द्वारा घोषणा करता/करती हूँ कि उक्त अधिनियम की धारा 2 के खंड (एच) के अर्थ में मेरा कोई परिवार नहीं है।"
        ]
    },
    {
        label: [
            "(a) My father/mother/parents is/are not dependent on me.",
            "(b) My husband’s father/mother/parents is/are not dependent on my husband.",
            "(அ) என் தந்தை/தாய்/பெற்றோர் என்னைச் சார்ந்து இல்லை.",
            "(ஆ) என் கணவரின் தந்தை/தாய்/பெற்றோர் என் கணவரைச் சார்ந்து இல்லை.",
            "(क) मेरे पिता/माता/माता-पिता मुझ पर आश्रित नहीं हैं।",
            "(ख) मेरे पति के पिता/माता/माता-पिता मेरे पति पर आश्रित नहीं हैं।"

        ]
    },
    {
        label: [
            " I have excluded my husband from my family by a notice dated ………………… to the controlling authority in terms of the proviso to Cl. (h) of Sec.2 of the said Act.",
            "மேற்கூறிய சட்டத்தின் பிரிவு 2 இன் பிரிவு (h) இன் விதிமுறையின்படி கட்டுப்பாட்டு அதிகாரிக்கு ………………… தேதியிட்ட அறிவிப்பின் மூலம் எனது கணவரை எனது குடும்பத்திலிருந்து விலக்கியுள்ளேன்.",
            "मैंने उक्त अधिनियम की धारा 2 के खंड (एच) के प्रावधान के अनुसार नियंत्रण प्राधिकारी को दिनांक .................. का नोटिस देकर अपने पति को अपने परिवार से बाहर कर दिया है।"
        ]
    },
    {
        label: [
            "Nomination made herein invalidates my previous nomination.",
            "இங்கு செய்யப்பட்ட வேட்புமனு எனது முந்தைய வேட்புமனுவை செல்லாததாக்குகிறது.",
            "यहां किया गया नामांकन मेरे पिछले नामांकन को अमान्य करता है।"
        ]
    }

];

export default function FormF({ employee, isBooklet }) {
    const printRef = useRef();

    const handleDownloadPDF = () => {
        if (!printRef.current) return;
        html2pdf()
            .set({
                margin: 0.2,
                filename: "FormF.pdf",
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
        link.download = "FormF.png";
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
                    {/* FormF Report */}
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
                            // overflowX: "hidden",

                            width: "780px",
                            border: "2px solid #000000ff",
                            borderRadius: 2,
                            mx: "auto",
                            my: 1,
                            boxSizing: "border-box",
                            fontFamily: "'Noto Sans', Arial, sans-serif",
                            bgcolor: "#fff", overFlowX: "hidden"
                        }}
                    >
                        <Box>
                            <Box mb={2} color="rgba(0, 0, 0, 1)">
                                <Box textAlign="center" color="rgba(0, 0, 0, 1)">
                                    <Typography color="#000" my={1} fontSize={10} fontWeight="bold">{companyAddress.title1}</Typography>
                                    <Typography color="#000" my={1} fontSize={10}  >{companyAddress.title2}</Typography>
                                    <Typography color="#000" my={1} fontSize={10} fontWeight="bold">{companyAddress.title3}</Typography>
                                    <Box sx={{ height: 2, bgcolor: 'black', width: '100%' }} />
                                </Box>
                            </Box>

                            {/* <Box sx={{ height: 2, bgcolor: 'black', width: '100%', my: 1 }} /> */}

                            {/* Info Row */}
                            <Box display="flex" color="#000" justifyContent="space-between" mb={2}>
                                <Box>
                                    <Typography color="#000" fontSize={13}><b>{filleRs.To}</b></Typography>
                                </Box>

                            </Box>

                            <Box color="#000" ml={5} >
                                <Typography fontSize={11} color="#000">
                                    (Give here name or description of the establishment with full address)
                                </Typography>

                                <Typography fontSize={11} my={0.5} color="#000">
                                    (இங்கே நிறுவனத்தின் பெயர் அல்லது விளக்கத்தை முழு முகவரியுடன் கொடுங்கள்)
                                </Typography>

                                <Typography fontSize={11} mb={0.5} color="#000">
                                    (यहां प्रतिष्ठान का नाम या विवरण तथा पूरा पता दें)
                                </Typography>
                            </Box>

                            <Box color="#000" ml={5} >
                                <Typography fontSize={11} color="#000">
                                    Shri / Shrimati / Kumari. {employee.EmpName} Whose particulars are given in the statement below, hereby nominate the person(s) mentioned below
                                    to receive the gratuity payable after my death as also gratuity standing to my credit in the event of my death before that amount has become
                                    payable, or having become payable has not been paid and direct that the said amount of gratuity shall be paid in proportion indicated against the
                                    name(s) of the nominee(s).
                                </Typography>
                            </Box>

                            <Box color="#000" ml={5} mt={0.5} >
                                <Typography fontSize={11} color="#000">
                                    ஸ்ரீ / ஸ்ரீமதி / குமாரி. {employee.EmpName} கீழே உள்ள அறிக்கையில் யாருடைய விவரங்கள் கொடுக்கப்பட்டுள்ளனவோ,
                                    எனது மரணத்திற்குப் பிறகு செலுத்த வேண்டிய பணிக்கொடையைப் பெற கீழே குறிப்பிடப்பட்டுள்ள நபரை (நபர்களை)
                                    இதன் மூலம் பரிந்துரைக்கிறேன், மேலும் அந்தத் தொகை செலுத்தத்தக்கதாக மாறுவதற்கு முன்பு நான் இறந்தால், அல்லது
                                    செலுத்தத்தக்கதாக மாறியிருந்தால், அது செலுத்தப்படாமல் இருந்தால், எனது கணக்கில் வரவு வைக்கப்படும்
                                    பணிக்கொடையையும் பெறுகிறேன். மேலும், குறிப்பிட்ட பணிக்கொடைத் தொகை, வேட்பாளர்(கள்) பெயருக்கு
                                    எதிராகக் குறிப்பிடப்பட்டுள்ள விகிதத்தில் செலுத்தப்பட வேண்டும் என்று உத்தரவிடுகிறேன்.
                                </Typography>
                            </Box>
                            <Box color="#000" ml={5} mt={0.5} >
                                <Typography fontSize={11} color="#000">
                                    श्री / श्रीमती / कुमारी। {employee.EmpName}  जिनका विवरण नीचे दिए गए विवरण में दिया गया है, मैं नीचे उल्लिखित व्यक्ति (व्यक्तियों) को मेरी मृत्यु के बाद देय
                                    ग्रेच्युटी तथा मेरी मृत्यु की स्थिति में मेरे खाते में जमा ग्रेच्युटी, उस राशि के देय होने से पहले या देय होने के बाद भी भुगतान न किए जाने पर, प्राप्त करने के लिए नामित
                                    करता/करती हूँ और निर्देश देता/देती हूँ कि ग्रेच्युटी की उक्त राशि नामित व्यक्ति (व्यक्तियों) के नाम के सामने दर्शाए गए अनुपात में भुगतान की जाएगी।
                                </Typography>
                            </Box>

                            {/* Checklist Section */}
                            <Box color="#000" mt={2}>
                                {checklist.map((item, idx) => (
                                    <Box key={idx} mb={1} pt={1}>
                                        <Box display="flex" alignItems="flex-start">
                                            <Typography fontSize={10} ml={2} fontWeight="bold" sx={{ color: "#000", mt: 2, minWidth: 22 }}>{idx + 1}</Typography>
                                            <Box>
                                                {item.label.map((text, i) => (
                                                    <Typography mx={1} color="#000" key={i} fontSize={10}>{text}</Typography>
                                                ))}
                                            </Box>
                                        </Box>
                                        <Box sx={{ height: 1, bgcolor: '#222', width: '100%', my: 1 }} />
                                    </Box>
                                ))}
                            </Box>

                            <Box sx={{ color: "#000" }}>
                                <Box sx={{ fontWeight: "bold", textAlign: "center", p: 1, borderBottom: "1px solid #000", fontSize: 12, background: "#fafafa" }}>
                                    Nominees / பரிந்துரை / नामांकित
                                </Box>
                                <Table
                                    sx={{
                                        fontSize: 10,
                                        border: "1px solid #000",
                                        borderCollapse: "collapse",
                                        color: "#000",
                                        "& th, & td": { border: "1px solid #000 !important", padding: "4px 8px", textAlign: "center" },
                                        "& th": { fontWeight: "bold", background: "#f5f5f5" }
                                    }}
                                >
                                    <thead color="#000" >
                                        <tr>
                                            <th color="#000">Name with full address of nominee(s)
                                                பரிந்துரைக்கப்பட்டவரின் முழு முகவரியுடன் பெயர்
                                                नामांकित व्यक्ति(यों) का नाम एवं पूरा पता
                                            </th>
                                            <th>Relationship</th>
                                            <th>Age of Nominee</th>
                                            <th> Gratuity Proportion </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td></td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                        </tr>
                                    </tbody>

                                    <tbody>
                                        <tr >
                                            <td></td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                        </tr>
                                    </tbody>

                                    <tbody>
                                        <tr >
                                            <td></td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                        </tr>
                                    </tbody>

                                    <tbody>
                                        <tr >
                                            <td></td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                        </tr>
                                    </tbody>

                                </Table>
                            </Box>
                        </Box>

                        <br />
                        <br />

                        <Box sx={{ border: "2px solid #000", my: 2 }} />

                        {/* Statement Section */}
                        <Box textAlign="center" color="rgba(0, 0, 0, 1)" mb={1}>
                            <Typography color="#000" fontSize={12} fontWeight="bold">{companyAddress.title4}</Typography>
                        </Box>

                        <Box sx={{ border: "2px solid #000", mb: 2 }} />


                        <Box color="#000" sx={{ p: 2, pb: 0, fontSize: 9, }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 0 }}>
                                <tbody>
                                    {checklistStatement.map((item, idx) => (
                                        <tr key={item.key}>
                                            <td style={{ width: 30, textAlign: "center" }}>
                                                {idx + 1} )
                                            </td>
                                            <td style={{ paddingLeft: 8, verticalAlign: "top" }}>
                                                {item.labels.map((label, i) => (
                                                    <div key={i} style={{ fontWeight: i === 0 ? "bold" : "normal" }}>
                                                        {label}
                                                    </div>
                                                ))}
                                            </td>
                                            <td style={{ paddingLeft: 8, fontWeight: 500, verticalAlign: "top" }}>
                                                {employee[item.key] || "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>



                            <Box display="flex" justifyContent="space-between" mb={2} mt={3}>
                                <Box ml={2} color="#000" >
                                    <b>  Date : </b> {new Date().toLocaleDateString()}
                                </Box>

                                <Box mr={14} textAlign="right" color="#000" >
                                    <Typography color="#000" fontSize={10}><b>{employee.EmpName}  </b> </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb={2} mt={3}>
                                <Box ml={2} color="#000" >

                                    <span><b>  Place : </b> {
                                        employee.Addr
                                            ? employee.Addr.split(" - ")[0].split(",").pop().trim()
                                            : ""}
                                    </span>
                                </Box>

                                <Box mr={11} textAlign="right" color="#000" mt={5}>
                                    <Typography color="#000" fontSize={12}><b> Signature of the Employee </b> </Typography>
                                </Box>

                            </Box>
                        </Box>

                        {/* Declarations, certificates and acknowledgement sections */}

                        <Box color="#000" sx={{ borderTop: "1.5px solid #111", borderBottom: "1.5px solid #111", px: 2, py: 1, mt: 1 }}>
                            <Typography color="#000" fontWeight="bold" fontSize={12.5} textAlign="center" mb={1}>
                                DECLARATION BY WITNESS / சாட்சி எழுத்தாளர் பிரிவு / गवाह द्वारा घोषणा
                            </Typography>
                            <Typography color="#000" fontWeight={500} fontSize={12} mb={1}>
                                <b>
                                    Fresh nomination signed/thumb-impressed before me / புதிய வேட்புமனு எனக்கு முன்பாக கையொப்பமிடப்பட்டது/கட்டைவிரலைப் பிடித்தது. / मेरे
                                    सामने नए नामांकन पर हस्ताक्षर/अंगूठा छाप। </b>
                            </Typography>
                            <Box color="#000" sx={{ display: "flex", gap: 2, fontSize: 12, mb: 1 }}>
                                <Box sx={{ flex: 1 }}>
                                    <b>   Name in full and full address of: </b><br />
                                    1) ___________________________<br />
                                    2) ___________________________<br />
                                    3) ___________________________
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <b> Signature of Witness: </b><br />
                                    1) ___________________________<br />
                                    2) ___________________________<br />
                                    3) ___________________________
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", pt: 1, fontSize: 12 }}>
                                <span style={{ flex: 1 }}> <b>Date :</b> {new Date().toLocaleDateString()}</span>
                                <span style={{ flex: 1 }}> <b>Place : </b> {
                                    employee.Addr
                                        ? employee.Addr.split(" - ")[0].split(",").pop().trim()
                                        : ""}</span>
                            </Box>
                        </Box>

                        <Box color="#000" sx={{ borderBottom: "1.5px solid #111", px: 2, py: 1 }}>
                            <Typography color="#000" fontWeight="bold" fontSize={12.5} textAlign="center" mb={1}>
                                <b>CERTIFICATE BY THE EMPLOYER</b>
                            </Typography>
                            <Typography color="#000" fontSize={12} mb={1}>
                                <b>                                Certifying that the particulars of the above nomination have been verified and recorded in this establishment
                                </b>                            </Typography>
                            <Typography color="#000" fontSize={12} mb={1}>
                                <b>Employer's Reference No., if any:</b> ______________________________________
                            </Typography>
                            <Box sx={{ display: "flex", fontSize: 12, pt: 1 }}>
                                <span style={{ flex: 1 }}> <b>Date :</b> {new Date().toLocaleDateString()}</span>
                                <span style={{ flex: 1, textAlign: "right" }}> <b>Signature of the Employer / Officer Authorised</b> </span>
                            </Box>
                        </Box>

                        <Box color="#000" sx={{ px: 2, py: 1 }}>
                            <Typography color="#000" fontWeight="bold" fontSize={12.5} textAlign="center" mb={0.5}>
                                <b> ACKNOWLEDGEMENT BY THE EMPLOYEE<br />
                                    பணியாளரின் ஒப்புதல்<br />
                                    कर्मचारी की स्वीकृति</b>
                            </Typography>
                            <Typography color="#000" fontSize={12} mb={0.5}>
                                <b>  Received the duplicate copy of nomination in Form I filed by me and duly certified by the Employer<br />
                                    நான் டுப்ளிகேட் நகலை பெற்றேன்<br />
                                    मैंने नामांकन की डुप्लिकेट प्रति प्राप्त की है</b>
                            </Typography>


                            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: 12, pt: 5 ,mr:5}}>
                                <span> <b>Date :</b> {new Date().toLocaleDateString()}</span>
                                <span> <b>Signature of the Employee</b> </span>
                            </Box>
                        </Box>

                        <br />
                        <br />
                        <br />
                        <br />


                        {/* FORM 2 (Revised) / படிவம் 2 (திருத்தப்பட்டது) / फॉर्म 2 (संशोधित) */}
                        {/* PART A (E P F ) */}

                        <Box color="#000" sx={{ textAlign: "center", borderBottom: "2px solid #111", px: 2, pt: 1, pb: 0 }}>
                            <Box border={" 1.2px solid #000"} sx={{ my: 1 }} />

                            <Typography color="#000" fontWeight="bold" fontSize={13}>
                                FORM 2 (Revised) / படிவம் 2 (திருத்தப்பட்டது) / फॉर्म 2 (संशोधित)
                            </Typography>
                            <Box border="1.2px solid #111" sx={{ my: 1 }} />
                            <Typography color="#000" fontSize={10}>
                                Nomination and Declaration Form for Unexempted / Exempted Establishments
                            </Typography>
                            <Typography color="#000" fontSize={10}>
                                விலக்கு அளிக்கப்படாத / விலக்கு அளிக்கப்பட்ட நிறுவனங்களுக்கான நியமனம் மற்றும் அறிவிப்பு படிவம
                            </Typography >
                            <Typography color="#000" fontSize={10} > अछूते/छूटे प्रतिष्ठानों के लिए नामांकन और घोषणा पत्र
                            </Typography>
                        </Box>

                        <Box color="#000" sx={{ textAlign: "center", borderBottom: "2px solid #111", px: 2, pt: 1, pb: 0 }}>
                            <Typography color="#000" fontWeight="bold" fontSize={10}>

                                Declaration and Nomination Form under the Employees’ Provident Funds and Employees’ Pension Scheme
                            </Typography>
                            <Typography color="#000" fontWeight="bold" fontSize={10}>

                                ஊழியர் வருங்கால வைப்பு நிதி மற்றும் ஊழியர் ஓய்வூதியத் திட்டத்தின் கீழ் அறிவிப்பு மற்றும் நியமனப் படிவம்

                            </Typography >
                            <Typography color="#000" fontWeight="bold" fontSize={10}>
                                कर्मचारी भविष्य निधि और कर्मचारी पेंशन योजना के अंतर्गत घोषणा और नामांकन प्रपत्र
                            </Typography>
                        </Box>


                        {/* Instructions */}
                        <Box color="#000" sx={{ p: 2, pt: 1 }}>

                            <Typography color="#000" sx={{ fontWeight: "bold", mt: 1, fontSize: 9 }}>
                                Paragraph 33 and Paragraph 61(1) of the Employees’ Provident Fund Scheme, 1952 and Paragraph 18 of the Employees’ Pension Scheme, 1995.
                            </Typography>
                            <Typography color="#000" sx={{ fontWeight: "bold", mt: 1, fontSize: 9 }}>

                                (பணியாளர் வருங்கால வைப்பு நிதித் திட்டம், 1952 இன் பத்திகள் 33 & 61 (1) மற்றும் பணியாளர் ஓய்வூதியத் திட்டம், 1995 இன் பத்தி
                                18<br />
                                (कर्मचारी भविष्य निधि योजना, 1952 के पैराग्राफ 33 और 61 (1) और कर्मचारी पेंशन योजना, 1995 के पैराग्राफ 18
                            </Typography>
                        </Box>
                        {/* Employee Details Table */}
                        <Box color="#000" sx={{ px: 2, fontSize: 9 }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <tbody>
                                    {nominationFields.map((item, idx) => (
                                        <tr key={item.key}>
                                            <td style={{ width: 30, textAlign: "center" }}>
                                                {idx + 1} )
                                            </td>
                                            <td style={{ verticalAlign: "top", padding: "3px 0 3px 0", width: 400, fontWeight: 500 }}>
                                                {item.label.map((txt, i) => (
                                                    <div key={i} style={{ fontWeight: i === 0 ? 600 : 400 }}>{txt}</div>
                                                ))}
                                            </td>

                                            <td style={{ verticalAlign: "top", padding: "3px 0 3px 16px", fontWeight: 500 }}>
                                                {employee[item.key] || ""}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>

                                    </tr>
                                </tbody>

                            </table>
                        </Box>
                        {/* Divider */}
                        <Box sx={{ border: "1px solid #111", my: 1, mx: 2 }} />
                        {/* Nominee PART - A */}
                        <Box color="#000" sx={{ mx: 2, mb: 1 }}>
                            <Typography color="#000" fontWeight="bold" sx={{ mb: 1, fontSize: 10, textAlign: "center" }}>PART - A (EPF)</Typography>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }}>
                                I hereby nominate the person(s) below to receive the amounts standing to my credit in the Fund, in the event of my death.
                            </Typography>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }}>
                                நான் இறந்தால், என் நிதிப் பேரிலுள்ள தொகையை பெற பின்வரும் நபரை(களை) நியமிக்கிறேன்.<br />
                                मेरी मृत्यु की स्थिति में, मेरे निधि खाते में जमा राशि प्राप्त करने के लिए मैं निम्नलिखित व्यक्ति/व्यक्तियों को नामांकित करता/करती हूँ।
                            </Typography>
                        </Box>
                        {/* Nominee Table */}
                        <Box color="#000" sx={{ mx: 2, mb: 0.1 }}>
                            <table style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                fontSize: 10
                            }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: "1px solid #222", padding: 4 }}>Name of Nominee(s)<br />:நியமிக்கப்பட்டவரின் பெயர்<br />:नामांकित व्यक्ति का नाम</th>
                                        <th style={{ border: "1px solid #222", padding: 4 }}>Address<br />:முகவரி / पता</th>
                                        <th style={{ border: "1px solid #222", padding: 4 }}>Relationship<br />:உறவு / संबंध</th>
                                        <th style={{ border: "1px solid #222", padding: 4 }}>Date of Birth<br />:பிறந்த தேதி / जन्म तिथि</th>
                                        <th style={{ border: "1px solid #222", padding: 4 }}>Total amount of share of
                                            Accumulations in PF to be
                                            paid to each nominee <br />
                                            ஒவ்வொரு
                                            வேட்பாளருக்கும்
                                            செலுத்த வேண்டிய
                                            வருங்கால PFல்
                                            திரட்டப்பட்ட
                                            மொத்த பங்குத்
                                            தொகை <br />
                                            प्रत्येक नामित व्यक्ति को
                                            भुगतान की जाने वाली भविष्य
                                            निधि में संचय के हिस्से की
                                            कुल राशि
                                            <br />
                                        </th>

                                        <th style={{ border: "1px solid #222", padding: 4 }}>Guardian's Name (with
                                            Relationship and Address),
                                            for Minor Nominee <br />
                                            சிறுவயது
                                            நியமிக்கப்பட்டவர்
                                            பாதுகாவலரின்
                                            பெயர், உறவுமுறை,
                                            முகவரி <br />
                                            नाबालिग नामित व्यक्ति के
                                            लिए अभिभावक का नाम (रिश्ते
                                            और पते सहित)
                                            <br /></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {nominations.map((row, idx) => (
                                        <tr key={idx}>
                                            <td style={{ border: "1px solid #222", height: 130 }}>{row.name || ""}</td>
                                            <td style={{ border: "1px solid #222" }}>{row.address || ""}</td>
                                            <td style={{ border: "1px solid #222" }}>{row.relationship || ""}</td>
                                            <td style={{ border: "1px solid #222" }}>{row.dob || ""}</td>
                                            <td style={{ border: "1px solid #222" }}>{row.proportion || ""}</td>
                                            <td style={{ border: "1px solid #222" }}>{row.guardianName || ""}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Box>
                        {/* Footer & Undertaking */}
                        <Box color="#000" sx={{ p: 2 }}>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }}>* Certified that I have no family as defined in para 2(g) of the Employees’ Provident Fund Scheme, 1952 and should I acquire a Family hereafter,
                                the above nomination should be deemed as cancelled.</Typography>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }}>
                                * 1952 ஆம் ஆண்டு ஊழியர் வருங்கால வைப்பு நிதித் திட்டத்தின் பத்தி 2(g) இல் வரையறுக்கப்பட்டுள்ளபடி எனக்கு
                                குடும்பம் இல்லை என்றும், இனிமேல் நான் ஒரு குடும்பத்தைப் பெற்றால், மேற்கண்ட நியமனம் ரத்து செய்யப்பட்டதாகக்
                                கருதப்படும் என்றும் சான்றளிக்கப்படுகிறது. <br /> <br />
                                * प्रमाणित किया जाता है कि कर्मचारी भविष्य निधि योजना, 1952 के पैरा 2(जी) में परिभाषित अनुसार मेरा कोई परिवार नहीं है और यदि इसके बाद मेरा कोई परिवार हो
                                जाता है तो उपरोक्त नामांकन रद्द समझा जाए।
                            </Typography>
                        </Box>

                        <Box color="#000" sx={{ p: 2 }}>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }}>* Certified that my father/mother is/are dependent upon me.
                            </Typography>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }} >
                                * என் தந்தை/தாய் என்னைச் சார்ந்து இருக்கிறார்கள் என்று சான்றளிக்கப்பட்டது.  <br /> <br />
                                * प्रमाणित किया जाता है कि मेरे पिता/माता मुझ पर आश्रित हैं।
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb={2} mt={3}>
                            <Box fontSize={12} ml={2} color="#000" >
                            </Box>

                            <Box mr={11} textAlign="center" color="#000" mt={14}>
                                <Typography color="#000" fontSize={10}><b> Signature or thumb impression of the subscriber </b> <br />
                                    சந்தாதாரரின் கையொப்பம் அல்லது கட்டைவிரல் ரேகை
                                    <br />ग्राहक के हस्ताक्षर या अंगूठे का निशान


                                </Typography>
                            </Box>

                        </Box>




                        {/* FORM 2 (Revised) / படிவம் 2 (திருத்தப்பட்டது) / फॉर्म 2 (संशोधित) */}
                        {/* PART BBBBBBBBB  ( PART 18 ) */}


                        {/* Divider */}
                        <Box sx={{ border: "1px solid #111", my: 1, mx: 2 }} />
                        {/* Nominee PART - A */}
                        <Box color="#000" sx={{ mx: 2, mb: 1 }}>
                            <Typography color="#000" fontWeight="bold" sx={{ mb: 1, fontSize: 10, textAlign: "center" }}>PART - B (PARA 18 )</Typography>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }}>
                                I hereby furnish below particulars of the members of my family who would be eligible to receive widow/children pension in the event of my death.
                            </Typography>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }}>
                                நான் இறந்தால் விதவை/குழந்தைகள் ஓய்வூதியம் பெற தகுதியுடைய எனது குடும்ப உறுப்பினர்களின் விவரங்களை கீழே
                                தருகிறேன்.<br />
                                मैं अपने परिवार के उन सदस्यों का विवरण नीचे दे रहा हूँ जो मेरी मृत्यु की स्थिति में विधवा/बच्चों के लिए पेंशन पाने के पात्र होंगे।
                            </Typography>
                        </Box>
                        {/* Nominee Table */}
                        <Box color="#000" sx={{ mx: 2, mb: 2 }}>
                            <table style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                fontSize: 11
                            }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: "1px solid #222", padding: 0.1 }} > S No <br />  எண் <br /> संख्या</th>
                                        <th style={{ border: "1px solid #222", padding: 1 }}>Name of the Family Member <br />
                                            குடும்ப உறுப்பினரின் பெயர் <br />
                                            परिवार के सदस्य का नाम<br /> </th>
                                        <th style={{ border: "1px solid #222", padding: 4 }}>Address<br />/முகவரி / पता</th>
                                        <th style={{ border: "1px solid #222", padding: 4 }}>Date of Birth<br />/ பிறந்த தேதி / जन्म तिथि</th>
                                        <th style={{ border: "1px solid #222", padding: 4 }}>Relationship<br />/ உறவு / संबंध</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nominations.map((row, idx) => (
                                        <tr key={idx}>
                                            <td style={{ border: "1px solid #222", height: 250 }}>{row.name || ""}</td>
                                            <td style={{ border: "1px solid #222" }}>{row.address || ""}</td>
                                            <td style={{ border: "1px solid #222" }}>{row.relationship || ""}</td>
                                            <td style={{ border: "1px solid #222" }}>{row.dob || ""}</td>
                                            <td style={{ border: "1px solid #222" }}>{row.proportion || ""}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Box>
                        {/* Footer & Undertaking */}
                        <Box color="#000" sx={{ p: 2 }}>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }}>* Certified that I have no family as defined in para 2(g) of the Employees’ Provident Fund Scheme, 1952 and should I acquire a Family hereafter,
                                the above nomination should be deemed as cancelled.</Typography>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }}>
                                ** 1995 ஆம் ஆண்டு ஊழியர் ஓய்வூதியத் திட்டத்தின் பத்தி 2(vii) இல் வரையறுக்கப்பட்டுள்ளபடி, எனக்கு குடும்பம் இல்லை என்றும்,
                                நான் ஒரு குடும்பத்தைப் பெற்றால், இனிமேல் அது குறித்த விவரங்களை மேற்கண்ட படிவத்தில் வழங்குவேன் என்றும்
                                சான்றளிக்கப்பட்டத <br /> <br />
                                ** प्रमाणित किया जाता है कि कर्मचारी पेंशन योजना, 1995 के पैरा 2(vii) में परिभाषित अनुसार मेरा कोई परिवार नहीं है और यदि इसके बाद मेरा कोई परिवार बनता है, तो मैं
                                उपरोक्त प्रपत्र में उसका विवरण प्रस्तुत करूँगा।

                            </Typography>
                        </Box>

                        <Box color="#000" sx={{ p: 2 }}>
                            <Typography color="#000" sx={{ mb: 1, fontSize: 10 }}>I hereby nominate the following person for receiving the monthly widow pension (admissible under para 16 2(a)(i) and (ii) in the event of my death without
                                leaving any eligible family member for receiving Pension. <br /> <br />
                                நான் இறந்தால், ஓய்வூதியம் பெறுவதற்கு தகுதியான குடும்ப உறுப்பினர் எவரையும் விட்டு வைக்காமல், மாதாந்திர விதவை
                                ஓய்வூதியம் (பாரா 16 2(a)(i) மற்றும் (ii) இன் கீழ் அனுமதிக்கப்படும்) பெறுவதற்கு பின்வரும் நபரை இதன்மூலம் பரிந்துரைக்கிறேன்.  <br />  <br />
                                मैं एतद्द्वारा निम्नलिखित व्यक्ति को मासिक विधवा पेंशन (पैरा 16 2(ए)(i) और (ii) के तहत स्वीकार्य) प्राप्त करने के लिए नामित करता हूं, यदि मेरी मृत्यु हो जाती है और मेरे
                                परिवार में पेंशन प्राप्त करने के लिए कोई पात्र सदस्य नहीं रहता है।

                            </Typography>

                        </Box>
                        <Box display="flex" justifyContent="space-between" mb={2} mt={3}>
                            <Box fontSize={12} ml={2} color="#000" >

                                <span><b>  Date : </b> {new Date().toLocaleDateString()}
                                </span>
                            </Box>

                            <Box mr={11} textAlign="right" color="#000" mt={8}>
                                <Typography color="#000" fontSize={12}><b> ग्राहक के हस्ताक्षर या अंगूठे का निशान <br />
                                    சந்தாதாரரின் கையொப்பம் அல்லது கட்டைவிரல் ரேகை <br />
                                    Signature or thumb impression of the subscriber </b> </Typography>
                            </Box>

                        </Box>

                        {/*  certificates by employer */}



                        <Box textAlign="center" color="rgba(0, 0, 0, 1)" mb={1} sx={{ borderTop: "1.5px solid #111", borderBottom: "1.5px solid #111", px: 2, py: 1, mt: 25 }}>
                            <Typography color="#000" fontSize={12} fontWeight="bold">{companyAddress.title6}</Typography>
                        </Box>

                        <Box color="#000" sx={{ borderBottom: "1.5px solid #111", px: 2, py: 1, mt: 1 }}>

                            <Typography color="#000" fontWeight={500} fontSize={12} mb={1}>

                                Certified that the above declaration and nomination has been signed/thumb impressed before me by Shri/Smt./Kum. RAMYA NATARAJ employed in my
                                establishment after he/she has read the entries/entries have been read over to him / her by me and got confirmed by him / her.

                            </Typography>

                            <Typography color="#000" fontWeight={500} fontSize={12} mb={1}>

                                மேற்கண்ட அறிவிப்பு மற்றும் நியமனம் எனது நிறுவனத்தில் பணிபுரியும் ஸ்ரீ/திருமதி/கும் அவர்களால்
                                கையொப்பமிடப்பட்டுள்ளது/கட்டைவிரல் பதிக்கப்பட்டுள்ளது என்று சான்றளிக்கப்பட்டது. RAMYA NATARAJ அவர்/அவள்
                                உள்ளீடுகள்/உள்ளீடுகளைப் படித்த பிறகு, நான் அவருக்கு/அவளுக்கு வாசித்து, அவர்/அவளால் உறுதிப்படுத்தப்பட்ட பிறகு.

                            </Typography>

                            <Typography color="#000" fontWeight={500} fontSize={12} mb={1}>

                                प्रमाणित किया जाता है कि उपरोक्त घोषणा और नामांकन मेरे समक्ष श्री/श्रीमती/कुमारी द्वारा हस्ताक्षरित/अंगूठा चिह्नित किया गया है।RAMYA NATARAJ मेरे प्रतिष्ठान
                                में कार्यरत श्री/श्रीमती/कुमारी द्वारा मेरे समक्ष हस्ताक्षरित/अंगूठा चिह्नित किया गया है। मेरे द्वारा प्रविष्टियाँ/प्रविष्टियाँ उन्हें पढ़कर सुना दी गई हैं और उनके द्वारा
                                पुष्टि कर दी गई है।

                            </Typography>


                            <Box display="flex" justifyContent="space-between" mb={2} mt={3}>
                                <Box fontSize={12} ml={2} color="#000" >
                                    <b>  Date : </b> {new Date().toLocaleDateString()}
                                </Box>

                                <Box mr={14} textAlign="right" color="#000" >

                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb={2} mt={3}>
                                <Box fontSize={12} ml={2} color="#000" >

                                    <span><b>  Place : </b> {
                                        employee.Addr
                                            ? employee.Addr.split(" - ")[0].split(",").pop().trim()
                                            : ""}
                                    </span>
                                </Box>

                                <Box mr={11} textAlign="right" color="#000" mt={5}>
                                    <Typography color="#000" fontSize={12}><b> Signature of the Employer / Officer Authorised </b> </Typography>
                                </Box>

                            </Box>
                        </Box>


                    </Box>

                </Box>
            </Box>
        </CssVarsProvider>

    );
}

