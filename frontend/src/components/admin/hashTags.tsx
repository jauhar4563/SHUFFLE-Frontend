import { CheckCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { getHashtags } from "../../services/api/user/apiMethods";
import { toast } from "sonner";

function HashTags() {
    const [loading,setLoading] = useState(true);
    const [hashtags,setHashtags] = useState([]);
    useEffect(()=>{
        try{
          getHashtags()
          .then((response:any) => {
            const hashtagData = response.data;
            setHashtags(hashtagData.hashtags); 
        
            console.log(hashtagData.hashtags);
            
          })
          .catch((error) => {
          console.log(error);
          
          })
          .finally(() => {
            setLoading(false);
          });
        }catch(error){
          toast.error(error.message)
        }
      },[setHashtags])

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table className=" w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Posts</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Dat</th>
          <th scope="col" className="px-6 py-4 font-medium flex justify-center text-gray-900">Action</th>

        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
      {hashtags.length>0 && hashtags.map((hashtag: any) => (
    
        <tr key={hashtag._id} className="hover:bg-gray-50">
          <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
            <div className="text-sm">
              <div className="font-medium text-gray-700">{hashtag.hashtag}</div>
            </div>
          </th>
          <td className="px-6 py-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
              {hashtag.posts.length}
            </span>
          </td>
          <td className="px-6 py-4">
            {hashtag.date}
          </td>

          <td className="px-6 py-4">{hashtag.isBlocked?(<span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600">
          Blocked
              </span>):(<span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
          UnBlocked
              </span>)}</td>

         
          <td className="px-6 py-4">
            <div className="flex justify-end gap-4">
            {hashtag.isBlocked?(<button type="button"
className=" bg-white text-blue-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
              <CheckCheck />UnBlock
</button>):(<button type="button"  className=" bg-white text-red-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                  x-tooltip="tooltip"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>Block
</button>)}

              
              
              
            </div>
          </td>
        </tr>
    ))}
        {/* Additional rows can be added here */}
      </tbody>
    </table>
  </div>
  )
}

export default HashTags