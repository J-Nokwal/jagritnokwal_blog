
import IndexPage from '@/components/IndexPage'
import PreviewIndexPage from '@/components/PreviewIndexPage'
import { readToken } from '@/sanity/env'
import { getAllPosts, getClient, getSettings } from '@/sanity/lib/client'
import { Post, Settings } from '@/sanity/lib/sanity.queries'
import { draftMode } from 'next/headers'

export const revalidate = 60 // optional: revalidate every 60s (ISR)

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const isDraftMode = (await draftMode()).isEnabled;
  const client = getClient(isDraftMode ? { token: readToken, perspective: 'drafts' } : undefined)

  const [settings, posts = []]: [Settings, Post[]] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
  ])

  return (
    <main>
      <IndexPage posts={posts} settings={settings} />
    </main>
  )
}
