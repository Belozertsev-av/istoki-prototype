import {defineStore} from "pinia";

export const useUserData = defineStore('userData', {
    state: () => ({
        id: 0,
        login: "",
        avatar: "default_icon.png",
        phoneNumber: null,
        userLanguages: [
            {
                scoresUser: 0,
                scoresLanguage: 0,
                scores: 0,
            }
        ],
        mail: "",
        fName: "",
        lName: "",
        password: "",
    })
})
export const userRegPages = defineStore('RegPages', {
    state: () => ({
        stage: 0
    })

})

export const useAPI = defineStore('deviceParams', {
    state: () => ({
        URL: "http://127.0.0.1:8080"
    })
})
