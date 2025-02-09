import axios from "axios"
import { Link } from "react-router-dom"
import { COMPANY_API_END_POINT } from "../../constant"
import { useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setsingleCompany } from "../../store/companySlice";

function CompanyCreate() {
    const navigate = useNavigate();
    const [companyName,setcompanyName] = useState();
     const dispatch = useDispatch();
    const registerNewCompany = async () =>{
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if (res?.data?.success) {
                dispatch(setsingleCompany(res.data.company))
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
   
    <div className="max-w-4xl mx-auto">
       <div className="my-10">

            <h1 className="font-bold text-2xl">Your Company Name</h1>
            <p className="text-gray-500">What would you like to give your company name ? you can change this later.</p>
        </div>
            <label className="">
                Company Name
            </label>
            <div>
            <input
                type="text"
                className="my-2 p-2 shadow-2xl bg-gray-50 w-full rounded-xl"
                placeholder="Job Hunt ,Microsoft etc.."
                onChange={(e)=> setcompanyName(e.target.value)}
                />
                <div className="flex items-center gap-2 my-8">
                    <button className="p-2 cursor-pointer"><Link to="/admin/companies">Cancel</Link></button>
                    <button onClick={registerNewCompany} className="bg-purple-800 text-white p-2 rounded-xl cursor-pointer ">Continue</button>
                </div>
                </div>
                </div>
    
  )
}

export default CompanyCreate