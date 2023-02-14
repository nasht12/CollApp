// POST /api/qa
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const { query } = req.body;
  // const sessionId = Date.now().toString();
  const session = await getSession({ req });

  console.log("session", session.expires);
  try {
    const result = { res: "hello" };

    await prisma.history.create({
      data: {
        prompt: query,
        response: result.res,
        session_id: session.expires,
        createdAt: new Date(),
      },
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while storing the history data." });
  }
}
