import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [message, setMessage] = useState("");

  const callAPI = async () => {
    const token = await getAccessTokenSilently();

    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: "query { hello }",
      }),
    });

    const data = await response.json();
    setMessage(data.data.hello);
  };

  if (!isAuthenticated) {
    return (
      <button onClick={() => loginWithRedirect()}>
        Login
      </button>
    );
  }

  return (
    <div>
      <h2>Welcome {user?.name}</h2>

      <button onClick={callAPI}>Call Protected API</button>

      <p>{message}</p>

      <button
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        }
      >
        Logout
      </button>
    </div>
  );
}

export default App;