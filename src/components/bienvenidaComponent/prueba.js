import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import {Card, Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import BienvenidaCSS from "./bienvenidaCSS";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Paseo from "./paseo";
import SePaseador from "./sePaseador";
import VerRanking from "./verRanking";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const steps = [
    {
        label: '¡Pide un paseo!',
        opcion: <Paseo/>
    },
    {
        label: '¡Se uno de nuestros paseadores!',
        opcion: <SePaseador/>
    },
    {
        label: 'Conoce el rankin de paseadores',
        opcion: <VerRanking/>
    }
];

export default function Prueba() {
    const classes = BienvenidaCSS();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Container>
            <Grid container justify={"center"}>
                <Card variant={"outlined"} className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography className={classes.header}>{steps[activeStep].label}</Typography>
                    </CardContent>
                    <CardMedia>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {steps.map((step) => (
                                <Grid container justify={"center"}>
                                    {step.opcion}
                                </Grid>
                            ))}
                        </AutoPlaySwipeableViews>
                        <MobileStepper
                            className={classes.stepper}
                            steps={maxSteps}
                            position={"static"}
                            variant={"progress"}
                            activeStep={activeStep}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                    Next
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                                    Back
                                </Button>
                            }
                        />
                    </CardMedia>
                </Card>
            </Grid>
        </Container>
    )
}