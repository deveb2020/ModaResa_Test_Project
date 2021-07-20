## Calendar for scheduling appointments

## Dependencies

- FullCalendar  "^5.8.0"   [https://fullcalendar.io/]
- Moment        "^2.29.1"  [https://momentjs.com/]
- React Icons   "^4.2.0"   [https://react-icons.github.io/react-icons/]
- React Modal   "^3.14.3"  [https://reactcommunity.org/react-modal/]
- Apollo Client "^3.3.21"  [https://www.apollographql.com/docs/react/]
- Graphql       "^15.5.1"  [https://graphql.org/]

## Project Map

App.js is the main/parent commponent, in this commponent we are wrapping the whole application with ApolloProvider so we can connect Apollo Client with React.
Calendar.jsx is where the calendar main code goes, here we render Scheduler and EventModal components, in this component we are fetching the (using useEffect hook ) data from the DB and saving them to useState hook so we can than inject to fullCalendar. Also in this component we grab the Event Data so we can display in a modal whenever we click the event.
EventModal.jsx is the commponent we use to display the event information in details, this commponets data are comming from Calendar.jsx using props.
Graphql is where we store our Querys and Mutations

## How to start the project

You need to run the backend first by going to the frontend-test directory and we run this code

    [ npm i ]  install node_modules
    [ npm run dev ] start the server

Than for the frontend you need to go to the modaresa_scheduler_calendar directory and run this commands

    [ npm i ] install node_modules 
    [ npm run start ] start the live preview



