import api from './api'

export const getJobs = async (location, jobType) => {
    const response = await api.get('/jobs', {
        params: {
            location: location || null,
            jobType: jobType || null
        }
    })
    return response.data
}

export const applyForJob = async (jobId, applicantId) => {
    const response = await api.post(`/applications/apply?jobId=${jobId}&applicantId=${applicantId}`)
    return response.data
}

export const postJob = async (jobData, employerId) => {
    const response = await api.post(`/jobs?employerId=${employerId}`, jobData)
    return response.data
}

export const getEmployerJobs = async (employerId) => {
    const response = await api.get(`/jobs/employer/${employerId}`)
    return response.data
}

export const getJobApplications = async (jobId) => {
    const response = await api.get(`/applications/job/${jobId}`)
    return response.data
}

export const updateApplicationStatus = async (applicationId, status) => {
    const response = await api.put(`/applications/${applicationId}/status?status=${status}`)
    return response.data
}

export const getSeekerApplications = async (seekerId) => {
    const response = await api.get(`/applications/seeker/${seekerId}`)
    return response.data
}