import { LOGIN } from "../utils/AuthConfig";
import { apiPost, clearUserData, setUserData, apiDelete, setUserTempData } from "../utils/utils";

export function login(data) {
    return new Promise((resolve, reject) => {
        return apiPost(LOGIN, data).then((res) => {
            setUserData(res);
            return
        }).catch((error) => {
            reject(error)
        })
    })
}

export function signIn(data) {
    return apiPost(LOGIN, data)
}

export function logout() {

    clearUserData()
}