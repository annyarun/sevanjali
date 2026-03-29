export type ActivityTag = "healthcare" | "community" | "religious" | "education";

export type ActivityUpdate = {
  id: string;
  title: string;
  body: string;
  photo_url: string | null;
  tag: ActivityTag;
  activity_date: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export const ACTIVITY_TAGS: { value: ActivityTag; label: string; color: string }[] = [
  { value: "healthcare", label: "Healthcare", color: "bg-red-50 text-red-600 border-red-200" },
  { value: "community",  label: "Community",  color: "bg-blue-50 text-blue-600 border-blue-200" },
  { value: "religious",  label: "Religious",  color: "bg-amber-50 text-amber-600 border-amber-200" },
  { value: "education",  label: "Education",  color: "bg-green-50 text-green-600 border-green-200" },
];
