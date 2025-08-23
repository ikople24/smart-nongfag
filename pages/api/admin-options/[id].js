import dbConnect from "@/lib/dbConnect";
import AdminOption from "@/models/AdminOption";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case "GET":
        const option = await AdminOption.findById(id);
        if (!option) {
          return res.status(404).json({ error: "Admin option not found" });
        }
        return res.status(200).json(option);

      case "PUT":
        const updated = await AdminOption.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
          return res.status(404).json({ error: "Admin option not found" });
        }
        return res.status(200).json(updated);

      case "DELETE":
        const deleted = await AdminOption.findByIdAndDelete(id);
        if (!deleted) {
          return res.status(404).json({ error: "Admin option not found" });
        }
        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
