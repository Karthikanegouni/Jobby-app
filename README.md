# Jobby App

A React app for searching and exploring jobs with filters, authentication, and detailed job views.

## Live Demo

- ### [Jobby APP LIVE](https://jobbyappkarthik.netlify.app/)   (hosted on Netlify)
- ### [Live Link](https://jobbyak.ccbp.tech/) (ccbp)

- #### Demo Credentials:

  ```bash
  username: rahul
  password: rahul@2021

  username: raja
  password: raja@2021
  ```

## Features

- Login with authentication (JWT)
- Protected routes for Home, Jobs, and Job Details
- Job search with live filters: employment type, salary range, keywords
- Profile view and filtering on Jobs page
- Success, failure, and empty state views for job, profile, and job details APIs
- Responsive UI for all screens
- Not Found page for invalid URLs
- Persistent login session with cookies

## Functionality

- Users must log in to access the app; unauthenticated routes redirect to Login
- Home page with navigation and "Find Jobs" CTA
- Jobs page shows filterable job list, search, employment types, and salary filtering
- Detailed job page for selected job, including company info, skills, life at company, and similar jobs
- Real API integration for login, jobs, profile, and job detail data
- Loader shown while fetching data; errors and retry buttons on failure
- Supports direct navigation via route links in the header and browser bar

## Cloning This Project

    git clone https://github.com/Karthikanegouni/NxtWave_React_practice.git
    cd NxtWave_React_practice/JobbyApp

## Installation & Running

1. Install dependencies:

   npm install

2. Start the development server using Vite:

   npm run dev

3. Visit:

   http://localhost:5173

## Technologies Used

- React
- Vite
- JavaScript
- REST API
- Cookies
- CSS

## License

This project is licensed under the MIT License.
