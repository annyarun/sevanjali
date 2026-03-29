"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { ActivityTag, ActivityUpdate } from "@/lib/activity-update-constants";

export type { ActivityTag, ActivityUpdate };

// ── Public ────────────────────────────────────────────────────

export async function getPublishedUpdates(tag?: ActivityTag) {
  const supabase = await createClient();
  let query = supabase
    .from("activity_updates")
    .select("*")
    .eq("published", true)
    .order("activity_date", { ascending: false });

  if (tag) query = query.eq("tag", tag);

  const { data, error } = await query;
  if (error) throw error;
  return data as ActivityUpdate[];
}

// ── Admin ─────────────────────────────────────────────────────

export async function getAllUpdates() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activity_updates")
    .select("*")
    .order("activity_date", { ascending: false });

  if (error) throw error;
  return data as ActivityUpdate[];
}

export async function createActivityUpdate(formData: FormData) {
  const title         = (formData.get("title") as string)?.trim();
  const body          = (formData.get("body") as string)?.trim();
  const photo_url     = (formData.get("photo_url") as string)?.trim() || null;
  const tag           = (formData.get("tag") as ActivityTag);
  const activity_date = (formData.get("activity_date") as string)?.trim();
  const published     = formData.get("published") === "true";

  if (!title || !body || !tag || !activity_date) {
    return { error: "Please fill in all required fields." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("activity_updates").insert({
    title, body, photo_url, tag, activity_date, published,
  });

  if (error) return { error: error.message };
  revalidatePath("/activities");
  revalidatePath("/admin/updates");
  return { success: true };
}

export async function updateActivityUpdate(id: string, formData: FormData) {
  const title         = (formData.get("title") as string)?.trim();
  const body          = (formData.get("body") as string)?.trim();
  const photo_url     = (formData.get("photo_url") as string)?.trim() || null;
  const tag           = (formData.get("tag") as ActivityTag);
  const activity_date = (formData.get("activity_date") as string)?.trim();
  const published     = formData.get("published") === "true";

  if (!title || !body || !tag || !activity_date) {
    return { error: "Please fill in all required fields." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("activity_updates")
    .update({ title, body, photo_url, tag, activity_date, published, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/activities");
  revalidatePath("/admin/updates");
  return { success: true };
}

export async function deleteActivityUpdate(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("activity_updates").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/activities");
  revalidatePath("/admin/updates");
  return { success: true };
}

export async function toggleUpdatePublished(id: string, published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("activity_updates")
    .update({ published })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/activities");
  revalidatePath("/admin/updates");
  return { success: true };
}
