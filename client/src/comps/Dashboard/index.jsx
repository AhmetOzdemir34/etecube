import React, { useEffect, useState } from 'react'
import {FiUsers} from 'react-icons/fi'
import {MdDeleteOutline} from 'react-icons/md';
import { Drawer } from 'antd';
import {MdDelete} from 'react-icons/md';
import {GiCheckMark} from 'react-icons/gi'
import {FaTimes} from 'react-icons/fa'
import axios from 'axios';
import Navbar2 from './Navbar2';


const Dashboard = () => {
  const [createTeam, setCreateTeam] = useState({});
  const [removeTeam, setRemoveTeam] = useState({creatorId:'',teamId:'',text:"",isPublic:""});
  const [createTodo, setCreateTodo] = useState({});
  const [id, setId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [team, setTeam] = useState(null);
  const [log, setLog] = useState({});
  const [user, setUser] = useState({
    fullname: "Ahmet Özdemir",
    mail: "qwerty@gmail.com",
    img: "https://i.haberglobal.com.tr/storage/haber/2020/02/23/lionel-messi-1000-gole-direkt-katki-saglayan-ilk-futbolcu-oldu_1582472410.jpg"
  })
  const [teams, setTeams] = useState([]);
  const showDrawer = () => {
    setVisible(true);
  };
  const showDrawer2 = () => {
    setVisible2(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onClose2 = () => {
    setVisible2(false);
  };
  const handleRemove = (e) =>{
    e.preventDefault();
    
    axios.delete(`http://localhost:5000/team/removeteam/${removeTeam.creatorId}/${removeTeam.teamId}`).then((res)=>{
      alert(res.data.message);
    })
    
  }
  const handleCreate = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:5000/team/createteam",createTeam).then((res)=>{
      alert(res.data.message);
    })
  }
  const handleCreateTodo = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:5000/todo/createtodo",createTodo).then((res)=>{
      alert(res.data.message);
    })
  }
  useEffect(() => {
    axios.get("http://localhost:5000/user/loggedin").then((res)=>{
    setLog(res.data);
    setId(res.data.user.id);
  })
  }, []);

  useEffect(() => {
    console.log(id);
    if(id!=0){
      axios.post("http://localhost:5000/user/teamsofuser",{id}).then((res)=>{
      setTeams(res.data);
      console.log(res.data);
    })
    }
    console.log(id);
  }, [id])
  
  
  if(!log.access){
    return <div>{"NO ACCESS PERMISSION!"}</div>
  }
  return (
    <>
    <Navbar2 />
    <div>
      <div className="container mx-auto">
        <div className="mt-5 h-[80vh]">
          <div className="flex flex-row flex-wrap justify-center items-stretch">
              <div className='w-10/12 md:w-4/12 mx-auto'>
                <div onClick={showDrawer} className='mb-5 cursor-pointer flex flex-nowrap text-white bg-green-500 rounded flex-row justify-between items-center p-2 shadow-md'>
                  <div>{"Create a Team"}</div>
                  <FiUsers size={27} />
                </div>
                <div onClick={showDrawer2} className='mb-5 cursor-pointer flex flex-nowrap text-white bg-red-400 rounded flex-row justify-between items-center p-2 shadow-md'>
                  <div>{"Remove a Team"}</div>
                  <MdDeleteOutline size={27} />
                </div>
                <hr />
                <h2>{"Teams"}</h2>
                <div className=''>
                  {teams!=[] ? teams.map((t)=>{
                    return(
                      <div className='my-2 cursor-pointer text-white bg-gray-400 rounded p-2'>
                        <div>{t.name}{` ~ ${t.id}`}</div>
                      </div>
                    )
                  }):<p>{"You has not team(s)"}</p>}
                </div>
              </div>
              <div className='w-10/12 md:w-6/12 mx-auto'>
                  <div className='border rounded shadow-md bg-blue-100 py-3 px-1 my-2'>
                    <div><span className='font-bold'>Creator: </span>{log.user.fullname}</div>
                    <form onSubmit={handleCreateTodo}>
                      <input onChange={(e)=>{setCreateTodo({...createTodo,creatorId:log.user.id,text:e.target.value})}} type="text" className='my-5 block mr-auto w-2/3 p-2 rounded border shadow-sm' placeholder='Content'  />
                      <input onChange={(e)=>{setCreateTodo({...createTodo,teamId:e.target.value})}} type="text" className='my-5 block mr-auto w-2/3 p-2 rounded border shadow-sm' placeholder='Team ID'  />
                      
                      <div className='my-5'>
                      <span>{"Status: "}</span>
                      <select name="" defaultValue={true} onChange={(e)=>{setCreateTodo({...createTodo, isPublic:e.target.value})}}>
                        <option value={true}>Public</option>
                        <option value={false}>Private</option>
                      </select>
                      </div>
                      <button type='submit' className='p-2 border bg-green-500 rounded text-white mt-2 block'>Save</button>
                    </form>
                  </div>
                
              </div>
          </div>
        </div>
      </div>
    </div>
    <Drawer
      title="Create a Team"
      placement={"bottom"}
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <form onSubmit={handleCreate}>
        <input onChange={(e)=>{setCreateTeam({...createTeam, id:log.user.id, name:e.target.value})}} type="text" className='block mr-auto w-full md:w-1/4 p-2 rounded border shadow-md' placeholder='Team Name' />
        <button type='submit' className='p-2 rounded mr-auto block bg-green-500 text-white mt-5'>{"Create"}</button>
      </form>
    </Drawer>
    <Drawer
      title="Remove a Team"
      placement={"bottom"}
      closable={false}
      onClose={onClose2}
      visible={visible2}
    >
      <p><span className='text-red-400 font-bold'>WARNING!</span> {"If you're not Admin of the team. We will reject your request."}</p>
      <p>First, you have to copy team ID, paste here. If you don't know team ID, you can look at next to team name.</p>

      <form onSubmit={handleRemove}>
        <input onChange={(e)=>{setRemoveTeam({creatorId:log.user.id, teamId:e.target.value})}} type="text" className='block mr-auto w-full md:w-1/4 p-2 rounded border shadow-md' placeholder='Team ID' />
        <button type='submit' className='p-2 rounded mr-auto block bg-red-500 text-white mt-5'>{"Remove"}</button>
      </form>
    </Drawer>
    </>
  )
}

export default Dashboard