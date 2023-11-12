# Testing 

### API tests

This suite is designed to integrate all elements in the application while hitting the API endpoints.
It checks the integration between all elements is working as expected.

Services doing external requests will be supplied by their mock instances, thus that no request will be made to the outside application. 
An in memory mongo DB will be used instead of the productive one.

### Integration tests

[This suite lives in Postman](https://www.postman.com/edymberg/workspace/team-workspace/api/1bf1f431-82ee-42ff-9f93-faf99c62d8ac?action=share&creator=2930866) ask for invitation.   
It's designed to run all tests using the real API and DB, but also all the real components hierarchy.   
It would be run on each commit by a Github Action using docker-compose to start the application and hit the API.