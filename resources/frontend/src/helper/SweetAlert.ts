import Swal from "sweetalert2/dist/sweetalert2.js"

export function confirmDelete() {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if(result.isConfirmed) {
        resolve(result.isConfirmed)
      }
      reject()
    })
  })
}