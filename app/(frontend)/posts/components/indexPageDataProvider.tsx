import IndexPage from "@/components/IndexPage"
import { getAllPosts, getClient, getSettings } from "@/sanity/lib/client"
import { Post, Settings } from '@/sanity/lib/sanity.queries'
import { cacheTag } from "next/cache"


export default async function IndexPageDataProvider() {
    'use cache'
    cacheTag('settings', 'posts')
    const client = getClient()

    const [settings, posts = []]: [Settings, Post[]] = await Promise.all([
        getSettings(client),
        getAllPosts(client),
    ])
    return (
        <IndexPage settings={settings} posts={posts} />
    )
}