import DataTable from "./components/Datatable";
import MultiStageFrom from "./components/MultiStageFrom";
const App: React.FC = () => {
  return (
    <>
      {/* component to show form */}
      <MultiStageFrom />
      {/*component to show user data in table form */}
      <DataTable />
    </>
  );
};

export default App;
