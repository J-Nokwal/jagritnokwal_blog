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
  const loadedSearchParams = await searchParams; 
  // const previewMode = loadedSearchParams?.preview === 'true'
  const isDraftMode = (await draftMode()).isEnabled;
  const previewPerspective:string | undefined = loadedSearchParams?.['sanity-preview-perspective'] as (string | undefined);
  // console.log("slug ",slug, "\nloadedSearchParams ",loadedSearchParams ,"\n isDraftMode ",isDraftMode,"\n previewPerspective",previewPerspective,"\nppp " );
  const client = getClient(
    isDraftMode ? { token: readToken, perspective: previewPerspective || 'drafts' } : undefined,
  )
  
  const [settings, { post, morePosts }] = await Promise.all([
    getSettings(client),
    getPostAndMoreStories(client, slug),
  ])

  if (!post) return notFound()

  if (isDraftMode) {
    // return <>PreviewPostPage</>
      return (<PreviewProvider token={readToken} perspective={previewPerspective || 'drafts'}>
        <div> PreviewPostPage - previewPerspective {previewPerspective??"--"}</div>
      <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
    </PreviewProvider>)

    // return (      <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />)
  }
  // // return (<>Post Page</>)
  return <PostPage post={post} morePosts={morePosts} settings={settings} />
}
