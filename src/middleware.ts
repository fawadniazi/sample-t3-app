import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { nanoid } from "nanoid";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	//console.log("Request ", request);
	if (request.cookies.get("poll-token")) {
		console.log("Cookie is already setup");
		return NextResponse.redirect(new URL("/", request.url));
	}
	const random = nanoid();
	const res = NextResponse.redirect(new URL("/signin", request.url));
	console.log("Setting Up cookie");

	res.cookies.set("poll-token", random, { sameSite: "strict" });
	return res;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/about/:path*",
};
