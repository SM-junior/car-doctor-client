import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import TableRow from './TableRow';

const Booking = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const navigate=useNavigate();
    const {logOut}=useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:3000/bookings?email=${user?.email}`,{
            method:'GET',
            headers:{
                authorization:`Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(!data.error){
                setBookings(data)
            }
            else{
                logOut()
                navigate('/')
            }
        })
            
    }, [navigate])
    return (
        <div>
            <div className="overflow-x-auto my-6">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg'>
                            <th></th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking) => <TableRow
                                key={booking._id}
                                booking={booking}
                                bookings={bookings}
                                setBookings={setBookings}
                            ></TableRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Booking;