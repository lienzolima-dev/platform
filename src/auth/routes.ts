/**
 * Public route patterns where authentication is not required
 */
const publicRoutePatterns = [
  /^\/$/, // Matches "/"
  /^\/login(\/.*)?$/, // Matches "/login" and any subroutes under it
  /^\/home(\/.*)?$/, // Matches "/home" and any subroutes under it
  /^\/imgs(\/.*)?$/, // Matches "/imgs" and any subroutes under it
  /^\/_image(\/.*)?$/, // Matches "/_image" and any subroutes under it
];

/**
 * Admin route patterns that require admin role access
 */
const adminRoutePatterns = [
  /^\/admin(\/.*)?$/, // Matches "/admin" and any subroutes under it
];

/**
 * Check if a route is public
 */
export function isPublicRoute(path: string): boolean {
  return publicRoutePatterns.some((pattern) => pattern.test(path));
}

/**
 * Check if a route is admin-only
 */
export function isAdminRoute(path: string): boolean {
  return adminRoutePatterns.some((pattern) => pattern.test(path));
}
