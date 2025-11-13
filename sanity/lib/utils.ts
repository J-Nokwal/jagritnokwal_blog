/* eslint-disable @typescript-eslint/no-explicit-any */
import { getClient } from "./client"

async function deleteAllPosts() {
  const posts = await getClient().fetch(`*[_type == "post"]._id`)
  const deletions = posts.map((id: any) => ({
    delete: { id },
  }))

  if (deletions.length === 0) {
    console.log('No posts found.')
    return
  }

  await getClient().transaction(deletions).commit()
  console.log(`Deleted ${deletions.length} posts.`)
}