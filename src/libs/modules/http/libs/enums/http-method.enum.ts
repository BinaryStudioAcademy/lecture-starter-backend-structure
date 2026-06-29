const HTTPMethod = {
  DELETE: "DELETE",
  GET: "GET",
  PATCH: "PATCH",
  POST: "POST",
  PUT: "PUT",
} as const;

type HTTPMethod = (typeof HTTPMethod)[keyof typeof HTTPMethod];

export { HTTPMethod };
