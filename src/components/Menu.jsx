"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { URL } from "../urls/url";
import ToDoContext from "../context/mainContext";
import { useContext } from "react";
const Menu = () => {
  const { setUser, user } = useContext(ToDoContext);
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null);

      router.push("/");
    } catch (error) {
      console.log(`error while logout the user ${error.message}`);
    }
  };
  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
        <Link href={`/profile/${user._id}`}>Profile</Link>
      </h3>

      <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
        <Link href={`/myblogs/${user._id}`}>My blogs</Link>
      </h3>

      <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
        <button onClick={logoutHandler}>Logout</button>
      </h3>
    </div>
  );
};

export default Menu;
