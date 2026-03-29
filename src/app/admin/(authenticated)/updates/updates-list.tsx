"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  createActivityUpdate,
  updateActivityUpdate,
  deleteActivityUpdate,
  toggleUpdatePublished,
  type ActivityUpdate,
} from "@/lib/actions/activity-updates";
import { ACTIVITY_TAGS } from "@/lib/activity-update-constants";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { X, Plus, Pencil, Calendar, Tag, Eye, EyeOff } from "lucide-react";

const TAG_COLORS: Record<string, string> = {
  healthcare: "bg-red-50 text-red-600",
  community:  "bg-blue-50 text-blue-600",
  religious:  "bg-amber-50 text-amber-600",
  education:  "bg-green-50 text-green-600",
};

// ── Form Modal ────────────────────────────────────────────────

function UpdateForm({
  update,
  onClose,
}: {
  update?: ActivityUpdate;
  onClose: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState(update?.photo_url ?? "");
  const [published, setPublished] = useState(update?.published ?? true);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("photo_url", photoUrl);
    // Set published via controlled state to avoid hidden+checkbox ordering issues
    formData.set("published", published ? "true" : "false");

    startTransition(async () => {
      const result = update
        ? await updateActivityUpdate(update.id, formData)
        : await createActivityUpdate(formData);

      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
        onClose();
      }
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {update ? "Edit Update" : "New Activity Update"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              defaultValue={update?.title}
              required
              placeholder="e.g. 110th Blood Donation Drive"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-orange-400"
            />
          </div>

          {/* Tag + Date row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="tag"
                defaultValue={update?.tag ?? "healthcare"}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-orange-400"
              >
                {ACTIVITY_TAGS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Date <span className="text-red-500">*</span>
              </label>
              <input
                name="activity_date"
                type="date"
                defaultValue={update?.activity_date ?? new Date().toISOString().split("T")[0]}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Write-up <span className="text-red-500">*</span>
            </label>
            <textarea
              name="body"
              defaultValue={update?.body}
              required
              rows={6}
              placeholder="Describe what happened at this activity. Each new line becomes a new paragraph on the website."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-orange-400 resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">Each blank line = new paragraph on site.</p>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
            <ImageUpload value={photoUrl} onChange={(url) => setPhotoUrl(url)} />
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPublished((p) => !p)}
              className={`relative w-10 h-6 rounded-full transition-colors ${
                published ? "bg-orange-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  published ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-sm text-gray-700 font-medium">
              {published ? "Published" : "Draft (not visible on site)"}
            </span>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isPending ? "Saving…" : update ? "Save Changes" : "Publish Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main List ─────────────────────────────────────────────────

export function UpdatesList({ updates }: { updates: ActivityUpdate[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ActivityUpdate | undefined>();
  const [tagFilter, setTagFilter] = useState("all");

  const filtered = tagFilter === "all" ? updates : updates.filter((u) => u.tag === tagFilter);

  async function handleDelete(id: string) {
    await deleteActivityUpdate(id);
    router.refresh();
  }

  function handleTogglePublish(id: string, current: boolean) {
    startTransition(async () => {
      await toggleUpdatePublished(id, !current);
      router.refresh();
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Activity Updates</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {updates.length} posts · {updates.filter((u) => u.published).length} published
          </p>
        </div>
        <button
          onClick={() => { setEditing(undefined); setShowForm(true); }}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} /> New Update
        </button>
      </div>

      {/* Tag filter */}
      <div className="flex gap-2 flex-wrap mb-4">
        {["all", "healthcare", "community", "religious", "education"].map((t) => (
          <button
            key={t}
            onClick={() => setTagFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              tagFilter === t ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {t === "all" ? "All" : t}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {filtered.map((update) => (
          <div key={update.id} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 items-start">
            {/* Thumbnail */}
            {update.photo_url ? (
              <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                <Image src={update.photo_url} alt={update.title} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-20 h-16 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center">
                <span className="text-xs text-gray-400">No photo</span>
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded capitalize ${TAG_COLORS[update.tag] ?? "bg-gray-100 text-gray-600"}`}>
                  {update.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={11} />
                  {new Date(update.activity_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <p className="font-medium text-gray-900 truncate">{update.title}</p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{update.body.slice(0, 100)}…</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                disabled={isPending}
                onClick={() => handleTogglePublish(update.id, update.published)}
                title={update.published ? "Unpublish" : "Publish"}
                className={`p-2 rounded-lg transition-colors ${update.published ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-50"}`}
              >
                {update.published ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button
                onClick={() => { setEditing(update); setShowForm(true); }}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Pencil size={16} />
              </button>
              <DeleteConfirm title={update.title} onConfirm={() => handleDelete(update.id)} />
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 py-16 text-center text-gray-400 text-sm">
            No updates yet. Click &quot;New Update&quot; to post your first one.
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <UpdateForm
          update={editing}
          onClose={() => { setShowForm(false); setEditing(undefined); }}
        />
      )}
    </div>
  );
}
