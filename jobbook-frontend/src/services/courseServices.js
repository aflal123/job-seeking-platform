import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/courses'

export const createCourse = async (courseData, trainerId) => {
    const response = await axios.post(`${BASE_URL}?trainerId=${trainerId}`, courseData)
    return response.data
}

export const getAllCourses = async () => {
    const response = await axios.get(BASE_URL)
    return response.data
}

export const getCoursesByTrainer = async (trainerId) => {
    const response = await axios.get(`${BASE_URL}/trainer/${trainerId}`)
    return response.data
}

export const enrollCourse = async (courseId, userId) => {
    const response = await axios.post(`${BASE_URL}/${courseId}/enroll?userId=${userId}`)
    return response.data
}

export const getMyEnrollments = async (userId) => {
    const response = await axios.get(`${BASE_URL}/my-courses/${userId}`)
    return response.data
}
