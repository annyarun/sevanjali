"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  toggleDonorAvailability,
  toggleRequestFulfilled,
  deleteBloodDonor,
  deleteBloodRequest,
  type BloodDonor,
  type BloodRequest,
} from "@/lib/actions/blood-bank";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import { Droplets, Heart, Phone, Mail, MapPin, Clock, AlertTriangle } from "lucide-react";

const BLOOD_GROUP_COLORS: Record<string, string> = {
  "A+": "bg-red-50 text-red-600",
  "A-": "bg-red-50 text-red-700",
  "B+": "bg-orange-50 text-orange-600",
  "B-": "bg-orange-50 text-orange-700",
  "O+": "bg-green-50 text-green-600",
  "O-": "bg-green-50 text-green-700",
  "AB+": "bg-purple-50 text-purple-600",
  "AB-": "bg-purple-50 text-purple-700",
};

function BloodGroupBadge({ group }: { group: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${BLOOD_GROUP_COLORS[group] ?? "bg-gray-100 text-gray-600"}`}>
      {group}
    </span>
  );
}

function DonorsTab({ donors }: { donors: BloodDonor[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<"all" | "available" | "unavailable">("all");

  const filtered = donors.filter((d) => {
    if (filter === "available") return d.available;
    if (filter === "unavailable") return !d.available;
    return true;
  });

  function handleToggle(id: string, current: boolean) {
    startTransition(async () => {
      await toggleDonorAvailability(id, !current);
      router.refresh();
    });
  }

  async function handleDelete(id: string) {
    await deleteBloodDonor(id);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Blood Donors</h2>
          <p className="text-sm text-gray-500">
            {donors.length} registered · {donors.filter((d) => d.available).length} available
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {(["all", "available", "unavailable"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">Donor</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Blood Group</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Contact</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Location</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Last Donated</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((donor) => (
              <tr key={donor.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                      <Heart size={14} className="text-red-500" />
                    </div>
                    <p className="font-medium text-gray-900">{donor.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <BloodGroupBadge group={donor.blood_group} />
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Phone size={11} className="text-gray-400" /> {donor.phone}
                    </div>
                    {donor.email && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Mail size={11} className="text-gray-400" /> {donor.email}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin size={11} className="text-gray-400" /> {donor.location}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {donor.last_donated_at
                    ? new Date(donor.last_donated_at).toLocaleDateString("en-IN")
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    disabled={isPending}
                    onClick={() => handleToggle(donor.id, donor.available)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      donor.available
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {donor.available ? "Available" : "Unavailable"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    <DeleteConfirm title={donor.name} onConfirm={() => handleDelete(donor.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                  No donors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RequestsTab({ requests }: { requests: BloodRequest[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<"all" | "pending" | "fulfilled">("all");

  const filtered = requests.filter((r) => {
    if (filter === "pending") return !r.fulfilled;
    if (filter === "fulfilled") return r.fulfilled;
    return true;
  });

  function handleToggle(id: string, current: boolean) {
    startTransition(async () => {
      await toggleRequestFulfilled(id, !current);
      router.refresh();
    });
  }

  async function handleDelete(id: string) {
    await deleteBloodRequest(id);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Blood Requests</h2>
          <p className="text-sm text-gray-500">
            {requests.length} total · {requests.filter((r) => !r.fulfilled).length} pending
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {(["all", "pending", "fulfilled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">Patient</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Blood / Units</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Hospital</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Contact</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Urgency</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req) => (
              <tr key={req.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                      <Droplets size={14} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{req.patient_name}</p>
                      {req.message && (
                        <p className="text-xs text-gray-400 truncate max-w-[160px]">{req.message}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BloodGroupBadge group={req.blood_group} />
                    <span className="text-xs text-gray-500">{req.units_needed} unit{req.units_needed > 1 ? "s" : ""}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-gray-700">{req.hospital}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={10} className="text-gray-400" /> {req.location}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-0.5">
                    <p className="text-xs text-gray-700">{req.contact_name}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Phone size={10} className="text-gray-400" /> {req.contact_phone}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {req.urgency === "urgent" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                      <AlertTriangle size={11} /> Urgent
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                      <Clock size={11} /> Normal
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    disabled={isPending}
                    onClick={() => handleToggle(req.id, req.fulfilled)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      req.fulfilled
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    }`}
                  >
                    {req.fulfilled ? "Fulfilled" : "Pending"}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    <DeleteConfirm title={req.patient_name} onConfirm={() => handleDelete(req.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                  No blood requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BloodBankList({
  donors,
  requests,
}: {
  donors: BloodDonor[];
  requests: BloodRequest[];
}) {
  const [tab, setTab] = useState<"donors" | "requests">("requests");

  const pendingRequests = requests.filter((r) => !r.fulfilled).length;
  const availableDonors = donors.filter((d) => d.available).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Blood Bank</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage donor registrations and blood requests from the community
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Donors", value: donors.length, color: "text-red-600" },
          { label: "Available Now", value: availableDonors, color: "text-green-600" },
          { label: "Total Requests", value: requests.length, color: "text-orange-600" },
          { label: "Pending Requests", value: pendingRequests, color: "text-yellow-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("requests")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "requests" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Droplets size={16} />
          Blood Requests
          {pendingRequests > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {pendingRequests}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("donors")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "donors" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Heart size={16} />
          Donor Registry
        </button>
      </div>

      {tab === "requests" ? (
        <RequestsTab requests={requests} />
      ) : (
        <DonorsTab donors={donors} />
      )}
    </div>
  );
}
