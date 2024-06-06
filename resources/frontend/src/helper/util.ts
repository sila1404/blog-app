export function myDebounce(func: any, delay: number) {
  let debounceTimer: number | undefined
  return (...args: any[]) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func(...args), delay)
  }
}

export function openModal(element: string, postId: number) {
  return new Promise<number>((resolve) => {
    let modal = document.getElementById(element) as HTMLElement

    if (modal) {
      setTimeout(() => {
        modal.classList.add('fade', 'show')
        modal.style.display = 'block'
        modal.classList.add('in')
      }, 500)
    }

    document.body.classList.add('model-open')

    let modalBackdrop = document.createElement('div')
    modalBackdrop.className = 'modal-backdrop fade show'
    document.body.appendChild(modalBackdrop)

    resolve(postId)
  })
}

export async function closeModal(element: string) {
  let modal = document.getElementById(element) as HTMLElement
  let modalBackdrop = document.querySelector('.modal-backdrop')

  if (modal) {
    modal.classList.remove('in', 'show', 'fade')
    modal.style.display = ''

    document.body.classList.remove('modal-open')

    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop)
    }
  }
}
