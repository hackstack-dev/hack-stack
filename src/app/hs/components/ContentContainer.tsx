export default function ContentContainer({
  children
}: { children: React.ReactNode }) {
  return (

      <div className="w-full p-8">
        {children}
      </div>
  )
}
