"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ─── Types ────────────────────────────────────────────────────

export type BloodDonor = {
  id: string;
  name: string;
  blood_group: string;
  phone: string;
  email: string | null;
  location: string;
  available: boolean;
  last_donated_at: string | null;
  created_at: string;
};

export type BloodRequest = {
  id: string;
  patient_name: string;
  blood_group: string;
  units_needed: number;
  hospital: string;
  location: string;
  contact_name: string;
  contact_phone: string;
  urgency: string;
  message: string | null;
  fulfilled: boolean;
  created_at: string;
};

// ─── Public: Register as blood donor ─────────────────────────

export async function registerBloodDonor(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const blood_group = (formData.get("blood_group") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const email = (formData.get("email") as string)?.trim() || null;
  const location = (formData.get("location") as string)?.trim();
  const last_donated_at = (formData.get("last_donated_at") as string)?.trim() || null;

  if (!name || !blood_group || !phone || !location) {
    return { error: "Please fill in all required fields." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("blood_donors").insert({
    name, blood_group, phone, email, location, last_donated_at,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/blood-bank");
  return { success: true };
}

// ─── Public: Submit blood request ────────────────────────────

export async function submitBloodRequest(formData: FormData) {
  const patient_name = (formData.get("patient_name") as string)?.trim();
  const blood_group = (formData.get("blood_group") as string)?.trim();
  const units_needed = parseInt(formData.get("units_needed") as string) || 1;
  const hospital = (formData.get("hospital") as string)?.trim();
  const location = (formData.get("location") as string)?.trim();
  const contact_name = (formData.get("contact_name") as string)?.trim();
  const contact_phone = (formData.get("contact_phone") as string)?.trim();
  const urgency = (formData.get("urgency") as string)?.trim() || "normal";
  const message = (formData.get("message") as string)?.trim() || null;

  if (!patient_name || !blood_group || !hospital || !location || !contact_name || !contact_phone) {
    return { error: "Please fill in all required fields." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("blood_requests").insert({
    patient_name, blood_group, units_needed, hospital, location,
    contact_name, contact_phone, urgency, message,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/blood-bank");
  return { success: true };
}

// ─── Admin: Fetch all donors ──────────────────────────────────

export async function getAllBloodDonors() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blood_donors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as BloodDonor[];
}

// ─── Admin: Fetch all requests ────────────────────────────────

export async function getAllBloodRequests() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blood_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as BloodRequest[];
}

// ─── Admin: Toggle donor availability ────────────────────────

export async function toggleDonorAvailability(id: string, available: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("blood_donors")
    .update({ available })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/blood-bank");
  return { success: true };
}

// ─── Admin: Toggle request fulfilled ─────────────────────────

export async function toggleRequestFulfilled(id: string, fulfilled: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("blood_requests")
    .update({ fulfilled })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/blood-bank");
  return { success: true };
}

// ─── Admin: Delete donor ──────────────────────────────────────

export async function deleteBloodDonor(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blood_donors").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/blood-bank");
  return { success: true };
}

// ─── Admin: Delete request ────────────────────────────────────

export async function deleteBloodRequest(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blood_requests").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/blood-bank");
  return { success: true };
}
