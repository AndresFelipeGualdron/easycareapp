import React, {useEffect, useState} from "react";
import RequestService from "../../services/requestService";
import Grid from "@material-ui/core/Grid";
import quieroUnPaseoCSS from "./quieroUnPaseoCSS";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from '@material-ui/icons/Save';
import VerMascotas from "./verMacotas";

export default function RegistrarMascota(props) {

    const classes = quieroUnPaseoCSS();
    const [pet, setPet] = useState({
        raza: 'Pastor alemán',
        id: props.mascota,
        cliente : null
    });
    const [flag, setFlag] = useState(false);
    const [cliente, setCliente] = useState(null);


    useEffect(() => {
        const request = new RequestService();
        request.request(correcto, incorrecto, 'GET','/clients/cliente/correo');

        async function correcto(data) {
            await setCliente(data);
        }
        function incorrecto() {
            console.info('Error en la solicitud')
        }
    },[])


    function handleChange(event) {
        setPet({...pet, [event.target.name]: event.target.value, cliente:cliente});
    }

    function savePet(){
        const request = new RequestService();
        if (pet.id){
            request.request(() => {}, () => {}, 'PUT', '/mascotas', pet);
            alert('Su mascota fue actualizada correctamente');
            setFlag(true);
        }else {
            request.request(() => {}, () => {}, 'POST', '/mascotas', pet);
            alert('Su mascota ha sido registrada satisfactoriamente')
        }
    }

    if (flag === true){
        return <VerMascotas/>;
    }

    return (
        <div>
            <Grid container justify={'center'}>
                <Grid item xs={5} className={classes.grid}>
                    <Card className={classes.card} variant={'outlined'}>
                        <CardHeader
                            title={pet.id ? "Actualiza tu perrito" : "Registra tu perrito"}
                            subheader={'Ingresa sus datos'}
                            className={classes.header}
                            avatar={
                                <Avatar src={'/img/perrito.jpg'} className={classes.large}/>
                            }
                        />
                        <CardContent className={classes.content}>
                            <form onSubmit={savePet}>
                                <TextField
                                    required
                                    label={'Nombre'}
                                    className={classes.inputs}
                                    onChange={handleChange}
                                    name={'nombre'}
                                />
                                <TextField
                                    required
                                    select
                                    label={'Raza'}
                                    className={classes.inputs}
                                    name={'raza'}
                                    onChange={handleChange}
                                    value={pet.raza}
                                >
                                    <MenuItem value={'Pastor alemán'}>Pastor alemán</MenuItem>
                                    <MenuItem value={'Bulldog'}>Bulldog</MenuItem>
                                    <MenuItem value={'Labrador'}>Labrador</MenuItem>
                                    <MenuItem value={'Pitbull'}>Pitbull</MenuItem>
                                    <MenuItem value={'Chihuahua'}>Chihuahua</MenuItem>
                                    <MenuItem value={'Otro'}>Otro</MenuItem>
                                </TextField>
                                <TextField
                                    required
                                    label={'Edad'}
                                    className={classes.inputs}
                                    name={'edad'}
                                    onChange={handleChange}
                                />
                                <TextField
                                    required
                                    label={'Género'}
                                    className={classes.inputs}
                                    name={'genero'}
                                    onChange={handleChange}
                                />
                                <br/><br/>
                                <IconButton type={'submit'}>
                                    <SaveIcon fontSize={'large'}/>
                                </IconButton>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={5} className={classes.grid}>
                    <img src={"/img/PerritoPaseo.jpg"} alt="" className={classes.img}/>
                </Grid>
            </Grid>
        </div>
    );
}