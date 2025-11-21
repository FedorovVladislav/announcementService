import axios from 'axios'

export function getUrl() {
    let currentUrl = window.location.href;
    if (currentUrl.split('#').length > 1) {
        currentUrl = currentUrl.split('#')[0];
    }
    console.log("baseUrl: " + currentUrl);
     //return currentUrl;
    return "http://localhost:8080/"
}

export let AxiosSingleton = axios.create({
    baseURL: getUrl(),
    headers: {'Content-Type': 'application/json'}
})

export function setNewInstance(ip: string) {
    console.log("change instanse ip: " + ip)
    AxiosSingleton = axios.create({
        baseURL: "http://" + ip + "/",
        headers: {'Content-Type': 'application/json'}
    })
}