import {ACCESS_TOKEN, API_BASE_URL_BACK} from '../constants/index';

export default class RequestService {

    request(correcto, incorrecto, metodo, path, body) {
        let init = {};
        console.info(path);
        if (localStorage.getItem(ACCESS_TOKEN)) {
            let header = new Headers({
                Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            });

            if (metodo === 'POST' || metodo === 'PUT'){
                init = {
                    method : metodo,
                    headers : header,
                    body : JSON.stringify(body)
                };
            }else {
                init = {
                    method: metodo,
                    headers: header
                };
            }
        } else {
            init = {
                method: metodo
            }
        }

        fetch(API_BASE_URL_BACK + path, init)
            .then(response => {
                if (metodo === 'PUT' || metodo === 'POST' || metodo === 'DELETE'){
                    if(response.ok){
                        return response.json();
                    }else{
                        return null;
                    }
                }else{
                    if (response.ok) {
                        return response.json();
                    } else {
                        return null;
                    }
                }
            })
            .then(function (data) {
                if (data !== null) {
                    correcto(data);
                } else {
                    incorrecto("error en la solicitud");
                }

            }).catch(function (error) {
            console.log("error");
            incorrecto(error);
        })

    }

}