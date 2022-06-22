import React, { useState } from 'react'
import {FiMenu} from 'react-icons/fi'
import {CgClose} from 'react-icons/cg'
import {Link} from 'react-router-dom';

const Navbar2 = () => {
    const [btn,setBtn] = useState(false);
  return (
    <div className='bg-purple-300 sticky top-0 z-10 text-primary font-bold'>
        <div className='container p-5 mx-auto'>
            <div className='flex flex-nowrap flex-row justify-between items-center'>
                <div>{"TODO-APP"}</div>
                <ul style={{listStyle:"none"}} className='md:block hidden m-0'>
                    <li className='inline-block mx-2'><Link className='text-black hover:text-gray-400' to="#">{"DASHBOARD"}</Link></li>
                    <li className='inline-block mx-2'><Link className='text-black hover:text-gray-400' to="/profile">{"PROFILE"}</Link></li>
                </ul>
                <div className='md:hidden block cursor-pointer' onClick={()=>setBtn(!btn)}>
                    {btn ? <CgClose size={24} className='inline' /> : <FiMenu size={24} className='inline' />}
                </div>
            </div>
        </div>
        {btn && 
            <div className='md:hidden block cursor-pointer py-2 text-center'>
                <ul className='w-full h-full'>
                    <li className='my-3 w-full h-full text-center'><Link className='text-black' to="#">{"DASHBOARD"}</Link></li>
                    <li className='my-3 w-full h-full text-center'><Link className='text-black' to="/profile">{"PROFILE"}</Link></li>
                </ul>
                </div>
            }
    </div>
  )
}

export default Navbar2