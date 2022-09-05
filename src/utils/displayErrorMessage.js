import Swal from 'sweetalert2'

export default () => Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
})