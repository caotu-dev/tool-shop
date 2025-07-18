// Prevent prerender for api
export const prerender = false;
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, request }) => {
  const loginUrl = new URL("/admin/login", request.url);
  cookies.delete("jwt", { path: "/" });
  return Response.redirect(loginUrl);
};
