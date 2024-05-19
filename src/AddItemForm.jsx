import { useContext, useState } from "react";
import { ApiContext } from "./ApiContext";
import { graphql_url, rest_url } from "./constants";

function AddItemForm() {
  const { apiType } = useContext(ApiContext);

  const [stuId, setStuId] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const url = apiType == "rest" ? rest_url + "/additem" : graphql_url
    const body = apiType == "rest" ? 
    JSON.stringify({ stuId, phone, title, description }) :
    JSON.stringify({
      query: `
        mutation {
          addItem(
            id: "${Date.now().toString()}", 
            createdAt: "${new Date().toISOString()}", 
            ownerStudentId: ${parseInt(stuId, 10)}, 
            contactNumber: "${phone}", 
            title: "${title}", 
            description: "${description}", 
            taken: false
          ) {
            id
            createdAt
            ownerStudentId
            contactNumber
            title
            description
            taken
            requesterStudentId
            requestedAt
          }
        }
      `,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setSuccess(true);
      setStuId("");
      setPhone("");
      setTitle("");
      setDescription("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="add-item mx-auto p-6 border-2 rounded-lg mb-6 "
    >
      <div className="">
        <div className="mb-3">
          <div className="mb-5">
            <label
              htmlFor="stuId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Student ID
            </label>
            <input
              type="text"
              id="stuId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
              placeholder="e.g. 202000000"
              value={stuId}
              onChange={(e) => setStuId(e.target.value)}
              required
            />

              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Phone Number
              </label>
              <input
                type="text"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="053XXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              </div>

          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="items-strecth">
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Item Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Describe the item"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 text-xs mt-2">Item added successfully!</p>
      )}
    </form>
  );
}

export default AddItemForm;
