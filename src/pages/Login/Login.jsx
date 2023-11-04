import login from '../../assets/images/login/login.svg'
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useState } from 'react';

const Login = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const { signIn } = useContext(AuthContext);

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                const user=result.user;
                const loggedUser={
                    email:user.email
                }
                console.log(loggedUser);
                setSuccess('User login successful')
                // navigate(from, { replace: true })

                fetch('http://localhost:3000/jwt',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(loggedUser)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log('jwt response', data);

                    //warning: local storage is not the best to store access token

                    localStorage.setItem('car-access-token', data.token)
                })
            })
            .catch(error => {
                setError(error.message);
            })
        form.reset()
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="me-12 w-1/2 p-6">
                    <img src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-3xl font-bold text-center">Login</h1>
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
                        <input className="btn bg-[#FF3811] text-white capitalize hover:text-[#FF3881]" type="submit" value="Sign In" />
                        <p className='text-green-500'>{success}</p>
                        <p className='text-red-500'>{error}</p>
                    </form>
                    <p className='text-center'>Or Sign In with</p>
                    <div className='flex items-center justify-center my-3'>
                        <FaFacebookF className='text-[#3B5998] w-[40px] h-[40px] p-3 me-3 bg-[#F5F5F8] rounded-full cursor-pointer'></FaFacebookF>
                        <FaLinkedinIn className='text-[#3B5998] w-[40px] h-[40px] p-3 me-3 bg-[#F5F5F8] rounded-full cursor-pointer'></FaLinkedinIn>
                        <FaGoogle className=' w-[40px] h-[40px] p-3 me-3 bg-[#F5F5F8] rounded-full cursor-pointer'></FaGoogle>
                    </div>
                    <p className='text-center pb-6'>New to Car Doctors? <Link to='/singup'><span className='text-[#FF3811]'>Sign up</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;