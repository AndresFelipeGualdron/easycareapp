import {makeStyles} from "@material-ui/core/styles";

export default function useLoginCSS() {

    const useStyles = makeStyles((theme) => ({
        card: {
            width: '28%',
            backgroundColor: '#f5f5f5'
        },
        image: {
            width: '100%',
            margin: "auto"
        },
        input: {
            textAlign : "center",
            width: '100%'
        },
        content: {
            textAlign: "center"
        },
        head:{
            backgroundColor: '#adc2dc'
        },
        button:{
            width : 'auto%',
            height: "auto%"
        }
    }))

    return useStyles();
}