// TransactionList.tsx

import React, { useEffect, useState } from "react";
import { adminTransactionList } from "../../services/api/admin/apiMethods";
import { Pagination } from "flowbite-react";
import { formatDistanceToNow } from "date-fns";

const Transactions: React.FC = () => {
  // State variables
  //   const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Function to handle page change
  const onPageChange = (page: number) => setCurrentPage(page);

  // Function to fetch transactions
  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const fetchTransactions = () => {
    adminTransactionList(currentPage)
      .then((response: any) => {
        const transactionData = response.data;
        console.log(transactionData);
        setTransactions(transactionData.transactions);
        const totalPages = Math.ceil(transactionData.totalTransactions / 10); // Assuming 10 transactions per page
        setTotalCount(totalPages);
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  // Render
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      {/* Your transaction list UI */}
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              User
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Amount
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="px-6 py-4">
                <div className="relative  h-10 w-10">
                  <div>
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={transaction.userId.profileImg}
                      alt=""
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-700">
                    {transaction.userId.userName}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">{transaction.amount}</td>
              <td className="px-6 py-4">{transaction.transactionId}</td>
              <td className="px-6 py-4">
                {" "}
                {formatDistanceToNow(new Date(transaction.startDate), {
                  addSuffix: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          layout="table"
          currentPage={currentPage}
          totalPages={totalCount}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
};

export default Transactions;
