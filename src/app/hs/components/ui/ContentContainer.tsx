export default function ContentContainer({
  children
}: { children: React.ReactNode }) {
  return (

      <div className="w-full px-6 py-4">
        {children}
      </div>
  )
}
