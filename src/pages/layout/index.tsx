import { NavLink, Outlet } from "react-router-dom";
export default function Layout(){
    const users = window.sessionStorage.getItem('token');
    if (users) {
        return (
            <div className="bg-white"> 
                <div className="flex">
                    <div className="drawer bg-slate-400 w-[320px] drawer-open flex justify-start">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center">
                        </div>
                        <div className="drawer-side bg-slate-400">   
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-indigo-100 flex flex-col gap-[10px] text-base-content min-h-full w-80 pr-4" data-theme='dark'>
                                <div className="w-[320px] h-[100px] flex mr-[10px] justify-center items-center">
                                    <h1 className="font-bold text-blue-600 text-[35px] mx-auto">Admin Dashboard</h1>
                                </div>
                                <li className='max-w-[300px] text-gray-500 text-[20px]'><NavLink to={'/'}>Dashboard</NavLink></li>
                                <li className='max-w-[300px] text-gray-500 text-[20px]'><NavLink to={'/products'}>Products</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="w-full h-[80px] items-center bg-white flex justify-between">
                            <h1 className="font-bold text-[30px] text-black pl-[40px]">hello 👋</h1>
                            <button className="btn rounded-full">John</button>
                        </div>
                        <div className="w-full">
                            <main className="max-w-[1440px] mx-auto mt-[30px]">
                                <Outlet/>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        window.location.replace('/login')
    }
} 