import React, {useState, useEffect} from 'react'
import {TbUser} from 'react-icons/tb'
import {  Drawer } from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux';

const Login = () => {
  const [register, setRegister] = useState({
    fullname:"",
    email:"",
    password:"",
    confirmPassword:"",
    img:"https://www.clipartmax.com/png/full/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png"
  })
  const [login, setLogin] = useState({
    email:"",
    password:""
  })
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/user/login",login).then((res)=>{
      window.location.reload();
    });
  }
  const handleRegister = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/user/register",register).then((res)=>{
      window.location.reload();
    });
  }
  const [log, setLog] = useState({});
  useEffect(() => {
    axios.get("http://localhost:5000/user/loggedin").then((res)=>{
    setLog(res.data);
  })
  }, [])
  if(log.access){
    return <Redirect to={"/profile"} />
  }
  return (
    <>
    <div className='w-full h-screen'>
      <div className='mx-auto h-full container flex flex-nowrap flex-col justify-center items-center'>
          <div className='w-10/12 md:w-5/12 mx-auto'>
              <div className='flex flex-col flex-nowrap justify-center items-center bg-blue-300 px-5 py-10 rounded shadow-xl'>
                  <TbUser size={70} color="white"/>
                  <form onSubmit={handleSubmit} className="w-full">
                      <input onChange={(e)=> setLogin({...login,email:e.target.value})} className='p-2 outline-none block md:w-1/2 w-9/12 rounded mx-auto my-2 text-center' placeholder='username' type="text" name="username" />
                      <input onChange={(e)=> setLogin({...login,password:e.target.value})} className='p-2 outline-none block md:w-1/2 w-9/12 rounded mx-auto my-2 text-center' placeholder='password' type="password" name="password" />
                      <button type='submit' className='py-3 px-7 bg-blue-900 text-white block mx-auto rounded-xl'>Login</button>
                  </form>
                  <p className='text-blue underline cursor-pointer mt-5' onClick={showDrawer}>
                    {"create account?"}
                  </p>
              </div>
          </div>
      </div>
    </div>
    <Drawer title="Create an Account :)" placement="right" onClose={onClose} visible={visible}>
      <form onSubmit={handleRegister}>
      <p className='my-1'>{"Fullname"}</p>
      <input type="text" onChange={(e)=>{setRegister({...register,fullname:e.target.value})}} className='block mx-auto w-full p-2 rounded border shadow-md' />

      <p className='my-1'>{"Mail Address"}</p>
      <input type="email" onChange={(e)=>{setRegister({...register,email:e.target.value})}} className='block mx-auto w-full p-2 rounded border shadow-md' />

      <p className='my-1'>{"Password"}</p>
      <input type="password" onChange={(e)=>{setRegister({...register,password:e.target.value})}} className='block mx-auto w-full p-2 rounded border shadow-md' />

      <p className='my-1'>{"Confirm Password"}</p>
      <input type="password" onChange={(e)=>{setRegister({...register,confirmPassword:e.target.value})}} className='block mx-auto w-full p-2 rounded border shadow-md' />

      <button type='submit' className='p-2 rounded ml-auto block bg-gray-500 text-white mt-5'>{"Register"}</button>
      </form>
    </Drawer>
    </>
  )
}

export default Login