import { FaUsersGear } from "react-icons/fa6";
import { FaSearch, FaBell, FaUsers } from "react-icons/fa";

export default function Topbar(){
const basecss="cursor-pinter text-2xl";
return(
    <div className="flex justify-between">
        <div className="flex items-center p-2 gap 5">
            <FaUsersGear className="cursor-pointer text-4xl"/>
                <h1 className="text-4xl text-black font-bold">HRMS PORTAL</h1>

           
        </div>
        <div className="flex items-center justify-between text-5xl gap-9 mr-4">
    <FaSearch className={`${basecss}`}/>
    <FaBell className={`${basecss}`}/>
    <FaUsers className={`${basecss}`}/>

 </div>
  </div>
);
}