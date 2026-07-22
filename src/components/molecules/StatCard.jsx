export default function StatCard({ icon: Icon, value, label, highlighted = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 p-8 rounded-sm border border-line
        ${highlighted ? 'bg-primary text-white border-primary' : 'bg-white text-ink'}`}
    >
      <span
        className={`w-12 h-12 rounded-full flex items-center justify-center
          ${highlighted ? 'bg-white/20' : 'bg-black text-white'}`}
      >
        <Icon size={20} />
      </span>
      <span className="text-2xl font-bold">{value}</span>
      <span className={`text-sm text-center ${highlighted ? 'text-white/90' : 'text-body'}`}>{label}</span>
    </div>
  )
}
