import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const BookService = () => {
    const service = useLoaderData();
    const { _id, title, price, img } = service;
    const { user } = useContext(AuthContext)

    const handleBookService = e => {
        e.preventDefault()

        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = form.email.value;

        const booking = {
            username: name,
            email,
            date,
            price: price,
            img,
            service_id: _id,
            service: title
        }
        fetch('http://localhost:3000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        // position: 'top-end',
                        icon: 'success',
                        title: 'Your booking is successful',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        form.reset()
    }
    return (
        <div>
            <h2 className='text-center'>Title: {title}</h2>
            <form onSubmit={handleBookService} className="card-body p-24 bg-slate-200">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div className="form-control">
                        <input type="text" placeholder="First Name" name='name' defaultValue={user?.displayName} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="date" name='date' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="email" placeholder="Email" name='email' defaultValue={user?.email} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="Due amount" name='price' defaultValue={price} className="input input-bordered" required />
                    </div>
                </div>
                {/* <textarea placeholder="Your Message" className="textarea textarea-bordered w-full my-4 py-6" ></textarea> */}
                <input type='submit' value='Order Confirm' className="btn btn-block bg-red-400 capitalize hover:bg-red-500 hover:text-white" />
            </form>
        </div>
    );
};

export default BookService;