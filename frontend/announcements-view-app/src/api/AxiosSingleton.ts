import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { Store } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import { logoutSuccess } from '@/store/auth/authReducer'

export let AxiosSingleton = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {'Content-Type': 'application/json'}
})

/**
 * Настраивает interceptors для автоматической подстановки JWT токена
 * и обработки ошибок аутентификации
 */
export function setupInterceptors(store: Store<RootState>) {
    // Request interceptor - добавляет JWT токен в заголовки
    AxiosSingleton.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const state = store.getState()
            const token = state.auth.accessToken
            
            // Добавляем токен в заголовок Authorization, если он есть
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`
            }
            
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // Response interceptor - обрабатывает ошибки аутентификации
    AxiosSingleton.interceptors.response.use(
        (response) => {
            return response
        },
        (error: AxiosError) => {
            // Если получили 401 (Unauthorized), значит токен невалидный или истек
            if (error.response?.status === 401) {
                const state = store.getState()
                // Если пользователь был авторизован, разлогиниваем его
                // Исключаем эндпоинты аутентификации, чтобы не было бесконечного цикла
                const requestUrl = error.config?.url || ''
                const isAuthEndpoint = requestUrl.includes('/auth') || 
                                      requestUrl.includes('/registration') || 
                                      requestUrl.includes('/refresh')
                
                if (state.auth.isLogIn && !isAuthEndpoint) {
                    store.dispatch(logoutSuccess())
                    // Редирект на страницу входа
                    if (window.location.hash !== '#/signIn') {
                        window.location.hash = '#/signIn'
                    }
                }
            }
            
            return Promise.reject(error)
        }
    )
}

export function setNewInstance(ip: string, store?: Store<RootState>) {
    console.log("change instanse ip: " + ip)
    AxiosSingleton = axios.create({
        baseURL: "http://" + ip + "/",
        headers: {'Content-Type': 'application/json'}
    })
    
    // Настраиваем interceptors для нового экземпляра, если store передан
    if (store) {
        setupInterceptors(store)
    }
}