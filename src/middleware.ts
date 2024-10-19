import { apiAuthPrefix } from './routes'
import { NextRequest, NextResponse } from 'next/server'

const MOCK_DOMAIN = 'reavsuite.com'
const PORT = process.env.PORT || 3000

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req

  // const cookie = cookies().get("session")?.value;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  if (isApiAuthRoute) return null

  const url = req.nextUrl
  let hostname = req.headers

    .get('host')!
    .replace(`.localhost:${PORT}`, `.${MOCK_DOMAIN}`)

  hostname = hostname.replace('www.', '')
  const searchParams = req.nextUrl.searchParams.toString()

  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''
    }`

  //rewrites for app pages
  if (hostname == `app.${MOCK_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/app${path === '/' ? '/' : path}`, req.url)
    )
  }

  return
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}