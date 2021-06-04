import React from "react";
import {Helmet} from "react-helmet";
import {useState} from "react";

import Toggle from "react-toggle";

import {withStyles, makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';


function secureRandom(count) { // generate a cryptographically secure integer
    var cryptoObj = window.crypto || window.msCrypto
    var rand = new Uint32Array(1)
    var skip = 0x7fffffff - 0x7fffffff % count
    var result

    if (((count - 1) & count) === 0) {
        cryptoObj.getRandomValues(rand)
        return rand[0] & (count - 1)
    }

    do {
        cryptoObj.getRandomValues(rand)
        result = rand[0] & 0x7fffffff
    } while (result >= skip)

    return result % count
}

const PassGenApp = () => {
    const [open, setOpen] = React.useState(false);
    const [passwd, setPassword] = React.useState('');
    const [state, setState] = React.useState({uppercase: true, digits: true, symbols: true});
    const [length, setLength] = React.useState(16);
    
    
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
    };
    const handleSlide = (event, newValue) => {
        setLength(newValue);
    };    
    const PrettoSlider = withStyles({
        root: {
            color: '#6A53FF',
            height: 8,
            width: 250
        },
        thumb: {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            marginTop: -8,
            marginLeft: -12,
            '&:focus, &:hover, &$active': {
                boxShadow: 'inherit'
            }
        },
        active: {},
        valueLabel: {
            left: 'calc(-50% + 4px)'
        },
        track: {
            height: 8,
            borderRadius: 4
        },
        rail: {
            height: 8,
            borderRadius: 4
        }
    })(Slider);


    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2)
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        }
    });

    const DialogTitle = withStyles(styles)((props) => {
        const {
            children,
            classes,
            onClose,
            ...other
        } = props;
        return (
            <MuiDialogTitle disableTypography
                className={
                    classes.root
                }
                {...other}>
                <Typography variant="h6">
                    {children}</Typography>
                {
                onClose ? (
                    <IconButton aria-label="close"
                        className={
                            classes.closeButton
                        }
                        onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null
            } </MuiDialogTitle>
        );
    });

    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2)
        }
    }))(MuiDialogContent);

    const DialogActions = withStyles((theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(1)
        }
    }))(MuiDialogActions);

    function handleClickOpen() {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
    };

    function handleClick() {
        var charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+?,.<>".split("");
        var passList = []
        for (var x = 0; x < length; x++) {
            passList.push(charList[secureRandom(charList.length)])
        }
        setPassword(passList.join(''));
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            width: 300 + theme.spacing(3) * 2
        },
        margin: {
            height: theme.spacing(3)
        }
    }));

    const classes = useStyles();

    return([
        <Helmet>
            <link rel="stylesheet" href="/styles/home.css"></link>
            <link rel="stylesheet" href="/styles/toggle.css"></link>
        </Helmet>,
        <div class="passBox">
            <h1 class="title">AwesomePass - Generate Secure Passwords</h1>
            <div class="box">
                <p class="password">
                    {passwd}</p>
            </div>
            <div class="buttons">
                <div class="generate">
                    <button class="button generate"
                        onClick={handleClick}>
                        Generate
                    </button>
                </div>
                <div class="configuration">
                    <button onClick={handleClickOpen}
                        class="button configure">
                        Configure
                    </button>
                </div>
                <div className={
                    classes.margin
                }/>

            </div>
            <Dialog onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <DialogTitle id="customized-dialog-title"
                    onClose={handleClose}>
                    Generator Configuration
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <FormControl component="fieldset">

                            <FormLabel component="legend">Complexity</FormLabel>
                            <FormGroup>

                                <FormControlLabel control={<Switch
                                        checked={
state.uppercase}
                                    onChange={handleChange}
                                    color="primary"
                                    name="uppercase"/>}
                                    label="Uppercase Letters (A-Z)"/>
                                <FormControlLabel control={<Switch
                                        checked={
state.digits}
                                    onChange={handleChange}
                                    color="primary"
                                    name="digits"/>}
                                    label="Digits (0-9)"/>
                                <FormControlLabel control={<Switch
                                        checked={
state.symbols}
                                    onChange={handleChange}
                                    color="primary"
                                    name="symbols"/>}
                                    label="Symbols (@#$*)"/>
                            </FormGroup>
                            <FormLabel component="legend">Length</FormLabel>
                            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider"
                                min={8} defaultValue={length} max={128} onChangeCommitted={handleSlide}/>
                        </FormControl>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus
                        onClick={handleClose}
                        color="primary">
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    ]);
};

export default PassGenApp;
