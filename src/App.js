import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { calculateTax } from './taxCalculator'; //masukkan function kalkulator pajak dari src/taxcalculator.js

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
    }
  }
`;// deklarasi query untuk graphql

function App() {
  const [income, setIncome] = useState('');
  const [age, setAge] = useState('');
  const [dependents, setDependents] = useState('');
  const [tax, setTax] = useState(null);
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  //deklarasi state untuk menyimpan dan mengosongkan nilai2 dari income,age,dependents
  //loading untuk proses pengambilan data query
  //error jika data tidak ditemukan

  const handleCalculateTax = () => {
    const calculatedTax = calculateTax(Number(income), Number(age), Number(dependents));
    setTax(calculatedTax);
  };//memanggil function calculatortax

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  //tampilan untuk loading dan error 

  return (
    <div className="App">
      <h1>Product List</h1>
      <ul>
        {data.products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <h2>Tax Calculator</h2>
      <div>
        <label>
          Income:
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Dependents:
          <input type="number" value={dependents} onChange={(e) => setDependents(e.target.value)} />
        </label>
      </div>
      <button onClick={handleCalculateTax}>Calculate Tax</button>
      {tax !== null && (
        <div>
          <h2>Calculated Tax: {tax}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
