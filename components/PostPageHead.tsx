import BlogMeta from './BlogMeta'
import * as demo from '@/sanity/lib/demo.data'
import { urlFor as  urlForImage } from '@/sanity/lib/image'
import { Post, Settings } from '@/sanity/lib/sanity.queries'
import Head from 'next/head'
import { stegaClean } from 'next-sanity'

export interface PostPageHeadProps {
  settings: Settings
  post: Post
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings.title ?? demo.title
  return (
    <Head>
      <title>
        {stegaClean(post.title ? `${post.title} | ${title}` : title)}
      </title>
      <BlogMeta />
      {post.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </Head>
  )
}
