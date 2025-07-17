import React, {use, useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import Select from "react-select";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {useNavigate} from "react-router";
import useAuth from "../../../hooks/useAuth";
import {toast} from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import Spinner from "../../Shared/Spinner/Spinner";

const AddPost = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxiosInstance();
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/tags")
      .then((res) => {
        setTagOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosInstance]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm();

  // Get post count
  const {data: postCount, isLoading} = useQuery({
    queryKey: ["userPostCount", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/count?email=${user?.email}`);
      return res.data.count;
    },
    enabled: !!user?.email,
  });

  // Mutation for creating post
  const {mutateAsync: createPost, isPending: creating} = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/posts", formData);
      return res.data;
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries(["userPostCount", user?.email]);
      toast.success("Success!", "Your post has been added.", "success");
      reset();
    },
  });

  const onSubmit = async (data) => {
    const postData = {
      authorImage: user?.photoURL,
      authorName: user?.displayName,
      authorEmail: user?.email,
      title: data.title,
      description: data.description,
      tag: data.tag?.value || "",
      upVote: 0,
      downVote: 0,
      createdAt :new Date().toISOString()
    };

    await createPost(postData);
  };

  if (isLoading) return <Spinner/>;

  if (postCount >= 5) {
    return (
      <div className="max-w-xl mx-auto text-center mt-20">
        <h2 className="text-xl font-semibold mb-4 text-error">
          You have reached your post limit (5 posts).
        </h2>
        <button
          onClick={() => navigate("/membership")}
          className="btn btn-primary"
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <div className=" mx-auto bg-base-200 p-8 rounded-lg ">
      <h2 className="text-2xl font-bold mb-6 text-primary">Add New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Post Title</label>
          <input
            type="text"
            {...register("title", {required: true})}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <span className="text-error text-sm">Title is required</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Post Description</label>
          <textarea
            {...register("description", {required: true})}
            className="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
          {errors.description && (
            <span className="text-error text-sm">Description is required</span>
          )}
        </div>

        {/* Tag Select */}
        <div>
          <label className="block mb-1 font-semibold">Tag</label>
          <Controller
            name="tag"
            control={control}
            rules={{required: "Tag is required"}}
            render={({field}) => (
              <Select
                {...field}
                options={tagOptions}
                placeholder="Select a tag"
                onChange={(selected) => field.onChange(selected)}
                getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.value}
              />
            )}
          />
          {errors.tag && (
            <span className="text-error text-sm">{errors.tag.message}</span>
          )}
        </div>

        {/* Author Info (disabled) */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Author Image</label>
            <input
              type="text"
              value={user?.photoURL}
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Author Name</label>
            <input
              type="text"
              value={user?.displayName}
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Author Email</label>
            <input
              type="email"
              value={user?.email}
              className="input input-bordered w-full"
              disabled
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={creating}
        >
          {creating ? "Posting..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
