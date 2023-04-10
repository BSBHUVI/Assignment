

import './App.css';
import DataContext from './DataContext';
import Table from './Table';

function App() {
 const del=true;
 const isMulti=true;
  return (
    <div className="App">
    <DataContext>
      <Table isMultiSelect={isMulti} canDel={del} />
    </DataContext>
   
    </div>
  );
}

export default App;
//problem : using the data context approach create a data grid componenet based on following rules:
// the data grid should be dynamically
//pass candelete property to this component .if it is true then each row to data grid should shoe delete button
//once this button is clicked the record shuld be deleted from the collection that is passed by parent

//pass ismultiselect property from parent to child if this property is true each row should have check box including header show
//when the check box from header row is checked ,check every check box in each row
//sort and reverse