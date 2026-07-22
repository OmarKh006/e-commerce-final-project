export default function AuthFormPanel({ children }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 py-10">
      <div className="hidden md:block flex-1">
        <img
          src="https://picsum.photos/seed/authpanel/700/700"
          alt=""
          className="w-full h-130 object-cover rounded-sm bg-[#CBE8F4]"
        />
      </div>
      <div className="w-full md:flex-1 max-w-md">{children}</div>
    </div>
  );
}
