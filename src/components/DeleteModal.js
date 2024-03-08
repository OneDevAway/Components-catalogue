import { useEffect, useState } from 'react'
import CloseIcon from '../assets/Close'

const DeleteModal = ({
  data,
  catToDelete,
  setNewData,
  formToDelete,
  setFormToDelete,
  subcategory,
  category,
  setCategoryStates,
  categoryStates,
  fetchData
}) => {
  const [counter, setCounter] = useState(0)
  const [matchDelete, setMatchDelete] = useState('')
  const findCategoryForSubcategory = (subcategoryToFind) => {
    for (const categoryObj of data) {
      for (const subcategoryObj of categoryObj.subcategories) {
        if (subcategoryObj.subcategory === subcategoryToFind) {
          return categoryObj.category
        }
      }
    }
    return ''
  }
  const handleDeleteClose = (category) => {
    setFormToDelete(catToDelete)
    setCategoryStates((prevStates) => ({
      ...prevStates,
      [category]: false
    }))
  }
  useEffect(() => {
    if (subcategory) {
      const foundCategory = findCategoryForSubcategory(category)
      setFormToDelete({ ...formToDelete, category: foundCategory })
    }
  }, [category, counter])

  const handleDeleteConfirm = async (category) => {
    if (subcategory) {
      if (formToDelete.subcategories[0].subcategory === category) {
        try {
          const response = await fetch(
            'http://localhost:3000/catalogue/subcategory',
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formToDelete)
            }
          )
          if (response.ok) {
            console.log('Subcategory has been deleted succsessfully')
            setFormToDelete(catToDelete)
            fetchData()
            window.location.reload()
          } else {
            const responseData = await response.json()

            console.log('errordata', responseData.errors)
          }
        } catch (error) {
          console.error('Subcategory was not deleted:', error)
        }
      }
    } else {
      if (formToDelete.category === category) {
        try {
          const response = await fetch('http://localhost:3000/catalogue', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formToDelete)
          })
          if (response.ok) {
            console.log('Category has been deleted succsessfully')
            setFormToDelete(catToDelete)
            fetchData()
          } else {
            const responseData = await response.json()

            console.log('errordata', responseData)
          }
        } catch (error) {
          console.error('Category was not deleted:', error)
        }
      }
    }
  }

  return (
    <>
      <div className={categoryStates[category] ? 'deleteBG' : 'deleteBGHide'}>
        <div
          className={
            categoryStates[category] ? 'deleteModalShow' : 'deleteModalHide'
          }
        >
          <h3 className="modalH3">
            Drop {subcategory ? 'Subcategory' : 'Category'}
          </h3>
          <p className="deleteText">
            To drop the {subcategory ? 'subcategory' : 'category'}{' '}
            <span className="deleteSpan">{category}</span>, type the name to
            confirm.
          </p>
          <input
            type="text"
            value={matchDelete}
            placeholder={
              subcategory ? 'Enter subcategory name' : 'Enter category name'
            }
            className="deleteInput"
            onChange={(e) => {
              setMatchDelete(e.target.value)
              setNewData(e.target.value)
            }}
            name="category"
          />
          <hr></hr>
          <div className="buttonContainer">
            <button
              onClick={() => {
                handleDeleteClose(category)
                setMatchDelete('')
                setCounter(counter + 1)
              }}
              className="deleteButton"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDeleteConfirm(category)
                setMatchDelete('')
                setCounter(counter + 1)
              }}
              className="deleteButton"
              disabled={
                subcategory
                  ? formToDelete.category !== category &&
                    formToDelete.subcategories[0].subcategory !== category
                  : formToDelete.category !== category
              }
            >
              Drop
            </button>
          </div>

          <div
            onClick={() => {
              handleDeleteClose(category)
              setMatchDelete('')
              setCounter(counter + 1)
            }}
            className="closeDelete"
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteModal
