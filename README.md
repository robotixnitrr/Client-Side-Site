# Robotix Club 2024 Website [BLOG]

Welcome to the Robotix Club 2024 Website project! Follow the steps below to set up and run the application locally.

## Getting Started

### Step 1: Install Dependencies: 
To run the website locally, you'll need to install the necessary dependencies for both the client and server. Use the following commands:

Client-side:
        
    cd client
    npm install

Server-side:
        
    cd server
    npm install

### Step 2: Create Environment Configuration: 
Create a .env file in the root of the server directory with the following content:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=set_your_JWT_Secret

    # Google OAuth credentials
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    SESSION_SECRET=your_session_secret

1. Replace your_mongodb_connection_string with your actual MongoDB connection string.
2. Set a secure JWT_SECRET for token encryption.
3. Obtain your Google OAuth credentials (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET) from the Google Developer Console.
4. Set a unique SESSION_SECRET for secure session management.

### Step 3: Run the Application: 
Once all dependencies are installed and environment variables are configured:

Start the Client:
    
    cd client
    npm run dev

Start the Server:
    
    cd server
    npm run dev

Your website will be running locally on http://localhost:5173
