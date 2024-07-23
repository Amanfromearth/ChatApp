import { getUserMeLoader } from "@/data/services/getUserMeLoader";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const currentPath = request.nextUrl.pathname;
  
  
  if (currentPath === '/sign-in' || currentPath === '/sign-up') {
    return NextResponse.next();
  }

  const user = await getUserMeLoader();
  if (user.ok === false) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
}