# Step 1:

## Create a new project on clerk

-   We will be using Google Auth only for this tutorial

# Step 2:

## Setup the Frontend

-   We will use ReactJS for this tutorial
-   First we need to setup the react project.

    -   We will be using vite to setup our react project
    -   Run this command in the terminal
    -   `npm create vite@latest your-project-name -- --template react-ts`
    -   cd your-project-name
    -   `npm install @clerk/clerk-react@latest`
    -   `npm run dev`

-   Now our project is running on http://localhost:5173
-   We need to set up the clerk auth on the frontend

    -   Create an .env.local file
    -   Paste your clerk publishable key in .env.local
    -   Now wrap your App with ClerkProvider
        -   Open main.tsx
    -   Use Clerk's built in components to display login and logout buttons
        -   Open App.tsx
        -   Use Clerk's built in components to display login and logout buttons

-   With this now you have a basic application with Clerk Auth setup
-   You can signup and login with your google account

# Step 3: Setup the Backend

-   We will be using ExpressJS for this tutorial
-   Initialize a new project by running `npm init -y`
-   Install express by running `npm install express`
-   Create a new file called index.js - Paste the following code in index.js

```js
const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
```

-   Install nodemon by running

```bash
npm install nodemon -D
```

-   Run the server by running `npm run dev`
-   Now your backend is running on http://localhost:3000

# Step 4: Create endpoints for Clerk Webhooks to call

-   Go to Clerk Dashboard > Configure > Webhooks
    -   Add a new Endpoint
    -   [place an image here]
    -   For the endpoint URL, we need to expose our backend that is running on http://localhost:3000 to the internet using tool called NGROK
    -   If you don't have ngrok, you need to install it, checkout this video on youtube [https://www.youtube.com/watch?v=aFwrNSfthxU]
    -   When you are done with installing NGROK, run `ngrok http 3000`, copy that url and paste it in the endpoint URL field
    -   Subscribe to any events you want.
    -   We will suscribe to events related to users i.e `user.created`, `user.updated`, `user.deleted`
    -   Click on the create button
-   Clerk uses "Svix" to send webhooks
-   And we also need to install clerk's sdk for express
-   Run this command to install `npm install svix @clerk/express`

-   Now we will create an endpoint for clerk webhooks to call

```js
const { Webhook } = require("svix");
const bodyParser = require("body-parser");

app.post("/clerk/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
    const secret = "your-webhook-secret";

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(secret);

    let msg;
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({});
    }

    console.log("Received webhook:", msg);

    res.json({});
});
```

-   You can get the webhooks secret by click on your endpoint
-   We need to edit the clerk endpoint url and add /clerk/webhook to the base url because we want only this endpoint to be called
-   In my case the url looks something like this https://280e-2407-d000-508-64cc-599f-8ec-7712-d415.ngrok-free.app/clerk/webhook
-   Now our backend is ready to receive clerk webhooks
-   Go to the frontend and login with a new account that is not singed up with this application
-   You should see a new user created event in the console

# Step 5: Store the users in a database

-   To store our users into database, we need to first check the type of the event. which we can get from msg.type property.
-   So the code should look something like this

```js
app.post("/clerk/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
    const secret = "whsec_FYDbj+efepkGa33Pw/3BZMitPm8p0o8f";

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(secret);

    let msg;
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({});
    }

    console.log("Received webhook:", msg);

    switch (msg.type) {
        case "user.created":
            // write your logic to handle user creation
            console.log("Store user data in your database");
            break;
        case "user.updated":
            // write your logic to handle user updates
            console.log("Update user data in your database");
            break;
        case "user.deleted":
            // write your logic to handle user deletion
            console.log("Delete user data from your database");
            break;
        default:
            console.log("Unhandled event type:", msg.type);
            break;
    }

    res.json({});
});
```

