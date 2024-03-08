import { useEffect, useState } from 'react'
import Categories from './Categories'
import SubCategories from './SubCategories'
import Examples from './Examples'

const Catalogue = () => {
  const catToDelete = {
    category: '',
    subcategories: [{ subcategory: '' }]
  }
  const [category, setCategory] = useState('All')
  const [data, setData] = useState([])
  const [categoryStates, setCategoryStates] = useState({})
  const [formToDelete, setFormToDelete] = useState(catToDelete)
  const [selectedCategory, setSelectedCategory] = useState({})
  const [selected, setSelected] = useState('')
  const [authorised, setAuthorised] = useState(false)

  const orderArray = (array) => {
    array.sort((a, b) => {
      // Extract the three-digit numbers from each string
      const numberA = parseInt(a.match(/\d{3}/)[0], 10)
      const numberB = parseInt(b.match(/\d{3}/)[0], 10)

      // Compare the extracted numbers
      return numberA - numberB
    })
  }
  const token = localStorage.getItem('token')
  useEffect(() => {
    const adminAuth = async () => {
      try {
        if (token) {
          const response = await fetch('https://shy-pink-boa-sari.cyclic.app/auth', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (response.ok) {
            setAuthorised(true)
          } else {
            console.error('Failed to authorise')
          }
        }
      } catch (error) {
        console.error('An error occurred while authorising:', error)
      }
    }

    adminAuth()
  }, [token])
  const handleDelete = (category) => {
    setCategoryStates((prevStates) => ({
      ...prevStates,
      [category]: true
    }))
  }
  const fetchData = () => {
    fetch(' https://shy-pink-boa-sari.cyclic.app/catalogue')
    .then((res) => res.json())
    .then((data) => {
      setSelectedCategory(data[0]?.subcategories[0])
      return setData(data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="catalogueContainer">
        <Categories
          data={data}
          orderArray={orderArray}
          catToDelete={catToDelete}
          formToDelete={formToDelete}
          setFormToDelete={setFormToDelete}
          categoryStates={categoryStates}
          setCategoryStates={setCategoryStates}
          handleDelete={handleDelete}
          setCategory={setCategory}
          authorised={authorised}
          fetchData={fetchData}
        />

        <SubCategories
          data={data}
          orderArray={orderArray}
          catToDelete={catToDelete}
          formToDelete={formToDelete}
          setFormToDelete={setFormToDelete}
          categoryStates={categoryStates}
          setCategoryStates={setCategoryStates}
          handleDelete={handleDelete}
          category={category}
          setSelectedCategory={setSelectedCategory}
          authorised={authorised}
          selected={selected}
          setSelected={setSelected}
          fetchData={fetchData}
        />
        <Examples
          selectedCategory={selectedCategory}
          selected={selected}
          authorised={authorised}
        />
      </div>
    </>
  )
}

export default Catalogue
