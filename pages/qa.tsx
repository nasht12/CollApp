import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { history: [] } };
  }
  const history = await prisma.history.findMany();
  const historyWithSerializableDates = history.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));
  return {
    props: { historyWithSerializableDates },
  };
};

export type HistoryProps = {
  id: string;
  prompt: string;
  response: string;
  session_id: Date;
  createdAt: string;
};

type Props = {
  history: HistoryProps[];
};

const QA: React.FC = (Props) => {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState<
    Array<{ query: string; response: string }>
  >([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await fetch("/api/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });

      const data = await result.json();
      console.log("here", data);
      console.log("Props", Props);
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

  if (!session) {
    return (
      <Layout>
        <h1>QA</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

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
