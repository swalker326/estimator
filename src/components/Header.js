import React, { useContext } from "react";
import { Context } from "../state/store";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import logo from "../assets/qhoto_font_logo.png";
import { auth } from "../server/firestore";

const Header = (props) => {
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const logUserOut = () => {
    auth.signOut().then(() => {
      dispatch({ type: "SET_USER", user: "" });
      dispatch({ type: "SET_AUTH", auth: false });
      dispatch({ type: "SET_SHOP", shopId: "", shopData: {} });
    });
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <div>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {state.auth ? (
          <div>
            <MenuItem>
              <IconButton aria-label="show new notifications" color="inherit">
                <Badge
                  badgeContent={state.shopData?.notifications}
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <p>Notifications</p>
            </MenuItem>
            <MenuItem>
              <Link to={`/profile/settings/${state.shopId}`}>
                <div style={{ display: "flex" }}>
                  <IconButton aria-label="log current user out" color="inherit">
                    <SettingsIcon />
                  </IconButton>
                  <p>Settings</p>
                </div>
              </Link>
            </MenuItem>
          </div>
        ) : null}
        <MenuItem onClick={state.auth ? logUserOut : () => null}>
          <div style={{ display: "flex" }}>
            <IconButton
              aria-label="account of current user"
              color="inherit"
            >
              <ExitToApp />
            </IconButton>
            <p>Logout</p>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={state.shopId ? `/profile/${state.shopId}` : `/`}
            >
              <img className={classes.logo} alt="logo_image" src={logo} />
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {state.auth ? (
              <div>
                <IconButton aria-label="show new notifications" color="inherit">
                  <Badge
                    badgeContent={state.shopData?.notifications}
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  color="inherit"
                >
                  <Link to={`/profile/settings/${state.shopId}`}>
                    <SettingsIcon style={{ color: "white" }} />
                  </Link>
                </IconButton>
              </div>
            ) : null}
            <IconButton
              onClick={state.auth ? logUserOut : () => null}
              aria-label="account of current user"
              color="inherit"
            >
              <ExitToApp style={{ color: "white" }} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Header;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  logo: {
    width: "150px",
    margin: "12px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
