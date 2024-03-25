import  { useEffect, useState } from 'react';
import Posts from '../../components/Posts';
import { Pencil, Share2Icon } from 'lucide-react';
import {  getUserPost } from '../../services/api/user/apiMethods';
import { useDispatch, useSelector } from 'react-redux';
import {setPosts} from '../../utils/context/reducers/authSlice'
import PostShimmer from '../../components/shimmerUI/postShimmer';

function HomePage() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const selectPosts = (state:any)=>state.auth.posts;
  const selectUser = (state:any)=>state.auth.user;
  const user = useSelector(selectUser);
  const posts = useSelector(selectPosts) || [];

  useEffect(() => {
    try {
      setLoading(true);
      
        getUserPost({userId:user._id})
          .then((response: any) => {
            const postsData = response.data;
            dispatch(setPosts({ posts: response.data }));            
            console.log(postsData);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='ml-5 w-9/12'>
      <div className='ms-96 flex mt-5 flex-col bg-white p-4 pl-10 w-11/12'>
        <div className='flex mt-24 justify-between '>
          <div className='flex flex-col gap-4'>
            <img className=' h-28 ' src={user.profileImg} alt="" />
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
            {user.bio?user.bio:' Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
          </p>
        </div>
      </div>
      <div className='flex'>
        {loading ? (
          <div className=''>
            <PostShimmer />
            <PostShimmer />
            <PostShimmer />
          </div>
        ) : (
          <div className="">
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
