# Gestionnaire de Tontines

## Overview

This is a French-language tontine (rotating savings group) management application built as a single-page web application. The system allows users to manage members, create tontine groups, and track payments with a modern, responsive interface. The application is built using vanilla HTML, CSS, and JavaScript with client-side data persistence using localStorage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla JavaScript using a section-based navigation system
- **Client-side State Management**: Global state object managing members, tontines, and payments
- **Local Storage Persistence**: All data is stored locally in the browser using localStorage
- **Responsive Design**: Mobile-first CSS approach with CSS custom properties for theming
- **Component-based UI**: Modular sections with navigation-based routing (dashboard, members, tontines, payments)

### Technology Stack
- **HTML5**: Semantic markup with French language support (`lang="fr"`)
- **CSS3**: Modern styling with CSS custom properties, flexbox, and responsive design
- **Vanilla JavaScript**: No external frameworks, pure ES6+ JavaScript
- **Font Awesome 6.0**: Icon library for UI elements
- **SheetJS (xlsx)**: Excel file import/export functionality
- **Local Storage API**: Browser-based data persistence

## Key Components

### Authentication System
- **User Authentication**: Simple localStorage-based authentication system
- **Session Management**: Current user stored in localStorage with automatic redirect to login
- **User Interface Updates**: Dynamic user information display in header

### State Management
- **Global State Object**: Centralized state containing members, tontines, payments, and UI state
- **Data Persistence Functions**: `loadData()` and `saveData()` for localStorage operations
- **State Initialization**: Automatic loading from localStorage on application start

### Core Modules
1. **Member Management**: Add, edit, and track tontine participants
2. **Tontine Groups**: Create and manage different tontine cycles with configurable parameters
3. **Payment Processing**: Track payments with validation and payout processing
4. **Dashboard**: Overview statistics and quick actions with real-time updates

### UI Features
- **Theme Toggle**: Dark/light mode switching with CSS custom properties
- **Navigation System**: Section-based routing with active state management
- **Responsive Layout**: Container-based layout with mobile-first approach
- **French Localization**: Complete French language interface

## Data Flow

1. **Authentication Flow**: User login → localStorage verification → redirect to dashboard or login page
2. **Data Loading**: Application start → `loadData()` → populate state from localStorage
3. **User Interactions**: UI actions → state updates → `saveData()` → localStorage persistence
4. **Section Navigation**: Navigation clicks → hide/show sections → update active states

## External Dependencies

- **Font Awesome 6.0**: CDN-hosted icon library for UI elements
- **SheetJS (xlsx)**: CDN-hosted library for Excel file operations
- **No Backend Dependencies**: Fully client-side application

## Deployment Strategy

- **Static Hosting**: Can be deployed on any static hosting platform (Netlify, Vercel, GitHub Pages)
- **No Build Process**: Direct file serving - no compilation or bundling required
- **Browser Compatibility**: Modern browsers supporting ES6+ and localStorage
- **Offline Capability**: Fully functional offline once loaded due to localStorage persistence

### File Structure
```
/
├── index.html          # Main application page
├── styles.css          # Complete styling with theme support
├── app.js             # Main application logic
├── login.html         # Authentication page (referenced but not included)
└── assets/            # Additional assets (if any)
```

### Key Architectural Decisions

1. **localStorage Over Database**: Chosen for simplicity and offline capability, suitable for small-scale personal/group use
2. **Vanilla JavaScript**: Avoided frameworks to keep the application lightweight and reduce dependencies
3. **Section-based SPA**: Simple navigation system without complex routing libraries
4. **CSS Custom Properties**: Modern approach for theming and maintainable styling
5. **French Language**: Designed specifically for French-speaking users managing tontines

## Recent Updates

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