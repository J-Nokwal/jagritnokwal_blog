
import IndexPage from '@/components/IndexPage'
import PreviewIndexPage from '@/components/PreviewIndexPage'
import PreviewProvider from '@/components/PreviewProvider'
import { readToken } from '@/sanity/env'
import { getAllPosts, getClient, getSettings } from '@/sanity/lib/client'
import { Post, Settings } from '@/sanity/lib/sanity.queries'
import { draftMode } from 'next/headers'
import IndexPageDataProvider from './posts/components/indexPageDataProvider'
import { Suspense } from 'react'

// export const revalidate = 60 // optional: revalidate every 60s (ISR)

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode) {
    const client = getClient({ token: readToken, perspective: 'drafts' })

    const [settings, posts = []]: [Settings, Post[]] = await Promise.all([
      getSettings(client),
      getAllPosts(client),
    ])
    return (
      <PreviewProvider token={readToken} perspective="drafts">
        <PreviewIndexPage posts={posts} settings={settings} />
      </PreviewProvider>
    )
  }


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IndexPageDataProvider />
    </Suspense>
  )
}


