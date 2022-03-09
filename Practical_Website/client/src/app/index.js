
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import {Route, Switch} from 'react-router'
import { MoviesList, MoviesInsert, MoviesUpdate } from '../pages'
import { NavBar } from '../components'
import Demo from '../pages/demo'
// import {MoviesInsert} from '../pages/MoviesInsert'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            {/* <MoviesList/> */}
            {/* <MoviesInsert/> */}
                <Routes>
                <Route path="/movies/list" element={ <MoviesList/> } />
                <Route path="/movies/create" element={ <MoviesInsert/> } />
                <Route path="/movies/update/:id" element={ <MoviesUpdate/> } />
                </Routes>
            {/* <Routes>
                <Route exact path="/movies/list"  component={MoviesList} />
                <Route path="/movies/create" exact component={MoviesInsert} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={MoviesUpdate}
                />
            </Routes> */}
        </Router>
    )
}

export default App
