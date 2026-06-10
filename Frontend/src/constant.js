// Create a new file like apiConfig.js
const isProduction = import.meta.env.PROD || false;

const BASE_URL = isProduction 
  ? "https://jobportal-backend-12y8.onrender.com" 
  : "http://localhost:3000";

 const USER_API_END_POINT = `${BASE_URL}/api/v1/user`;
 export default USER_API_END_POINT;

export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;
export const MESSAGE_API_END_POINT = `${BASE_URL}/api/v1/message`;
export const SOCKET_URL = BASE_URL;