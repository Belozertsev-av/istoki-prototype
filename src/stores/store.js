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

export const useAPI = defineStore('API', {
    state: () => ({
        URL: "http://127.0.0.1:8080"
    })
})

export const useRegex = defineStore('Regex', {
    state: () => ({
        regexLogin: /^[a-zA-Z0-9._-]{6,30}$/i,
        regexTel: /^[0-9+-]{12}$/i,
        regexMail: /^([A-Za-z0-9_.-])+@([A-Za-z0-9_.-])+\.([A-Za-z]{2,4})$/,
        regexText: /^[а-яёА-ЯЁ a-zA-Z-]+$/i,
        regexPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}/,
        alertLogin: "Логин может содержать только латинские буквы, цифры и спецсимволы: ._-",
        alertMail: "Адрес электронной почты указан неверно",
        alertTel: "Телефон должен иметь вид: +79991113300",
        alertText: "Допустимы только буквы латинского и киррилического алфавита и спецсимвол -",
        alertPassword: "Пароль должен содержать буквы верхнего, нижнего регистра и цифры. Длина не менее 6 символов",
    })
})
