export default function ServiceFeature({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <span className="w-16 h-16 rounded-full bg-ink text-white flex items-center justify-center ring-8 ring-body/20">
        <Icon size={26} />
      </span>
      <span className="font-semibold text-ink">{title}</span>
      <span className="text-xs text-body">{description}</span>
    </div>
  )
}
