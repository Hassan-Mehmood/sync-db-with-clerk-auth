const express = require("express");
const { Webhook } = require("svix");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const WEBHOOK_SECRET = "your-server-webhook-secret"; // Replace with your actual webhook secret

app.post("/clerk/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);

    let msg;
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        return res.status(400).json({});
    }

    const { id, ...attributes } = msg.data;
    const eventType = msg.type;

    switch (eventType) {
        case "user.created":
            // Replace this with your actual database logic
            console.log("User created:", id, attributes);
            // Example: await db.users.create({ clerkId: id, ...attributes });
            break;
        case "user.updated":
            // Replace this with your actual database logic
            console.log("User updated:", id, attributes);
            // Example: await db.users.update({ where: { clerkId: id }, data: attributes });
            break;
        case "user.deleted":
            // Replace this with your actual database logic
            console.log("User deleted:", id);
            // Example: await db.users.delete({ where: { clerkId: id } });
            break;
        default:
            console.log("Unhandled event type:", eventType);
            break;
    }

    res.json({ success: true });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

