# CipherSQLStudio - Authentication Setup Guide

## Backend Setup Instructions

### 1. Install Additional Dependencies

```bash
cd backend
npm install nodemailer
```

### 2. Configure Database

This backend now uses MongoDB with Mongoose. You do **not** need to create any tables or collections manually. Just ensure your MongoDB server is running and the connection string is set in the `.env` file (see next section).

Collections will be auto‑created when you register the first user.

### 3. Configure Environment Variables

Edit `backend/.env` with your settings:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ciphersqlstudio
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:5173
```



*No email service or verification is required anymore; registration is immediate.*

### 4. Start Backend Server

```bash
npm run dev
```

---

## Frontend Components Created

### Pages:
- **LoginPage** (`/login`) - For admin and user login
- **SignupPage** (`/signup`) - For user registration

*Email verification page has been removed.*

---

## API Endpoints

### API Endpoints (prefixed with `/api`)

#### 1. Register User
**POST** `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "User registered successfully. Please check your email.",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 2. Login
**POST** `/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 3. Verify Email
**POST** `/auth/verify-email`

```json
{
  "token": "verification-token-from-email"
}
```

Response:
```json
{
  "message": "Email verified successfully. You can now log in."
}
```

#### 4. Get Current User (Protected)
**GET** `/auth/me`

Headers:
```
Authorization: Bearer {token}
```

Response:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "is_verified": true
  }
}
```

---

## Authentication Flow

### User Registration Flow:
1. User fills signup form → Frontend POST to `/auth/register`
2. Backend hashes password, creates user, generates verification token
3. Backend sends verification email with link
4. User clicks link → Verification page processes token
5. Backend verifies email and marks user as verified
6. User can now login

### Admin Login Flow:
1. Admin provides credentials → Frontend POST to `/auth/login`
2. Backend validates email & password
3. Backend generates JWT token
4. Token stored in localStorage
5. User redirected to `/admin/dashboard`

### User Login Flow:
1. Same as admin, but redirects to `/user/dashboard`

---

## Security Features Implemented

✅ **Password Hashing** - BCryptJS with salt rounds (10)
✅ **JWT Tokens** - Secure token-based authentication
✅ **Email Verification** - 24-hour expiring verification tokens
✅ **Role-Based Access** - Admin vs User role separation
✅ **Token Expiration** - 7-day JWT expiration
✅ **CORS Protection** - Enabled on backend
✅ **Environment Variables** - Secrets not hardcoded

---

## Frontend Authentication Context (Next Steps)

Create an Auth Context to manage:
- User login/logout
- Token storage
- Protected routes
- Role-based rendering

## Protected Route Example

```jsx
<ProtectedRoute path="/admin/dashboard" element={<AdminDashboard />} requiredRole="admin" />
<ProtectedRoute path="/user/dashboard" element={<UserDashboard />} requiredRole="user" />
```

---

## Testing the System

### Test Admin Login:
```
Email: admin@example.com
Password: admin123
```
(Create this user manually in database with role='admin')

### Test User Registration:
1. Go to `/signup`
2. Fill form with new user details
3. Check email for verification link
4. Click verification link
5. Go to `/login` and sign in

---

## Next Steps

1. ✅ Create Dashboard pages for Admin & User
2. ✅ Add Protected Routes with Role Check
3. ✅ Create Assignment/Question Management (Admin)
4. ✅ Create Assignment Submission (User)
5. ✅ Add Progress Tracking
