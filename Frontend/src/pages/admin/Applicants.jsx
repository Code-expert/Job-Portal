import { useDispatch, useSelector } from "react-redux";
import ApplicantsTable from "../../components/admin/ApplicantTable"
import {  useParams } from "react-router-dom";
import { useEffect } from "react";
import { APPLICATION_API_END_POINT } from "../../constant";
import axios from "axios";
import { setAllApplicants } from "../../store/applicationSlice";

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);
    
useEffect(() => {
    const fetchAllApplicants = async () => {
        try {
           const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true}  );
            if (res.data.success) {
                dispatch(setAllApplicants(res.data.job));
            } 
        } catch (error) {
            console.log(error);
        }
    };
    fetchAllApplicants();
  });


  return (
    <div className="max-w-7xl mx-auto ">
       <h1 className="text-2xl font-bold cursor-pointer flex justify-center items-centers mb-2">
       Applicants {applicants?.applications?.length}
                </h1>
     
      <ApplicantsTable/>
    </div>
  )
}

export default Applicants
