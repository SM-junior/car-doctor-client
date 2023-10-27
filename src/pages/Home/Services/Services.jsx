import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices]=useState([])
    useEffect(()=>{
        fetch('http://localhost:3000/services')
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[])
    return (
        <div className='text-center space-y-3 mt-4'>
            <h2 className="text-xl text-[#FF3811]">Services</h2>
            <h2 className="text-3xl">Our Services Area</h2>
            <p className='text-slate-400'>the majority have suffered alteration in some form, by injected humour, or randomised</p>
            <p className='text-slate-400'>words which don't look even slightly believable.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    services.map(service=> <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;