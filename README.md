# User Preferences Management System

A Node.js-based web application that allows users to register, login, and manage their preferences including allergies, cuisine preferences, nutritional requirements, and additional notes.

## Features

- User Registration and Authentication
- Secure Password Validation
- User Preferences Management
  - Allergies tracking
  - Cuisine preferences
  - Nutritional requirements
  - Additional notes
- Persistent Data Storage
- RESTful API Endpoints

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mste33/LeftoverGenie.git
cd LeftoverGenie
```

2. Install dependencies:
```bash
npm install
```

3. Create required data files:
```bash
mkdir data
touch data/users.txt
touch data/user_preferences.txt
```

## Project Structure

```
├── public/              # Static files and frontend assets
├── data/               # Data storage
│   ├── users.txt      # User credentials
│   └── user_preferences.txt  # User preferences
├── server.js          # Main application file
├── package.json       # Project dependencies and scripts
├── package-lock.json  # Dependency lock file
└── README.md         # Project documentation
```

> Note: The `node_modules` directory is not included in the repository as it contains all the installed dependencies. It will be created automatically when you run `npm install`.

## API Endpoints

### Authentication
- `POST /register` - Register a new user
  - Body: `{ username, password }`
  - Requirements:
    - Username: alphanumeric only
    - Password: minimum 4 characters, at least one letter and one digit

- `POST /login` - User login
  - Body: `{ username, password }`
  - Returns: Redirects to dashboard on success

### Preferences Management
- `GET /check-preferences` - Check if user has saved preferences
  - Query: `username`
  - Returns: `{ hasPreferences: boolean }`

- `POST /save-preferences` - Save user preferences
  - Body: `{ username, allergies, cuisine, nutrition, additional }`
  - Returns: `{ success: boolean }`

- `GET /get-preferences` - Retrieve user preferences
  - Query: `username`
  - Returns: `{ allergies, cuisine, nutrition, additional }`

## Running the Application

1. Start the server:
```bash
npm start
```

2. Access the application:
Open your web browser and navigate to `http://localhost:3000`

## Dependencies

- express: ^4.21.2 - Web framework
- body-parser: ^1.20.2 - Request body parsing
- bcrypt: ^5.1.1 - Password hashing
- express-session: ^1.17.3 - Session management

## Security Features

- Password validation requirements
- Username format validation
- Secure session management
- Input sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

mste33 - [https://github.com/mste33]

Project Link: https://github.com/mste33/LeftoverGenie 
