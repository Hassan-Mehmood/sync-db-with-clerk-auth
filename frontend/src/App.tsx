import "./App.css";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
    return (
        <header style={{ display: "flex", justifyContent: "space-between", padding: 20, flexDirection: "column" }}>
            <h1>My App</h1>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    );
}

export default App;

