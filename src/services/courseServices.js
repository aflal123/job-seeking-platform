import api from './api'

export const createCourse = async (courseData, trainerId) => {
    const response = await api.post(`/courses?trainerId=${trainerId}`, courseData)
    return response.data
}

export const getAllCourses = async () => {
    const response = await api.get('/courses')
    return response.data
}

export const getCoursesByTrainer = async (trainerId) => {
    const response = await api.get(`/courses/trainer/${trainerId}`)
    return response.data
}

export const enrollCourse = async (courseId, userId) => {
    const response = await api.post(`/courses/${courseId}/enroll?userId=${userId}`)
    return response.data
}

export const getMyEnrollments = async (userId) => {
    const response = await api.get(`/courses/my-courses/${userId}`)
    return response.data
}

