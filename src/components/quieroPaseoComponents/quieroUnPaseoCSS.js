import {makeStyles} from "@material-ui/core/styles";

export default function QuieroUnPaseoCSS() {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '70%'
        },
        text: {
            textAlign: "center",
            fontFamily: "fantasy",
            color: "#5a9cb6"
        },
        petTable: {
            width: '80%'
        },
        card: {
            width: '105%',
            margin: "auto"
        },
        header: {
            backgroundColor: "#d5e5f1",
            textAlign:"left"
        },
        content: {
            textAlign: "center",
            backgroundColor:"#f1f6f6"
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        inputs:{
            width:'85%',
            textAlign:"left"
        },
        img:{
            width:'110%'
        },
        grid:{
            margin:"auto"
        },
        menu:{
            backgroundColor: '#c7f1ee'
        }
    }));

    return useStyles();
}