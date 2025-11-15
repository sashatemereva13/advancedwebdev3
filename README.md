# User Management Application

A vanilla JavaScript application for managing user data with real-time updates and no page refreshes.

## Features

- Fetch & Display Users: Retrieves user data from a REST API and displays them in a card-based layout
- Live Updates: Edit user information with changes reflected instantly without page reload
- Responsive Design: Built with Bootstrap 5 for a mobile-friendly interface
- Loading States: Visual feedback with spinners during data operations
- Error Handling: Comprehensive error messages for failed operations
- Modal-Based Editing: Clean user editing interface using Bootstrap modals

## Technologies Used

- Vanilla JavaScript (ES6+ modules)
- HTML5 for structure
- Bootstrap 5.3.8 for styling and components
- Fetch API for HTTP requests
- CSS3 for custom styling and animations

## Project Structure:

```
â”œâ”€â”€ index.html
â”œâ”€â”€ js/
â”‚   â”œâ”€â”€ script.js
â”‚   â””â”€â”€ utils/
â”‚       â”œâ”€â”€ fetchData.js
â”‚       â”œâ”€â”€ formFactory.js
â”‚       â””â”€â”€ putData.js
```

![User manager](./Screenshot.png)

## API Configuration

The application connects to: https://easy-simple-users-rest-api.onrender.com/api/users

### Required Headers:

- `Content-Type: application/json`
- `my_key: my_super_secret_phrase`

User Data Structure:

```javascript
{
  id: number,
  name: string,
  age: number,
  avatar_url: string,
  gender: string
}
```

## How It Works

1. Initial Load: Fetches all users from the API and displays them as cards
2. Edit User: Click the "Edit" button on any user card to open a modal with a pre-filled form
3. Update: Modify user details and click "Save changes"
4. Live Refresh: The user card updates immediately with the new data

## Installation & Setup

1. Clone or download the project
2. Ensure all files maintain the directory structure shown above
3. Open index.html in a modern web browser
4. No build process or npm installation required!

## Key Functions

- `loadData()`: Fetches users from the API
- `displayUsers()`: Renders user cards to the DOM
- `addEventListeners()`: Attaches edit functionality to buttons
- `updateCard()`: Updates the UI after successful edit
- `formFactory()`: Dynamically generates the edit form
- `putData()`: Sends PUT requests to update user data

## Browser Support

Requires a modern browser with support for:

- Fetch API
- ES6+ modules
- HTML5
- CSS3
- Bootstrap 5.3.8
- CSS Grid/Flexbox

## Error Handling

The application includes error handling for:

- Failed API requests
- Network errors
- Invalid responses
- Missing data

## Note: This is a demonstration project using a public REST API. The API may have rate limits or availability constraints.
