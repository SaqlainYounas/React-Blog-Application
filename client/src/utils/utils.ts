import type { Post } from '../redux/store'
import { INVALID_POST_ID } from './contants'
/**
 * Transforms a post object by extracting numeric user and post IDs from a formatted ID string.
 *
 * @param {Post} post - The post object with an ID in the format "u<userId>_b<postId>".
 * @returns {{ userId: number, id: number, title: string, body: string }} The transformed post object.
 * @throws {Error} If the post ID format is invalid.
 */
export function Transform(post: Post) {
  const match = post.id.match(/^u(\d+)_b(\d+)$/)
  if (!match) {
    throw new Error(`${INVALID_POST_ID}`)
  }

  const userId = parseInt(match[1], 10)
  const postId = parseInt(match[2], 10)

  return {
    userId,
    id: postId,
    title: post.title,
    body: post.content,
  }
}
