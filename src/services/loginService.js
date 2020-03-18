import { ACCESS_TOKEN, API_BASE_URL } from '../constants/index';

export default class LoginService{

    

    login = function(correo, password, callSuccess, callError, init) {

        if(localStorage.getItem(ACCESS_TOKEN)) {
            console.log("token encontrado");
            init = {
                method : "POST",
                Authorization : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            };
            // init.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
        }else{
            init = {
                method : "POST",
            };
        }

        fetch(API_BASE_URL+"/clients/login/"+correo+"/"+password,init)
        .then(function(response){
            if(response.ok) return response.text();
            callError();
        })
        .then((data) => {
            console.log(data);
            callSuccess(data);
        });
        
        
    
    }
}