
import { useState } from 'react'
import './App.css'
import FormNote from './components/FormNote'
import { Checkbox } from './components/forms/checkbox'
import {Input} from './components/forms/Input'

import { ProductRow } from './components/products/ProductRow'
import { ProductCategory } from './components/products/ProductCategory'
function App() {
let [count, setCount] = useState(0)
const increment = () => {
  setCount(count + 1)}

const PRODUCTS = [
  { id: 1, name: 'Produit A', price: '$10.00', category:'fruit', stocked: true },
  { id: 2, name: 'Produit B', price: '$20.00', category:'fruit', stocked: false },
  { id: 3, name: 'Produit C', price: '$30.00', category:'fruit', stocked: true },
  { id: 4, name: 'Produit D', price: '$40.00', category:'fruit', stocked: false },
  { id: 5, name: 'Produit E', price: '$50.00', category:'legume', stocked: true },
  { id: 6, name: 'Produit F', price: '$60.00', category:'legume', stocked: false },
  { id: 7, name: 'Produit G', price: '$70.00', category:'legume', stocked: true },
  { id: 8, name: 'Produit H', price: '$80.00', category:'legume', stocked: false },]


 return <>
 <p>compteur: {count}</p>
 <button onClick={ increment}>ok</button>
 <SearchBar/>
<ProductTable products={PRODUCTS} />

 </>
  
}

function SearchBar() {
  return (
    <div>
    <Input value="" onChange={()=>null} placeholder="Rechercher..." />
    <Checkbox id='stocked' label="N'affiche que les produits en stock" checked={false} onChange={() => null} />
      <button>Search</button>
    </div>
  )
}

function ProductTable ({ products }) {
  const rows = products.map((product) => (<>
    <ProductRow key={product.id} product={product} />
  </>
  ))

  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}


export default App
