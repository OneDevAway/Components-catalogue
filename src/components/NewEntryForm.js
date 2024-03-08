import { useEffect, useState } from 'react'
import CloseIcon from '../assets/Close'

const NewEntryForm = ({
  data,
  orderArray,
  handleClick,
  newEntryState,
  setNewEntryState,
  fetchData,
  subcategoryObj,
  categoryName,
  editFormState,
  setEditFormStates
}) => {
  const formSheet = {
    category: '',
    subcategories: [
      {
        subcategory: '',
        subcategoryDetails: [
          {
            description: '',
            codeSnippetJS: '',
            codeSnippetCSS: ''
          }
        ]
      }
    ]
  }
  useEffect((() => {
    const editForm = {
      category: categoryName,
      subcategories: [
        subcategoryObj
      ]
    }
    if(editFormState){
      setFormData(editForm)
    }
  }), [categoryName])
  const categoryNames = data.map((obj) => obj.category)
  orderArray(categoryNames)
  const subcategoryNames = data.map(obj => obj.subcategories[0].subcategory)
  const [newEntrySelected, setNewEntrySelected] = useState(false)
  const [formData, setFormData] = useState(formSheet)
  const [file, setFile] = useState(null)
  const [checkIfCategoryExists, setCheckIfCategoryExists] = useState(false)
  const [checkIfSubcategoryExists, setCheckIfSubategoryExists] = useState(false)
  
  console.log("checkIfCategoryExists:", checkIfCategoryExists);
  console.log("checkIfSubcategoryExists:", checkIfSubcategoryExists);
  console.log("editFormState:", !editFormState);
  const handleNewEntryState = (e) => {
    const option = e.target.value
    if (option !== 'new') {
      setNewEntrySelected(false)
      setFormData({ ...formData, category: option })
    } else {
      setFormData({ ...formData, category: formSheet.category })
      setNewEntrySelected(true)
    }
  }

  const setNewData = (e) => {
    const newData = e.target.value
    const targetName = e.target.name

    if (targetName === 'category') {
      setFormData({ ...formData, category: newData })
    } else if (targetName === 'subcategory') {
      setFormData({
        ...formData,
        subcategories: [
          {
            ...formData.subcategories?.[0], // Check if subcategories is defined
            subcategory: newData
          }
        ]
      })
    } else if (targetName === 'description') {
      setFormData({
        ...formData,
        subcategories: [
          {
            ...formData.subcategories?.[0],
            subcategoryDetails: [
              {
                ...formData.subcategories?.[0]?.subcategoryDetails?.[0], // Check if subcategoryDetails is defined
                description: newData
              }
            ]
          }
        ]
      })
    } else if (targetName === 'codeSnippetJS') {
      setFormData({
        ...formData,
        subcategories: [
          {
            ...formData.subcategories?.[0],
            subcategoryDetails: [
              {
                ...formData.subcategories?.[0]?.subcategoryDetails?.[0],
                codeSnippetJS: newData
              }
            ]
          }
        ]
      })
    } else if (targetName === 'codeSnippetCSS') {
      setFormData({
        ...formData,
        subcategories: [
          {
            ...formData.subcategories?.[0],
            subcategoryDetails: [
              {
                ...formData.subcategories?.[0]?.subcategoryDetails?.[0],
                codeSnippetCSS: newData
              }
            ]
          }
        ]
      })
    }
  }
  const lookForCategory = (categoryNameToLookFor) => {
    const categoryExists = categoryNames.find(category => category === categoryNameToLookFor)
    if(categoryExists){
      setCheckIfCategoryExists(true)
      return true
    } else {
      setCheckIfCategoryExists(false)
      return false
    }
  }
  const lookForSubcategory = (subcategoryToLookFor) => {
    const subcategoryExists = subcategoryNames.find(subcategory => subcategory === subcategoryToLookFor)
    if(subcategoryExists){
      setCheckIfSubategoryExists(true)
      return true
    } else {
      setCheckIfSubategoryExists(false)
      return false
    }
  }
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()


    const newformData = new FormData()
    newformData.append('image', file)
    newformData.append('data', JSON.stringify(formData))
    // https://shy-pink-boa-sari.cyclic.app
    try {
      const response = await fetch('https://shy-pink-boa-sari.cyclic.app/catalogue', {
        method: 'POST',
        body: newformData
      })

      if (response.ok) {
        console.log('New category has been created successfully')
        setFile(null)
        setNewEntryState(!newEntryState)
        fetchData()
      } else {
        const responseData = await response.json()
        ('Error:', responseData.message || 'Unknown error')
      }
    } catch (error) {
      console.error('Creation has failed:', error.message || 'Unknown error')
    }
  }
  const handleEdit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://shy-pink-boa-sari.cyclic.app/catalogue', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        console.log('Category has been updated successfully');
        setEditFormStates(prevState => ({ ...prevState, [subcategoryObj.subcategory]: false }));
        fetchData();
      } else {
        const responseData = await response.json();
        console.error('Error:', responseData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Update has failed:', error.message || 'Unknown error');
    }
  };
  return (
    <div className={newEntryState || editFormState ? 'newEntryBG' : 'newEntryBGHide'}>
      <form className="newEntryForm" onSubmit={editFormState ? handleEdit : handleSubmit}>
        <h3 className="modalH3">{ editFormState ? "Edit Component" : "Add New Component"}</h3>
        <div className="crossIcon" onClick={editFormState ? () => setEditFormStates(prevState => ({ ...prevState, [subcategoryObj.subcategory]: false })) : handleClick }>
          <CloseIcon />
        </div>

        <p className="newEntryP">{ editFormState ? "Edit Category name:" : "Choose which Category:"}</p>

        {
          editFormState ? <input type="text" name='category' className="dropdown" placeholder='Category Name' value={formData.category} onChange={setNewData} /> :
        <select
          className="dropdown"
          defaultValue="default"
          onChange={handleNewEntryState}
        >
          <option value="default" disabled>
            Select Category
          </option>
          <option value="new">Create New Category</option>
          {categoryNames.map((categoryName, idx) => {
            return (
              <option
                key={idx}
                value={`${categoryName}`}
              >{`${categoryName}`}</option>
            )
          })}
        </select>
        }
        {newEntrySelected && (
          <>
          <label>
            <p className="newEntryP">New Category name:</p>

            <input
              type="text"
              disabled={!newEntrySelected}
              value={!newEntrySelected ? '' : formData.category}
              onChange={(e) => {lookForCategory(e.target.value); setNewData(e)}}
              name="category"
              placeholder="Category name"
              className="dropdown"
            />
          </label>
          {checkIfCategoryExists && <p>Category number already exists</p>}
          </>
        )}

        <label>
          <p className="newEntryP"> {editFormState ? "Edit Sub-category name:" : "New Sub-category name:"}</p>

          <input
            type="text"
            disabled={formData.category === ''}
            onChange={(e) => {lookForSubcategory(e.target.value); setNewData(e)}}
            value={formData.subcategories[0].subcategory}
            name="subcategory"
            placeholder="Sub-category name"
            className="dropdown"
          />
        </label>
        {checkIfSubcategoryExists && <p>Subcategory number already exists</p>}
        {formData.subcategories[0].subcategory !== '' ? (
          <label>
            <p className="newEntryP"> Description for Sub-category</p>

            <textarea
              name="description"
              onChange={setNewData}
              value={
                formData.subcategories[0].subcategoryDetails[0].description
              }
              cols="30"
              rows="5"
              className="inputText"
            ></textarea>
          </label>
        ) : null}

        {formData.subcategories[0].subcategoryDetails[0].description !== '' ? (
          <label>
            <p className="newEntryP">Code snippet of JS</p>

            <textarea
              name="codeSnippetJS"
              onChange={setNewData}
              value={
                formData.subcategories[0].subcategoryDetails[0].codeSnippetJS
              }
              cols="30"
              rows="5"
              className="inputText"
            ></textarea>
          </label>
        ) : null}

        {formData.subcategories[0].subcategoryDetails[0].codeSnippetJS !==
        '' ? (
          <label>
            <p className="newEntryP">Code snippet of CSS</p>

            <textarea
              name="codeSnippetCSS"
              onChange={setNewData}
              value={
                formData.subcategories[0].subcategoryDetails[0].codeSnippetCSS
              }
              cols="30"
              rows="5"
              className="inputText"
            ></textarea>
          </label>
        ) : null}
        {(formData.subcategories[0].subcategoryDetails[0].codeSnippetCSS !==
        '') && !editFormState ? (
          <div className="upload-container">
            <label className="custom-upload-btn">
              Upload File
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
              />
              </label>
            <span className='uploadText'>{file ? file.name : ''}</span>
          </div>
        ) : null}

        <div className="buttonContainer">
          <button
            onClick={editFormState ? () => setEditFormStates(prevState => ({ ...prevState, [subcategoryObj.subcategory]: false })) : () => setNewEntryState(!newEntryState)}
            className="deleteButton"
          >
            Cancel
          </button>
          <button
            type='Submit'
            className="deleteButton"
            disabled={
              (formData.subcategories[0].subcategoryDetails[0].codeSnippetCSS === '') ||
              ((!editFormState) &&
              (checkIfCategoryExists || checkIfSubcategoryExists))
            }
          >
            { editFormState ? "Edit" : "Add"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewEntryForm
