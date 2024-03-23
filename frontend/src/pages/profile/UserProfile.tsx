import  { useEffect, useState } from 'react';
import Posts from '../../components/Posts';
import { Pencil, Share2Icon } from 'lucide-react';
import { getAllPosts } from '../../services/api/user/apiMethods';
import { useSelector } from 'react-redux';

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const selectUser = (state:any)=>state.auth.user;
  const user = useSelector(selectUser);

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        getAllPosts({userId:user._id})
          .then((response: any) => {
            const postsData = response.data;
            setPosts(postsData);
            console.log(postsData);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='ml-5 w-9/12'>
      <div className='ms-96 flex mt-5 flex-col bg-white p-4 pl-10 w-11/12'>
        <div className='flex mt-24 justify-between '>
          <div className='flex flex-col gap-4'>
            <img className='w-28 h-28 ' src={user.profileImg} alt="" />
            <p className='font-semibold text-lg'>{user.name}</p>
          </div>
          <div className='flex gap-6 '>
            <div className='flex flex-col items-center'>
              <p>57</p>
              <p>Following</p>
            </div>
            <div className='flex flex-col items-center'>
              <p>48K</p>
              <p>Followers</p>
            </div>
            <div className='flex flex-col items-center'>
              <p>21</p>
              <p>Posts</p>
            </div>
          </div>
          <div className='flex gap-5 mr-14'>
            <Pencil />
            <Share2Icon />
          </div>
        </div>
        <div className='w-11/12'>
          <p className='font-semibold'>About Me</p>
          <p className=''>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
      </div>
      <div className='flex'>
        {posts.length >0 && (
          <div className="goals">
            {posts.map((post: any) => (
              <Posts key={post._id} post={post} />
            ))}
          </div>
        )}
        <div className=' bg-white'></div>
      </div>
    </div>
  );
}

export default HomePage;
