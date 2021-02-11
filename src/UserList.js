import React from 'react';


const UserList = ({users}) => {

  // check out class names
  return (
    <div className="block">
      {users.map((user, index) => (
        <div key={index}>
          <p className="user">{user.username}</p>
        </div>
      ))}
    </div>
  )
};

export default UserList;