import React from 'react';
import { useSelector } from 'react-redux';
import userPhoto from '../../images/users.jpg'

const Users = ({users}) => {
console.log(users);

    return (
        <div>
            {users.map(user => 
                <div key={user.id} >
                    <div>
                        {user.name}
                    </div>
                    <div>
                        <img alt='avatar' 
                            src={user.photos.small ? user.photos.small : userPhoto} 
                            style={{width: '80px', margin:'5px'}} 
                        />
                    </div>
                    <div>
                        {user.followed ? <button>Unfolloed</button> : <button>followed</button>}
                    </div>
                </div>    
            )}
        </div>
    );
};

export default Users;

export const UsersContainer = (props) => {
    const { users } = useSelector(state => state.users)

    return (
        <Users users={users}/>
    )
}