# ⚡ Quick Start Checklist

Follow these steps to get your authentication system running:

## Step 1️⃣: Database Setup (2 minutes)

This project now uses **MongoDB** via Mongoose. No manual table/collection creation is required — schemas are defined in the models and collections will be auto‑created when data is inserted.

- [ ] Make sure MongoDB is running locally (e.g. `mongod`), or set a cloud URI.
- [ ] Set `MONGO_URI` in `backend/.env` (see next step).

## Step 2️⃣: Backend Configuration (1 minute)

- [ ] Open `backend/.env` file
- [ ] Ensure it contains:
  ```
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/ciphersqlstudio
  JWT_SECRET=supersecretkey
  FRONTEND_URL=http://localhost:5173
  NODE_ENV=development
  ```
- [ ] Save the file

## Step 3️⃣: Install Backend Dependencies (1 minute)

- [ ] Already installed: bcryptjs, jsonwebtoken, mongoose ✅
- [ ] Verify by running:
  ```bash
  cd backend
  npm list bcryptjs jsonwebtoken mongoose
  ```

## Step 4️⃣: Start Backend Server (2 minutes)

- [ ] Open Terminal in backend folder
- [ ] Run:
  ```bash
  npm run dev
  ```
- [ ] Should see:
  ```
  ✓ Server running on port 5000
  ```
- [ ] Keep this terminal open

## Step 5️⃣: Start Frontend Server (2 minutes)

- [ ] Open NEW Terminal in frontend folder
- [ ] Run:
  ```bash
  npm run dev
  ```
- [ ] Should see:
  ```
  ✓ VITE v7.3.1  ready in 342 ms
  ✓ Local: http://localhost:5173/
  ```
- [ ] Keep this terminal open

## Step 6️⃣: Test the System (5 minutes)

### Test Landing Page
- [ ] Open browser to http://localhost:5173
- [ ] See "Master SQL Through Practice" heading ✅
- [ ] Click "Get Started" button
- [ ] Should go to signup page

### Test User Registration
- [ ] Go to http://localhost:5173/signup
- [ ] Fill form:
  - Name: `Test User`
  - Email: `testuser@yourmail.com`
  - Password: `Test123!`
- [ ] Click "Create Account"
- [ ] Should see success message ✅
- [ ] No email is required; the account is ready to use immediately.

### Test User Login
- [ ] Go to http://localhost:5173/login
- [ ] Enter:
  - Email: `testuser@yourmail.com`
  - Password: `Test123!`
- [ ] Click "Sign In"
- [ ] Should redirect to `/user/dashboard` ✅
- [ ] See "Your SQL Learning Dashboard" ✅
- [ ] See assignments and progress tracking

### Test Admin Login
- [ ] Logout (from bottom right corner)
- [ ] Go to http://localhost:5173/login
- [ ] Enter:
  - Email: `admin@example.com`
  - Password: `admin123`
- [ ] Click "Sign In"
- [ ] Should redirect to `/admin/dashboard` ✅
- [ ] See "Admin Dashboard" with management options

### Test Protected Routes
- [ ] Logout
- [ ] Try going to http://localhost:5173/user/dashboard directly
- [ ] Should redirect to `/login` ✅
- [ ] Try login with admin account, then go to `/user/dashboard`
- [ ] Should redirect to home page ✅

## Step 7️⃣: Verify Backend APIs

Use Postman or curl to test:

### Register Endpoint
```bash
POST http://localhost:5000/auth/register
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@mail.com",
  "password": "Pass123!"
}
```

### Login Endpoint
```bash
POST http://localhost:5000/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Get Current User (Protected)
```bash
GET http://localhost:5000/auth/me
Authorization: Bearer {token_from_login_response}
```

## ✅ Success Checklist

- [ ] Database setup completed
- [ ] Environment variables configured
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Landing page loads
- [ ] Can signup with new email
- [ ] Verification email received
- [ ] Can verify email
- [ ] Can login as user
- [ ] Can login as admin
- [ ] User dashboard shows assignments
- [ ] Admin dashboard shows management options
- [ ] Protected routes working
- [ ] Logout works correctly

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot connect to database"
**Fix:**
- Make sure MySQL is running
- Check DB credentials in `.env` match your MySQL setup
- Verify database `ciphersqlstudio` exists

### Issue: "Email not sending"
**Fix:**
- Gmail account needs 2FA enabled
- Generate App Password from https://myaccount.google.com/apppasswords
- Use the full 16-character app password in `.env`
- Check internet connection

### Issue: "Login works but no redirect to dashboard"
**Fix:**
- Check browser console for errors
- Verify token is being stored in localStorage
- Check if user role is correct in database

### Issue: "404 Not Found on API calls"
**Fix:**
- Verify backend is running (npm run dev)
- Check port is 5000
- Verify routes are imported in `app.js`
- Check endpoint spelling

### Issue: "CORS Error"
**Fix:**
- Verify CORS is enabled in `app.js`
- Check FRONTEND_URL in `.env`
- Reload browser (Ctrl+Shift+R)

---

## 📱 Browser Console Tips

Open DevTools (F12) and check Console for errors:
- [ ] Check for 401 Unauthorized errors
- [ ] Check for CORS errors
- [ ] Check for network errors
- [ ] Verify tokens are in localStorage (Application tab)

---

## 🎯 After Setup - What's Next?

1. **Explore the Code**
   - Read through LoginPage.jsx
   - Review authController.js
   - Understand the flow

2. **Customize**
   - Update colors in CSS
   - Add company logo
   - Modify dashboard content

3. **Build Assignments**
   - Create assignment management pages
   - Add SQL editor
   - Implement submission system

4. **Deploy**
   - Choose hosting (Vercel, Heroku, etc.)
   - Set production environment variables
   - Deploy database

---

## ✨ Congratulations! 🎉

If all checkboxes are checked, your authentication system is fully functional and ready to use!

**Next: Build the assignment system! 📚**

---

**Need help?** Check these files:
- `AUTHENTICATION_SETUP.md` - Detailed setup guide
- `AUTHENTICATION_COMPLETE.md` - Full documentation
- `IMPLEMENTATION_SUMMARY.md` - What was built
