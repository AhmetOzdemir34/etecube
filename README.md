# ETECUBE TODO APP

### **Frontend** -> React
### **Backend** -> Express
### **ORM** -> Sequelize
***


## **Backend**

    run 'npm start'. It will work on localhost.
    Server has 3 models. User, Team, Todo. They has paths to work rest-api. Rest-api functions are in controllers folder.

## *User*

| **API**           | **Description**                                             |
|  :----            |               ---:                                          |
| login             | login to todoapp                                            |
| register          | register to system                                          |
| loggedin          | client side check user status.                              |
| signout           | sign out                                                    |
| editProfile       | edit your profile datas (email, img, fullname)              |
| resetPassword     | reset password but you must be in system                    |
| teamsOfUser       | Teams that User has                                         |

    login, register, loggedin, signout functions use jwt & cookies

## *Team*

| **API**           | **Description**                                                                       |
|  :----            |               ---:                                                                    |
| createTeam        | create a team. You are creator, admin and member                                      |
| removeTeam        | remove a team. You must be creator.                                                   |
| addMember         | add a new member to team. You must be creator or admin.                               |
| removeMember      | remove a team's member. You must be creator or admin. You can't remove Creator        |
| makeAdmin         | You can make Admin order member. You have to Admin or Creator.                        |

## *Todo*

| **API**               | **Description**                                                                                       |
|  :----                |               ---:                                                                                    |
| createTodo            | create a todo. You are creator of the todo.                                                           |
| removeTodo            | remove a todo. You must be creator of todo.                                                           |
| editTodo              | you can edit text of todo.                                                                            |
| toggleIsCompleted     | this is a toggle function. When you press 'completed' button, todo status will changed. TRUE or FALSE |
| toggleIsPublic        | another toggle function.  When you press 'completed' button, todo status will changed. TRUE or FALSE  |
| filterTodosByUserId   | You can filter todos by team's users.                                                                 |

## **Frontend**

    run 'npm start'. It will work on localhost.

    Requirements of Assignment was prepared on server. Totally 18 functions. I builded simple client side with Reactjs.
    10 requirement functions works on client side.

* login
* register
* loggedin
* signout
* editProfile
* resetPassword
* teamsOfUser
* createTeam
* removeTeam
* createTodo