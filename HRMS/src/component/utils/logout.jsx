import {useNavigate} from "react-router-dom";
export default function LogoutButton(){
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return(
        <button  onClick={handleLogout} className="bg-red-600 text-4xl ">Logout</button>

    )
    }
