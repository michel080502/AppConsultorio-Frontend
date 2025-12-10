import { Outlet } from "react-router-dom"
import { PawPrint } from "lucide-react"
export const AuthLayout = () => {
    return (
        <>
            <main className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Logo/Brand */}
                    <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-200 mb-4 ">
                            <PawPrint className="h-8 w-8 text-blue-500" />
                        </div>
                        <h1 className="text-4xl font-bold bg-blue-500 bg-clip-text text-transparent ">
                            VetCare Pro
                        </h1>
                    </div>
                    <Outlet />
                </div>
            </main>
        </>
    )
}
