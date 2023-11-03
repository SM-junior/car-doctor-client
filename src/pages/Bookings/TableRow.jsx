import Swal from "sweetalert2";

const TableRow = ({ booking, bookings, setBookings }) => {
    const { _id, email, price, date, img } = booking;

    const handleDelete = _id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:3000/bookings/${_id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                                const remaining = bookings.filter(book => book._id !== _id)
                                setBookings(remaining)
                            }
                        })
                }
            })
    }
    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-xs hover:bg-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {img && <img src={img} alt="Avatar Tailwind CSS Component" />}
                        </div>
                    </div>
                </div>
            </td>
            <td><span>{email}</span></td>
            <td><span className="badge badge-ghost badge-sm">{price}</span></td>
            <td>{date}</td>
            <th>
                <button className="btn btn-ghost btn-sm bg-red-500 text-white">Pending</button>
            </th>
        </tr>
    );
};

export default TableRow;