import { useState } from 'react'
import CodeCSS from './CodeCSS'
import CodeJS from './CodeJS'
import Description from './Description'
import Example from './Example'
import ImageSvg from '../assets/Image'

const Examples = ({ selectedCategory, selected, authorised }) => {
  const [exampleState, setExampleState] = useState('Example')

  return (
    <>
      <section className="examples">
        {selected !== '' ? (
          <div className="examplesTabs">
            <div
              className={
                exampleState === 'Example' ? 'highlighted' : 'notHighlighted'
              }
              onClick={() => {
                setExampleState('Example')
              }}
            >
              <div
                className={
                  exampleState === 'Example'
                    ? 'sideShowExample'
                    : 'sideHideExample'
                }
              ></div>
              Example
            </div>
            <div
              className={
                exampleState === 'Description'
                  ? 'highlighted'
                  : 'notHighlighted'
              }
              onClick={() => {
                setExampleState('Description')
              }}
            >
              <div
                className={
                  exampleState === 'Description'
                    ? 'sideShowExample'
                    : 'sideHideExample'
                }
              ></div>
              Description
            </div>
            <div
              className={
                exampleState === 'Code JS' ? 'highlighted' : 'notHighlighted'
              }
              onClick={() => {
                setExampleState('Code JS')
              }}
            >
              <div
                className={
                  exampleState === 'Code JS'
                    ? 'sideShowExample'
                    : 'sideHideExample'
                }
              ></div>
              Code JS
            </div>
            <div
              className={
                exampleState === 'Code CSS' ? 'highlighted' : 'notHighlighted'
              }
              onClick={() => {
                setExampleState('Code CSS')
              }}
            >
              <div
                className={
                  exampleState === 'Code CSS'
                    ? 'sideShowExample'
                    : 'sideHideExample'
                }
              ></div>
              Code CSS
            </div>
          </div>
        ) : (
          <div className="examplesTitle">
            <p>Select a Component from the list!</p>
          </div>
        )}

        {selected !== '' ? (
          <div className="exampleContainer">
            {exampleState === 'Example' ? (
              <Example
                selectedCategory={selectedCategory}
                authorised={authorised}
              />
            ) : null}
            {exampleState === 'Description' ? (
              <Description selectedCategory={selectedCategory} />
            ) : null}
            {exampleState === 'Code JS' ? (
              <CodeJS selectedCategory={selectedCategory} />
            ) : null}
            {exampleState === 'Code CSS' ? (
              <CodeCSS selectedCategory={selectedCategory} />
            ) : null}
          </div>
        ) : (
          <div className="notSelectedImage">
            <ImageSvg />{' '}
          </div>
        )}
      </section>
    </>
  )
}

export default Examples
