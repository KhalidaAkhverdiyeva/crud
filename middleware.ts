import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'


const protectedRoutes = ['/home']
const publicRoutes = ['/', '/register',]

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = cookies().get('token')?.value

    if (isProtectedRoute && cookie === undefined) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    if (
        isPublicRoute &&
        cookie &&
        !req.nextUrl.pathname.startsWith('/')
    ) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}