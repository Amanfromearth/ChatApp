
import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";

export async function getUserMeLoader() {
  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: 'No auth token' };

  const baseUrl = getStrapiURL();
  const url = new URL("/api/users/me", baseUrl);

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      return { ok: false, data: null, error: `HTTP error! status: ${response.status}` };
    }

    const data = await response.json();
    return { ok: true, data, error: null };
  } catch (error) {
    console.error('Error in getUserMeLoader:', error);
    return { ok: false, data: null, error: error.message };
  }
}