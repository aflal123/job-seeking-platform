import axios from 'axios'


const BASE_URL = 'http://localhost:8080/api'
export const getJobs = async (location, jobType) => {
    const response = await axios.get(`${BASE_URL}/jobs`, {
        params: {
            location: location || null,
            jobType: jobType || null
        }
    })
    return response.data
}

export const applyForJob = async (jobId, applicantId) => {
    const response = await axios.post(`${BASE_URL}/applications/apply?jobId=${jobId}&applicantId=${applicantId}`)
    return response.data
}

export const postJob = async (jobData, employerId) => {
    const response = await axios.post(`${BASE_URL}/jobs?employerId=${employerId}`, jobData)
    return response.data
}

export const getEmployerJobs = async (employerId) => {
    const response = await axios.get(`${BASE_URL}/jobs/employer/${employerId}`)
    return response.data
}

export const getJobApplications = async (jobId) => {
    const response = await axios.get(`${BASE_URL}/applications/job/${jobId}`)
    return response.data
}

export const updateApplicationStatus = async (applicationId, status) => {
    const response = await axios.put(`${BASE_URL}/applications/${applicationId}/status?status=${status}`)
    return response.data
}

export const getSeekerApplications = async (seekerId) => {
    const response = await axios.get(`${BASE_URL}/applications/seeker/${seekerId}`)
    return response.data
}