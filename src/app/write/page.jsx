"use client"
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import ToDoContext from "@/context/mainContext";
import axios from "axios";
import { useRouter } from "next/navigation";

import { URL } from "@/urls/url";
const CreatePost = () => {
  const router = useRouter();
  const { user } = useContext(ToDoContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setfile] = useState(null);
  const [desc, setDesc] = useState("");

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const post = {
        title,
        desc,
        username: user.username,
        userId: user._id,
        categories: cats,
      };

      if (file) {
        try {
          const data = new FormData();
          data.append("file", file);
          const res = await axios.post(URL + "/api/upload", data);
          post.photo = res.data.filename;
        } catch (error) {
          console.log("error while uploading the file" + error.message);
        }
      }
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      router.push("/posts/post/" + res.data._id);
    } catch (error) {
      console.log("error while creating the post", error.message);
    }
  };

  return (
    <div>
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl ">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            className="px-4"
            onChange={(e) => setfile(e.target.files[0])}
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            onClick={submitForm}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
