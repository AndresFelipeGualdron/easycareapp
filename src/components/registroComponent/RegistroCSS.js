import {makeStyles} from "@material-ui/core/styles";

export default function RegistroCSS() {
    const useStyle = makeStyles(() => ({
        title: {
            fontSize:30,
            fontFamily: "cursive",
            textAlign:"left",
            color:"#60b89c"
        },
        image:{
            margin:"auto",
            width:'90%'
        },
        card:{
            width:'35%'
        },
        textField:{
            width:'100%'
        },
        content:{
            textAlign:"center"
        }
    }));

    return useStyle();
}