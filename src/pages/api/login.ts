// Prevent prerender for api
export const prerender = false;

import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL = import.meta.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = jwt.sign({ email }, import.meta.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `jwt=${token}; Path=/; HttpOnly; SameSite=Lax${
      import.meta.env.PROD ? "; Secure" : ""
    }`
  );

  return new Response(JSON.stringify({ success: true }), {
    headers,
  });
};
