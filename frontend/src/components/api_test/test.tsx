// components/ApiCaller.tsx
import React, { useState } from "react";

const ApiCaller = () => {
  const [response, setResponse] = useState("");

  const callApi = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: "hello from frontend" }),
      });

      const json = await res.json();
      setResponse(json.message);
    } catch (err) {
      setResponse("API call failed");
    }
  };

  return (
    <div style={{ border: '1px solid red', padding: '1rem' }}>
      <button onClick={callApi}>Call API</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default ApiCaller;