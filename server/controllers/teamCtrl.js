const {User, Team, Todo} = require('../models');

const createTeam = async (req,res) => {
    try{
        const {id, name} = req.body;
        await Team.create({
            name:name,
            members: [id],
            admins:[id],
            creator: id
        });
        return res.json({message:"Team was created by you."}).status(200);
    }catch(e){
        return res.json({message:e.message}).status(404);
    }
}

const removeTeam = async (req,res) => {
    try{
        const {creatorId, teamId} = req.params;
        
        const sendedTeam = await Team.findOne({where:{id:teamId}});
        if(!sendedTeam){
            return res.json({message:"Team is not found."}).status(404);
        }
        if(sendedTeam.creator != creatorId){
            return res.json({message:"You are not creator of the team."}).status(404);
        }
        await sendedTeam.destroy();
        return res.json({message:"Removed the Team."}).status(200);
    }catch(e){
        return res.json({message:e.message}).status(404);
    }
}
function include(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == obj) return true;
    }
  }
const addMember = async (req,res) => {
    try{
        const {memberId,teamId, id} = req.body; //id -> yonetici id'si
        const newMember = await User.findOne({where:{id:memberId}});
        
        if(!newMember){
            return res.json({message:"Member ID is invalid."}).status(404);
        }

        const sendedTeam = await Team.findOne({where:{id:teamId}});
        sendedTeam.members.forEach((m)=>{
            if(m==memberId){
                return res.json({message:"You can not add member twice."}).status(404);
            }
        })
        if(!include(sendedTeam.admins, id)){
            return res.json({message:"You are not Admin."}).status(404);
        }
        if(!sendedTeam){
            return res.json({message:"Not found the team."}).status(404);
        }
        const membersAlt = sendedTeam.members.concat([memberId]);
        await Team.update({members:membersAlt}, {where: {id:teamId}});
        return res.json({message:"All is well."}).status(200);

    }catch(e){
        return res.json({message:e.message}).status(404);
    }
}

const removeMember = async (req,res) => {
    try{
        const {memberId,teamId, id} = req.params; //id -> yonetici id'si
        const newMember = await User.findOne({where:{id:memberId}});
        if(!newMember){
            return res.json({message:"Member ID is invalid."}).status(404);
        }
        
        const sendedTeam = await Team.findOne({where:{id:teamId}});
        
        if(!include(sendedTeam.admins, id)){
            return res.json({message:"You are not Admin or Creator."}).status(404);
        }
        if(!sendedTeam){
            return res.json({message:"Not found the team."}).status(404);
        }

        const membersAlt = sendedTeam.members.filter((m)=> {
            return m != memberId;
        });

        const adminsAlt = sendedTeam.admins.filter((m)=> {
            return m != memberId;
        });

        await Team.update({members:membersAlt, admins: adminsAlt}, {where: {id:teamId}});
        const send = await Team.findOne({where:{id:teamId}});
        return res.json({message:"Removed the member."}).status(200);
    }catch(e){
        return res.json({message:e.message}).status(404);
    }
}

const makeAdmin = async (req,res) => {
    try{
        const {memberId, teamId, id} = req.body;

        const team = await Team.findOne({where:{id:teamId}});
        if(!team){
            return res.json({message:"Not found the team."}).status(404);
        }
        if(!include(sendedTeam.admins, id)){
            return res.json({message:"You are not Creator."}).status(404);
        }
        if(!include(team.members,memberId)){
            return res.json({message:"The member is not in the team."}).status(404);
        }else{
            console.log(team);
            const adminsAlt = team.admins.concat([memberId]);
            await Team.update({admins:adminsAlt},{where:{
                id:teamId
            }})

        }
        return res.json({message:"All is well."}).status(200);
    }
    catch(e){
        return res.json({message:e.message}).status(404);
    }
}

module.exports = {createTeam, removeTeam, addMember, removeMember, makeAdmin}