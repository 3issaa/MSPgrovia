import { getToken } from "./auth";

const baseUrl = import.meta.env.VITE_API_URL || "/api";

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || "Request failed. Please try again.");
  return payload;
}
