import React, { useState } from 'react';
import styless from "./Post.module.css";
import stylessClose from "../modal/MyModal.module.css";
import { PhotoModal } from '../modal/MyModal';
const PostMap = ({srcAvatar, post, deletePost}) => {
    const [modalPhoto, setModalPhoto] = useState(false);
    const clickk = () => setModalPhoto(true)
    if (!post.body && !post.photos) {
      return; 
    }
    
    const dates = new Date(post.id).toLocaleString('ru', {
      year: 'numeric', month: 'long', day:'numeric', hour:'numeric', minute:'numeric'
    })

    return (
        <div className={styless.postContent}>
          <div className={styless.avatar}>
            <div className={styless.date}>
              <img alt="avatar" src={srcAvatar} />
              <span >{dates}</span>
            </div>
            <div className={styless.position}>
              <span className={stylessClose.close} onClick={() => deletePost(post.id)} />
            </div>
          </div>
          <div className={styless.bodyContent}>
            {post.body && <p>{post.body}</p>}
            <br />
            {post.photos && (
              <>
                <img alt="photos" src={post.photos}  onClick={clickk} className={styless.modalImg}/>
                <PhotoModal state={modalPhoto} setState={setModalPhoto} photo={post.photos} />
              </>
            )}
          </div>
        </div>
    );
};

export default PostMap;