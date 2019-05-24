import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import DashboardPage from '../Dashboard';
import ProjectsPage from '../Projects';
import CreateProjectPage from '../CreateProject';
import ProjectPage from '../ProjectView';
import SearchPartnerPage from '../SearchPartner';
import ProjectSuggestedPage from '../ProjectSuggestedView';
import EvaluationPage from '../EvaluationPage';
import Profile from '../Profile';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';



const App = () => (
  <Router>
    <div>
        <Route exact path={ROUTES.LANDING} component={HomePage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}/>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.DASHBOARD} component={DashboardPage} />
        <Route exact path={ROUTES.PROJECTS} component={ProjectsPage} />
        <Route exact path={ROUTES.CREATEPROJECTS} component={CreateProjectPage} />
        <Route exact path={ROUTES.PROJECT} component={ProjectPage} />
        <Route exact path={ROUTES.SEARCHPARTNER} component={SearchPartnerPage} />
        <Route exact path={ROUTES.PROJECTSUGGESTED} component={ProjectSuggestedPage} />
        <Route exact path={ROUTES.EVALUATIONPROJECT} component={EvaluationPage} />
        <Route exact path={ROUTES.PROFILE} component={Profile} />

    </div>
  </Router>
);

export default withAuthentication(App);
