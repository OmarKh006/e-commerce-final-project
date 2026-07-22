import { useState } from 'react'
import { FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { teamMembers } from '../../data/mockData'

export default function TeamCarousel() {
  const [active, setActive] = useState(0)
  const perPage = 3
  const pageCount = Math.ceil(teamMembers.length / perPage) || 1
  const visible = teamMembers.slice(active * perPage, active * perPage + perPage)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {visible.map((member) => (
          <div key={member.id}>
            <img
              src={member.image}
              alt={member.name}
              className="w-full aspect-square object-cover rounded-sm bg-secondary-gray mb-4"
            />
            <h3 className="font-heading text-xl font-medium">{member.name}</h3>
            <p className="text-sm text-body mb-3">{member.role}</p>
            <div className="flex items-center gap-3 text-ink">
              <FiTwitter size={16} />
              <FiInstagram size={16} />
              <FiLinkedin size={16} />
            </div>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer ${i === active ? 'bg-primary' : 'bg-line'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
