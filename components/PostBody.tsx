/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText, type PortableTextReactComponents } from 'next-sanity'

import { SanityImage } from './SanityImage'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
    marks:{
    highlight : ({ children }) => {
      return <span style={{backgroundColor: '#0f0'}}>{children}</span>
    },
    fontHighlight :({ children }) => {
      return  <span style={{ fontFamily: "var(--font-breeserif)" }}>{children}</span>
    },

  },
}

export default function PostBody({ content }: { content: any }) {
  return (
    <div className="mx-auto max-w-2xl prose">
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
