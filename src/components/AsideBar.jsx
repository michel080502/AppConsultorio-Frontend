import { Home, Users, Folder, Calendar, FileText, PieChart, PawPrint } from 'lucide-react';
export const AsideBar = () => {
    return (
        <>
            {/* Sidebar */}
            <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col">
                {/* Logo */}
                <div className="p-6 flex items-center gap-3">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-200">
                        <PawPrint className="h-8 w-8 text-blue-500" />
                    </div>
                    <span className='text-white text-3xl font-bold '>VetCare Pro</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4">
                    <div className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-800 transition-colors">
                            <Home className="w-5 h-5" />
                            Dashboard
                        </button>

                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <Users className="w-5 h-5" />
                            Team
                        </button>

                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <Folder className="w-5 h-5" />
                            Projects
                        </button>

                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <Calendar className="w-5 h-5" />
                            Calendar
                        </button>

                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <FileText className="w-5 h-5" />
                            Documents
                        </button>

                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <PieChart className="w-5 h-5" />
                            Reports
                        </button>
                    </div>

                    {/* Your teams section */}
                    <div className="mt-8">
                        <h3 className="px-3 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Your teams
                        </h3>
                        <div className="space-y-1">
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                                <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center text-xs font-semibold text-slate-300">
                                    H
                                </div>
                                Heroicons
                            </button>

                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                                <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center text-xs font-semibold text-slate-300">
                                    T
                                </div>
                                Tailwind Labs
                            </button>

                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                                <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center text-xs font-semibold text-slate-300">
                                    W
                                </div>
                                Workcation
                            </button>
                        </div>
                    </div>
                </nav>

                {/* User profile */}
                <div className="p-4 border-t border-slate-800">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tom"
                            alt="Tom Cook"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">Tom Cook</span>
                    </button>
                </div>
            </aside>
        </>
    )
}
