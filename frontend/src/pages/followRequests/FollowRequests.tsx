import React, { useEffect, useState } from "react";
import Requests from "../../components/Requests";
import UserSuggestionBar from "../../components/UserSuggestionBar";
import { acceptFollowRequest, getRequestedUsers, rejectFollowRequest } from "../../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import RequestsShimmer from "../../components/shimmerUI/RequestsShimmer";
import { toast } from "sonner";

function FollowRequests() {
    const [requests,setRequests] = useState([])
    const [loading,setLoading] = useState(true)

    const selectUser = (state: any) => state.auth.user;
    const user = useSelector(selectUser);
    const userId = user._id
    useEffect(()=>{
        setTimeout(()=>{
            getRequestedUsers({userId}).then((response:any)=>{
                console.log(response.data)
                setRequests(response.data.requests)
                setLoading(false)
            })
        },2000)
        
    },[]);

    const handleAcceptRequest = (requestedUser)=>{
        console.log(requestedUser)
        acceptFollowRequest({userId,requestedUser}).then((response:any)=>{
            setRequests(response.data.connections)
            console.log(response.data.connections)
            toast.info("Request Accepted")
        })
    }
    const handleReject = (requestedUser)=>{
        rejectFollowRequest({userId,requestedUser}).then((response:any)=>{
            setRequests(response.data.connections)
            toast.info("Request Rejected")
            console.log(response.data.connections);
        })
    }


  return (
    <>
      <div className="flex flex-col  h-screen">
        <div className="z-40 mt-3">
          <div className="lg:col-span-2 ms-96 w-12/12 p-3" id="posted">
            <div
              className="flex justify-between bg-white p-4 ml-2 rounded-lg"
              style={{ width: "660px" }}
            >
              <h1 className=" text-xl font-semibold"> Follow Requests</h1>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="">
           <RequestsShimmer />
           <RequestsShimmer />
           <RequestsShimmer />
           <RequestsShimmer />
           <RequestsShimmer />
          </div>
        ) : (
          <div className="">
            {requests.map((request: any) => (
              <Requests key={request._id} request={request} handleAcceptRequest={handleAcceptRequest} handleReject={handleReject}/>
            ))}
          </div>
        )}
       
      </div>
      <UserSuggestionBar />
    </>
  );
}

export default FollowRequests;
