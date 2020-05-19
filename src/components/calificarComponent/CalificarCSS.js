import {makeStyles} from "@material-ui/core/styles";

export default function CalificarCSS() {
    const useStyles = makeStyles(() => ({
        title: {
            fontFamily: "cursive",
            fontSize: 40,
            color: "#9f55e3"
        },
        grid:{
            textAlign:"center"
        },
        content:{
            fontFamily: "cursive",
            fontSize: 19
        },
        gridText:{
            textAlign:"justify"
        },
        img1:{
            width:'80%',
            height: '80%'
        }
    }))
    return useStyles();
}