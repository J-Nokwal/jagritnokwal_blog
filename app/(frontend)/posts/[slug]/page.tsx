/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation'
import PostPage from '@/components/PostPage'
// import PreviewPostPage from '@/components/PreviewPostPage'
import { readToken } from '@/sanity/env'
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getSettings,
} from '@/sanity/lib/client'
import { Post, Settings } from '@/sanity/lib/sanity.queries'
import { draftMode } from 'next/headers'
import PreviewPostPage from '@/components/PreviewPostPage'
import PreviewProvider from '@/components/PreviewProvider'
import { Suspense } from 'react'
import PostPageDataProvider from './components/postPageDataProvider'
import PostPageSkeleton from './components/PostPageSkeleton'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostsSlugs()
  return slugs?.map(({ slug }) => ({ slug })) || []
}

export default async function PostSlugPage({ params, searchParams }: PageProps) {

  const { slug } = await params
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode) {
    const loadedSearchParams = await searchParams;
    const previewPerspective: string | undefined = loadedSearchParams?.['sanity-preview-perspective'] as (string | undefined);
    // console.log("slug ",slug, "\nloadedSearchParams ",loadedSearchParams ,"\n isDraftMode ",isDraftMode,"\n previewPerspective",previewPerspective,"\nppp " );
    const client = getClient(
      { token: readToken, perspective: previewPerspective || 'drafts' },
    )

    const [settings, { post, morePosts }] = await Promise.all([
      getSettings(client),
      getPostAndMoreStories(client, slug),
    ])
    if (!post) return notFound()

    return (<PreviewProvider token={readToken} perspective={previewPerspective || 'drafts'}>
      <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
    </PreviewProvider>)
  }

  return <Suspense fallback={<PostPageSkeleton />}>
    <PostPageDataProvider slug={slug} />
  </Suspense>

}



