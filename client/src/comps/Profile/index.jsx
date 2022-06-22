import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { Drawer } from 'antd';
import axios from 'axios';


const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [edited, setEdited] = useState({
    fullname:"",email:"",img:""
  })
  const [password, setPassword] = useState({});
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleEdit = (e) =>{
    e.preventDefault();

    axios.put("http://localhost:5000/user/editprofile", edited).then((res)=>{
      alert(res.data.message);
    })
  }
  const handleResetPassword = (e) =>{
    e.preventDefault();
    axios.put("http://localhost:5000/user/resetpassword", password).then((res)=>{
      alert(res.data.message);
    })
  }
  const [log, setLog] = useState({});
  useEffect(() => {
    axios.get("http://localhost:5000/user/loggedin").then((res)=>{
    setLog(res.data);
    setEdited(res.data.user);
    setPassword(res.data.user);
  })
  }, []);
  if(!log.access){
    return <div>{"NO ACCESS PERMISSION!"}</div>
  }
  return (
    <>
    <Navbar/>
    <div className='mt-5'>
        <div className='container mx-auto'>
          <div className='md:mx-10'>
            <h2 className='text-xl'>{"Profiliniz"}</h2>
              <hr />
              <div className="flex flex-row flex-wrap justify-around items-stretch mt-7">
                <div className='w-11/12 mx-auto md:w-4/12 rounded shadow-2xl md:mb-0 mb-7'>
                  <img src={log.user.img} alt="no img" className='object-cover w-full h-80 rounded' />
                </div>
                <div className='w-11/12 mx-auto md:w-6/12'>
                    <p className='italic font-bold m-0'>{"Fullname"}</p> <hr />
                    <p className='text-gray-600 mt-1 mb-3'>{log.user.fullname}</p>
                    <p className='italic font-bold m-0'>{"Mail Address"}</p> <hr />
                    <p className='text-gray-600 mt-1 mb-3'>{log.user.email}</p>
                    <button type='button' onClick={showDrawer} className="border border-gray-300 px-3 py-2 shadow-sm">
                      {"Edit Profile"}
                    </button>
                    <button type='button' onClick={()=>{
                      axios.get("http://localhost:5000/user/signout").then(()=>{
                        window.location.reload();
                      })
                    }} className="border border-gray-300 px-3 py-2 shadow-sm">
                      {"Sign out"}
                    </button>
                </div>
              </div>
          </div>
        </div>
    </div>
    <Drawer
        title="Edit Profile"
        placement={"right"}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <form onSubmit={handleEdit}>
            <p>{"If you will not fill the blanks, Your datas will not change."}</p>
            <input onChange={(e)=>{setEdited({...edited,fullname:e.target.value})}} className='my-2 block mx-auto w-full p-2 rounded border shadow-sm' type="text" placeholder={log.user.fullname} />
            <input onChange={(e)=>{setEdited({...edited,email:e.target.value})}} className='my-2 block mx-auto w-full p-2 rounded border shadow-sm' type="text" placeholder={log.user.email} />
            <input onChange={(e)=>{setEdited({...edited,img:e.target.value})}} className='my-2 block mx-auto w-full p-2 rounded border shadow-sm' type="text" placeholder={log.user.img} />
            <button type='submit' className='p-2 rounded ml-auto block bg-gray-500 text-white mt-5'>{"Save Changes"}</button>
        </form>
        <hr className='my-5' />
        <h2>{"Reset Password"}</h2>
        <form onSubmit={handleResetPassword}>
          <input onChange={(e)=>{setPassword({...password,password:e.target.value})}} className='my-2 block mx-auto w-full p-2 rounded border shadow-sm' type="password" placeholder="Password" />
          <input onChange={(e)=>{setPassword({...password,confirmPassword:e.target.value})}} className='my-2 block mx-auto w-full p-2 rounded border shadow-sm' type="password" placeholder="Confirm Password" />
          <button type='submit' className='p-2 rounded ml-auto block bg-gray-500 text-white mt-5'>{"Reset Password"}</button>
        </form>
      </Drawer>
    </>
  )
}

export default Profile