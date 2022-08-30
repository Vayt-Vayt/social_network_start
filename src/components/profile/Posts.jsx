import React from "react";
import { useForm } from "react-hook-form";
import styless from "./Post.module.css";
import classNulls from "./Profile.module.css";
import { FormActionss } from "../hellper/helper";
import PostMap from "./PostMap";
import MyButton from "../ui/button/MyButton";

const Posts = ({ isOwner, srcAvatar, buttonStyles, profile, addPosts, deletePost }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const reversProfile = [...profile.posts].reverse();
  const onSubmit = (data) => {
    if (data.post || data.photo.length > 0) {
      if (data.photo.length > 0) {
        let formData = new FileReader();
        formData.readAsDataURL(data.photo[0]);
        formData.onload = () => {
          addPosts(data.post, formData.result);
          reset();
        };
      } else {
        addPosts(data.post, "");
        reset();
      }
    }
  };

  return (
    <div className={styless.content}>
      {isOwner && (
        <div className={styless.formContent}>
          {FormActionss(
            "textarea",
            errors,
            null,
            "post",
            { register },
            { placeholder: "Enter post text" }
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styless.buttonsForm}
          >
            <input
              type="file"
              id="photoPost"
              {...register("photo")}
              className={classNulls.nulls}
            />
            <label htmlFor="photoPost" className={buttonStyles.names}>
              Add photo
            </label>
            <MyButton>submit</MyButton>
          </form>
        </div>
      )}
      {reversProfile.map((post) => (
        <PostMap post={post} srcAvatar={srcAvatar} key={post.id} deletePost={deletePost} />
      ))}
    </div>
  );
};

export default Posts;
