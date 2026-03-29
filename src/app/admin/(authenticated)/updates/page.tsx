import { getAllUpdates } from "@/lib/actions/activity-updates";
import { UpdatesList } from "./updates-list";

export default async function UpdatesAdminPage() {
  const updates = await getAllUpdates();
  return <UpdatesList updates={updates} />;
}
