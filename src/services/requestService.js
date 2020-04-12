import { ACCESS_TOKEN, API_BASE_URL_BACK } from '../constants/index';

export default class RequestService{

    // constructor(){

    // }

    request = function(correcto, incorrecto, metodo, path){
        var init = {};

        if(localStorage.getItem(ACCESS_TOKEN)) {
            var header = new Headers({
                Authorization : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            });

            init = {
                method : metodo,
                headers : header
            };
        }else{
            init = {
                method : metodo
            }
        }

        fetch(API_BASE_URL_BACK+path, init)
        .then(function(response){
            if(response.ok){
                return response.json();
            }else{
                return null;
            }            
        })
        .then(function(data){
            if(data !== null){
                correcto(data);
            }else{
                incorrecto("error en la solicitud");
            }
            
        }).catch(function(error){
            console.log("error");
            incorrecto(error);
        })
        
    }
}