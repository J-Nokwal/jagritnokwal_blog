import { BookIcon, BulbOutlineIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { ALL_FIELDS_GROUP, defineArrayMember, defineField, defineType } from "sanity";

import authorType from "./author";
import { portableTextHighlight, portableTextWithFonts } from "../plugins/portableTextComponents";

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: "post",
  title: "Post",
  icon: BookIcon,
  type: "document",
   groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: 'content',
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      group: 'content',
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              
            ],
            decorators: [
              {
                title: "Highlight",
                value: "highlight",
                component: portableTextHighlight,
                icon: BulbOutlineIcon,
              },
              {
                title: "Highlight with Fonts",
                value: "fontHighlight",
                component: portableTextWithFonts,
                icon: BulbOutlineIcon,
              }
            ],
          },
        }),
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Image caption",
              description: "Caption displayed below the image.",
            },
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessiblity.",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: 'content',
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      group: 'content',
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: authorType.name }],
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social Media',
      type: 'seoFields',
      group: 'seo', // Optional: group in a tab
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      date: "date",
      media: "coverImage",
    },
    
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), "LLL d, yyyy")}`,
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(" ")};
    },
  },
});
