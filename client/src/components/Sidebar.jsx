// import ExpandableDock from "@/components/ui/expandable-dock";
// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import GlobalStyles from '@mui/joy/GlobalStyles';
// import Avatar from '@mui/joy/Avatar';
// import Box from '@mui/joy/Box';
// import IconButton from '@mui/joy/IconButton';
// import Input from '@mui/joy/Input';
// import List from '@mui/joy/List';
// import ListItem from '@mui/joy/ListItem';
// import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
// import ListItemContent from '@mui/joy/ListItemContent';
// import Typography from '@mui/joy/Typography';
// import Sheet from '@mui/joy/Sheet';
// import Chip from '@mui/joy/Chip';
// import Divider from '@mui/joy/Divider';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import axios from 'axios';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// import { AuthContext } from "../AuthContext";

// import ColorSchemeToggle from "./ColorSchemaToggle";
// const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// function Toggler({ defaultExpanded = false, renderToggle, children }) {
//   const [open, setOpen] = React.useState(defaultExpanded);
//   return (
//     <>
//       {renderToggle({ open, setOpen })}
//       <Box
//         sx={[
//           {
//             display: 'grid',
//             transition: '0.2s ease',
//             '& > *': { overflow: 'hidden' },
//           },
//           open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
//         ]}
//       >
//         {children}
//       </Box>
//     </>
//   );
// }

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, onLogout } = useContext(AuthContext);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [approvalData, setApprovalData] = useState({ codes: [], counts: [], totalCount: 0 });

//   useEffect(() => {
//     const storedName = localStorage.getItem('name');
//     const storedEmail = localStorage.getItem('email');
//     setName(storedName || 'Guest');
//     setEmail(storedEmail || 'No email');
//   }, []);

//   useEffect(() => {
//     axios.get(`${apiUrl}/approvalCount`)
//       .then(({ data }) => {
//         setApprovalData({
//           codes: data.codes,
//           counts: data.count,
//           totalCount: data.totalCount,
//         });
//       })
//       .catch(console.error);
//   }, []);

//   const otherItems = [
//     { label: "Sales Order Report", path: "/salesorderreport" },
//     { label: "SKPL Personnel File", path: "/SKPL-Personnel-File" },
//     { label: "Production Status", path: "/productionStatus" },
//     // { label: "Sourcing", path: "/sourcing" },
//     // { label: "Fabric Store", path: "/FabricDash" },
//     // { label: "Cuttings", path: "/CuttingDashboard" },
//     // { label: "VAP (printings)", path: "/vaprinting" },
//     // { label: "Risk Summary", path: "/risksummary" }
//   ];

//   const filteredOtherItems = otherItems.filter(item =>
//     item.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const isActive = (path) => location.pathname === path;

//   const handleNavigation = (path) => {
//     navigate(path);
//     setSidebarOpen(false); // Close sidebar after navigation
//   };

//   const handleLogout = () => {
//     if (onLogout) onLogout();
//     navigate('/login');
//   };

//   const approvalMap = approvalData.codes.reduce((acc, code, i) => {
//     acc[code] = approvalData.counts[i];
//     return acc;
//   }, {});

//   return (
//     <>
//       {/* Toggle Button - Always visible on left side */}
//       {!sidebarOpen && (
//         <IconButton
//           onClick={() => setSidebarOpen(true)}
//           sx={{
//             alignItems: 'stretch',
//             position: 'fixed',
//             left: 0,
//             top: '50%',
//             transform: 'translateY(-50%)',
//             zIndex: 10001,
//             bgcolor: '#19139b98',
//             color: '#ffffffff',
//             borderRadius: '0 8px 8px 0',
//             width: 39,
//             height: 200,
//             borderTopRightRadius: 8,
//             borderBottomRightRadius: 8,
//             display: 'flex',
//             justifyContent: 'center',
//             cursor: 'pointer',
//             '&:hover': {
//               bgcolor: '#b0ade9e3',
//               color:'#000'
//             }
//           }}
//         >
//           <Typography
//             sx={{
//               writingMode: 'vertical-rl',
//               transform: 'rotate(180deg)',
//               fontSize:15,
//               color: '#ffffffff',
//               mt: 1, ml: 1, mr: -1,
//               userSelect: 'none',
//               whiteSpace: 'nowrap',
//               '&:hover': {
//               bgcolor: '#b0ade9e3',
//               color:'#000'
//             }
//             }}>
//             Click to open sidebar
//           </Typography>
//           <KeyboardArrowRightIcon sx={{ fontSize: 30, color: "#000000ff", mt: 'auto', mb: 'auto','&:hover': {
//               color:'#ffffffff'
//             } }} />
//         </IconButton>
//       )}

//       {/* Overlay - Click outside to close */}
//       {sidebarOpen && (
//         <Box
//           onClick={() => setSidebarOpen(false)}
//           sx={{
//             position: 'fixed',
//             inset: 0,
//             bgcolor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 9999,
//           }}
//         />
//       )}

//       {/* Sidebar */}
//       <Sheet
//         className="Sidebar"
//         sx={{
//           position: 'fixed',
//           left: 0,
//           top: 0,
//           height: '100vh',
//           width: '240px',
//           zIndex: 10000,
//           p: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//           borderRight: '1px solid',
//           borderColor: 'divider',
//           transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
//           transition: 'transform 0.3s ease',
//         }}
//       >
//         {/* Close button */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//             <Avatar
//               variant="outlined"
//               size="sm"
//               src="https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fHww"
//             />
//             <Typography level="title-lg">{name || 'admin'}</Typography>
//           </Box>
//           <ColorSchemeToggle sx={{ ml: 'auto' }} />
//           <IconButton onClick={() => setSidebarOpen(false)}>
//             <CloseRoundedIcon />
//           </IconButton>
//         </Box>

//         <Input
//           size="sm"
//           startDecorator={<SearchRoundedIcon />}
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onFocus={() => setIsSearchActive(true)}
//           onBlur={() => setTimeout(() => setIsSearchActive(false), 150)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' && filteredOtherItems.length > 0) {
//               e.preventDefault();
//               handleNavigation(filteredOtherItems[0].path);
//               setIsSearchActive(false);
//             }
//           }}
//         />

//         {/* Search Results */}
//         {isSearchActive && searchTerm.length > 0 && filteredOtherItems.length > 0 && (
//           <>
//             <Typography level="body-xs" sx={{ px: 1, color: "#666" }}>
//               Search Results:
//             </Typography>
//             {filteredOtherItems.map(({ label, path }) => (
//               <ListItem key={label}>
//                 <ListItemButton onClick={() => handleNavigation(path)}>
//                   <Typography level="title-sm" color='success'>{label}</Typography>
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </>
//         )}

//         {/* Navigation List */}
//         <Box sx={{ minHeight: 0, overflow: 'hidden auto', flexGrow: 1 }}>
//           <List size="sm" sx={{ gap: 1 }}>
//             <ListItem>
//               <ListItemButton
//                 selected={isActive('/') || isActive('/home')}
//                 onClick={() => handleNavigation('/')}
//               >
//                 <HomeRoundedIcon />
//                 <ListItemContent>
//                   <Typography level="title-sm">Home</Typography>
//                 </ListItemContent>
//               </ListItemButton>
//             </ListItem>

//             {/* Approvals Nested */}
//             <ListItem nested>
//               <Toggler
//                 renderToggle={({ open, setOpen }) => (
//                   <ListItemButton onClick={() => setOpen(!open)}>
//                     <NotificationsRoundedIcon />
//                     <ListItemContent>
//                       <Typography level="title-sm">Approvals</Typography>
//                     </ListItemContent>
//                     <Chip size="sm" color="danger" variant="solid">
//                       {approvalData.totalCount}
//                     </Chip>
//                     <KeyboardArrowDownIcon
//                       sx={[open ? { transform: 'rotate(180deg)' } : { transform: 'none' }]}
//                     />
//                   </ListItemButton>
//                 )}
//               >
//                 <List sx={{ gap: 0.5 }}>
//                   <ListItem>
//                     <ListItemButton onClick={() => handleNavigation('/servinvoice')}>
//                       Serv Invoice
//                     </ListItemButton>
//                     <Chip size="sm" color="success" variant="solid">
//                       {approvalMap['SERVINVOICE'] || 0}
//                     </Chip>
//                   </ListItem>

//                   <ListItem>
//                     <ListItemButton onClick={() => handleNavigation('/vendorbill')}>
//                       Vendor Bill
//                     </ListItemButton>
//                     <Chip size="sm" color="success" variant="solid">
//                       {approvalMap['VENDORBILL'] || 0}
//                     </Chip>
//                   </ListItem>

//                   <ListItem>
//                     <ListItemButton onClick={() => handleNavigation('/stkrecpnote')}>
//                       STL Recp Note
//                     </ListItemButton>
//                     <Chip size="sm" color="success" variant="solid">
//                       {approvalMap['STKRECPNOTE'] || 0}
//                     </Chip>
//                   </ListItem>

//                   <ListItem>
//                     <ListItemButton onClick={() => handleNavigation('/stylejobwork')}>
//                       Style Job Work
//                     </ListItemButton>
//                     <Chip size="sm" color="success" variant="solid">
//                       {approvalMap['STYLEJOBWORK'] || 0}
//                     </Chip>
//                   </ListItem>

//                   <ListItem>
//                     <ListItemButton onClick={() => handleNavigation('/ProcureOrder')}>
//                       Procure Order
//                     </ListItemButton>
//                     <Chip size="sm" color="success" variant="solid">
//                       {approvalMap['PROCUREORDER'] || 0}
//                     </Chip>
//                   </ListItem>

//                   <ListItem>
//                     <ListItemButton onClick={() => handleNavigation('/stkRequestNote')}>
//                       STK Request Note
//                     </ListItemButton>
//                     <Chip size="sm" color="success" variant="solid">
//                       {approvalMap['STKREQUESTNOTE'] || 0}
//                     </Chip>
//                   </ListItem>
//                 </List>
//               </Toggler>
//             </ListItem>
//           </List>
//         </Box>

//         <Divider />

//         {/* User Info */}
//         <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//           <Box sx={{ minWidth: 0, flex: 1 }}>
//             <Typography level="title-sm">{name || 'Admin'}</Typography>
//             <Typography level="body-xs">{email || "Email not set"}</Typography>
//           </Box>
//           <IconButton onClick={handleLogout} title="Logout">
//             <LogoutRoundedIcon />
//           </IconButton>
//         </Box>
//       </Sheet>
//     </>
//   );
// }







// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Search, Package, Zap, Settings, ChevronDown, Sparkles } from "lucide-react";
// import axios from "axios";
// import { AuthContext } from "../AuthContext";
// import ColorSchemeToggle from "./ColorSchemaToggle";
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// function ExpandableDock({ headerContent, children }) {
//   const [open, setOpen] = useState(false);

//   // close on ESC
//   useEffect(() => {
//     function onKey(e) {
//       if (e.key === "Escape") setOpen(false);
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   return (
//     <>
//       {/* Trigger button (kept visible, replace or restyle as you like) */}
//       {/* <div
//         style={{
//           position: "fixed",
//           left: 16,
//           top: 16,
//           zIndex: 14000,
//         }}
//       >
//         <button
//           onClick={() => setOpen(true)}
//           aria-expanded={open}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             padding: "8px 12px",
//             borderRadius: 10,
//             background: "#0f172a",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//             boxShadow: "0 6px 18px rgba(2,6,23,0.3)",
//           }}
//         >
//           <Search size={16} />
//           Open Dock
//         </button>
//       </div> */}

//             <div
//         style={{
//           position: "fixed",
//           inset: "auto 0 16px 0",
//           display: "flex",
//           justifyContent: "center",
//           pointerEvents: "none",
//           zIndex: 12000,
//         }}
//       >
//         <button
//           onClick={() => setOpen(!open)}
//           aria-expanded={open}
//           style={{
//             width:"min(90vw, 360px)",
//             height: 48,
//             pointerEvents: "auto",
//             background: "#0f172abe",
//             color: "#fff",
//             padding: "10px 16px",
//             borderRadius: 9999,
//             boxShadow: "0 6px 20px rgba(2,6,23,0.4)",
//             border: "1px solid rgba(255,255,255,0.06)",
//             display: "flex",
//             gap: 8,
//             alignItems: "center",
//             cursor: "pointer",
//           }}
//         >
//           <Search size={25} />
//           <span style={{ fontSize: 13, fontWeight: 600,alignContent:"center"
//             ,justifyContent:"center"
//            }}>Open Dock</span>
//         </button>
//       </div>

//       {/* Backdrop */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.45)",
//             zIndex: 13990,
//           }}
//         />
//       )}

//       {/* Panel - centered */}
//       <div
//         aria-hidden={!open}
//         style={{
//           position: "fixed",
//           zIndex: 14000,
//           left: "50%",
//           top: "50%",
//           transform: open ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.98)",
//           width: "min(1100px, calc(100% - 48px))",
//           height: open ? "72vh" : 0,
//           transition: "all 220ms ease",
//           pointerEvents: open ? "auto" : "none",
//           overflow: "hidden",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <div
//           role="dialog"
//           aria-modal="true"
//           style={{
//             width: "100%",
//             height: "100%",
//             background: "var(--dock-bg, #fff)",
//             borderRadius: 12,
//             boxShadow: "0 20px 50px rgba(2,6,23,0.35)",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 12,
//               padding: 12,
//               borderBottom: "1px solid rgba(0,0,0,0.06)",
//             }}
//           >
//             <div style={{ display: "flex", gap: 12, alignItems: "center", flex: 1 }}>{headerContent}</div>
//             <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//               <ColorSchemeToggle />
//               <button
//                 onClick={() => setOpen(false)}
//                 style={{
//                   background: "transparent",color:"#000",
//                   border: "none",
//                   cursor: "pointer",
//                   padding: "6px 10px",
//                   fontWeight: 600,
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>

//           <div style={{ padding: 12, overflow: "auto", flex: 1 }}>{children}</div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, onLogout } = useContext(AuthContext);

//   // states from previous sidebar
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [query, setQuery] = useState("");
//   const [expandedSections, setExpandedSections] = useState(new Set(["COMPONENTS"]));
//   const [approvalData, setApprovalData] = useState({ codes: [], counts: [], totalCount: 0 });

//   useEffect(() => {
//     const storedName = localStorage.getItem("name");
//     const storedEmail = localStorage.getItem("email");
//     setName(storedName || "Guest");
//     setEmail(storedEmail || "No email");
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/approvalCount`)
//       .then(({ data }) => {
//         setApprovalData({
//           codes: data.codes,
//           counts: data.count,
//           totalCount: data.totalCount,
//         });
//       })
//       .catch(() => {
//         // silently ignore — dock still works without counts
//       });
//   }, []);

//   // same extra items as in the previous sidebar
//   const otherItems = [
//     { title: "Sales Order Report", href: "/salesorderreport" },
//     { title: "SKPL Personnel File", href: "/SKPL-Personnel-File" },
//     { title: "Production Status", href: "/productionStatus" },
//     // (add extra items here if needed)
//   ];

//   // approvals mapping to navigate
//   const approvals = [
//     { title: "Serv Invoice", href: "/servinvoice", code: "SERVINVOICE" },
//     { title: "Vendor Bill", href: "/vendorbill", code: "VENDORBILL" },
//     { title: "STL Recp Note", href: "/stkrecpnote", code: "STKRECPNOTE" },
//     { title: "Style Job Work", href: "/stylejobwork", code: "STYLEJOBWORK" },
//     { title: "Procure Order", href: "/ProcureOrder", code: "PROCUREORDER" },
//     { title: "STK Request Note", href: "/stkRequestNote", code: "STKREQUESTNOTE" },
//   ];

//   const approvalMap = approvalData.codes.reduce((acc, code, i) => {
//     acc[code] = approvalData.counts?.[i] || 0;
//     return acc;
//   }, {});

//   const navigation = [
//     { title: "Home", href: "/" },
//     ...otherItems.map((i) => ({ title: i.title, href: i.href })),
//     ...approvals.map((a) => ({ title: a.title, href: a.href })),
//   ];

//   const groupedNavigation = [
//     {
//       title: "GETTING STARTED",
//       icon: Zap,
//       children: navigation.filter((item) => item.title === "Home"),
//     },
//     {
//       title: "Sales & Production",
//       icon: Settings,
//       children: navigation.filter((item) => ["Sales Order Report", "Production Status"].includes(item.title)),
//     },
//     {
//       title: "Approvals",
//       icon: Package,
//       children: navigation.filter(
//         (item) => !["Home", "Sales Order Report", "Production Status"].includes(item.title)
//       ),
//     },
//   ];

//   const filteredItems = groupedNavigation
//     .map((section) => ({
//       ...section,
//       children: section.children.filter(
//         (child) =>
//           query === "" ||
//           child.title.toLowerCase().includes(query.toLowerCase()) ||
//           section.title.toLowerCase().includes(query.toLowerCase())
//       ),
//     }))
//     .filter((section) => section.children.length > 0 || section.title.toLowerCase().includes(query.toLowerCase()));

//   const toggleSection = (title) => {
//     const newExpanded = new Set(expandedSections);
//     if (newExpanded.has(title)) newExpanded.delete(title);
//     else newExpanded.add(title);
//     setExpandedSections(newExpanded);
//   };

//   const totalResults = filteredItems.reduce((acc, s) => acc + s.children.length, 0);

//   function handleNavigate(href) {
//     navigate(href);
//   }

//   return (
//     <>
//       <ExpandableDock
//         headerContent={
//           <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
//             <Search size={16} color="#000"/>
//             <div style={{ fontWeight: 700,color:"#000" }}>Search App</div>
//             <div
//               style={{
//                 marginLeft: "auto",
//                 fontSize: 12,
//                 background: "rgba(0,0,0,0.04)",color:"#000",
//                 padding: "6px 10px",
//                 borderRadius: 8,
//                 fontWeight: 600,
//               }}
//             >
//               {totalResults} results
//             </div>
//           </div>
//         }
//       >
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           <div
//             style={{
//               display: "flex",
//               gap: 8,
//               alignItems: "center",
//               padding: 10,
//               borderRadius: 8,
//               background: "rgba(0,0,0,0.03)",
//             }}
//           >
//             <Search size={16} color="#000" />
//             <input
//               type="text"
//               placeholder="Search components, pages, approvals..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               style={{ flex: 1, border: "none", outline: "none", background: "transparent" }}
//             />
//             {query && (
//               <button onClick={() => setQuery("")} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
//                 Clear
//               </button>
//             )}
//           </div>

//           <div style={{ overflow: "auto", maxHeight: "56vh", paddingRight: 8 }}>
//             {filteredItems.length > 0 ? (
//               filteredItems.map((section, idx) => (
//                 <div key={idx} style={{ marginBottom: 12 }}>
//                   <button
//                     onClick={() => toggleSection(section.title)}
//                     style={{
//                       width: "100%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       padding: "10px",color:"#000",
//                       borderRadius: 8,
//                       background: "transparent",
//                       border: "1px solid rgba(0,0,0,0.04)",
//                       cursor: "pointer",
//                       textTransform: "uppercase",
//                       fontWeight: 700,
//                       fontSize: 12,
//                     }}
//                   >
//                     <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//                       <section.icon size={14} />
//                       <span>{section.title}</span>
//                       <span style={{ color: "rgba(0,0,0,0.5)" }}>({section.children.length})</span>
//                     </div>
//                     <ChevronDown
//                       size={16}
//                       style={{
//                         transform: expandedSections.has(section.title) ? "rotate(180deg)" : "none",
//                         transition: "transform 180ms",
//                       }}
//                     />
//                   </button>

//                   {expandedSections.has(section.title) && (
//                     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8, marginTop: 8 }}>
//                       {section.children.map((child, cIdx) => {
//                         // show approval counts in approvals children
//                         const approvalEntry = approvals.find((a) => a.title === child.title);
//                         const count = approvalEntry ? approvalMap[approvalEntry.code] || 0 : null;

//                         return (
//                           <button
//                             key={cIdx}
//                             onClick={() => handleNavigate(child.href)}
//                             style={{
//                               textAlign: "left",
//                               padding: 12,
//                               borderRadius: 8,
//                               background: "transparent",
//                               border: "1px solid rgba(0,0,0,0.04)",
//                               cursor: "pointer",
//                             }}
//                           >
//                             <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
//                               <span>{child.title}</span>
//                               {count !== null && (
//                                 <span style={{ fontSize: 11, background: "#ef4444", color: "#fff", padding: "2px 8px", borderRadius: 999 }}>
//                                   {count}
//                                 </span>
//                               )}
//                               {child.category === "new" && (
//                                 <span style={{ fontSize: 11, background: "#10b981", color: "#fff", padding: "2px 8px", borderRadius: 999, display: "inline-flex", gap: 6, alignItems: "center" }}>
//                                   <Sparkles size={12} /> NEW
//                                 </span>
//                               )}
//                             </div>
//                             {/* <div style={{ fontSize: 12, color: "rgba(0,0,0,0.6)", marginTop: 6 }}>Ready to use</div> */}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div style={{ textAlign: "center", padding: "48px 8px" }}>
//                 <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No results found</div>
//                 <div style={{ color: "rgba(0,0,0,0.6)" }}>
//                   Try adjusting your search terms or{" "}
//                   <button onClick={() => setQuery("")} style={{ background: "transparent", border: "none", color: "#2563eb", cursor: "pointer" }}>
//                     clear the search
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
//             <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//               <div style={{ minWidth: 0 }}>
//                 <div style={{ fontWeight: 700 }}>{name || "Admin"}</div>
//                 <div style={{ fontSize: 12, color: "rgba(0,0,0,0.6)" }}>{email || "Email not set"}</div>
//               </div>
//             </div>

//             <div style={{ display: "flex", gap: 8 }}>
//               <button
//                 onClick={() => {
//                   if (onLogout) onLogout();
//                   navigate("/login");
//                 }}
//                 style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </ExpandableDock>
//     </>
//   );
// }


import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Package, Zap, Settings, ChevronDown, Sparkles, Home } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import ColorSchemeToggle from "./ColorSchemaToggle";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function ExpandableDock({ headerContent, children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Centered Trigger Button */}
      <div
        style={{
          position: "fixed",
          inset: "auto 0 20px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
          zIndex: 12000,
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="dock-trigger"
          style={{
            width: "min(90vw, 420px)",
            height: 56,
            pointerEvents: "auto",
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)";
          }}
        >
          <Search size={20} strokeWidth={2.5} />
          <span>Search & Navigate</span>
          <kbd
            style={{
              marginLeft: "auto",
              padding: "4px 8px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: 6,
              fontSize: 12,
              fontFamily: "monospace",
            }}
          >
            click here
          </kbd>
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            // background: "rgba(0, 0, 0, 0.6)",
            background: "rgba(0,0,0,0.45)",
            // backdropFilter: "blur(4px)",
            // WebkitBackdropFilter: "blur(4px)",
            zIndex: 13990,
            animation: "fadeIn 0.2s ease",
          }}
        />
      )}

      {/* Main Panel */}
      {/* <div
        aria-hidden={!open}
        style={{
          position: "fixed",
          zIndex: 14000,
          left: "50%",
          top: "50%",
          transform: open ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.96)",
          opacity: open ? 1 : 0,
          width: "min(1200px, calc(100% - 32px))",
          maxHeight: "min(80vh, 900px)",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: open ? "auto" : "none",
          overflow: "hidden",
        }}
      > */}
      <div
        aria-hidden={!open}
        style={{
          position: "fixed",
          zIndex: 14000,
          left: "50%",
          top: "50%",
          transform: open ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.98)",
          opacity: open ? 1 : 0,
          width: "min(1100px, calc(100% - 48px))",
          height: open ? "72vh" : 0,
          transition: "all 220ms ease",
          pointerEvents: open ? "auto" : "none",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          className="dock-panel"
          style={{
            width: "100%",
            height: "100%",
            background: "var(--joy-palette-background-surface, #ffffff)",
            borderRadius: 20,
            boxShadow: "0 24px 64px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 20px",
              borderBottom: "1px solid var(--joy-palette-divider, rgba(0, 0, 0, 0.08))",
              background: "var(--joy-palette-background-level1, rgba(0, 0, 0, 0.02))",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center", flex: 1 }}>
              {headerContent}
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <ColorSchemeToggle />
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "var(--joy-palette-background-level2, rgba(0, 0, 0, 0.04))",
                  color: "var(--joy-palette-text-primary, #000)",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 16px",
                  fontWeight: 600,
                  borderRadius: 8,
                  fontSize: 14,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--joy-palette-background-level3, rgba(0, 0, 0, 0.08))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--joy-palette-background-level2, rgba(0, 0, 0, 0.04))";
                }}
              >
                Close
              </button>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "20px", overflow: "auto", flex: 1 }}>
            {children}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .dock-trigger {
            width: calc(100vw - 32px) !important;
            height: 52px !important;
            font-size: 14px !important;
          }
        }

        /* Dark mode styles */
        [data-joy-color-scheme="dark"] .dock-panel {
          background: #0f172a !important;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
        }

        [data-joy-color-scheme="dark"] .dock-trigger {
          background: rgba(15, 23, 42, 0.95) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15) !important;
        }
      `}</style>
    </>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, onLogout } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState(new Set(["Approvals"]));
  const [approvalData, setApprovalData] = useState({ codes: [], counts: [], totalCount: 0 });

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    setName(storedName || "Guest");
    setEmail(storedEmail || "No email");
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/approvalCount`)
      .then(({ data }) => {
        setApprovalData({
          codes: data.codes,
          counts: data.count,
          totalCount: data.totalCount,
        });
      })
      .catch(() => {
        // silently ignoreeeee
      });
  }, []);

  const otherItems = [
    { title: "Sales Order Report", href: "/salesorderreport" },
    { title: "SKPL Personnel File", href: "/SKPL-Personnel-File" },
    { title: "Production Status", href: "/productionStatus" },
  ];

  const approvals = [
    { title: "Serv Invoice", href: "/servinvoice", code: "SERVINVOICE" },
    { title: "Vendor Bill", href: "/vendorbill", code: "VENDORBILL" },
    { title: "STL Recp Note", href: "/stkrecpnote", code: "STKRECPNOTE" },
    { title: "Style Job Work", href: "/stylejobwork", code: "STYLEJOBWORK" },
    { title: "Procure Order", href: "/ProcureOrder", code: "PROCUREORDER" },
    { title: "STK Request Note", href: "/stkRequestNote", code: "STKREQUESTNOTE" },
  ];

  const approvalMap = approvalData.codes.reduce((acc, code, i) => {
    acc[code] = approvalData.counts?.[i] || 0;
    return acc;
  }, {});

  const homeItem = { title: "Home", href: "/" };

  const groupedNavigation = [
    {
      title: "Approvals",
      icon: Package,
      children: approvals.map((a) => ({ title: a.title, href: a.href })),
    },
    {
      title: "Sales & Production",
      icon: Settings,
      children: otherItems,
    },
  ];

  const filteredSections = groupedNavigation
    .map((section) => ({
      ...section,
      children: section.children.filter(
        (child) =>
          query === "" ||
          child.title.toLowerCase().includes(query.toLowerCase()) ||
          section.title.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((section) => section.children.length > 0 || section.title.toLowerCase().includes(query.toLowerCase()));

  const showHome = query === "" || "home".includes(query.toLowerCase());
  const totalResults = filteredSections.reduce((acc, s) => acc + s.children.length, 0) + (showHome ? 1 : 0);

  const toggleSection = (title) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) newExpanded.delete(title);
    else newExpanded.add(title);
    setExpandedSections(newExpanded);
  };

  function handleNavigate(href) {
    navigate(href);
  }

  return (
    <>
      <ExpandableDock
        headerContent={
          <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
            {/* <TextSpotlight
              textClassName="text-xl md:text-3xl font-semibold"
              text="Hover over me and wa oss the text."
              spotlightColor="255, 255, 255"
              animateOnPhone={true}
              spotlightArea={90}
              spotlightSize={100}
            /> */}

            <Search size={18} color="var(--joy-palette-text-primary, #000)" strokeWidth={2.5} />
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--joy-palette-text-primary, #000)" }}>
              Search & Navigate
            </div>
            <div
              style={{
                marginLeft: "auto",
                fontSize: 13,
                background: "var(--joy-palette-primary-softBg, rgba(37, 99, 235, 0.12))",
                color: "var(--joy-palette-primary-main, #2563eb)",
                padding: "6px 12px",
                borderRadius: 8,
                fontWeight: 700,
              }}
            >
              {totalResults} {totalResults === 1 ? "result" : "results"}
            </div>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Search Input */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              padding: "14px 16px",
              borderRadius: 12,
              background: "var(--joy-palette-background-level1, rgba(0, 0, 0, 0.03))",
              border: "2px solid var(--joy-palette-divider, rgba(0, 0, 0, 0.08))",
              transition: "all 0.2s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--joy-palette-primary-main, #2563eb)";
              e.currentTarget.style.background = "var(--joy-palette-background-surface, #fff)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--joy-palette-divider, rgba(0, 0, 0, 0.08))";
              e.currentTarget.style.background = "var(--joy-palette-background-level1, rgba(0, 0, 0, 0.03))";
            }}
          >
            <Search size={18} color="var(--joy-palette-text-tertiary, rgba(0, 0, 0, 0.5))" />
            <input
              type="text"
              placeholder="Search components, pages, approvals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 15,
                color: "var(--joy-palette-text-primary, #000)",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  background: "var(--joy-palette-background-level2, rgba(0, 0, 0, 0.05))",
                  color: "var(--joy-palette-text-secondary, rgba(0, 0, 0, 0.7))",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Content */}
          <div style={{ overflow: "auto", maxHeight: "calc(80vh - 240px)" }}>
            {totalResults > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Home Section - Full Width Card */}
                {showHome && (
                  <button
                    onClick={() => handleNavigate("/")}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      borderRadius: 16,
                      background: "linear-gradient(135deg, var(--joy-palette-primary-main, #2563eb) 0%, var(--joy-palette-primary-dark, #1d4ed8) 100%)",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 8px 24px rgba(37, 99, 235, 0.25)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 12px 32px rgba(37, 99, 235, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 99, 235, 0.25)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          background: "rgba(255, 255, 255, 0.2)",
                          borderRadius: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Home size={28} color="#fff" strokeWidth={2.5} />
                      </div>
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                          Dashboard Home
                        </div>
                        <div style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.4 }}>
                          Your central hub for all operations and insights
                        </div>
                      </div>
                      <ChevronDown
                        size={24}
                        color="#fff"
                        style={{ transform: "rotate(-90deg)", opacity: 0.7 }}
                      />
                    </div>
                  </button>
                )}

                {/* Other Sections */}
                {filteredSections.map((section, idx) => (
                  <div key={idx} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => toggleSection(section.title)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 16px",
                        borderRadius: 12,
                        background: "var(--joy-palette-background-level1, rgba(0, 0, 0, 0.03))",
                        border: "1px solid var(--joy-palette-divider, rgba(0, 0, 0, 0.08))",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: "0.05em",
                        color: "var(--joy-palette-text-primary, #000)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--joy-palette-background-level2, rgba(0, 0, 0, 0.05))";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--joy-palette-background-level1, rgba(0, 0, 0, 0.03))";
                      }}
                    >
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <section.icon size={16} />
                        <span>{section.title}</span>
                        <span
                          style={{
                            fontSize: 12,
                            background: "var(--joy-palette-neutral-softBg, rgba(0, 0, 0, 0.08))",
                            color: "var(--joy-palette-text-secondary, rgba(0, 0, 0, 0.6))",
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontWeight: 600,
                          }}
                        >
                          {section.children.length}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        style={{
                          transform: expandedSections.has(section.title) ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    </button>

                    {expandedSections.has(section.title) && (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                          gap: 12,
                          marginTop: 12,
                          paddingLeft: 8,
                        }}
                      >
                        {section.children.map((child, cIdx) => {
                          const approvalEntry = approvals.find((a) => a.title === child.title);
                          const count = approvalEntry ? approvalMap[approvalEntry.code] || 0 : null;

                          return (
                            <button
                              key={cIdx}
                              onClick={() => handleNavigate(child.href)}
                              style={{
                                textAlign: "left",
                                padding: "16px",
                                borderRadius: 12,
                                background: "var(--joy-palette-background-surface, #fff)",
                                border: "1px solid var(--joy-palette-divider, rgba(0, 0, 0, 0.08))",
                                cursor: "pointer",
                                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.12)";
                                e.currentTarget.style.borderColor = "var(--joy-palette-primary-main, #2563eb)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
                                e.currentTarget.style.borderColor = "var(--joy-palette-divider, rgba(0, 0, 0, 0.08))";
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                  fontWeight: 700,
                                  fontSize: 15,
                                  color: "var(--joy-palette-text-primary, #000)",
                                  marginBottom: 6,
                                }}
                              >
                                <span style={{ flex: 1 }}>{child.title}</span>
                                {count !== null && count > 0 && (
                                  <span
                                    style={{
                                      fontSize: 12,
                                      background: "#ef4444",
                                      color: "#fff",
                                      padding: "4px 10px",
                                      borderRadius: 8,
                                      fontWeight: 700,
                                      minWidth: 28,
                                      textAlign: "center",
                                    }}
                                  >
                                    {count}
                                  </span>
                                )}
                                {child.category === "new" && (
                                  <span
                                    style={{
                                      fontSize: 11,
                                      background: "#10b981",
                                      color: "#fff",
                                      padding: "4px 8px",
                                      borderRadius: 6,
                                      display: "inline-flex",
                                      gap: 6,
                                      alignItems: "center",
                                      fontWeight: 700,
                                    }}
                                  >
                                    <Sparkles size={12} /> NEW
                                  </span>
                                )}
                              </div>
                              <div
                                style={{
                                  fontSize: 13,
                                  color: "var(--joy-palette-text-secondary, rgba(0, 0, 0, 0.6))",
                                  lineHeight: 1.4,
                                }}
                              >
                                Click to navigate
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "64px 16px" }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    background: "var(--joy-palette-background-level1, rgba(0, 0, 0, 0.03))",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <Search size={36} color="var(--joy-palette-text-tertiary, rgba(0, 0, 0, 0.3))" />
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "var(--joy-palette-text-primary, #000)",
                  }}
                >
                  No results found
                </div>
                <div style={{ color: "var(--joy-palette-text-secondary, rgba(0, 0, 0, 0.6))", fontSize: 15 }}>
                  Try adjusting your search terms or{" "}
                  <button
                    onClick={() => setQuery("")}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--joy-palette-primary-main, #2563eb)",
                      cursor: "pointer",
                      fontWeight: 600,
                      textDecoration: "underline",
                    }}
                  >
                    clear the search
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer with User Info */}
          <div
            style={{
              display: "flex",
              flexDirection: window.innerWidth < 640 ? "column" : "row",
              justifyContent: "space-between",
              alignItems: window.innerWidth < 640 ? "stretch" : "center",
              gap: 16,
              padding: "16px 20px",
              background: "var(--joy-palette-background-level1, rgba(0, 0, 0, 0.03))",
              borderRadius: 12,
              marginTop: 8,
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {(name || "A").charAt(0).toUpperCase()}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "var(--joy-palette-text-primary, #000)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name || "Admin"}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--joy-palette-text-secondary, rgba(0, 0, 0, 0.6))",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {email || "Email not set"}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (onLogout) onLogout();
                navigate("/login");
              }}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 14,
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#dc2626";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ef4444";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.3)";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </ExpandableDock>

      <style>{`
        @media (max-width: 640px) {
          .dock-panel {
            border-radius: 16px !important;
          }
        }
      `}</style>
    </>
  );
}