import { getUserData } from './getUserData'

export function getSelectImage(e: any, element: string) {
  const selectedImage = e.target.files[0]

  const output = document.getElementById(element) as HTMLImageElement

  output.src = URL.createObjectURL(selectedImage)
  output.onload = () => {
    URL.revokeObjectURL(output.src)
  }
  return selectedImage
}

export function uploadImageHeader(file: any, postId: number) {
  const userData = getUserData()
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${userData?.token}`)

  const formData = new FormData()
  formData.append('image', file)
  formData.append('postId', postId.toString())

  const requestOptions = {
    method: 'POST',
    headers,
    body: formData
  }

  return requestOptions
}
