// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={LandingPage} name="landing" />
      <Route path="/app/{urlProjectId:Int}" page={MapPage} name="map" />
      <Route path="/app" page={MapPage} name="map" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
