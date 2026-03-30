# Car Detailing Services Website
## Overview
This project is a full-stack web application for a car detailing service, built using Vue.js for the frontend and Firebase for the backend. The application includes functionalities for booking services, viewing a calendar of bookings, and admin controls to manage bookings and availability.

## Features
- Home Page: Displays information about the car detailing services.
- Service Page: Details about the different services offered.
- Booking Calendar: View and manage bookings on a calendar interface.
- Contact Page: Form for contacting the service.
- Admin Controls: Accessible only to authorized users for managing bookings and blocking out periods of time.
- Authentication: Google sign-in to access admin features.

## Technologies Used
- Frontend: Vue.js, Vite
- Backend: Firebase (Firestore, Authentication)
- Authentication: Google Sign-In
- Styling: CSS
## Setup and Installation
### Prerequisites
- Node.js and npm installed on your machine.
- A Firebase project set up and configured.
### Clone the Repository
```console
git clone https://github.com/nickbarrie/car-detailing.git
cd car-detailing
```
### Install Dependencies
```
npm install
```
### Configure Environment Variables
Create a .env file in the root of your project with the following content, replacing the placeholder values with your Firebase project credentials:

```
VUE_APP_FIREBASE_API_KEY=your-api-key
VUE_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
VUE_APP_FIREBASE_PROJECT_ID=your-project-id
VUE_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VUE_APP_FIREBASE_APP_ID=your-app-id
```
### Run the Development Server
```
npm run dev
```
Visit http://localhost:5000 in your browser to view the application.

### Build for Production
```
npm run build
```
The production-ready files will be generated in the dist folder.

## Firebase Configuration
Make sure to set up your Firebase project and enable Firestore and Authentication services. Update your Firebase configuration in the .env file accordingly.

### Firebase Authentication
- Google Sign-In: Enable Google Sign-In in your Firebase Authentication settings.
- Authorized Users: Only the specified Google account(s) will have access to the admin page.
## Admin Controls
To access the admin page, sign in with the authorized Google account. The admin controls allow you to:

- View a list of bookings
- Delete bookings
- Block out periods of time for bookings
## Directory Structure
- src/: Contains all source files for the Vue.js frontend.
  - components/: Vue components used throughout the application.
  - router/: Vue Router configuration.
  - firebase.js: Firebase initialization and configuration.
- public/: Static assets like images and the main HTML file.
- vite.config.js: Vite configuration for building the project.
## Troubleshooting
- Build Errors: Ensure all dependencies are correctly installed and the .env file is properly configured.
- Authentication Issues: Verify that Google Sign-In is properly set up in Firebase and that the correct email addresses are being used.
