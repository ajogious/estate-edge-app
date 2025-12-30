import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (req, { params }) => {
  try {
    // unwrap params (Next.js requirement)
    const { id } = await params;

    await connectDB();

    const property = await Property.findById(id).lean();

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    return new Response(JSON.stringify({ property }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
