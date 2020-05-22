import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layouts/Spinner'

const Users =({users,loading})=> {
   if(loading){
       return <Spinner/>
   }else{

  
        return (
            <div style={UserStyle}>
               {users.map(user=>(
                   <UserItem key={user.id} user={user}/>
               ))}
            </div>
        )
               }   
}

const UserStyle={
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    girdGap:'1rem'
}

export default Users
