import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const token = request.cookies.get('next-auth.session-token')

    const PROTECTED_PATH = process.env.PROTECTED_PATH || '/app'
    const AUTH_PATH = process.env.AUTH_PATH || '/auth'

    if(pathname.includes(PROTECTED_PATH) && !token) {
        return NextResponse.redirect(process.env.NEXTAUTH_URL + '/auth')
    }
    if(pathname.includes(AUTH_PATH) && token) {
        return NextResponse.redirect(process.env.NEXTAUTH_URL + '/app')
    }
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
