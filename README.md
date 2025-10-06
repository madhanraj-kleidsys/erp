# 🚀 RDP Deployment Guide

📋 **Windows RDP Server Deployment - Frontend & Backend**

---

## 🌐 Frontend Deployment (React/Vite) with IIS

### Step 1: Build Frontend Application 🔨

- Navigate to your frontend project directory
- **Change `.env` file to the server's IP:**
  - By default it will be like: `http://localhost:3000/api`
  - Change it to: `http://74.224.101.150:3000/api`
- Run the build command:
  ```bash
  npm run build
  ```
- ✅ This generates a `dist` folder

### Step 2: Transfer Files to RDP Server 📁

- Copy the entire `dist` folder to your RDP server
- Navigate to directory: `C:\inetpub\wwwroot\`
- Create a new folder (e.g., `frontend` or your preferred name)
- Paste the `dist` folder into this directory

### Step 3: Configure IIS Website ⚙️

- Open **IIS Manager** on the RDP server
- Locate **F1ERP** dropdown in the left panel
- Right-click on **Sites** → **Add Website**
- Configure:
  - **Site Name:** Enter a name (e.g., F1ERP-Frontend)
  - **Physical Path:** Select the path to your frontend `dist` folder
  - **Port:** Choose an available port (e.g., 8080, 5173)
- Click **OK** to create the website
- In the right sidebar, click **Start** if the site is not running

---

## 🔧 Backend Deployment (Node.js/Express) with PM2

### Step 1: Configure Environment Variables 🔐

- Open the `.env` file in your backend root directory
- Update the configuration for RDP server credentials:
  ```env
  DB_NAME=SKPL
  DB_USER=sa
  DB_PASS=Fashion1
  DB_HOST=F1ERP\SQLSERVER
  DB_PORT=1433
  ```

### Step 2: Setup Backend Directory 📂

- Navigate to `C:\`
- Create a folder for backend files (e.g., `backend`) in the same level where `inetpub` folder exists
- Copy all backend source code into this directory

### Step 3: Install Node.js Dependencies 📦

- Open Command Prompt in the backend directory
- Install dependencies:
  ```bash
  npm install
  ```
- 🚨 **If npm install fails:** Download and install Node.js LTS from [nodejs.org](https://nodejs.org)

### Step 4: Test Server Connection 🧪

- Verify Node.js installation:
  ```bash
  node --v
  ```
- Test the server:
  ```bash
  npm start
  ```
- ✅ Confirm server starts without errors and connects to database
- 🔍 If errors occur: Check `.env` credentials and database connectivity
- If works fine, stop the test server: `Ctrl + C`

### Step 5: Setup PM2 Process Manager ⚡

- Install PM2 globally:
  ```bash
  npm install pm2-windows-startup -g
  pm2-startup install
  ```
- Start application with PM2:
  ```bash
  pm2 start app.js
  ```
  > **Note:** Replace `app.js` with your main entry file (`server.js`, `index.js`, etc.) which is available in root directory of backend folder
- Finally run:
  ```bash
  pm2 save
  ```

---

## 🛠️ PM2 Management Commands

| Command | Description |
|---------|-------------|
| `pm2 status` | View all running processes |
| `pm2 logs` | Monitor application logs |
| `pm2 delete [server-name or process-id]` | Delete specific process |
| `pm2 restart [server-name or process-id]` | Restart application |

---

## 🚨 Troubleshooting Tips

- **Node.js not found:** Install Node.js LTS from official website
- **npm install errors:** Check internet connectivity and Node.js installation
- **Database connection failed:** Verify `.env` credentials and database server status
- **IIS site not starting:** Check port conflicts and folder permissions
- **PM2 service issues:** Restart Command Prompt as Administrator

---

## 📋 Quick Checklist

### Frontend ✅
- [ ] Updated `.env` with server IP
- [ ] Built frontend (`npm run build`)
- [ ] Copied `dist` to `C:\inetpub\wwwroot\frontend`
- [ ] Created IIS website
- [ ] Started IIS site

### Backend ✅
- [ ] Updated `.env` with database credentials
- [ ] Copied backend files to `C:\backend`
- [ ] Installed Node.js dependencies
- [ ] Tested server connection
- [ ] Configured PM2
- [ ] Started application with PM2

---

## 📞 Support

- **Version:** 1.0
- **Last Updated:** October 2025
- **Created By:** Development Team

---

> **Note:** This guide is specifically designed for Windows RDP server deployment using IIS for frontend hosting and PM2 for backend process management.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License.