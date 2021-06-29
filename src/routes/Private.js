import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import CreateActivity from "../components/backoffice/activities/CreateActivity";
import EditActivity from "../components/backoffice/activities/EditActivity";
import ListOfActivities from "../components/backoffice/activities/ListOfActivities";
import Backoffice from "../components/backoffice/Backoffice";
import { CategoryList } from "../components/backoffice/categories/CategoryList";
import HomeEdition from "../components/backoffice/homeEdition/HomeEdition";
import Header from "../components/backoffice/layout/Header";
import NewsList from "../components/backoffice/news/NewsList";
import NewsEdit from "../components/backoffice/news/NewsEdit";
import NewsForm from "../components/backoffice/news/NewsEdit";
import TestimonialList from "../components/backoffice/testimonials/TestimonialList";
import EditTestimonial from "../components/backoffice/testimonials/EditTestimonial";
import CreateTestimonial from "../components/backoffice/testimonials/CreateTestimonial";
import { UserList } from "../components/backoffice/users/UserList";
import { CategoryCreate } from "../pages/backoffice/categories/CategoryCreate";
import { CategoryPatch } from "../pages/backoffice/categories/CategoryPatch";
import { OrganizationPage } from "../pages/backoffice/organization/OrganizationPage";
import { UserPatch } from "../pages/backoffice/users/UserPatch";
import { UserCreate } from "../pages/backoffice/users/UserCreate";
import CreateSlice from "../components/backoffice/slides/CreateSlide";
import ListOfSlides from "../components/backoffice/slides/ListOfSlides";
import EditSlice from "../components/backoffice/slides/EditSlice";
import { OrganizationEditPage } from "../pages/backoffice/organization/OrganizationEditPage";
import SlidesShow from "../components/backoffice/slides/SlidesShow";
import { CreateOrEditUser } from "../components/backoffice/users/CreateOrEditUser";
import CreateMember from "../components/backoffice/members/CreateMember";
import EditMember from "../components/backoffice/members/EditMember";
import ListOfMembers from "../components/backoffice/members/ListOfMembers";
import { HeaderMain } from "../components/public/header/HeaderMain";

export const Private = () => {
  return (
    <>
      <HeaderMain isBackoffice={true} />
      <Switch>
        <Route exact path="/backoffice" component={Backoffice} />
        <Route exact path="/backoffice/news" component={NewsList} />
        <Route exact path="/backoffice/news/edit" component={NewsEdit} />
        <Route exact path="/backoffice/news/create" component={NewsForm} />
        <Route exact path="/backoffice/categories" component={CategoryList} />
        <Route
          exact
          path="/backoffice/categories/create"
          component={CategoryCreate}
        />
        <Route
          exact
          path="/backoffice/categories/:id"
          component={CategoryPatch}
        />
        <Route
          exact
          path="/backoffice/activities"
          component={ListOfActivities}
        />
        <Route
          exact
          path="/backoffice/activities/create"
          component={CreateActivity}
        />
        <Route
          exact
          path="/backoffice/activities/edit"
          component={EditActivity}
        />
        <Route exact path="/backoffice/slides" component={ListOfSlides} />
        <Route exact path="/backoffice/slides/create" component={CreateSlice} />
        <Route exact path="/backoffice/slides/edit" component={EditSlice} />
        <Route
          exact
          path="/backoffice/organization"
          component={OrganizationPage}
        />
        <Route
          exact
          path="/backoffice/testimonials"
          component={TestimonialList}
        />
        <Route
          exact
          path="/backoffice/testimonials/edit"
          component={EditTestimonial}
        />
        <Route
          exact
          path="/backoffice/testimonials/create"
          component={CreateTestimonial}
        />
        <Route exact path="/backoffice/users" component={UserList} />
        <Route exact path="/backoffice/users/create" component={UserCreate} />
        <Route exact path="/backoffice/users/:id" component={UserPatch} />
        <Route exact path="/backoffice/homeEdition" component={HomeEdition} />
        <Route exact path="/backoffice/slides" component={SlidesShow} />
        <Route
          exact
          path="/backoffice/organization/edit"
          component={OrganizationEditPage}
        />
        <Route
          exact
          path="/backoffice/users/edit"
          component={CreateOrEditUser}
        />
        <Route exact path="/backoffice/members" component={ListOfMembers} />
        <Route
          exact
          path="/backoffice/members/create"
          component={CreateMember}
        />
        <Route exact path="/backoffice/members/edit" component={EditMember} />

        <Redirect to="/backoffice" />
      </Switch>
    </>
  );
};
