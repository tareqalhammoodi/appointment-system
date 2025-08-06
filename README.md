# Appointment System

A simple appointment management system with Firebase phone authentication.

## Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication:

   - Go to Authentication → Sign-in method
   - Enable "Phone" provider
   - Add your test phone numbers if needed
4. Enable Firestore Database:

   - Go to Firestore Database
   - Create database in test mode
   - Set up security rules
5. Get your Firebase configuration:

   - Go to Project Settings → General
   - Scroll down to "Your apps"
   - Add a web app if not already added
   - Copy the configuration

### 2. Environment Variables

Create a `.env.local` file in the root directory with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Database Schema

### Users Collection

```typescript
interface User {
  uid: string;           // Firebase Auth UID
  phoneNumber: string;   // User's phone number
  firstName: string;     // First name
  lastName: string;      // Last name
  email?: string;        // Email
  address?: string;      // Address
  birthdate?: string;    // Birth date
  gender?: string;       // Gender
  createdAt: Date;       // Account creation date
  updatedAt: Date;       // Last update date
}
```

## Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## License

This project is licensed under the MIT License.
