import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const path = body.path ?? '/'

  revalidatePath(path)
  return NextResponse.json({ revalidated: true, path })
}
