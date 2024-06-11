// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
import { Router, Route, Set } from '@redwoodjs/router'

import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={AuthPage} name="login" />
      <Set wrap={DefaultLayout}>
        <Route path="/biodiversity" page={BiodiversityPage} name="biodiversity" />
        <Route path="/survey-overview" page={SurveyOverviewPage} name="surveyOverview" />
        <Route path="/methodology" page={MethodologyPage} name="methodology" />
        {/* <Set private unauthenticated="login"> */}
        {/* <Route path="/" page={LandingPage} name="landing" /> */}
        <Route path="/{urlProjectId:String}/{initialOverlay:Int?}" page={MapPage} name="map" />
        <Route path="/{urlProjectId:String}" page={MapPage} name="map" />
        <Route path="/map" page={MapPage} name="map" />
        <Route path="/" page={MapPage} name="map" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
