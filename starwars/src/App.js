
import './App.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PlaceIcon from '@material-ui/icons/Place';
import AndroidIcon from '@material-ui/icons/Android';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import cx from 'clsx';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Grid from '@material-ui/core/Grid';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';





function App() {

  const [value, setValue] = useState('people');
  const handleChange = (event, newValue) => {
    setValue(newValue);

  }

  return (
    <div className="App">
      <Grid
        container
        direction="column"
        alignItems="center"
        background-color="black"
      >
        <Nav valeur={value} change={handleChange} />  </Grid>
      <LoadingIndicator />


      {value === "people" ?
        <Person />
        : value === "species" ?
          <Species />
          : value === "planets" ?
            <Planets />
            : <Starships />}

      
<Infos />

    </div>
  );
}




const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress &&
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="Circles" color="#2BAD60" height="100" width="100" />
    </div>
  );
}

const Nav = (props) => {

  const useStyles = makeStyles({
    root: {
      width: 500,
      backgroundColor: "cyan"
    },
  });

  const { valeur, change } = props;
  const { value } = valeur;
  const classes = useStyles();




  return (
    <BottomNavigation value={value} onChange={(change)} className={classes.root}>
      <BottomNavigationAction label="people" value="people" icon={<EmojiPeopleIcon />} />
      <BottomNavigationAction label="planets" value="planets" icon={<PlaceIcon />} />
      <BottomNavigationAction label="species" value="species" icon={<AndroidIcon />} />
      <BottomNavigationAction label="starships" value="starships" icon={<FlightTakeoffIcon />} />
    </BottomNavigation>

  )
}






const Person = (props) => {
  const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 304,
      margin: 'auto',
      borderRadius: 0,
      position: 'relative',
    },
    content: {
      padding: 24,
    },
    cta: {
      display: 'block',
      textAlign: 'center',
      color: '#fff',
      letterSpacing: '3px',
      fontWeight: 200,
      fontSize: 12,
    },
    title: {
      color: '#fff',
      letterSpacing: '2px',
    },
  }));
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();

  const [person, setPerson] = useState([]);
  const getPersons = () => {
    const URL = "https://swapi.dev/api/people/"
    trackPromise(
      fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setPerson([...data.results]);
          console.log(data.results)
        }));
  }
  useEffect(() => {
    getPersons();
  },
    [])


    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };  
  return (
    <Grid container justify>
      { person.map((per) =>
        <Grid key={per.id} xs={2} item >
          <Card className={cx(styles.root, shadowStyles.root)}>
            <CardMedia
              classes={mediaStyles}
              image={
                'https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
              }
            />
            <CardActionArea>
              <CardContent className={styles.content}>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  minHeight={360}
                  color={'common.white'}
                  textAlign={'center'}
                  onClick={handleClickOpen}
                >
                  <h1 className={styles.title}>{per.name}</h1>
                  <p>{per.species}.</p>
                  <p>{per.birth_year}</p>
                </Box>
                 <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Infos about : "} </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Test
          </DialogContentText>
          <DialogActions>
          <Button onClick={handleClose} color="primary">
            Closet
          </Button>
          </DialogActions>
        </DialogContent>
       
      </Dialog>
 
                <Typography className={styles.cta} variant={'overline'}>
                  Explore
          </Typography>
              </CardContent>
            </CardActionArea>
            
          </Card>
          

        </Grid> 
      )
      }
     
    </Grid>
    
  );



}


const Planets = (props) => {
  const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 304,
      margin: 'auto',
      borderRadius: 0,
      position: 'relative',

    },
    content: {
      padding: 24,
    },
    cta: {
      display: 'blocks',
      textAlign: 'center',
      color: '#fff',
      letterSpacing: '3px',
      fontWeight: 200,
      fontSize: 12,
    },
    title: {
      color: '#fff',
      letterSpacing: '2px',
    },
  }));
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();

  const [planet, setPlanet] = useState([]);
  const getPlanet = () => {
    const URL = "https://swapi.dev/api/planets/"
    trackPromise(
      fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setPlanet([...data.results]);
          console.log(data.results)
        }));
  }
  useEffect(() => {
    getPlanet();
  },
    [])

  return (
    <Grid container justify>
      {planet.map((per) => 
      <Grid key={per.id} xs={2} item ><Card className={cx(styles.root, shadowStyles.root)}>
        <CardMedia
          classes={mediaStyles}
          image={
            'https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
          }
        />
        <CardActionArea>
          <CardContent className={styles.content}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              minHeight={360}
              color={'common.white'}
              textAlign={'center'}
            >
              <h1 className={styles.title}>{per.name}</h1>
              <p>climat : {per.climate}.</p>
              <p>population : {per.population}</p>
            </Box>
            <Typography className={styles.cta} variant={'overline'}>
              Explore
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>
      )}
    </Grid>

  )
}



const Species = (props) => {
  const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 304,
      margin: 'auto',
      borderRadius: 0,
      position: 'relative',

    },
    content: {
      padding: 24,
    },
    cta: {
      display: 'blocks',
      textAlign: 'center',
      color: '#fff',
      letterSpacing: '3px',
      fontWeight: 200,
      fontSize: 12,
    },
    title: {
      color: '#fff',
      letterSpacing: '2px',
    },
  }));
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();
  const [species, setSpecies] = useState([]);
  const getSpecies = () => {
    const URL = "https://swapi.dev/api/species/"
    trackPromise(
      fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setSpecies([...data.results]);
          console.log(data.results)
        }));
  }
  useEffect(() => {
    getSpecies();
  },
    [])

  return (
    <Grid container justify>
      {species.map((per) => 
      <Grid key={per.id} xs={2} item ><Card className={cx(styles.root, shadowStyles.root)}>
        <CardMedia
          classes={mediaStyles}
          image={
            'https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
          }
        />
        <CardActionArea>
          <CardContent className={styles.content}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              minHeight={360}
              color={'common.white'}
              textAlign={'center'}
            >
              <h1 className={styles.title}>{per.name}</h1>
              <p>climat : {per.climate}.</p>
              <p>population : {per.population}</p>
            </Box>
            <Typography className={styles.cta} variant={'overline'}>
              Explore
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>)

      }
    </Grid>
  )
}

const Starships = (props) => {
  const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 304,
      margin: 'auto',
      borderRadius: 0,
      position: 'relative',

    },
    content: {
      padding: 24,
    },
    cta: {
      display: 'blocks',
      textAlign: 'center',
      color: '#fff',
      letterSpacing: '3px',
      fontWeight: 200,
      fontSize: 12,
    },
    title: {
      color: '#fff',
      letterSpacing: '2px',
    },
  }));
  const [starship, setStarships] = useState([]);
  const getStarships = () => {
    const URL = "https://swapi.dev/api/starships/"
    trackPromise(
      fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setStarships([...data.results]);
          console.log(data.results)
        }));
  }
  useEffect(() => {
    getStarships();
  },
    [])

  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useLightTopShadowStyles();
  return (
    <Grid container justify>
    {starship.map((per) => 
    <Grid key={per.id} xs={2} item ><Card className={cx(styles.root, shadowStyles.root)}>
        <CardMedia
          classes={mediaStyles}
          image={
            'https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
          }
        />
        <CardActionArea>
          <CardContent className={styles.content}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              minHeight={360}
              color={'common.white'}
              textAlign={'center'}
            >
              <h1 className={styles.title}>{per.name}</h1>
              <p>climat : {per.climate}.</p>
              <p>population : {per.population}</p>
            </Box>
            <Typography className={styles.cta} variant={'overline'}>
              Explore
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>)

      }
    </Grid>
  )
}

const Infos = (props) =>{

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  
  return (
<Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Infos about : "} </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Test
          </DialogContentText>
        </DialogContent>
       
      </Dialog>
  )
}
export default App;
