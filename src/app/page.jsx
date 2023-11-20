import HomePosts from "../components/HomePosts";
import axios from "axios";
import { URL } from "../urls/url";


const Home = async () => {
  const posts = await getPosts();
  return (
    <>
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {posts.map((post) => (
          <HomePosts key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

const getPosts = async () => {
  try {
    const res = await axios.get(URL + "/api/posts/");
    return res.data;
  } catch (error) {
    console.log(`Error while fetching the all post api : ${error.message}`);
  }
};

export default Home;
