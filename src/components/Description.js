const Description = ({selectedCategory}) => {
    return (
        <div className="descriptionContainer">
            <h2 className="descriptionH2">{selectedCategory.subcategory.split('').splice(4).join('')}</h2>
        <p className="descriptionText">{selectedCategory.subcategoryDetails[0].description}</p>
        </div>
    )
}

export default Description