import './App.css'


function App(){


  
  let list = [

    // value 1
    {
      name: 'Lebron',
      age: 2,
      address: 'H'
    },

    // value 2
    {
      name: 'Bob',
      age: 3,
      address: 'k'

    },

    // value 3
    {
      name: 'Jake',
      age: 4,
      address: 'a'
    }
  ]




  return(
    <div>
      {list.map((values: any,index: any) => (
        <div key={index}>
          <p>{values.name}</p>
          <p>{values.age}</p>
          <p>{values.address}</p>
        </div>
      ))}
    </div>
  )
}

export default App;





