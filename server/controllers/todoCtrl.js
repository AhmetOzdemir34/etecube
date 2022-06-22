const {User, Team, Todo} = require('../models');

const createTodo = async (req,res) => {
    try{
        const {creatorId, teamId, text, isPublic} = req.body;
        await Todo.create({
            creator: creatorId,
            team:teamId,
            text:text,
            isCompleted: false,
            isPublic:isPublic
        });
        return res.json({message:"Todo was created you."});
    }catch(e){
        return res.json({message:e.message}).status(404);
    }
}
function include(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == obj) return true;
    }
  }
const removeTodo = async (req,res) => {
    try{
        const {teamId,todoId,id} = req.params;
        const team = await Team.findOne({where:{id:teamId}});
        if(!include(team.members,id)){
            return res.json({message:"you are not a member of the team."});
        }
        await Todo.destroy({where:{id:todoId}});
        return res.json({message:"Todo was removed by you."});

    }catch(e){
        return res.json({message:e.message}).status(404);
    }
}

const editTodo = async (req,res) => {
    try{
        const {text, userId, todoId} = req.body;
        const selectedTodo = await Todo.findOne({where:{id:todoId}});
        if(selectedTodo.creator !== userId){
            return res.json({message:"You are not creator of the todo."})
        }
        await Todo.update({text:text},{
            where:{
                id:todoId
            }
        });
        const send = await Todo.findOne({where:{id:todoId}});
        return res.json(send);
    }catch(e){
        return res.json({message:e.message}).status(404);
    }
}

const toggleIsCompleted = async (req,res) => {
    try{
        const {todoId} = req.body;
        const selectedTodo = await Todo.findOne({where:{id:todoId}});
        if(!selectedTodo){
            return res.json({message:"Todo not found."});
        }
        const toogled = !selectedTodo.isCompleted;
        await Todo.update({isCompleted:toogled},{
            where:{
                id:todoId
            }
        })
        const send = await Todo.findOne({where:{id:todoId}});
        return res.json(send);
    }catch(e){
        return res.json({message:e.message}).status(404);
    }
}

const toggleIsPublic = async (req,res) => {
    try{
        const {todoId} = req.body;
        const selectedTodo = await Todo.findOne({where:{id:todoId}});
        if(!selectedTodo){
            return res.json({message:"Todo not found."});
        }
        const toogled = !selectedTodo.isPublic;
        await Todo.update({isPublic:toogled},{
            where:{
                id:todoId
            }
        })
        const send = await Todo.findOne({where:{id:todoId}});
        return res.json(send);

    }catch(e){
        return res.json({message:e.message}).status(404);
    }
}

const filterTodosByUserId = async (req,res) => {
    try{
        const {teamId, userId} = req.body;
        const filtered = await Todo.findAll({
            where:{
                creator:userId,
                team:teamId
            }
        });
        return res.json(filtered);
    }catch(e){
        return res.json({message:e.message}).status(404);
    }
}
module.exports = {createTodo, removeTodo, editTodo, toggleIsCompleted, toggleIsPublic, filterTodosByUserId}