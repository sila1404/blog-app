// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function myDebounce(func: any, delay: number) {
	let debounceTimer: number | undefined;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (...args: any[]) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func(...args), delay);
	};
}

export function openModal(element: string) {
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
}

export async function closeModal(element: string) {
  let modal = document.getElementById(element) as HTMLElement
  let modalBackdrop = document.querySelector(".modal-backdrop")

  if(modal) {
    modal.classList.remove("in", "show", "fade")
    modal.style.display = ""
  
    document.body.classList.remove("modal-open")

    if(modalBackdrop) {
      document.body.removeChild(modalBackdrop)
    }
  }
}