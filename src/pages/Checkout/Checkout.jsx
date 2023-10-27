import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Checkout = () => {
    const loadedService = useLoaderData();
    const { title, price } = loadedService;

    const handleCheckout=e=>{
        e.preventDefault()
        const form=e.target;
        const fname=form.fname.value;
        const lname=form.lname.value;
        const phone=form.phone.value;
        const email=form.email.value;
        console.log(fname,lname,phone,email);

        form.reset()
    }

    return (
        <div>
            <h2 className='text-center'>Check Out</h2>
            <form onSubmit={handleCheckout} className="card-body p-24 bg-slate-200">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div className="form-control">
                        <input type="text" placeholder="First Name" name='fname' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="Last Name" name='lname' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="Your Phone" name='phone' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="Email" name='email' className="input input-bordered" required />
                    </div>
                </div>
                <textarea placeholder="Your Message" className="textarea textarea-bordered w-full my-4 py-6" ></textarea>
                <input type='submit' value='Order Confirm' className="btn btn-block bg-red-500 capitalize" />
            </form>
        </div>
    );
};

export default Checkout;