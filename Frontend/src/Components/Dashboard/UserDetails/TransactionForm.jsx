import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, fetchTransactions } from "../../../Features/Transactions/TransactionSlice";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transactions) || [];
  const { loading, error } = useSelector((state) => state.transaction);
  const [transactionType, setTransactionType] = useState("Deposit");
  const [amount, setAmount] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    dispatch(createTransaction({ type: transactionType.toLowerCase(), amount: parsedAmount }));
    setAmount("");
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = [...transactions].reverse().slice(indexOfFirstTransaction, indexOfLastTransaction);

  const nextPage = () => {
    if (currentPage < Math.ceil(transactions.length / transactionsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Make a Transaction</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleTransactionSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>

        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Submit Transaction"}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Type</th>
                <th className="border border-gray-300 p-2">Amount</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{transaction.type}</td>
                  <td className="border border-gray-300 p-2">₹{transaction.amount}</td>
                  <td className="border border-gray-300 p-2">{transaction.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(transactions.length / transactionsPerPage)}</span>
          <button
            onClick={nextPage}
            disabled={currentPage >= Math.ceil(transactions.length / transactionsPerPage)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
