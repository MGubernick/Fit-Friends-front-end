# Fit-Friends (front-end repo)

This is the repository for the Fit-Friends client side application. Fit-Friends is a simple but fun workout/fitness sharing app, bringing people together through the shared passion for staying fit! Users can create an account and begin their journey.  Once signed in the user will be able to submit a workout of their own, sharing it with the community.  They can also update and delete any workout they post.  Outside of submitting their own workouts, a user is able to browse the already existing library of workouts by either category or by simply viewing all of the workouts.  The category browsing in the index is made easy by convenient icons signifying the type of workout.  As a user you are also able to collect your favorites by selecting the "add to favorites" option when viewing a single workout.

## Other Important Links & Resources Used:
**Links**
- [Fit-Friens-API Repo](https://github.com/MGubernick/Fit-Friends-API)
- [Free-Insperational-Quote-API](https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373)
- [Deployed API](https://fit-friends-api.herokuapp.com/)
- [Deployed App](https://mgubernick.github.io/Fit-Friends-front-end/)

**Website Resources**

- [w3schools](w3schools.com)
- [developer.mozilla](developer.mozilla.org)
- [stackOverflow](stackOverflow.com)
- [React Docs](reactjs.org)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [icongram](https://icongr.am/)

## Set up and instructions:
To use this application you can follow these simple steps:
1. Follow this link to the web application: mgubernick.github.io/fit-friends-front-end/
2. Use the Sign-Up feature to create an account, this will allow you access to all of the other features (enjoy the insperational quote on the landing page along the way!)
3. Once signed in, there will be a variety of options available along the navbar, these include: submitting a workout of your own or indexing all workouts in the database
4. There will also be a dropdown menu (the user name) where there will be options to index a users created workouts, see a users favorite workouts (selected by the user)
5. Also included in the dropdown will be options to change the users password or sign-out
6. Enjoy!


## Planning and Story: Development Process and Problem-Solving Strategy:

### Planning:
- The early part of my planning process was spent deciding which technologies I wanted to utilize and showcase for my capstone project.  Ultimately, I decided to take on the challenge of pairing Python/Django for the backend, API, development and Javascript/React to develop my front end application.  I then thought up a application idea that would be something my friends and I could use and enjoy on a regular basis.  This is where the idea of Fit-Friends was born!

- Once I had my idea, I created my wireframe and ERD as well as my user stories to help guide myself through the development process itself.

### CRUD Workouts:
- The first step in develping the front end of Fit-Friends was creating all of the CRUD functionality for the Resources, in this case workouts.

- One at a time, I created a componenet (when needed) and wrote out functionality for Create a Workout, Show One Workout, Index All Workout, Index The User's Workouts, and indes all of the users favorite workouts!

- As I was creating these functions, I would test them one at a time and ensure the functionality worked as expected.


### CRUD Favorites List:
- After I completed all of the basic functionality for Workouts, I decided it would be fun for the user to be able to pick their favorite workouts and be able to reference them by clicking a favorites button

- I started this by creating a way for the user to favorite a workout (this turned into a button that is located on the show one workout page)

- Once you have liked a workout, you can then check out your favorites by clicking on the favorites link in the navbar

- When you get to the favorite workouts you will then have the option to remove a workout from your favorites by clicking the X located at the top right of the workout card.

### Problem-Solving:
- My problem solving process was similar to previous projects.  When incountering a problem, I would first try to brainstomr ideas on how to solve the problem on my own. If this didn't work, I would spend some time talking with my peers and group brainstorming with them to try to solve the problem. If that still didn't work, I would post an issue in the capstone repo and get assistance from one of the instructors.

## User Stories:
- As a user I want to create an account
- As a user I want to log into my account and change my password
- As a user I want to post a new workout to the database
- As a user I want to search for all of the workouts that I have posted
- As a user I want to search for all of the workouts that anyone has posted
- As a user I want to search/browse workouts by category
- As a user I want to delete posts that I have made
- As a user I want to bookmark my favorite workouts
- As a user I want to search for my favorites only and view those

## Technologies Used:
- HTML/CSS
- Bootstrap
- Javascript
- React
- Axios
- Github Pages
- icongram
- Insperational Quote API

## Unsolved Problems:
- The problem that I am currently working on the solution for is being able to click on one of the oter users names (when looking at a workouts favorites) and see that user's favorite workouts.
- The other propblem that I will eventually be working on is the addition of media queries to work on the users experience on a smaller device

## Screenshot of Application:
![screenshot](https://imgur.com/3dGiBRV.png "Screenshot of App")

## Wireframes
![Fit-Friends Wireframe](https://imgur.com/YPJw1db.png "wireframe")
