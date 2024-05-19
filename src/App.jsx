import AddItemForm from "./AddItemForm";
import { ApiProvider } from "./ApiContext";
import Header from "./Header";
import ItemsList from "./ItemsList";

function App() {
  return (
    <ApiProvider>
    <Header />
      <div className="px-4 py-8 max-w-lg sm:max-w-xl md:max-w-7xl mx-auto md:flex md:items-start md:gap-4 md:flex-row-reverse">
        
        <AddItemForm />
        <ItemsList />
      </div>
    </ApiProvider>
  );
}

export default App;
