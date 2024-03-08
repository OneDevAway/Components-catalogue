import { useState } from "react"
import CloseIcon from "../assets/Close"

const ImageDeleteModal = ({currentImage, setDeleteModalState}) => {
    const [inputText, setInputText] = useState('')

    const handleDelete = async (e) => {
        console.log(currentImage)
        console.log(inputText)
        e.preventDefault()
        try {
            const imageToDelete = { imageUrl: currentImage}

              const response = await fetch(
                'http://localhost:3000/catalogue/image',
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(imageToDelete)
                }
              )
              if (response.ok) {
                console.log('Image has been deleted succsessfully')
                window.location.reload()
              } else {
                const responseData = await response.json()
    
                console.log('errordata', responseData.message)
              }
            } catch (error) {
              console.error('Image was not deleted:', error)
            }
    }

    return (
        <>
        <div className="deleteBG">
            <div className="deleteModalShow imageDeleteModal">
              <h3 className="modalH3">Delete Image</h3>
                <p deleteText>Please type <span>DELETE</span> to confirm.</p>
                <form onSubmit={handleDelete}>
                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Please type DELETE "  className="deleteInput" />
                </form>
                <div className="buttonContainer">
                <button
              onClick={() => setDeleteModalState(false)}
              className="deleteButton"
            >
              Cancel
            </button>
                <button className="deleteButton" disabled={inputText !== "DELETE"} >Delete</button>
                </div>
            <div className="closeDelete" onClick={() => setDeleteModalState(false)}>
                <CloseIcon/>
            </div>
            </div>
        </div>
        </>
    )
}

export default ImageDeleteModal