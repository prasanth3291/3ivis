# 3IVIS Assignment

This project is a sample web application demonstrating a full-stack setup with a Django backend, JWT-based authentication, and a React frontend featuring data visualization with D3.js.

## Technologies Used

- **Backend**: Django, Django REST Framework (DRF), JWT for authentication
- **Frontend**: React, Redux, Axios, D3 for data visualization
- **Environment Management**: pyenv for managing Python environment
- **Database**: Postgres (local database for Django setup)
- **Project Template**: Cookiecutter Django for project scaffolding and structure

## Project Setup

### Cloning the Repository

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/prasanth3291/3ivis.git
    cd 3ivis
    ```

## Backend Setup

1. **Navigate to the Backend Folder**:

    ```bash
    cd backend
    ```

2. **Environment Setup**:

    - Create a `.env` file inside the `backend` folder.
    - In the `.env` file, provide the `DATABASE_URL` for connecting to Postgres. Example:

      ```plaintext
      DATABASE_URL=postgres://username:password@localhost:5432/ivis_db
      ```

    - Ensure the database name in `DATABASE_URL` matches the one specified in `base.py` within the `settings` folder (`backend/config/settings/base.py`).

3. **Activate Python Environment**:

    Use `pyenv` to activate the environment:

    ```bash
    pyenv activate 3ivis-assignment
    ```

4. **Database Setup**:

    - Create a Postgres database named `ivis_db` (or update the name in `.env` and `base.py` if using a different name).
    - Run migrations:

      ```bash
      python manage.py migrate
      ```

5. **Run Backend Server**:

    ```bash
    python manage.py runserver
    ```

## Frontend Setup

1. **Navigate to the Frontend Folder**:

    ```bash
    cd ivis-frontend
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Start the Frontend Server**:

    ```bash
    npm start
    ```

## Usage

### User Registration

- Open the frontend application in the browser.
- Register a new user using the registration form.

### Login

- Log in with the credentials created during registration.

### Dashboard

- Upon successful login, navigate to the dashboard.
- The dashboard displays a sample D3 chart.
- Click the "Load Data from API" button to load additional data from the backend.

**Note**: For simplicity, the application does not store data in the Postgres database; instead, it uses sample data for visualization.

## Additional Information

This project demonstrates a typical full-stack architecture:

- **Backend**: Handles user registration, login, and data retrieval.
- **Frontend**: Provides user interface and interactions with the backend API via Axios.
- **JWT Authentication**: Manages secure access to protected routes and data.
- **Cookiecutter Django**: Utilized for creating the Django project structure, offering a standardized and scalable layout.
