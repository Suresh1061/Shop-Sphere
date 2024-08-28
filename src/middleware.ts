import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSession } from "./app/lib";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const session = await getSession();
    const isPublic = path === '/login' || path === '/register'; 
    const onlyAdminAccess = path.includes('/pending-requests'); 
    const onlyMemberAccess = path === '/profile/my-submissions';
    if (!isPublic && !session) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    if (isPublic && session) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if (onlyAdminAccess && session?.user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if (onlyMemberAccess && session?.user.role !== 'team-member') {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/login',
        '/register',
        '/product/:path*',
        '/profile',
        '/profile/my-submissions',
        '/pending-requests',
        '/pending-requests/:path*',
        '/pending-requests/:path*',
    ]
};
