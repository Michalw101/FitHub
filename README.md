# FitHub

FitHub is a comprehensive fitness management system designed to help users stay fit and receive tailored workout and activity recommendations. The project leverages modern technologies for both frontend and backend development, providing a seamless and interactive experience.

## Key Features

- **Trainer Profile View:** Displays detailed information about trainers, including their classes and schedules.
- **User Registration:** A multi-step registration form for trainers and trainees with robust validation.
- **Class Management:** Allows for the creation, updating, and deletion of fitness classes.
- **Form Validation:** Ensures accurate and complete user input before submission.
- **PDF Upload:** Facilitates uploading of certifications and degrees in PDF format.

## Technologies Used

### Frontend

- **React:** For building the user interface with reusable components.
- **Vite:** A fast development server and build tool for React applications.
- **Axios:** For making HTTP requests to the backend API.

### Backend

- **Node.js:** JavaScript runtime for building the server-side application.
- **Express:** Web framework for handling routes and middleware.
- **MySQL:** Relational database for storing user and class information.
- **Multer:** Middleware for handling file uploads (e.g., PDF certifications).

### Development Tools

- **Git:** Version control for managing the source code.
- **GitHub:** Repository hosting and collaboration.
- **PowerShell:** For scripting and managing development tasks on Windows.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Michalw101/FitHub.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd FitHub
    ```

3. **Install server dependencies:**

    ```bash
    cd server
    npm install
    ```

4. **Install client dependencies:**

    ```bash
    cd ../client
    npm install
    ```

5. **Configure environment variables:**
   
   Create a `.env` file in the `server` directory with the following example settings:

    ```env
    DATABASE_URL=your_database_url
    PORT=5000
    ```

6. **Start the server:**

    ```bash
    cd ../server
    npm start
    ```

7. **Start the client:**

    ```bash
    cd ../client
    npm start
    ```

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the client interface.
- The backend server runs at `http://localhost:5000`.

## Notable Features

- **Multi-Step Forms:** Implementation of a multi-step registration form with real-time validation and state management.
- **Dynamic Class Management:** Ability to dynamically manage fitness classes and update schedules.
- **File Uploads:** Integration of PDF file uploads for certifications and degrees.
- **Responsive Design:** Ensures the application is accessible and usable on various devices.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

