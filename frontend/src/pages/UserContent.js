import React from "react";
import PropTypes from "prop-types";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";

import Navigator from "./Navigator";
import CallContent from "./CallContent";
import PlanContent from "./PlanContent";
import IdentityContent from "./IdentityContent";
import HomeContent from "./HomeContent";
import HealthContent from "./HealthContent";
import EntourageContent from "./EntourageContent";
import Header from "./Header";
import { observer, inject } from "mobx-react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  browserHistory
} from "react-router-dom";

let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3"
    }
  },
  shape: {
    borderRadius: 8
  }
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c"
      }
    },
    MuiButton: {
      label: {
        textTransform: "initial"
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none"
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing.unit
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: "initial",
        margin: "0 16px",
        minWidth: 0,
        [theme.breakpoints.up("md")]: {
          minWidth: 0
        }
      },
      labelContainer: {
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing.unit
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854"
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48
    }
  }
};

const drawerWidth = 256;

const styles = () => ({
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  mainContent: {
    flex: 1,
    padding: "48px 36px 0",
    background: "#eaeff1"
  }
});

@withStyles(styles)
@inject("session", "patients")
@observer
class Paperbase extends React.Component {
  static isPrivate = true;

  state = {
    mobileOpen: false
  };

  componentDidMount(){
    const { match } = this.props;
    if(match.params.id && match.params.id != "signin") {
      this.props.patients.select(match.params.id);
    }
    
  }

  routes = [
    {
      path: `/${this.props.match.params.id}/call`,
      component: CallContent
    },
    {
      path: `/${this.props.match.params.id}/identity`,
      component: IdentityContent
    },
    {
      path: `/${this.props.match.params.id}/health`,
      component: HealthContent
    },
    {
      path: `/${this.props.match.params.id}/entourage`,
      component: EntourageContent
    },
    {
      path: `/${this.props.match.params.id}/home`,
      component: HomeContent
    },
    {
      path: `/${this.props.match.params.id}/plan`,
      component: PlanContent
    }
  ];

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, match, patients: { current } } = this.props;
    return (
      <div className={classes.appContent}>
       {current ? <Header
          match={this.props.match}
          onDrawerToggle={this.handleDrawerToggle}
        /> : null }

        <main className={classes.mainContent}>
          
          {this.routes.map((route, i) => {
            return <Route path={route.path} key={i} {...route} />;
          })}
          <Redirect from={`/${this.props.match.params.id}`} to={`/${this.props.match.params.id}/call`}/>
        </main>
      </div>
    );
  }
}

export default Paperbase;
