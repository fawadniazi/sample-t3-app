import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	//console.log("Request ", request);
	if (request.cookies.get("userCookie")) {
		console.log("Cookie is already setup");
		return NextResponse.redirect(new URL("/", request.url));
	}
	const random = Math.random().toString();
	const res = NextResponse.redirect(new URL("/signin", request.url));
	console.log("Setting Up cookie");

	res.cookies.set("userCookie", random, { sameSite: "strict" });
	return res;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/about/:path*",
};
