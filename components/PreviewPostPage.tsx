'use client'
import { useLiveQuery } from '@sanity/preview-kit'
import PostPage, { PostPageProps } from './PostPage'
import {
  type Post,
  postAndMoreStoriesQuery,
  Settings,
  settingsQuery,
} from '@/sanity/lib/sanity.queries'
import { useIsLivePreview,
  useDraftModePerspective ,
  useIsPresentationTool,
  useDraftModeEnvironment,
  useOptimistic,

 } from 'next-sanity/hooks'

export default function PreviewPostPage(props: PostPageProps) {
  const [{ post: postPreview, morePosts }, loadingPost] = useLiveQuery<{
    post: Post
    morePosts: Post[]
  }>(
    { post: props.post, morePosts: props.morePosts },
    postAndMoreStoriesQuery,
    { slug: props.post.slug },
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )
const isLivePreview = useIsLivePreview()
const draftModePerspective = useDraftModePerspective();
const isPresentationTool = useIsPresentationTool();
const draftModeEnvironment = useDraftModeEnvironment();


  return (
    <>
    <div>PreviewPostPage - isLivePreview: {isLivePreview ? "true" : "false"}</div>
    <div>PreviewPostPage - draftModePerspective: {draftModePerspective}</div>
    <div>PreviewPostPage - isPresentationTool: {isPresentationTool ? "true" : "false"}</div>
    <div>PreviewPostPage - draftModeEnvironment: {draftModeEnvironment}</div>
    <PostPage
      preview
      loading={loadingPost || loadingSettings}
      post={postPreview}
      morePosts={morePosts}
      settings={settings}
    />
    </>
  )
}
