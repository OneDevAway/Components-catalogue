import { useEffect, useState } from 'react'
import Search from '../assets/Search'
import TrashIcon from '../assets/Trash'
import DeleteModal from './DeleteModal'
import NewEntryForm from './NewEntryForm'

const SubCategories = ({
  orderArray,
  formToDelete,
  catToDelete,
  setFormToDelete,
  handleDelete,
  data,
  category,
  categoryStates,
  setCategoryStates,
  setSelectedCategory,
  selected,
  setSelected,
  authorised,
  fetchData
}) => {
  const [names, setNames] = useState([])
  const [input, setInput] = useState('')
  const [all, setAll] = useState([])
  const [subcategory, setSubcategory] = useState()
  const [editFormStates, setEditFormStates] = useState({})

  const selectedCategory = data.find(
    (categoryObj) => categoryObj?.category === category
  )
  function findCategoryBySubcategory(catalogue, subcategoryName) {
    // Find the subcategory object
    const subcategory = catalogue.find(category => {
      return category.subcategories.find(sub => sub.subcategory === subcategoryName);
    });
  
    // If subcategory is found, return its parent category
    if (subcategory) {
      return subcategory.category;
    } else {
      return null; // Return null if subcategory not found
    }
  }
  useEffect(() => {
    if (selectedCategory !== undefined) {
      setNames(selectedCategory?.subcategories.map((obj) => obj))
    }
  }, [selectedCategory])

  const handleSearch = (event) => {
    setInput(event.target.value)
  }

  const filteredNames = names.filter((name) =>
    name.subcategory.toUpperCase().includes(input.toUpperCase())
  )
  orderArray(filteredNames.map((obj) => obj.subcategory))

  useEffect(() => {
    const allSubcategories = []
    data.forEach((obj) => {
      obj?.subcategories.map((obj) => allSubcategories.push(obj))
    })
    setAll(allSubcategories)
  }, [data])

  useEffect(() => {
    if (category === 'All') {
      setNames(all)
    }
    if (category) {
      setSelected('')
    }
  }, [category, all])

  const setNewData = (newData) => {
    setFormToDelete({
      ...formToDelete,
      subcategories: [{ subcategory: newData }]
    })
  }
  return (
    <section className="subCategories">
      <div className="searchBar">
        <Search />
        <input
          type="text"
          onChange={handleSearch}
          placeholder={`Search ${
            filteredNames.length
          } components in ${category !== "All" ? category.split('').splice(4).join('').split('_').join(' ') : category} ${
            category === 'All' ? 'categories' : 'category'
          }`}
          className="searchInput"
        ></input>
      </div>
      <div className='subcategoryScroll'>
        {filteredNames.map((obj, idx) => {
         const categoryName = findCategoryBySubcategory(data, obj.subcategory)
          return (
            <div
              className={selected === idx ? 'high' : 'categoryContainer'}
              key={idx}
              onClick={() => {
                setSubcategory(obj.subcategory)
                setSelected(idx)
                setSelectedCategory(obj)
              }}
            >
              <div className={selected === idx ? 'sideShow' : 'sideHide'}></div>
              <div className='subCategoryTextContainer'>
                <p className="subTitle">{obj.subcategory}</p>
                <div className="subDescription">
                  <p>{obj.subcategoryDetails[0].description}</p>
                </div>
              </div>
{!authorised ? null : 
              <div>
                <button className='trashIcon' onClick={() => setEditFormStates(prevState => ({ ...prevState, [obj.subcategory]: true }))}>Edit</button>
                <div
                  onClick={() => {
                    handleDelete(subcategory)}}
                  className="trashIcon"
                >
                  {' '}
                  <TrashIcon />
                </div>
              </div>
              }
              {
                editFormStates[obj.subcategory] && <NewEntryForm subcategoryObj={obj} categoryName={categoryName} editFormState={editFormStates[obj.subcategory]} setEditFormStates={setEditFormStates} fetchData={fetchData} data={data} orderArray={orderArray} />
              }
              
            </div>
          )
        })}
        <DeleteModal
          data={data}
          catToDelete={catToDelete}
          setNewData={setNewData}
          formToDelete={formToDelete}
          setFormToDelete={setFormToDelete}
          subcategory={true}
          category={subcategory}
          categoryStates={categoryStates}
          setCategoryStates={setCategoryStates}
          fetchData={fetchData}
        />
      </div>
    </section>
  )
}

export default SubCategories
