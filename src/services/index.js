import axios from 'axios';


export default {
  apiAdminLogin(params) {
    return axios.post('/api/admin/total/login', params)
  },

  apiFinduser(params) {
   return axios.post('/dashboard/find_user', params)
  },

  apiAnalysis(){
    return axios.post('/dashboard/analysis')
  },

  apiOverall(){
    return axios.post('/dashboard/overall')
  },

  apiStudentList(){
    return axios.post('/dashboard/student_list')
  },

  apiWarning(params){
    return axios.post('/dashboard/warning', params)
  },


  apiUserLogin(params){
    return axios.post('/dashboard/login', params)
  }


};
