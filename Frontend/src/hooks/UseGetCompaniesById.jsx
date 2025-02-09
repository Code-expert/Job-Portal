import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../constant";
import { setsingleCompany } from "../store/companySlice";


const useGetCompaniesById = (companyId)=>{
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompanyById = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true}  )
        if (res.data.success) {
          dispatch(setsingleCompany(res.data.company));

        } 
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompanyById();
  },[companyId,dispatch])
}
export default useGetCompaniesById;