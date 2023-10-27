import login from '../../assets/images/login/login.svg'
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const SignUp = () => {
    const {createUser}=useContext(AuthContext)
    const [success,setSuccess]=useState('')
    const [error, setError]=useState('')

    const handleSignUp=e=>{
        e.preventDefault();
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;

        createUser(email,password)
        .then(result=>{
            const user=result.user;
            setSuccess('User has been created successfully')
            console.log(user);
        })
        .catch(error=>{
            setError(error.message)
            console.log(error);
        })

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="me-12 w-1/2 p-6">
                    <img src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignUp} className="card-body">
                        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                        </div>
                        <input className="btn bg-[#FF3811] text-white capitalize hover:text-[#FF3881]" type="submit" value="Sign Up" />
                        <p className='text-green-500'>{success}</p>
                        <p className='text-red-500'>{error}</p>
                    </form>
                    <p className='text-center'>Or Sign Up with</p>
                    <div className='flex items-center justify-center my-3'>
                        <FaFacebookF className='text-[#3B5998] w-[40px] h-[40px] p-3 me-3 bg-[#F5F5F8] rounded-full cursor-pointer'></FaFacebookF>
                        <FaLinkedinIn className='text-[#3B5998] w-[40px] h-[40px] p-3 me-3 bg-[#F5F5F8] rounded-full cursor-pointer'></FaLinkedinIn>
                        <FaGoogle className=' w-[40px] h-[40px] p-3 me-3 bg-[#F5F5F8] rounded-full cursor-pointer'></FaGoogle>
                    </div>
                    <p className='text-center pb-6'>Already have an account? <Link to='/login'><span className='text-[#FF3811]'>Login</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;