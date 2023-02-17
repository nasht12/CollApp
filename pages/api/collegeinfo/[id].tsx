import prisma from "../../../lib/prisma";

// GET /api/collegedata/:id
export default async function handleGet(req, res) {
  const unitId = parseInt(req.query.id);
  const collegeData = await prisma.collegedata.findMany({
    where: { UNITID: "100654" },
  });
  if (collegeData) {
    res.json(collegeData);
  } else {
    res.status(404).json({ message: "College data not found" });
  }
}
