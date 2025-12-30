
const page = () => {
  return (
    <div className="flex h-full bg-white flex-col items-center justify-center text-center px-4 rounded-xl">
      <div className="">
        <img
          src="/emptyMessage.png"
          alt="Empty"
          className="w-30  object-contain"
        />
      </div>

      {/* <!-- Title --> */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        No Projects Yet
      </h2>

      {/* <!-- Description --> */}
      <p className="text-gray-500 max-w-md mb-6">
        You haven&apos;t created any projects yet. Get started by creating your
        first project.
      </p>     <div />
    </div>
  )
}

export default page