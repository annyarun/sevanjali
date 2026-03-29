import { getAllBloodDonors, getAllBloodRequests } from "@/lib/actions/blood-bank";
import { BloodBankList } from "./blood-bank-list";

export default async function BloodBankAdminPage() {
  const [donors, requests] = await Promise.all([
    getAllBloodDonors(),
    getAllBloodRequests(),
  ]);

  return <BloodBankList donors={donors} requests={requests} />;
}
