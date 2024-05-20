import React, { useEffect, useState } from "react";
import Requests from "../../components/Requests";
import UserSuggestionBar from "../../components/UserSuggestionBar";
import {
  acceptFollowRequest,
  getRequestedUsers,
  rejectFollowRequest,
} from "../../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import RequestsShimmer from "../../components/shimmerUI/RequestsShimmer";
import { toast } from "sonner";
import "./FollowRequests.css";

function FollowRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id;
  useEffect(() => {
    setTimeout(() => {
      getRequestedUsers({ userId }).then((response: any) => {
        console.log(response.data);
        setRequests(response.data.requests);
        setLoading(false);
      });
    }, 2000);
  }, []);

  const handleAcceptRequest = (requestedUser: any) => {
    console.log(requestedUser);
    acceptFollowRequest({ userId, requestedUser }).then((response: any) => {
      setRequests(response.data.connections);
      console.log(response.data.connections);
      toast.info("Request Accepted");
    });
  };
  const handleReject = (requestedUser: any) => {
    rejectFollowRequest({ userId, requestedUser }).then((response: any) => {
      setRequests(response.data.connections);
      toast.info("Request Rejected");
      console.log(response.data.connections);
    });
  };

  return (
    <>
      <div className="flex flex-col w-full  h-screen">
        <div className="z-40 lg:mt-3 w-full">
          <div className="lg:col-span-2 w-full lg:ms-96 lg:p-3" id="posted">
            <div className="flex follow-requests-section justify-between bg-white p-4 lg:ml-2 rounded-lg">
              <h1 className="text-xl font-semibold"> Follow Requests</h1>
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
              <Requests
                key={request._id}
                request={request}
                handleAcceptRequest={handleAcceptRequest}
                handleReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
      <UserSuggestionBar />
    </>
  );
}

export default FollowRequests;
