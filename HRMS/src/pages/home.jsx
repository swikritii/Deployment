import { Outlet } from "react-router-dom";
import Topbar from "../component/home/topbar"
import Sidebar from "../component/home/sidebar";


export default function Home(){
    return(
        <div className="flex flex-col h-screen">
            <Topbar/>
            <div className="flex flex-1 overflow-hidden">
                <div>
                    <Sidebar/>
                </div>
                <div className="flex-1 overflow-y-auto p-5">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}