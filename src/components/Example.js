import { useState } from 'react'
import Slideshow from './Slideshow'
import CloseIcon from '../assets/Close'

const Example = ({ selectedCategory, authorised }) => {
  const [imageModalState, setImageModalState] = useState(false)
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file || !selectedCategory || !selectedCategory.subcategory) {
      console.error('File or subcategory is missing')
      return
    }

    const newFormData = new FormData()
    newFormData.append('image', file)
    newFormData.append('subcategory', selectedCategory.subcategory)
    try {
      const response = await fetch('https://shy-pink-boa-sari.cyclic.app/catalogue/image', {
        method: 'POST',
        body: newFormData
      })
      console.log(file)
      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (response.ok) {
        console.log('New category has been created successfully')
        setFile(null)
      } else {
        console.error('Error:', responseData.message || 'Unknown error')
      }
    } catch (error) {
      console.error('Creation has failed:', error.message || 'Unknown error')
    }
  }

  const imageUrls = selectedCategory?.subcategoryDetails?.[0]?.imageUrls
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }

  return (
    <div className="imageContainer">
      {!authorised
        ? null
        : imageModalState && (
            <div className="addImageModalContainer">
              <div className="addImageModal">
                <div
                  className="closeDelete"
                  onClick={() => setImageModalState(!imageModalState)}
                >
                  <CloseIcon />
                </div>
                <h3 className="addImageModalTitle">Add Image</h3>
                <p className="AddImageModalSubText">Please choose an image</p>
                <div className="addImageForm-container">
                  <div className="inputContainerAdd">
                    <label className="custom-upload-btn add">
                      Upload File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="fileInput"
                      />
                    </label>
                    <span className="uploadText">{file ? file.name : ''}</span>
                  </div>
                  <hr />
                  <div className="buttonContainer">
                    <button
                      onClick={() => setImageModalState(!imageModalState)}
                      className="deleteButton"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="deleteButton"
                      disabled={!file}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

      <Slideshow
        imageUrls={imageUrls}
        setImageModalState={setImageModalState}
        imageModalState={imageModalState}
        authorised={authorised}
      />
    </div>
  )
}

export default Example
