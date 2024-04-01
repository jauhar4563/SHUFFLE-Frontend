import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  adminUserBlock,
  adminUserList,
} from "../../services/api/admin/apiMethods";
import { CheckCheck } from "lucide-react";
import { Button, Modal } from "flowbite-react";
import { BookLockIcon } from "lucide-react";

const PostList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [blockAction, setBlockAction] = useState<"block" | "unblock">("block");

  useEffect(() => {
    try {
      adminUserList()
        .then((response: any) => {
          const usersData = response.data;
          setUsers(usersData.users);

          console.log(usersData.users);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, [setUsers]);

  const handleUserBlock = (userId: string, status: string) => {
    try {
      setSelectedUserId(userId);
      setBlockAction(status === "block" ? "unblock" : "block");
      setOpenModal(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const confirmBlockUser = (userId: string, status: string) => {
    setOpenModal(false);
    const requestData = { userId };
    console.log("block");
    adminUserBlock(requestData)
      .then((response: any) => {
        const data = response.data;
        if (status == "block") {
          toast.error(data.message);
        } else {
          toast.info(data.message);
        }
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === userId) {
              return { ...user, isBlocked: !user.isBlocked };
            }
            return user;
          })
        );
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className=" w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              State
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Google
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Facebook
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium flex justify-center text-gray-900"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {users.length > 0 &&
            users.map((user: any) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={user.profileImg}
                      alt=""
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {user.userName}
                    </div>
                    <div className="text-gray-400">{user.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {user.isOnline ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold text-red-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                      Not Active
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {user.isGoogle ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      Yes
                    </span>
                  ) : (
                    "No"
                  )}
                </td>
                <td className="px-6 py-4">
                  {user.isFacebook ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      Yes
                    </span>
                  ) : (
                    "No"
                  )}
                </td>

                <td className="px-6 py-4">
                  {user.isBlocked ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600">
                      Blocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      UnBlocked
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    {user.isBlocked ? (
                      <button
                        type="button"
                        onClick={() => handleUserBlock(user._id, "unblock")}
                        className=" bg-white text-blue-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                      >
                        <CheckCheck />
                        UnBlock
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleUserBlock(user._id, "block")}
                        className=" bg-white text-red-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                      >
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
                        </svg>
                        Block
                      </button>
                    )}

                    {/* <a x-data="{ tooltip: 'Edite' }" href="#">
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </a> */}
                  </div>
                </td>
              </tr>
            ))}
          {/* Additional rows can be added here */}
        </tbody>
      </table>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Body>
          <div className="text-center">
            <BookLockIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to{" "}
              {blockAction === "unblock" ? "block" : "unblock"} this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color={blockAction === "block" ? "blue" : "failure"}
                onClick={() => confirmBlockUser(selectedUserId, "block")}
              >
                Yes, {blockAction === "unblock" ? "block" : "unblock"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostList;
