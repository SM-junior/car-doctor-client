import { useContext } from "react";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../../../Provider/AuthProvider";


const Social = () => {
    const { googleLogin } = useContext(AuthContext)

    const handleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user.email);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className='flex items-center justify-center my-3'>
            <FaFacebookF className='text-[#3B5998] w-[40px] h-[40px] p-3 me-3 bg-[#F5F5F8] rounded-full cursor-pointer'></FaFacebookF>
            <FaLinkedinIn className='text-[#3B5998] w-[40px] h-[40px] p-3 me-3 bg-[#F5F5F8] rounded-full cursor-pointer'></FaLinkedinIn>
            <FaGoogle onClick={handleLogin} className=' w-[40px] h-[40px] p-3 me-3 bg-[#F5F5F8] rounded-full cursor-pointer'></FaGoogle>
        </div>
    );
};

export default Social;