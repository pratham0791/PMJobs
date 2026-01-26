import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller function to manage clerk user with db
export const clerkWebhook = async (req, res) => {
  let evt;

  /* --------------------------------------------------
     1️⃣ Verify webhook using RAW body (REQUIRED)
  -------------------------------------------------- */
  try {
    // Create a svix instance with the clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // IMPORTANT: raw body, NOT req.body JSON
    const payload = req.body.toString("utf8");

    evt = whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
  } catch (error) {
    console.error("❌ Clerk webhook verification failed:", error);
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  /* --------------------------------------------------
     2️⃣ Acknowledge Clerk immediately
  -------------------------------------------------- */
  res.status(200).json({ received: true });

  /* --------------------------------------------------
     3️⃣ Handle event AFTER response
  -------------------------------------------------- */
  try {
    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          image: data.profile_image_url,
          resume: "",
        };
        await User.create(userData);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          image: data.profile_image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }
  } catch (dbError) {
    // DB errors should not fail the webhook
    console.error("⚠️ Clerk webhook DB error:", dbError);
  }
};
