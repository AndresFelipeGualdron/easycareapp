import {makeStyles} from "@material-ui/core/styles";

export default function BienvenidaCSS() {
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 800,
            flexGrow: 1,
        },
        content: {
            textAlign:"center"
        },
        header:{
            fontSize:30,
            fontFamily:"cursive",
            color:"#9649cd",
        },
        card:{
            width:'50%',
            backgroundColor:"#323232"
        },
        paseoImg:{
            width: '105%'
        },
        paseoText:{
            fontFamily:"cursive",
            fontSize: 20,
            textAlign: "justify",
            color: "white"
        },
        sepaseadorImg:{
            width:'100%',
            height:'77%'
        },
        rankingImg:{
            width:'100%',
            height: '90%'
        },
        stepper:{
            backgroundColor:"#7b5d9f",
        }
    }));
    return useStyles();
}