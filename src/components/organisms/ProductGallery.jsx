import { useState } from 'react'

export default function ProductGallery({ images, title }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            className={`w-20 h-20 rounded-sm overflow-hidden bg-secondary-gray cursor-pointer border ${active === i ? 'border-ink' : 'border-transparent'}`}
          >
            <img src={img} alt={`${title} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <div className="flex-1 bg-secondary-gray rounded-sm aspect-square overflow-hidden">
        <img src={images[active]} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
