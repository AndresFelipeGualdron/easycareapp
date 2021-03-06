import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../components/loginComponent/login';
import Registro from '../components/registroComponent/registro';
import Home from '../components/homeComponent/home';
import PaseadoresRanking from '../components/paseadoresRankingComponent/paseadoresRanking';
import PaseoMenu from "../components/quieroPaseoComponents/menuQuieroPaseo";
import Prueba from "../components/bienvenidaComponent/prueba";

export default ()=>(
    
    <Router>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path="/iniciarSesion" exact component={Login}/>
            <Route path="/registro" exact component={Registro}/>
            <Route path="/paseadores" exact component={PaseadoresRanking}/>
            <Route path="/menuPaseo" exact component={PaseoMenu}/>
            <Route path={"/prueba"} exact component={Prueba}/>
        </Switch>
    </Router>
);

