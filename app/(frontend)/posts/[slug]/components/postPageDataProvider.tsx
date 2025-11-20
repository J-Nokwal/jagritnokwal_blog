import PostPage from "@/components/PostPage"
import { getClient, getPostAndMoreStories, getSettings } from "@/sanity/lib/client"
import { cacheTag } from "next/cache"
import { notFound } from "next/navigation"

export default async function PostPageDataProvider({ slug }: { slug: string }) {
    'use cache'
    cacheTag('settings', 'posts')
    
    const client = getClient()
    const [settings, { post, morePosts }] = await Promise.all([
        getSettings(client),
        getPostAndMoreStories(client, slug),
    ])

    if (!post) return notFound()

    return <PostPage post={post} morePosts={morePosts} settings={settings} />
}