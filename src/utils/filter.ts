/**
 *
 * Updates the URL with a new filter and resets the page to 1.
 *
 * This function modifies the provided URL's query parameters by adding or updating
 * them with the values from the `newFilter` object.
 *
 * @params
 * @example
 * ```ts
 * const url = new URL('https://example.com/route?page=2&sort=name');
 * updateRoute(url, { sort: 'createdAt', favorites: 'true' });
 * // Output: '/route?sort=createdAt&favorites=true&page=1'
 * ```
 *
 * @returns A string representing the updated URL with the new filter applied.
 */
export function updateRoute(
  url: URL,
  newFilter: { [key: string]: string },
): string {
  const params = new URLSearchParams(url.search);

  for (const key in newFilter) {
    if (newFilter[key] === "") {
      params.delete(key);
      continue;
    }
    params.set(key, newFilter[key]);
  }

  if (!("page" in newFilter)) {
    params.set("page", "1");
  }

  const newRoute = `${url.pathname}?${params.toString()}`;
  return newRoute;
}
