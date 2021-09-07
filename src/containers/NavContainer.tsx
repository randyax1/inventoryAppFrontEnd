import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import LayersRoundedIcon from '@material-ui/icons/LayersRounded';
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';

const drawerWidth = 180;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    
  }),
);

interface props {
  history: any,
}

const NavContainer = (props: props) => {
    const classes = useStyles();
    const theme = useTheme();

    const { history } = props;

    const routesList = [
      {
        text: "Home",
        icon: <LayersRoundedIcon style={{ color:'#D5A021' }} />,
        onClick: () => history.push("/", handleDrawerClose())
      },
      {
        text: "Inventory",
        icon: <BallotRoundedIcon style={{ color:'#D5A021' }} />,
        onClick: () => history.push("/inventario", handleDrawerClose())
      },
      {
        text: "Suppliers",
        icon: <PeopleAltRoundedIcon style={{ color:'#D5A021' }} />,
        onClick: () => history.push("/inventario", handleDrawerClose())
      },
      {
        text: "Category",
        icon: <CategoryRoundedIcon style={{ color:'#D5A021' }} />,
        onClick: () => history.push("/inventario", handleDrawerClose())
      }
    ];

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
    setOpen(true);
    };

    const handleDrawerClose = () => {
    setOpen(false);
    };

    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{backgroundColor:'#011936'}}>
          <IconButton
            color="inherit"
            aria-label="Abrir menu"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <DashboardRoundedIcon style={{color:'#D5A021'}}/> Inventory App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {routesList.map((itemList, index) => {
            const { text, icon, onClick } = itemList;
            return (
            <ListItem button key={text} onClick={ onClick }>
              {icon && <ListItemIcon>{icon} </ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
            );
          })}
        </List>
           
      </Drawer>
      
    </div>
    )
}

export default withRouter(NavContainer);