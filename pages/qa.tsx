import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getSession } from "next-auth/react";

const QA: React.FC = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState<
    Array<{ query: string; response: string }>
  >([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });

      const data = await response.json();
      console.log("here", data);
      // Store the response in the state or update the UI with the response here
      setResponse(data.res);
      setHistory([...history, { query, response: data.res }]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("history: ", history);
  }, [history]);

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {history.map((item, index) => (
        <div key={index} className="qa-container">
          <div className="query">{item.query}</div>
          <div className="response">{item.response}</div>
        </div>
      ))}
      <style jsx>{`
        .response {
          background: lightgray;
          padding: 1rem;
          margin-top: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default QA;
