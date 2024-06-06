import { App } from '@/shared/App'
import { verifyToken } from '@/helper/verifyToken'

export async function countPostHTTP() {
  const { headers } = verifyToken()
  // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
  return new Promise<number>(async (resolve, reject) => {
    const res = await fetch(`${App.apiURL}/posts`, {
      method: 'GET',
      headers
    })
    const data = await res.json()

    if (!res.ok) {
      reject(data)
    }
    resolve(data.total)
  })
}
