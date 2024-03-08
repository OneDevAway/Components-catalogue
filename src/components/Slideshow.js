import React, { useState, useEffect } from 'react'
import styles from './SlideShow.module.css'
import ArrowLeft from '../assets/ArrowLeft'
import ArrowRight from '../assets/ArrowRight'
import PauseIcon from '../assets/Pause'
import PlayIcon from '../assets/PlayIcon'
import ImageDeleteModal from './ImageDeleteModal'
import PlusIcon from '../assets/Plus'
import TrashIcon from '../assets/Trash'

const Slideshow = ({
  imageUrls,
  setImageModalState,
  imageModalState,
  authorised
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [deleteModalState, setDeleteModalState] = useState(false)

  useEffect(() => {
    let intervalId

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight' || event.key === 'Enter') {
        nextSlide()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    if (autoplay) {
      intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrls.length)
      }, 3000) // Change the interval as needed
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      clearInterval(intervalId)
    }
  }, [autoplay, currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrls.length)
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + imageUrls.length) % imageUrls.length
    )
  }

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index)
  }

  const toggleAutoplay = () => {
    setAutoplay((prevAutoplay) => !prevAutoplay)
  }

  return (
    <>
      <div className={styles.slideshow}>
        {!authorised ? null : (
          <button
            className={styles.deleteImage}
            onClick={() => setDeleteModalState(true)}
          >
            <TrashIcon size={'2rem'} />
          </button>
        )}

        <img
          src={`https://shy-pink-boa-sari.cyclic.app/${imageUrls[currentSlide]?.imageUrl}`}
          alt={`Slide ${currentSlide + 1}`}
          onClick={nextSlide}
        />
        {imageUrls.length <= 1 ? null : (
          <>
            <button onClick={prevSlide} className={styles.prevButton}>
              <ArrowLeft />
            </button>
            <button onClick={nextSlide} className={styles.nextButton}>
              <ArrowRight />
            </button>
          </>
        )}

        <div className={styles.thumbnailContainer}>
          {imageUrls &&
            imageUrls.map((obj, index) => (
              <img
                key={index}
                src={`https://shy-pink-boa-sari.cyclic.app/${obj.imageUrl}`}
                alt={`Thumbnail ${index + 1}`}
                className={`${styles.thumbnail} ${
                  index === currentSlide && styles.activeThumbnail
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          {!authorised ? null : (
            <div
              className="addImageModalIcon"
              onClick={() => setImageModalState(!imageModalState)}
            >
              <PlusIcon />
            </div>
          )}
        </div>
        {imageUrls.length <= 1 ? null : (
          <button onClick={toggleAutoplay} className={styles.autoplayButton}>
            {autoplay ? <PauseIcon /> : <PlayIcon />}
          </button>
        )}
      </div>
      {deleteModalState && (
        <ImageDeleteModal
          currentImage={imageUrls[currentSlide]?.imageUrl}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </>
  )
}

export default Slideshow
