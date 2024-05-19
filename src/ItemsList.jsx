import { useContext, useEffect, useState } from "react";
import Item from "./Item"
import { ApiContext } from "./ApiContext";
import { graphql_url, rest_url } from "./constants";

function ItemsList() {
    const {apiType} = useContext(ApiContext)
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = apiType == "rest" ? rest_url + "/list" : graphql_url
    const body = apiType == "rest"? null : 
    JSON.stringify({
      query: `
        query {
          listItems {
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
    })
    console.log(apiType);

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await fetch(url,{
              method: apiType == "rest" ? "GET" : "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body
          }); 
            if (!response.ok) {
              throw new Error('There was problem in request');
            }
            const data = await response.json();
            console.log(data);
            const fetchedItems = apiType == "rest" ? data : data.data.listItems
            setItems(fetchedItems);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchItems();
      }, []);

      if (loading) {
        return <div className="text-center">Loading...</div>;
      }

      if (error) {
        return <div className="text-center">Error: {error}</div>;
      }
  return (
    <div className="item-list mx-auto">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ItemsList