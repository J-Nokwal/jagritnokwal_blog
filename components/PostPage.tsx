import Error from 'next/error'
import Container from './BlogContainer'
import BlogHeader from './BlogHeader'
import Layout from './BlogLayout'
import MoreStories from './MoreStories'
import PostBody from './PostBody'
import PostHeader from './PostHeader'
import PostPageHead from './PostPageHead'
import PostTitle from './PostTitle'
import SectionSeparator from './SectionSeparator'
import * as demo from '@/sanity/lib/demo.data'
import type { Post, Settings } from '@/sanity/lib/sanity.queries'
import { notFound, } from 'next/navigation'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  morePosts: Post[]
  settings: Settings
}

const NO_POSTS: Post[] = []

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts = NO_POSTS, post, settings } = props
  const { title = demo.title } = settings || {}

  const slug = post?.slug
  if (!slug && !preview) {
    notFound();
    // return <Error statusCode={404} />
  }

  return (
    <>
      <PostPageHead settings={settings} post={post} />

      <Layout preview={preview ?? false} loading={loading}>
        <Container>
          <BlogHeader title={title} level={2} />
          {preview && !post ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                />
                <PostBody content={post.content} />
              </article>
              <SectionSeparator />
              {morePosts?.length > 0 && <MoreStories posts={morePosts} />}
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}
