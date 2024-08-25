export const serverDomainUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_SERVER_URL
    : "http://127.0.0.1:8000";
