export function getLocal(token){
    let response = localStorage.getItem(token)
    return response
}