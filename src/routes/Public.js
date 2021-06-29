import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../components/public/Home";
import Us from "../pages/Us";
import News from "../components/public/News";
import Testimonials from "../components/public/Testimonials";
import { Contact } from "../components/public/contact";
import Layout from "../components/public/layout/Layout";
import { PublicActivities } from "../components/public/activities/PublicActivities";
import Detail from "../components/public/News/Detail";
import { ActivitiesDetail } from "../components/public/activities/ActivitiesDetail";
import Donations from "../components/public/donations";
import Thanks from "../components/public/donations/Thanks";
import { MainLogin } from "../pages/backoffice/authentication/login/MainLogin";
import { MainRegister } from "../pages/backoffice/authentication/register/MainRegister";

export const Public = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={MainLogin} />
        <Route exact path="/register" component={MainRegister} />
        <Route exact path="/us" component={Us} />
        <Route exact path="/contacto" component={Contact} />
        <Route exact path="/actividades" component={PublicActivities} />
        <Route exact path="/actividades/:id" component={ActivitiesDetail} />
        <Route exact path="/novedades" component={News} />
        <Route exact path="/novedades/:id" component={Detail} />
        <Route exact path="/donar" component={Donations} />
        <Route exact path="/thanks" component={Thanks} />
        <Route exact path="/testimonios" component={Testimonials} />

        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};
