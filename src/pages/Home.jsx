export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-[70vh] p-6">
      <div className="max-w-xl w-full bg-slate-900/60 border border-slate-800 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
          Welcome to Your Dashboard
        </h1>
        <p className="text-slate-400 leading-relaxed">
          Manage your <span className="text-blue-400 font-semibold">Users</span> and{" "}
          <span className="text-blue-400 font-semibold">Tasks</span> efficiently from one unified workspace.
        </p>
        <div className="mt-8 pt-6 border-t border-slate-800/60 text-xs text-slate-500">
          Use the navigation bar above to start managing your data.
        </div>
      </div>
    </div>
  );
}