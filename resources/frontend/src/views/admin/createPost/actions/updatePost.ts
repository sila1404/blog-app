import { verifyToken } from '@/helper/verifyToken'
import type { IUpdatePostInput } from '../types/updatePost.types'
import { App } from '@/shared/App'

export type PostResponse = {
  message: string
}

export function updatePostHTTP(input: IUpdatePostInput) {
  const { headers } = verifyToken()
  // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
  return new Promise<PostResponse>(async (resolve, reject) => {
    const res = await fetch(`${App.apiURL}/posts/${input.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(input)
    })
    const data = await res.json()

    if (!res.ok) {
      reject(data)
    }
    resolve(data)
  })
}
