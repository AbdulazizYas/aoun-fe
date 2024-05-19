import { useContext, useState } from "react"
import { ApiContext } from "./ApiContext";
import { graphql_url, rest_url } from "./constants";

function Item({item}) {

   const {apiType} = useContext(ApiContext);
    const [claimed, setClaimed] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const handleClaim = async (e) => {
        e.preventDefault()
        const requesterId = window.prompt("Please enter your Student ID:");

        if (!requesterId) {
            setError("Requester ID is required.");
            return;
        }
        
        setLoading(true);
        setError(null);
        
        const url = apiType == "rest" ? rest_url + "/getitem" : graphql_url
        const body = apiType == "rest" ? JSON.stringify({ id: item.id, requesterId  }) :
        ""


        try {
            const response = await fetch(url, { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body,
            });
      
            if (!response.ok) {
              throw new Error('There was problem in request');
            }
      
            const result = await response.json();
            setClaimed(true);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
    }

  return (
    

<div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6">
    <div className="flex justify-between w-full">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {item.title}
        </h5>
        <button onClick={(e) => handleClaim(e)} className=
        {`inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800 ${claimed || item.taken? "text-blue-700 bg-transparent border border-blue-700 dark:hover:bg-blue-700 hover:text-white" : "text-white bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700" } disabled:opacity-70`} disabled={loading || claimed || item.taken}>
             {claimed || item.taken? "Claimed" : loading? "Claiming ..." : "Claim"}
        </button>
    </div>

    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {item.description}
    </p>

    <div className="flex justify-between w-full">
        <div className="flex">
            <p className="text-black/25 dark:text-white/25 text-xs font-semibold mr-1">{item.owner_student_id}</p>
            <p className="text-black/25 dark:text-white/25 text-xs font-semibold">{item.contact_number}</p>
        </div>

        <div>
            <p className="text-black/25 dark:text-white/25 text-xs font-semibold">{item.created_at}</p>
        </div>

    </div>



</div>

  )
}

export default Item