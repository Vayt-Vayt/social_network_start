import React from 'react';
import styless from './Profile.module.css'

const Profile = (props) => {

    return (
        <div className={styless.profileContent}>
          <div className={styless.photosAvatar}>
            <img alt='avatar'src={''} />
          </div>
          <div className={styless.infoUser}>
            info
          </div>
          <div className={styless.content}>
            posts
          </div>  
        </div>
    );
};

export default Profile;