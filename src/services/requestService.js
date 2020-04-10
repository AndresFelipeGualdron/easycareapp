import { ACCESS_TOKEN, API_BASE_URL_BACK, API_BASE_LOCATION } from '../constants/index';

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

    requestLocation = function(correcto, incorrecto, metodo, ip){
        var header = new Headers({
            'X-RapidAPI-Host' : 'ip-geo-location.p.rapidapi.com',
            'X-RapidAPI-Key' : 'b58625e3efmsh09e2bea3950a35bp12ea99jsnf9c8ac36f365'
        });
        var init = {
            method : metodo,
            headers : header
        };

        fetch(API_BASE_LOCATION+ip, init)
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
        })
        .catch(function(error){
            console.error(error);
            incorrecto(error);
        })
    }
}