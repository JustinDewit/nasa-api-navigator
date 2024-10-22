# NASA API Navigator

![NASA API Navigator Screenshot](screenshot1.png)

## Project Overview

NASA API Navigator is a full-stack web application that provides an intuitive interface for exploring various NASA APIs.

## Key Features

- **Astronomy Picture of the Day (APOD)**: Display the daily astronomical image or photograph along with its explanation.
- **EPIC Earth Images**: Showcase daily full-color images of Earth from NASA's EPIC camera aboard the DSCOVR satellite.
- **Mars Rover Photos**: Browse the latest images captured by NASA's Mars rovers, including detailed mission information.
- **Responsive Design**: Fully responsive layout that adapts to various screen sizes and devices.
- **Server-Side Rendering**: Utilizes Next.js for improved performance and SEO.
- **API Integration**: Securely fetches and displays data from multiple NASA APIs.

## Technologies Used

- **Frontend**:

  - React 18
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - React Icons

- **Backend**:

  - Next.js API Routes
  - Node.js

- **Deployment**:
  - Vercel

## Project Structure

The project follows a modular structure, with key components including:

- **Pages**: Individual route components for APOD, EPIC, and Mars Rover photos.
- **API Routes**: Server-side API handlers for secure communication with NASA APIs.
- **Components**: Reusable UI components like the Sidebar for consistent navigation.
- **Styling**: Tailwind CSS for rapid and responsive UI development.

## Key Implementation Details

1. **NASA API Integration**: Custom API routes are implemented to securely fetch data from various NASA APIs. For example, the Mars Rover photos API integration can be found here:

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/nasa-api-navigator.git
   ```

2. Install dependencies:

   ```
   cd nasa-api-navigator
   npm install
   ```

3. Set up your environment variables:

   - Copy the `.env.local.example` file and rename it to `.env.local`
   - Open `.env.local` and replace `your_api_key_here` with your actual NASA API key:

   ```
   NASA_API_KEY=your_actual_api_key_here
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Deployment

This project is configured for easy deployment on Vercel. Simply connect your GitHub repository to Vercel, and it will automatically deploy your application with each push to the main branch.

The live version of this project is accessible at [https://nasa-api-navigator.vercel.app/](https://nasa-api-navigator.vercel.app/).

## Conclusion

The NASA API Navigator demonstrates proficiency in full-stack web development, showcasing skills in React, Next.js, TypeScript, and API integration. This project highlights the ability to create responsive, performant, and user-friendly web applications while working with complex data sources.
