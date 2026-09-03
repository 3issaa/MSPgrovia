// Minimal auth helper (localStorage/sessionStorage-based).
//
// This is a starting point: swap the internals later for a real API call,
// httpOnly cookies, or a Context/Redux store — the function names
// (login, logout, isAuthenticated, getCurrentUser) can stay the same, so
// nothing that imports from here has to change.

const TOKEN_KEY = "grovia_token";
const USER_KEY = "grovia_user";

/**
 * @param {string} token
 * @param {object} [user]
 * @param {boolean} [rememberMe] - true -> persists across browser restarts
 *   (localStorage), false -> cleared when the tab/browser closes
 *   (sessionStorage)
 */
export function login(token, user, rememberMe = true) {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  if (user) storage.setItem(USER_KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const raw =
    localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated() {
  return Boolean(getToken());
}
