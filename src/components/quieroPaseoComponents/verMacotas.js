import React, {useEffect, useState} from "react";
import RequestService from "../../services/requestService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import quieroUnPaseoCSS from "./quieroUnPaseoCSS";
import RegistrarMascota from "./registrarMascota";


export default function VerMascotas() {
    const style = quieroUnPaseoCSS();
    const [mascotas, setMascotas] = useState([]);
    const [flag, setFlag] = useState(false);
    const [mascota, setMascota] = useState(null);

    useEffect(() => {
        let request = new RequestService();
        request.request(correcto, incorrecto, 'GET', '/clients/cliente/mascotas',null);
        function correcto(data) {
            setMascotas(data);
        }

        function incorrecto(error) {
            console.error(error);
        }
    }, [])



    function deletePet(mascota) {
        let request = new RequestService();
        request.request(() => {}, () => {}, 'DELETE', `/mascotas/mascota/${mascota.id}`)
    }

    function updatePet(mascota) {
        setMascota(mascota);
        setFlag(true);
    }

    if (flag === true){
        return <RegistrarMascota mascota={mascota.id}/>
    }

    return (
        <Container>
            <h1 className={style.text}>Mis mascotas</h1>
            <br/>
            <Grid container justify={'center'}>
                <Table className={style.petTable} size={'small'}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'center'}>Nombre</TableCell>
                            <TableCell align={'center'}>Raza</TableCell>
                            <TableCell align={'center'}>Edad (años)</TableCell>
                            <TableCell align={'center'}>Género</TableCell>
                            <TableCell align={'center'}>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mascotas.map(mascota => (
                            <TableRow key={mascota.id}>
                                <TableCell align={'center'}>{mascota.nombre}</TableCell>
                                <TableCell align={'center'}>{mascota.raza}</TableCell>
                                <TableCell align={'center'}>{mascota.edad}</TableCell>
                                <TableCell align={'center'}>{mascota.genero}</TableCell>
                                <TableCell align={'center'}>
                                    <IconButton color={'primary'} onClick={() => updatePet(mascota)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton color={'secondary'} onClick={() => deletePet(mascota)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </Container>
    )
}