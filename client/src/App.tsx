import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import "./App.css";

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    isLoading,
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

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="card">
          <h1>GraphQL Auth0 App</h1>
          <p>Secure authentication with Auth0</p>
          <button className="primary-btn" onClick={() => loginWithRedirect()}>
            Login with Auth0
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <img
          src={user?.picture}
          alt="profile"
          className="avatar"
        />
        <h2>Welcome {user?.name}</h2>
        <p className="email">{user?.email}</p>

        <button className="primary-btn" onClick={callAPI}>
          Call Protected API
        </button>

        {message && <div className="response">{message}</div>}

        <button
          className="logout-btn"
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
    </div>
  );
}

export default App;