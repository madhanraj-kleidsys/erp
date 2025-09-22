import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Input,
  Button,
  Typography,
  IconButton,
} from "@mui/joy";
import { Person, Lock, Visibility, VisibilityOff, Diversity1 } from "@mui/icons-material";
import Logo from "../assets/logo.jpeg";
import TitleImg from "../assets/title.jpeg";

import styled from 'styled-components';

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Please enter username and password");
    } else {
      setError("");
      if (onLogin) onLogin({ name: form.username });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "white",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,  #ffffffff 100%)",
      }}
    >
      {/* Left Logo */}
      <StyledWrapper>
       <Box className="Title-container"
        component="img"
        src={Logo}
        alt="logo"
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          maxWidth: 160,
          height: 80,
          opacity: 0.7,
          zIndex: 999,  
        }}
      />
   
       </StyledWrapper> 

      {/* Right Logo */}
      <StyledWrapper>
      <Box className="Title-container"
        component="img"
        src={Logo}
        alt="logo"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          maxWidth: 160,
          height: 80,
          opacity: 0.7,
          zIndex: 999,
        }}
      />
      </StyledWrapper>

      <StyledWrapper>
        <div className="container">

          <CardContent sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            gap: 2
          }}>

            <StyledWrapper>
              <div className="Title-container">

                <Box className="heading"
                  component="img"
                  src={TitleImg}
                  alt="title"
                  sx={{
                    maxWidth: 200,
                    margin: "0 auto",
                    display: "block",
                  }}
                />
              </div>
            </StyledWrapper>


            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2
              }}
            >

              <Input className="input"
                fullWidth
                size="lg"
                placeholder="Enter your username"
                name="username"
                value={form.username}
                onChange={handleChange}
                startDecorator={<Person sx={{ color: "#18c9ffff" }} />}
                autoFocus
                required

                sx={{
                  '& .MuiInput-root': {
                    borderRadius: '8px',

                  }
                }}
              />


              <Input className="input"
                fullWidth
                size="lg"
                placeholder="Enter your password"
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                startDecorator={<Lock sx={{ color: "#18c9ffff" }} />}
                endDecorator={
                  <IconButton
                    variant="plain"
                    onClick={() => setShowPass((p) => !p)}
                    sx={{ color: "neutral.500" }}
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
                required
                sx={{
                  '& .MuiInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />


              {error && (
                <Typography
                  color="danger"
                  fontSize="sm"
                  sx={{
                    textAlign: 'center',
                    mt: 1
                  }}
                >
                  {error}
                </Typography>
              )} 

              <Button className="login-button"
                type="submit"
                size="lg"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: '8px',
                  background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                  '&:hover': {
                    background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                  }
                }}
              >
                Login
              </Button>

            </Box> 
          </CardContent> 
        </div> 
      </StyledWrapper> 
    </Box>
 
  );
}
 
const StyledWrapper = styled.div`
  .container {
    max-width: 450px;
    background: #f8f9fd;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    border-radius: 40px;
    padding: 20px 25px;
    border: 5px solid rgb(255, 255, 255);
        box-shadow: rgba(88, 88, 88, 1) 0px 30px 30px 1px;
     margin: 20px;
  }

  .Title-container{
   max-width: 300px;
    background: #f8f9fd;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgb(244, 247, 251) 100%
    );
    border-radius: 40px;
    padding: 10px 15px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px; 
  }
  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(16, 137, 211);
  }
 

 .input {
    width: 100%;
    background: white;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border: 2px solid #18c9ffff;  
    box-shadow: 6px 6px 10px rgba(135, 211, 235, 1),
    1px 1px 10px rgba(255, 255, 255, 0.6);
}

   .input::-moz-placeholder {
    color: rgb(170, 170, 170);
  }

   .input::placeholder {
    color: rgb(170, 170, 170);
  }

   .input:focus {
    outline: none;
    border-inline: 2px solid #12b1d1;
  }

    .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

   .forgot-password a {
    font-size: 11px;
    color: #0099ff;
    text-decoration: none;
  }

  .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(
      45deg,
      rgba(69, 214, 240, 1) 0%,
      rgb(18, 177, 209) 100%
    );
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

   .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }

   .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
  }
    
    .inpu {
    width: 245px;
    min-height: 45px;
    color: #fff;
    outline: none;
    transition: 0.35s;
    padding: 0px 7px;
    background-color: #212121;
    border-radius: 6px;
    border: 2px solid #212121;
    box-shadow: 6px 6px 10px rgba(0,0,0,1),
    1px 1px 10px rgba(255, 255, 255, 0.6);
  }

  .inpu::placeholder {
    color: #999;
  }

  .inpu:focus.input::placeholder {
    transition: 0.3s;
    opacity: 0;
  }

  .inpu:focus {
    transform: scale(1.05);
    box-shadow: 6px 6px 10px rgba(0,0,0,1),
    1px 1px 10px rgba(255, 255, 255, 0.6),
    inset 2px 2px 10px rgba(0,0,0,1),
    inset -1px -1px 5px rgba(255, 255, 255, 0.6);
  }
 `


//  <Box
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
//       <Box
//         component="img"
//         src={Logo}
//         alt="logo"
//         sx={{
//           position: "fixed",
//           bottom: 20,
//           left: 20,
//           maxWidth: 160,
//           height: 80,
//           opacity: 0.7,
//           zIndex: 999,
//         }}
//       />

//       {/* Right Logo */}
//       <Box
//         component="img"
//         src={Logo}
//         alt="logo"
//         sx={{
//           position: "fixed",
//           bottom: 20,
//           right: 20,
//           maxWidth: 160,
//           height: 80,
//           opacity: 0.7,
//           zIndex: 999,
//         }}
//       />

//       <Card
//         variant="outlined"
//         sx={{
//           maxWidth: 400,
//           width: "90%",
//           borderRadius: "lg",
//           bgcolor: "white",
//           boxShadow: "lg",
//           border: "1px solid",
//           borderColor: "neutral.200",
//         }}
//       >
//         <CardContent sx={{ 
//           display: "flex", 
//           flexDirection: "column", 
//           alignItems: "center", 
//           p: 4,
//           gap: 2 
//         }}>
//           <Box
//             component="img"
//             src={TitleImg}
//             alt="title"
//             sx={{
//               maxWidth: 200,
//               margin: "0 auto",
//               display: "block",
//             }}
//           />

//           {/* <Typography 
//             level="h4" 
//             sx={{ 
//               color: "primary.500", 
//               fontWeight: "bold", 
//               textAlign: 'center',
//               mb: 1 
//             }}
//           >
//             KLEIDSYS LOGIN
//           </Typography> */}

//           {/* <Typography 
//             level="body1" 
//             sx={{ 
//               color: "neutral.600", 
//               textAlign: 'center',
//               mb: 3 
//             }}
//           >
//             Enter your credentials to access the system
//           </Typography> */}

//           <Box 
//             component="form" 
//             onSubmit={handleSubmit} 
//             sx={{ 
//               width: "100%",
//               display: "flex",
//               flexDirection: "column",
//               gap: 2 
//             }}
//           >
//             <Input
//               fullWidth
//               size="lg"
//               placeholder="Enter your username"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               startDecorator={<Person sx={{ color: "primary.500" }} />}
//               autoFocus
//               required
//               sx={{
//                 '& .MuiInput-root': {
//                   borderRadius: '8px',
//                 }
//               }}
//             />

//             <Input
//               fullWidth
//               size="lg"
//               placeholder="Enter your password"
//               name="password"
//               type={showPass ? "text" : "password"}
//               value={form.password}
//               onChange={handleChange}
//               startDecorator={<Lock sx={{ color: "primary.500" }} />}
//               endDecorator={
//                 <IconButton 
//                   variant="plain" 
//                   onClick={() => setShowPass((p) => !p)}
//                   sx={{ color: "neutral.500" }}
//                 >
//                   {showPass ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               }
//               required
//               sx={{
//                 '& .MuiInput-root': {
//                   borderRadius: '8px',
//                 }
//               }}
//             />

//             {error && (
//               <Typography 
//                 color="danger" 
//                 fontSize="sm" 
//                 sx={{ 
//                   textAlign: 'center',
//                   mt: 1 
//                 }}
//               >
//                 {error}
//               </Typography>
//             )}

//             <Button
//               type="submit"
//               size="lg"
//               fullWidth
//               sx={{
//                 mt: 2,
//                 py: 1.5,
//                 fontWeight: "bold",
//                 fontSize: "1.1rem",
//                 borderRadius: '8px',
//                 background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
//                 '&:hover': {
//                   background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
//                   transform: 'translateY(-1px)',
//                   boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
//                 }
//               }}
//             >
//               Login
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>