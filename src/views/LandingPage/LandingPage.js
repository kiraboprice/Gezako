import React, {Component} from "react";
import firebase from 'firebase';
import withFirebaseAuth from 'react-with-firebase-auth'

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

function LandingPage(props) {
    const classes = useStyles();
    const {...rest} = props;
    const {
      user,
      signOut,
      signInWithGoogle,
    } = props;
    return (
        <div>
          <Header
              color="transparent"
              routes={dashboardRoutes}
              brand="Gezako"
              rightLinks={<HeaderLinks/>}
              fixed
              changeColorOnScroll={{
                height: 400,
                color: "white"
              }}
              {...rest}
          />
          <Parallax filter image={require("assets/img/bg.jpg")}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h1 className={classes.title}>Gezako Software Quality
                    Assurance</h1>
                  <h4>
                    All your Software QA needs in one place.
                  </h4>
                  <br/>
                  {/*<Button*/}
                  {/*color="success"*/}
                  {/*size="lg"*/}
                  {/*href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"*/}
                  {/*target="_blank"*/}
                  {/*rel="noopener noreferrer"*/}
                  {/*>*/}
                  {/*Create An Account*/}
                  {/*</Button>*/}

                  {/*<br />*/}
                  {/*<br />*/}

                  <Button
                      color="info"
                      size="lg"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={signInWithGoogle}
                  >
                    Log in With Google
                  </Button>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <Footer/>
        </div>
    );
}

const firebaseAppAuth = firebase.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(LandingPage);

// export default LandingPage
