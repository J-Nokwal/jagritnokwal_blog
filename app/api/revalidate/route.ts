import { revalidateTag } from "next/cache"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    revalidateTag(body.tag, 'default')
    return new Response('ok')
}
