// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Input,
//   Button,
//   Typography,
//   IconButton,
// } from "@mui/joy";
// import { Person, Lock, Visibility, VisibilityOff, Diversity1 } from "@mui/icons-material";
// import Logo from "../assets/logo.jpeg";
// import TitleImg from "../assets/title.jpeg";
// import styled from 'styled-components';
// // import { AuthContext } from "../AuthContext";

// const apiUrl = import.meta.env.VITE_API_URL || `http://localhost:3000/api`;

// export default function LoginPage({ onLogin }) {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (!form.username || !form.password) {
//   //     setError("Please enter username and password");
//   //   } else {
//   //     setError("");
//   //     if (onLogin) onLogin({ name: form.username });
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.username || !form.password) {
//       setError("Please enter username and password");
//       return;
//     }


//     setError("");

//     try {
//       const response = await fetch( `${apiUrl}/login`, {   
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username:form.username,
//           password:form.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || 'Login failed');
//       } else {
//         // Login successful - pass user data and token to parent
//         if (onLogin) onLogin({ user: data.user, token: data.token });
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "white",
//         position: "relative",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(135deg,  #ffffffff 100%)",
//       }}
//     >
//       {/* Left Logo */}
//       <StyledWrapper>
//         <Box className="Title-container"
//           component="img"
//           src={Logo}
//           alt="logo"
//           sx={{
//             position: "fixed",
//             bottom: 20,
//             left: 20,
//             maxWidth: 160,
//             height: 80,
//             opacity: 0.7,
//             zIndex: 999,
//           }}
//         />

//       </StyledWrapper>

//       {/* Right Logo */}
//       <StyledWrapper>
//         <Box className="Title-container"
//           component="img"
//           src={Logo}
//           alt="logo"
//           sx={{
//             position: "fixed",
//             bottom: 20,
//             right: 20,
//             maxWidth: 160,
//             height: 80,
//             opacity: 0.7,
//             zIndex: 999,
//           }}
//         />
//       </StyledWrapper>

//       <StyledWrapper>
//         <div className="container">

//           <CardContent sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             p: 4,
//             gap: 2
//           }}>

//             <StyledWrapper>
//               <div className="Title-container">

//                 <Box className="heading"
//                   component="img"
//                   src={TitleImg}
//                   alt="title"
//                   sx={{
//                     maxWidth: 200,
//                     margin: "0 auto",
//                     display: "block",
//                   }}
//                 />
//               </div>
//             </StyledWrapper>


//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               sx={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2
//               }}
//             >

//               <Input className="input"
//                 fullWidth
//                 size="lg"
//                 placeholder="Enter your username"
//                 name="username"
//                 value={form.username}
//                 onChange={handleChange}
//                 startDecorator={<Person sx={{ color: "#18c9ffff" }} />}
//                 autoFocus
//                 required

//                 sx={{
//                   '& .MuiInput-root': {
//                     borderRadius: '8px',

//                   }
//                 }}
//               />


//               <Input className="input"
//                 fullWidth
//                 size="lg"
//                 placeholder="Enter your password"
//                 name="password"
//                 type={showPass ? "text" : "password"}
//                 value={form.password}
//                 onChange={handleChange}
//                 startDecorator={<Lock sx={{ color: "#18c9ffff" }} />}
//                 endDecorator={
//                   <IconButton
//                     variant="plain"
//                     onClick={() => setShowPass((p) => !p)}
//                     sx={{ color: "neutral.500" }}
//                   >
//                     {showPass ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 }
//                 required
//                 sx={{
//                   '& .MuiInput-root': {
//                     borderRadius: '8px',
//                   }
//                 }}
//               />


//               {error && (
//                 <Typography
//                   color="danger"
//                   fontSize="sm"
//                   sx={{
//                     textAlign: 'center',
//                     mt: 1
//                   }}
//                 >
//                   {error} hoe
//                 </Typography>
//               )}

//               <Button className="login-button"
//                 type="submit"
//                 size="lg"
//                 fullWidth
//                 sx={{
//                   mt: 2,
//                   py: 1.5,
//                   fontWeight: "bold",
//                   fontSize: "1.1rem",
//                   borderRadius: '8px',
//                   background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
//                   '&:hover': {
//                     background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
//                     transform: 'translateY(-1px)',
//                     boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
//                   }
//                 }}
//               >
//                 Login
//               </Button>

//             </Box>
//           </CardContent>
//         </div>
//       </StyledWrapper>
//     </Box>

//   );
// }

// const StyledWrapper = styled.div`
//   .container {
//     max-width: 450px;
//     background: #f8f9fd;
//     background: linear-gradient(
//       0deg,
//       rgb(255, 255, 255) 0%,
//       rgba(255, 255, 255, 1) 100%
//     );
//     border-radius: 40px;
//     padding: 20px 25px;
//     border: 5px solid rgb(255, 255, 255);
//         box-shadow: rgba(88, 88, 88, 1) 0px 30px 30px 1px;
//      margin: 20px;
//   }

//   .Title-container{
//    max-width: 300px;
//     background: #f8f9fd;
//     background: linear-gradient(
//       0deg,
//       rgb(255, 255, 255) 0%,
//       rgb(244, 247, 251) 100%
//     );
//     border-radius: 40px;
//     padding: 10px 15px;
//     border: 5px solid rgb(255, 255, 255);
//     box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
//     margin: 20px; 
//   }
//   .heading {
//     text-align: center;
//     font-weight: 900;
//     font-size: 30px;
//     color: rgb(16, 137, 211);
//   }


//  .input {
//     width: 100%;
//     background: white;
//     padding: 15px 20px;
//     border-radius: 20px;
//     margin-top: 15px;
//     box-shadow: #cff0ff 0px 10px 10px -5px;
//     border: 2px solid #18c9ffff;  
//     box-shadow: 6px 6px 10px rgba(135, 211, 235, 1),
//     1px 1px 10px rgba(255, 255, 255, 0.6);
// }

//    .input::-moz-placeholder {
//     color: rgb(170, 170, 170);
//   }

//    .input::placeholder {
//     color: rgb(170, 170, 170);
//   }

//    .input:focus {
//     outline: none;
//     border-inline: 2px solid #12b1d1;
//   }

//     .forgot-password {
//     display: block;
//     margin-top: 10px;
//     margin-left: 10px;
//   }

//    .forgot-password a {
//     font-size: 11px;
//     color: #0099ff;
//     text-decoration: none;
//   }

//   .login-button {
//     display: block;
//     width: 100%;
//     font-weight: bold;
//     background: linear-gradient(
//       45deg,
//       rgba(69, 214, 240, 1) 0%,
//       rgb(18, 177, 209) 100%
//     );
//     color: white;
//     padding-block: 15px;
//     margin: 20px auto;
//     border-radius: 20px;
//     box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
//     border: none;
//     transition: all 0.2s ease-in-out;
//   }

//    .login-button:hover {
//     transform: scale(1.03);
//     box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
//   }

//    .login-button:active {
//     transform: scale(0.95);
//     box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
//   }

//     .inpu {
//     width: 245px;
//     min-height: 45px;
//     color: #fff;
//     outline: none;
//     transition: 0.35s;
//     padding: 0px 7px;
//     background-color: #212121;
//     border-radius: 6px;
//     border: 2px solid #212121;
//     box-shadow: 6px 6px 10px rgba(0,0,0,1),
//     1px 1px 10px rgba(255, 255, 255, 0.6);
//   }

//   .inpu::placeholder {
//     color: #999;
//   }

//   .inpu:focus.input::placeholder {
//     transition: 0.3s;
//     opacity: 0;
//   }

//   .inpu:focus {
//     transform: scale(1.05);
//     box-shadow: 6px 6px 10px rgba(0,0,0,1),
// //     1px 1px 10px rgba(255, 255, 255, 0.6),
// //     inset 2px 2px 10px rgba(0,0,0,1),
// //     inset -1px -1px 5px rgba(255, 255, 255, 0.6);
// //   }
// //  `



import React, { useState, useRef, useEffect } from "react";
import { Box, Input, Button, Typography, IconButton } from "@mui/joy";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import PixelCard from "../components/ui/PixelCard";
import "../components/ui/PixelCard.css";
import Fone from "../../src/assets/f1.jpg";
import KleidSysLogo from "../../src/assets/logo.jpeg";
import styled from "styled-components";

const title = "Welcome to FashionOne";
const letters = Array.from(title);
const apiUrl = import.meta.env.VITE_API_URL || `http://localhost:3000/api`;

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const [poweredExpand, setPoweredExpand] = useState(false);

  // Trigger after delay on mount
  useEffect(() => {
    const timer = setTimeout(() => setPoweredExpand(true), 800); // delay for effect
    return () => clearTimeout(timer);
  }, []);


  // 3D Card animation states
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Please enter username and password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        if (onLogin) onLogin({ user: data.user, token: data.token });
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>

      <StyledWrapper>
        {/* <PixelCard variant="pink"> */}

        <Box className="login-container">
          {/* Left Side - Animated Factory Image */}
          <motion.div
            className="left-section"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="image-overlay">
              <motion.div
                className="floating-element"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="icon-circle">
                  <svg
                    width={60}
                    height={60}
                    viewBox="0 0 60 60"
                    fill="none"
                    stroke="#18a2c9"
                    strokeWidth="2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="5" y="35" width="50" height="20" rx="4" fill="#77d7fa" stroke="#18a2c9" />
                    <rect x="10" y="44" width="6" height="11" fill="#b4e3fa" stroke="#18a2c9" />
                    <rect x="22" y="44" width="6" height="11" fill="#b4e3fa" stroke="#18a2c9" />
                    <rect x="34" y="44" width="6" height="11" fill="#b4e3fa" stroke="#18a2c9" />
                    <rect x="46" y="44" width="6" height="11" fill="#b4e3fa" stroke="#18a2c9" />
                    {/* Factory roof */}
                    <polygon points="5,35 15,27 25,35 35,27 45,35 55,27 55,35" fill="#18a2c9" stroke="#18a2c9" />
                    {/* Two chimney stacks */}
                    <rect x="14" y="15" width="4" height="12" fill="#18a2c9" stroke="#077" />
                    <rect x="42" y="10" width="4" height="17" fill="#18a2c9" stroke="#077" />
                    {/* Smoke for effect */}
                    <ellipse cx="16" cy="12" rx="3" ry="2" fill="#b4e3fa" opacity="0.7" />
                    <ellipse cx="44" cy="7" rx="3" ry="2" fill="#b4e3fa" opacity="0.7" />
                  </svg>
                </div>
              </motion.div>

              <div className="content-overlay">
                {/* <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Welcome to FashionONE
                </motion.h1> */}

                <h1 className="fancy-script" style={{ textAlign: "center", marginBottom: "2rem" }}>
                  {letters.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      style={{ display: "inline-block" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Complete Garment ERP Solution
                </motion.p>

                <div className="feature-tags">
                  {["Production", "Inventory", "Quality Control", "Analytics"].map(
                    (tag, index) => (
                      <motion.span
                        key={tag}
                        className="feature-tag"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - 3D Animated Login Form */}
          <motion.div
            className="right-section"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            <motion.div
              ref={cardRef}
              className="card-3d-wrapper"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div className="login-card">
                {/* Animated Background Shapes */}
                <div className="bg-shapes">
                  <motion.div
                    className="shape shape-1"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="shape shape-2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <div className="card-content">
                  <motion.div
                    className="logo-section"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >

                    <motion.div
                      className="left-section-right"
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <div className="image-overlay">
                        <div className="content-overlay">
                          <img
                            src={Fone}
                            alt="FashionONE Logo"
                            style={{
                              width: '300px',
                              height: '80px',
                              borderRadius: '900px',
                              objectFit: 'cover',
                            }}
                          />
                        </div>

                        <motion.div
                          style={{ marginTop: "40px" }}
                          className="floating-element"
                          animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >

                          <div >
                            <svg
                              width="60"
                              height="60"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                              <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                          </div>
                        </motion.div>

                        <Typography level="body-lg" className="tagline">
                          AN ERP Software
                        </Typography>
                      </div>
                    </motion.div>



                  </motion.div>

                  <Box component="form" onSubmit={handleSubmit} className="form-box">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Input
                        fullWidth
                        size="lg" color="green"
                        placeholder="Enter your username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        startDecorator={<Person />}
                        autoFocus
                        required
                        className="input-field"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Input
                        fullWidth
                        size="lg"
                        placeholder="Enter your password"
                        name="password"
                        type={showPass ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        startDecorator={<Lock />}
                        endDecorator={
                          <IconButton
                            variant="plain"
                            onClick={() => setShowPass((p) => !p)}
                          >
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        }
                        required
                        className="input-field"
                      />
                    </motion.div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Typography color="danger" fontSize="sm" className="error-text">
                          {error}
                        </Typography>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        disabled={isLoading}
                        className="login-button"
                        component={motion.button}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="loader"
                          />
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </motion.div>
                  </Box>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <Box
            className="powered-by-container"
            sx={{
              position: "absolute",
              bottom: 30,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <div className={`powered-by-box${poweredExpand ? ' expanded' : ''}`}>
              <span className="powered-by-text" style={{
                opacity: poweredExpand ? 1 : 0,
                maxWidth: poweredExpand ? "260px" : "0px",
                marginLeft: poweredExpand ? "12px" : "0px",
                transition: "opacity 0.7s, max-width 0.8s, margin-left 0.6s",
                display: "flex", alignItems: "center",
                fontWeight: 500, fontSize: "1rem", color: "#ffffffff", overflow: "hidden"
              }}>
                Developed by
                <img
                  src={KleidSysLogo}
                  alt="KleidSys Logo"
                  style={{
                    height: "50px",    // Try 48~55px for sharpness
                    width: "auto",
                    marginLeft: "10px",
                    verticalAlign: "middle",
                    borderRadius: "20px", // Only round corners on rectangle logo!
                    objectFit: "contain",
                    transition: "height 0.5s, width 0.5s"
                  }}
                />
              </span>
            </div>

          </Box>

          {/* Floating Particles */}
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

        </Box>
        {/* </PixelCard> */}
      </StyledWrapper>

    </>
  );
}

const StyledWrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  .login-container {
    min-height: 100vh;
    display: flex;
    // background: linear-gradient(135deg, #60cef7ff 80%, #60cef7ff 80%, #25bde7ff 2%);

    // background: linear-gradient(135deg, #eaf8fd 0%, #77d7fa 80%, #18a2c9 100%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    // background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
    position: relative;
    overflow: hidden;
  }

  /* Left Section - Factory Image */
  .left-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
    // background: linear-gradient(
    //   135deg,
    //   rgba(102, 126, 234, 0.9) 0%,
    //   rgba(118, 75, 162, 0.9) 150%
    // );
        // background: linear-gradient(135deg, #8bdaf7ff 20%, #77d7fa 80%, #18a2c9 100%);

    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.3;
    }
  }


    .left-section-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.9) 0%,
      rgba(118, 75, 162, 0.9) 150%
    );
        // background: linear-gradient(135deg, #50dce9 100%, #60cef7ff 80%);

    overflow: hidden;
    border-radius: 35px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.3;
    }
  }


  .image-overlay {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
  }

  .floating-element {
    margin: 0 auto 40px;
    width: fit-content;
  }

  .icon-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.77);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

   .icon-login {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    // background: rgba(255, 255, 255, 0.1);
    // backdrop-filter: blur(10px);
    // display: flex;
    // align-items: center;
    // justify-content: center;
    color: grey;
    // box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    // border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .content-overlay h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 16px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .content-overlay p {
    font-size: 1.2rem;
    margin-bottom: 32px;
    opacity: 0.9;
  }

  .feature-tags {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .feature-tag {
    padding: 8px 20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  /* Right Section - Login Form */
  .right-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    perspective: 1000px;
  }

  .card-3d-wrapper {
    width: 100%;
    max-width: 480px;
    transform-style: preserve-3d;
  }

  .login-card {
    background: rgba(255, 255, 255, 0.95);
        // background:rgb(80,220,233);
        //  linear-gradient(135deg, #8bdaf7ff 20%, #60cef7ff 80%, #18a2c9 10%);

    backdrop-filter: blur(20px);
    border-radius: 30px;
    padding: 50px 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    transform: translateZ(50px);
  }

  .bg-shapes {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 0;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    opacity: 0.05;
  }

  .shape-1 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    top: -150px;
    right: -150px;
  }

  .shape-2 {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    bottom: -100px;
    left: -100px;
  }

  .card-content {
    position: relative;
    z-index: 1;
  }

  .logo-section {
    text-align: center;
    margin-bottom: 40px;
  }

  .logo-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  }

  .logo-text {
    color: white;
    font-weight: 800;
  }

  .brand-name {
    color: #333;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .tagline {
    color: #ffffffff;
    font-style: italic;
  }

  .form-box {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-field {
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 15px;
    padding: 12px 20px;
    transition: all 0.3s ease;
    color: #333;
    &:focus-within {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }

  .error-text {
    text-align: center;
    padding: 10px;
    background: rgba(244, 67, 54, 0.1);
    border-radius: 10px;
  }

  .login-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    //  background: linear-gradient(135deg, #18a2c9 0%, #60cef7ff 100%);
    color: white;
    font-weight: 700;
    font-size: 1.1rem;
    padding: 16px;
    border-radius: 15px;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .loader {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
  }

  /* Floating Particles */
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .login-container {
      flex-direction: column;
    }

    .left-section {
      min-height: 40vh;
      padding: 20px;
    }

    .content-overlay h1 {
      font-size: 2rem;
    }

    .content-overlay p {
      font-size: 1rem;
    }

    .right-section {
      padding: 20px;
    }

    .login-card {
      padding: 30px 25px;
    }
  }

  @media (max-width: 768px) {
    .left-section {
      min-height: 30vh;
    }

    .content-overlay h1 {
      font-size: 1.5rem;
    }              

    .icon-circle {
      width: 80px;
      height: 80px;
    }

    .logo-circle {
      width: 60px;
      height: 60px;
    }
  }

.powered-by-box {
  background: rgba(255, 255, 255, 0.11);
  border-radius: 24px;
  padding: 10px 25px;
  box-shadow: 0 4px 18px 0 rgba(0,0,0,0.05);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  pointer-events: auto;
  min-width: 64px;
  width: auto;          /* Let content size naturally! */
  max-width: 90vw;      /* Responsive: never exceed viewport */
  transition: box-shadow 0.6s;
  cursor: pointer;
  overflow: visible;    /* No cropping! */
}
.powered-by-box.expanded {
  box-shadow: 0 8px 32px rgba(24, 162, 201, 0.15);
}



.fancy-script {
  font-family: 'Pacifico',cursive;
  font-size: 3rem;
  font-weight: 400;
  background: linear-gradient(170deg, #ffffffff 100%, #ffffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 18px #eab30866;
}



.dancing-script {
  font-family: "Dancing Script", cursive;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
`;