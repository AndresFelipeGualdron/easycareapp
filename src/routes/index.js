import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../components/loginComponent/login';
import Registro from '../components/registroComponent/registro';
import Home from '../components/homeComponent/home';
import PaseadoresRanking from '../components/paseadoresRankingComponent/paseadoresRanking';
import QuieroUnPaseo from "../components/quieroUnPaseoComponent/quieroUnPaseo";

export default ()=>(
    
    <Router>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path="/iniciarSesion" exact component={Login}/>
            <Route path="/registro" exact component={Registro}/>
            <Route path="/paseadores" exact component={PaseadoresRanking}/>
            <Route path="/quieroPaseo" exact component={QuieroUnPaseo}/>
        </Switch>
    </Router>
);

