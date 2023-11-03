import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
    const { _id, title, price, img } = service;
    return (
        <div className="card w-96 bg-base-100 shadow-xl text-left">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="flex items-center justify-between text-[#FF3811] font-bold">
                    <p>Price: ${price}</p>
                    <Link to={`/book/${_id}`}><FaArrowRight></FaArrowRight></Link>
                </div>

            </div>
        </div>
    );
};

export default ServiceCard;