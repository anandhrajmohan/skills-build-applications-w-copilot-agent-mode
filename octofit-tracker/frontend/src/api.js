const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function unwrapCollection(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  for (const key of ['data', 'items', 'results', 'docs']) {
    if (key in payload) {
      const value = payload[key];
      if (Array.isArray(value)) return value;
      const nested = unwrapCollection(value);
      if (nested.length > 0) return nested;
    }
  }

  return [];
}

export async function fetchCollection(endpoint) {
  const response = await fetch(`${API_BASE_URL}/api/${endpoint}/`);
  if (!response.ok) {
    throw new Error(`Unable to load ${endpoint} (${response.status})`);
  }

  return unwrapCollection(await response.json());
}
