import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/site/home", request.url))
}

export const config = {
  matcher: "/"
}
