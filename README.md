Site Name: <h2>Soul Mingle</h2>

Live Link: https://soul-mingle-ed00e.web.app



<b>Features: </b>

+ The entire platform is optimized for mobile, tablet, and desktop devices, ensuring a seamless user experience across all screen sizes.

+ Implemented secure login and registration using JWT for both email/password and social (Google) authentication, ensuring user data protection.

+ Users can create, edit, and view detailed biodata profiles with comprehensive information, including age, occupation, and division.

+ Users can upgrade their profiles to premium status to access exclusive features such as viewing contact information and additional biodata details.

+ The platform offers robust filtering options for biodatas by age, gender, division, and occupation, along with sorting options for age in ascending or descending order.

+ Utilizes custom alerts and notifications for CRUD operations and authentication processes, enhancing user interaction without relying on default browser alerts.

+ Integrated Tanstack Query for efficient and real-time data fetching for GET requests, ensuring up-to-date information display.

+ A comprehensive admin dashboard for managing users, approving premium requests, handling contact information requests, and viewing key statistics through a pie chart.

+ A personalized user dashboard that includes functionalities like editing biodata, viewing contact requests, managing favorites, and submitting success stories.

+ Features sections for success stories and counters showcasing total biodatas, gender-specific biodatas, and completed marriages, highlighting the platform's impact.

___
<b>Project Overview:</b> 
Soul Mingle - Matrimonial Website Overview

This matrimonial website, developed using the MERN stack, is designed to provide a seamless and secure matchmaking experience across all devices. The platform offers a variety of features to enhance user interaction and ensure comprehensive data management.

<u>Key Features:</u>

+ Responsive Design:

Optimized for mobile, tablet, and desktop devices to ensure a consistent user experience across all screen sizes.

+ Secure Authentication:

Implemented JWT for secure login and registration.
Supports both email/password and Google social authentication to protect user data.
Detailed Biodata Profiles:

Users can create, edit, and view detailed biodata profiles with comprehensive information, including age, occupation, and division.

+ Premium Features:

Users can upgrade their profiles to premium status to access exclusive features such as viewing contact information and additional biodata details.
Premium biodata profiles are displayed prominently on the homepage.

+ Robust Filtering and Sorting:

Offers filtering options for biodatas by age, gender, division, and occupation.
Sorting options for age in ascending or descending order.

+ Custom Alerts and Notifications:

Utilizes custom alerts and notifications for CRUD operations and authentication processes to enhance user interaction.

+ Real-time Data Fetching:

Integrated Tanstack Query for efficient and real-time data fetching for GET requests, ensuring up-to-date information display.

+ User Dashboard:

Personalized dashboard for managing biodata, viewing contact requests, managing favorites, and submitting success stories.
Users can see paid contact information and manage their premium status.

+ Admin Dashboard:

Comprehensive admin dashboard for managing users, approving premium requests, handling contact information requests, and viewing key statistics through a pie chart.
Admins can make users admins, ban or delete users, and access payment history.

+ Success Stories and Counters:

Features sections for success stories and counters showcasing total biodatas, gender-specific biodatas, and completed marriages, highlighting the platform's impact.

This project demonstrates a robust and user-friendly matrimonial platform with extensive features for both users and administrators. It ensures a secure, efficient, and enjoyable experience for all users.

___
<h3>Installation Instructions for Cloning and Using Soul Mingle - Matrimonial Website</h3>


To clone and run the Soul Mingle - Matrimonial Website project locally, please follow these steps:

- To set up and run the matrimonial project locally, first, clone the repository using git clone and navigate to the project directory. 

- For the client side, navigate to the client directory using cd client, install the dependencies with npm install, and create a .env file in the client directory containing the necessary 
  
  - Firebase
  - Stripe 
  - environment variables
  
- For the server side, navigate to the server directory using cd ../server
- Install the dependencies with npm install, and create a .env file in the server directory with the required port number, 
   - MongoDB URI 
   - JWT secret 
   - Stripe secret key 

- Start the server by running npm start in the server directory, then navigate back to the client directory with cd ../client and start the client with npm start. 

Your application will be running locally, accessible at http://localhost:3000 for the client, with the server running on the port specified in your .env file.
