// Prevent prerender for api
export const prerender = false;

import { defineMiddleware } from "astro/middleware";
import jwt from "jsonwebtoken";

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  const { request } = context;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const cookie = context.request.headers.get("cookie") ?? "";
    const match = cookie.match(/jwt=([^;]+)/);
    const token = match?.[1];

    try {
      jwt.verify(token, import.meta.env.JWT_SECRET);
      return next();
    } catch (err) {
      console.warn("Invalid JWT:", err);
      const loginUrl = new URL("/admin/login", request.url);
      return Response.redirect(loginUrl);
    }
  }

  return next();
});
