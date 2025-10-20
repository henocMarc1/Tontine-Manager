# Gestionnaire de Tontines

## Overview

This is a French-language tontine (rotating savings group) management application built as a single-page web application. The system allows users to manage members, create tontine groups, and track payments with a modern, responsive interface. The application is built using vanilla HTML, CSS, and JavaScript with Firebase backend for authentication and data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla JavaScript using a section-based navigation system
- **Client-side State Management**: Global state object managing members, tontines, and payments
- **Firebase Integration**: Cloud-based data persistence using Firestore with real-time sync
- **Responsive Design**: Mobile-first CSS approach with CSS custom properties for theming
- **Component-based UI**: Modular sections with navigation-based routing (dashboard, members, tontines, payments)

### Technology Stack
- **HTML5**: Semantic markup with French language support (`lang="fr"`)
- **CSS3**: Modern styling with CSS custom properties, flexbox, and responsive design
- **Vanilla JavaScript**: No external frameworks, pure ES6+ JavaScript with ES modules
- **Firebase**: Backend services for authentication and Firestore database
- **Font Awesome 6.0**: Icon library for UI elements
- **Chart.js**: Data visualization for payment statistics and trends
- **jsPDF & jsPDF-AutoTable**: PDF generation for monthly reports
- **Python HTTP Server**: Development server serving static files and Firebase config API

## Key Components

### Authentication System
- **Firebase Authentication**: Email/password and Google OAuth authentication
- **Session Management**: Firebase auth state persistence with automatic session handling
- **User Interface Updates**: Dynamic user information display in header
- **Secure Login**: Protected routes with authentication guards

### State Management
- **Global State Object**: Centralized state containing members, tontines, payments, and UI state
- **Firestore Persistence**: All data stored in Firebase Firestore with real-time sync
- **User Data Isolation**: Each user's data stored separately in Firestore (`users/{userId}/...`)
- **State Initialization**: Automatic loading from Firestore on application start

### Core Modules
1. **Member Management**: Add, edit, and track tontine participants
2. **Tontine Groups**: Create and manage different tontine cycles with configurable parameters
3. **Payment Processing**: Track payments with validation and payout processing
4. **Dashboard**: Overview statistics and quick actions with real-time updates
5. **Reporting**: PDF export of monthly reports with detailed statistics

### UI Features
- **Theme Toggle**: Dark/light mode switching with CSS custom properties
- **Navigation System**: Section-based routing with active state management
- **Responsive Layout**: Container-based layout with mobile-first approach
- **French Localization**: Complete French language interface
- **Data Visualization**: Interactive charts showing payment trends and statistics

## Data Flow

1. **Authentication Flow**: User login → Firebase Auth → redirect to dashboard or login page
2. **Data Loading**: Application start → Firebase Auth check → load user data from Firestore
3. **User Interactions**: UI actions → state updates → save to Firestore → real-time sync
4. **Section Navigation**: Navigation clicks → hide/show sections → update active states

## External Dependencies

- **Firebase SDK 10.7.1**: Authentication and Firestore database
- **Font Awesome 6.0**: CDN-hosted icon library for UI elements
- **Chart.js**: Data visualization library for payment charts
- **jsPDF & jsPDF-AutoTable**: PDF generation libraries
- **Python**: HTTP server for development

## Deployment Strategy

- **Static Hosting + Backend**: Frontend served as static files, Python server for Firebase config API
- **Port 5000**: Application bound to 0.0.0.0:5000 for Replit compatibility
- **Environment Variables**: Firebase credentials stored as Replit Secrets for security
- **Browser Compatibility**: Modern browsers supporting ES6+ modules and Firebase SDK

### File Structure
```
/
├── index.html          # Main application page (dashboard)
├── login.html          # Authentication page
├── styles.css          # Complete styling with theme support
├── app.js              # Main application logic and UI
├── firebase-config.js  # Firebase configuration loader (secure)
├── firebase-auth.js    # Firebase authentication module
├── firebase-db.js      # Firebase Firestore database module
├── server.py           # Python HTTP server with Firebase config API
└── logo tontine.png    # Application logo for reports
```

### Key Architectural Decisions

1. **Firebase Backend**: Cloud-based authentication and Firestore database for reliable data persistence and multi-device access
2. **Secure Configuration**: Firebase API keys loaded from environment variables via server endpoint for enhanced security
3. **Vanilla JavaScript**: Avoided frameworks to keep the application lightweight and reduce dependencies
4. **Section-based SPA**: Simple navigation system without complex routing libraries
5. **CSS Custom Properties**: Modern approach for theming and maintainable styling
6. **French Language**: Designed specifically for French-speaking users managing tontines

## Recent Updates

### Bug Fixes and Security Improvements (October 20, 2025)

#### 1. Monthly PDF Report - Member Count Fix
- **Issue**: Member count in PDF reports showed 0 or incorrect values
- **Fix**: Changed from `tontine.members` to `tontine.membersWithPositions.length` with fallback to `tontine.totalRounds`
- **Location**: `generateTontinesTable()` function in app.js (line 3150)
- **Impact**: PDF reports now correctly display the number of members in each tontine

#### 2. Payment Filter Button - Missing Event Listener
- **Issue**: Filter button in payments section was not functional
- **Fix**: Added event listener for `filter-payments-btn` that calls `filterPayments()` function
- **Location**: Initialization section in app.js (lines 461-462)
- **Implementation**: 
  - Filter function supports multi-criteria filtering (tontine, status, month)
  - Filters are passed to `renderPayments()` for display
  - Success notification shown when filters are applied
- **Impact**: Users can now filter payments by tontine, status, and month

#### 3. Payment Evolution Chart - Chart.js Instance Management
- **Issue**: Payment chart didn't render or caused errors on re-render
- **Fix**: Implemented proper Chart.js instance lifecycle management
- **Location**: `initPaymentsChart()` function in app.js (lines 3785-3890)
- **Implementation**:
  - Added global `paymentsChartInstance` variable to track Chart instance
  - Destroy existing instance before creating new one to prevent memory leaks
  - Added Chart.js availability check before initialization
  - Enhanced error handling with try-catch block
  - Chart displays last 6 months of payment data with proper formatting
- **Impact**: Payment evolution chart now renders correctly without errors

#### 4. Firebase Security - Environment Variables Migration
- **Issue**: Firebase API keys were exposed in firebase-config.js file
- **Fix**: Migrated all Firebase credentials to Replit Secrets (environment variables)
- **Implementation**:
  - `firebase-config.js`: Now exports `loadFirebaseConfig()` function that fetches config from server
  - `server.py`: Added `/api/firebase-config` endpoint that reads from environment variables
  - `firebase-auth.js`: Updated to use `loadFirebaseConfig()` instead of hardcoded values
  - `firebase-db.js`: Updated to use `loadFirebaseConfig()` instead of hardcoded values
  - All 7 Firebase credentials stored as Replit Secrets:
    - FIREBASE_API_KEY
    - FIREBASE_AUTH_DOMAIN
    - FIREBASE_PROJECT_ID
    - FIREBASE_STORAGE_BUCKET
    - FIREBASE_MESSAGING_SENDER_ID
    - FIREBASE_APP_ID
    - FIREBASE_MEASUREMENT_ID
- **Security Impact**: 
  - API keys no longer visible in source code
  - Credentials cannot be extracted from client-side files
  - Keys managed securely through Replit Secrets interface
  - Production-ready security configuration

### Penalty System Implementation (July 11, 2025)
- **Automatic Penalty Calculation**: 10% penalty automatically applied for payments made after due date
- **Due Date Calculation**: Based on tontine frequency (weekly, monthly, quarterly) starting from tontine start date
- **Real-time Updates**: Payment form calculates penalties instantly when date is selected
- **Visual Indicators**: 
  - Payment amount field changes color when penalty is applied
  - Penalty notification appears below amount field
  - Penalty details added to payment notes automatically
- **Payment History**: Penalties are tracked and displayed in payment lists
- **Enhanced Functions**:
  - `calculateRoundDueDate()`: Calculates due date for specific round based on tontine frequency
  - `calculatePaymentAmount()`: Enhanced to return penalty information
  - `updatePaymentAmount()`: Real-time penalty calculation in payment form
  - Event listeners for automatic penalty calculation on date/type changes

### How the Penalty System Works:
1. **Due Date Calculation**: Each tour has a due date based on tontine start date and frequency
2. **Penalty Application**: When payment date is after due date, 10% penalty is automatically added
3. **User Feedback**: Visual indicators and notifications inform users about penalties
4. **Data Storage**: Penalty amounts and details are stored with payment records
5. **Real-time Updates**: Penalties are calculated and displayed immediately in the payment form

### Member Search Functionality Implementation (July 11, 2025)
- **Search by Name or CNI**: Users can search for members by typing their name or CNI (national ID)
- **Real-time Search**: Search results appear as you type, with instant filtering
- **Visual Search Results**: Each result shows member name, phone, and CNI in a clear format
- **Add to Tontine**: Click "Ajouter" button to add member to tontine with position selection
- **Position Management**: Selected members can be assigned positions with duplicate validation
- **Remove Members**: Easy removal of selected members with confirmation feedback
- **Enhanced UI**: 
  - Search box with icon
  - Dropdown search results with hover effects
  - Selected member badges and visual indicators
  - Responsive design with proper spacing
- **State Management**: New `selectedTontineMembers` array tracks member selections
- **Enhanced Functions**:
  - `setupMemberSearch()`: Initializes search functionality and event listeners
  - `handleMemberSearch()`: Filters members based on search query
  - `addMemberToTontine()`: Adds selected member to tontine
  - `displaySelectedMembers()`: Shows selected members with position controls
  - `updateMemberPosition()`: Handles position changes with validation
  - `removeMemberFromTontine()`: Removes member from selection
  - `validatePositionsNew()`: Validates position uniqueness

### How Member Search Works:
1. **Search Input**: Type member name, CNI, or phone number
2. **Real-time Filtering**: Results appear instantly as you type
3. **Add Members**: Click "Ajouter" to add member to tontine
4. **Position Assignment**: Assign unique positions to each selected member
5. **Validation**: System prevents duplicate positions and validates completeness
6. **Visual Feedback**: Selected members are highlighted with badges and controls

### Cagnotte Rapportée System Implementation (July 11, 2025)
- **Automatic Detection**: When all regular tontine rounds are completed, additional payments are automatically marked as "cagnotte rapportée"
- **Destinataire Assignment**: Each cagnotte payment is assigned to the member who would receive it based on rotation
- **Visual Indicators**: 
  - Special styling with warning color border and background
  - Piggy bank icon to distinguish from regular payments
  - Star icon in amount display
  - Clear labeling as "Cagnotte rapportée"
- **Statistics Integration**: Member statistics now show separate totals for regular payments and cagnotte rapportée
- **Payment History**: Enhanced payment history shows receiver information for cagnotte payments
- **Enhanced Functions**:
  - `checkTontineCompletion()`: Detects completed tontines and processes additional payments
  - `updateAvailableRounds()`: Allows additional payment rounds after completion
  - Modified `getTabContent()`: Displays cagnotte statistics and visual indicators
  - Enhanced `getPaymentTypeText()`: Includes "Cagnotte rapportée" type
- **User Experience**: 
  - Notifications inform when payments are processed as cagnotte rapportée
  - Clear visual distinction between regular contributions and cagnotte payments
  - Member details show total cagnotte amounts received

### Dark Mode Notification Fix (July 11, 2025)
- **Responsive Design**: Notifications now use CSS custom properties for theming
- **Dark Mode Compatible**: Background and text colors adapt to current theme
- **Border Styling**: Consistent border colors that work in both light and dark modes
- **Improved Readability**: Better contrast ratios for accessibility

### How Cagnotte Rapportée Works:
1. **Completion Detection**: System monitors when all regular tontine rounds are paid
2. **Additional Payments**: After completion, new payments are automatically processed as cagnotte
3. **Rotation Logic**: Payments are assigned to members based on continuing the position rotation
4. **Visual Feedback**: Special styling and icons distinguish cagnotte from regular payments
5. **Statistics Tracking**: Separate totals maintained for regular contributions and cagnotte amounts

## Security Best Practices

### Current Implementation
1. **Environment Variables**: All Firebase credentials stored as Replit Secrets
2. **Server-side Config**: Firebase config served via `/api/firebase-config` endpoint from environment variables
3. **No Hardcoded Secrets**: Source code contains no sensitive credentials
4. **User Data Isolation**: Firestore security rules isolate each user's data
5. **Authentication Required**: All database operations require valid Firebase authentication

### Recommendations
- Keep Replit Secrets updated if Firebase credentials change
- Never commit `.env` files or hardcoded credentials to version control
- Regularly review Firebase security rules
- Monitor Firebase usage for unusual activity
