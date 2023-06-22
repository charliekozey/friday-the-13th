// DELIVERABLE 1 //////////////////////////
// fetch from db.json
// forEach --> render()
// grab movie-list, create image element
// append image to movie list

// DELIVERABLE 2 //////////////////////////
// Show first movie in list when loaded

// DELIVERABLE 3 //////////////////////////
// create function to display movie details
// querySelector for all relevant elements
// populate elements with data from current movie
// add event listener to change current movie
// watched/unwatched

// DELIVERABLE 4 ///////////////////////////
// create function toggleWatched()
// add event listener to watchedButton
// create global variable to hold selected movie
// in event listener, set selectedMovie to clicked movie
// should also change selectedMovie.watched 

// DELIVERABLE 5 ///////////////////////////
// build new function addBlood()
// e.target
// submit event listener
// variable for current blood count and blood you're adding
// parseInt()

let selectedMovie

fetch("http://localhost:3000/movies")
.then(res => res.json())
.then(data => {
    data.forEach(movie => displayMenu(movie))
    displayMovieDetails(data[0])
    addWatchedToggleListener()
    addBloodSubmitListener()
})

function displayMenu(movie) {
    const movieNav = document.querySelector("#movie-list")
    const movieImage = document.createElement("img")

    movieImage.src = movie.image
    movieNav.append(movieImage)

    movieImage.addEventListener("click", () => {
        displayMovieDetails(movie)
    })
}

function displayMovieDetails(movie) {
    const title = document.querySelector("#title")
    const image = document.querySelector("#detail-image")
    const year = document.querySelector("#year-released")
    const description = document.querySelector("#description")
    const watchedButton = document.querySelector("#watched")
    const bloodDisplay = document.querySelector("#amount")
    
    selectedMovie = movie

    console.log(selectedMovie.title)
    
    title.textContent = movie.title
    image.src = movie.image
    year.textContent = movie.release_year
    description.textContent = movie.description
    watchedButton.textContent = movie.watched ? "Watched" : "Unwatched"
    bloodDisplay.textContent = movie.blood_amount
}

function addWatchedToggleListener() {
    const watchedButton = document.querySelector("#watched")
    
    watchedButton.addEventListener("click", () => {
        selectedMovie.watched = !selectedMovie.watched
        watchedButton.textContent = selectedMovie.watched ? "Watched" : "Unwatched"
    })
}

function addBloodSubmitListener() {
    const bloodForm = document.querySelector("#blood-form")
    const bloodCounter = document.querySelector("#amount")

    bloodForm.addEventListener("submit", (e) => {
        e.preventDefault()
        selectedMovie.blood_amount += parseInt(e.target["blood-amount"].value)
        bloodCounter.textContent = selectedMovie.blood_amount
        e.target.reset()
    })
}