import { useState } from 'react'
import PlusIcon from '../assets/Plus'
import NewEntryForm from './NewEntryForm'
import TrashIcon from '../assets/Trash'
import DeleteModal from './DeleteModal'
import Loader from './Loader'

const Categories = ({
  orderArray,
  catToDelete,
  setFormToDelete,
  formToDelete,
  handleDelete,
  categoryStates,
  setCategoryStates,
  setCategory,
  data,
  authorised,
  fetchData
}) => {
  const categoryNames = data.map((obj) => obj.category)
  orderArray(categoryNames)
  const [newEntryState, setNewEntryState] = useState(false)
  const [selected, setSelected] = useState('All')

  const handleClick = (idx) => {
    setSelected(idx)
    if (newEntryState === false) {
      setNewEntryState(true)
    } else setNewEntryState(false)
  }

  const setNewData = (newData) => {
    setFormToDelete({ ...formToDelete, category: newData })
  }
  return (
    <>
      <section className="categories">
        <header>
          <h3 className="categoriesH3">
            Categories{' '}
            <div className="plusIcon" onClick={handleClick}>
              {!authorised ? null : (
                <div className="plusIcon">
                  <PlusIcon />
                </div>
              )}
            </div>{' '}
          </h3>
        </header>
        {data.length <= 0 ? (
          <Loader />
        ) : (
          <div>
            {!newEntryState ? null : (
              <NewEntryForm
                orderArray={orderArray}
                data={data}
                handleClick={handleClick}
                newEntryState={newEntryState}
                setNewEntryState={setNewEntryState}
                fetchData={fetchData}
              />
            )}
            <div
              className={selected === 'All' ? 'high' : 'categoryContainer'}
              onClick={() => {
                setCategory('All')
                setSelected('All')
              }}
            >
              <div
                className={selected === 'All' ? 'sideShow' : 'sideHide'}
              ></div>
              All
            </div>
            {categoryNames.map((category, idx) => {
              return (
                <div
                  className={selected === idx ? 'high' : 'categoryContainer'}
                  key={idx}
                  onClick={() => {
                    setCategory(category)
                    setSelected(idx)
                  }}
                >
                  <div
                    className={selected === idx ? 'sideShow' : 'sideHide'}
                  ></div>
                  <p>{category}</p>
                  {!authorised ? null : (
                    <div
                      onClick={() => handleDelete(category)}
                      className="trashIcon"
                    >
                      {' '}
                      <TrashIcon />
                    </div>
                  )}

                  <DeleteModal
                    catToDelete={catToDelete}
                    setNewData={setNewData}
                    formToDelete={formToDelete}
                    setFormToDelete={setFormToDelete}
                    subcategory={false}
                    category={category}
                    categoryStates={categoryStates}
                    setCategoryStates={setCategoryStates}
                    fetchData={fetchData}
                  />
                </div>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}

export default Categories
