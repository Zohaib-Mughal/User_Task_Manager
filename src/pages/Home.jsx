export default function Home() {
  return (
    <div className="text-center mt-20 bg-black/80 w-xl p-10 rounded-xl">
      <h1 className="text-3xl font-bold text-indigo-500">
        Welcome to Your Dashboard
      </h1>
      <p className="text-gray-300 mt-4">
        Manage your <span className="text-white font-medium">Users</span> and{" "}
        <span className="text-white font-medium">Tasks</span> easily from the
        menu above.
      </p>
      <p className="text-gray-400 mt-2">
        Use the navigation bar to explore different sections.
      </p>
    </div>
  );
}
