import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import PedirPaseo from "./pedirPaseo";
import RegistrarMascota from "./registrarMascota";
import Header from "../headerComponent/header";
import VerMascotas from "./verMacotas";
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import PetsIcon from '@material-ui/icons/Pets';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import LoginService from "../../services/loginService";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "70%",
        textAlign: "center",
        minHeight: 200,
        margin: "auto"
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
    },
    all:{
        width:'100%'
    }
}));

export default function MenuPaseo() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    useEffect(() => {

        verificarAutenticacion();

        function verificarAutenticacion(){
            let servicio = new LoginService();
            servicio.validate(validacionCorrecta, validacionIncorrecta);
        }

        function validacionCorrecta(){

        }
        function validacionIncorrecta() {
            console.log("redireccionando...");
            window.location = '/iniciarSesion';
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <div>
            <div className={classes.all}>
                <Header />
            </div>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="action tabs example"
                    >
                        <Tab label="Registrar Macota" icon={<AddCircleTwoToneIcon />} {...a11yProps(0)} />
                        <Tab label="Ver mascotas" icon={<PetsIcon />} {...a11yProps(1)} />
                        <Tab label="Pedir paseo" icon={<DirectionsWalkIcon />} {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <RegistrarMascota />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <VerMascotas />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <PedirPaseo />
                    </TabPanel>
                </SwipeableViews>
            </div>
        </div>

    );
}
