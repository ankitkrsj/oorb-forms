# OORB Forms - Enhanced Form Builder

A powerful form builder application with advanced features including Clerk authentication, question/answer functionality for tests, and improved dashboard controls.

## New Features

### 1. Clerk Authentication
- **Google OAuth**: Sign in with Google account
- **GitHub OAuth**: Sign in with GitHub account  
- **Email Verification**: Automatic email verification for new accounts
- **Social Login**: Seamless social authentication experience

### 2. Question/Answer Fields
- **Single Choice Questions**: Multiple choice with one correct answer
- **Multiple Choice Questions**: Multiple correct answers allowed
- **Test Creation**: Perfect for creating quizzes and class tests
- **Automatic Scoring**: Built-in scoring system for test responses
- **Test Results Viewer**: Detailed results with correct/incorrect answers

### 3. Enhanced Dashboard
- **Toggle Filters**: Replaced dropdown with draft/published toggles
- **Better UX**: More intuitive filtering system
- **Cleaner Interface**: Removed background dots for cleaner look

## Setup Instructions

### 1. Clerk Authentication Setup

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application in your Clerk dashboard
3. Enable Google and GitHub as OAuth providers:
   - Go to "User & Authentication" → "Social Connections"
   - Enable Google OAuth and add your Google Client ID/Secret
   - Enable GitHub OAuth and add your GitHub Client ID/Secret
4. Copy your Clerk keys to `.env.local`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

### 2. OAuth Provider Setup

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs in Clerk dashboard

#### GitHub OAuth:
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL from Clerk dashboard
4. Copy Client ID and Secret to Clerk

### 3. Email Verification
Email verification is automatically handled by Clerk. Users will receive verification emails when they sign up with email/password.

## Usage

### Creating Test Questions
1. In the form builder, select "Question/Answer" field type
2. Choose between "Single Choice" or "Multiple Choice"
3. Add your question text
4. Add answer options
5. Mark correct answers by clicking the check icon
6. Save and publish your test

### Viewing Test Results
1. Go to form responses
2. Click "Test Results" button for any response
3. View detailed breakdown of correct/incorrect answers
4. See overall test score and performance metrics

### Dashboard Filtering
- Use the Draft/Published toggles to filter forms
- Both toggles can be active simultaneously
- Cleaner interface without dropdown menus

## Technical Implementation

### Authentication Flow
- Clerk handles all authentication logic
- Social OAuth providers integrated
- Automatic session management
- Secure token handling

### Question/Answer System
- Flexible question types (single/multiple choice)
- Automatic scoring algorithm
- Detailed result analytics
- Export capabilities for test results

### Dashboard Improvements
- React state management for toggles
- Improved filtering logic
- Better user experience
- Responsive design maintained

## Dependencies Added
- `@clerk/clerk-react`: Clerk authentication
- `@clerk/themes`: Clerk UI themes

## File Structure
```
src/
├── components/
│   ├── auth/
│   │   ├── ClerkSignIn.tsx
│   │   └── ClerkSignUp.tsx
│   └── forms/
│       ├── QuestionAnswerField.tsx
│       └── TestResultsViewer.tsx
├── contexts/
│   └── ClerkAuthContext.tsx
└── ...
```

This implementation provides a complete authentication system with social login options and powerful test creation capabilities, making it perfect for educational institutions and businesses that need to create assessments.