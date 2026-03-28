import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config/api";

export default function ManageWhatsAppSettings() {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/settings`);
        if (!cancelled && res.data?.whatsappNumber) {
          setWhatsappNumber(res.data.whatsappNumber);
        }
      } catch (e) {
        if (!cancelled) alert("Could not load current number.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not logged in.");
      return;
    }
    setSaving(true);
    try {
      await axios.put(
        `${API_BASE}/api/settings`,
        { whatsappNumber },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Saved successfully!");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <form
        className="w-full"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="">
          <label htmlFor="whatsappNumber" className=""></label>
          <input
            type="text"
            id="whatsappNumber"
            placeholder="WhatsApp number (digits, e.g. 9779806438349)"
            className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            autoComplete="tel"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full py-2 px-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 mt-8 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
