var myApp = angular.module('hello', ['ui.router']);

myApp.config(function ($stateProvider) {
    // An array of state definitions
    var states = [
        {name: 'hello', url: '/hello', component: 'hello'},
        {name: 'about', url: '/about', component: 'about'},

        {
            name: 'people',
            url: '/people',
            component: 'people',
            resolve: {
                people: function (PeopleService) {
                    return PeopleService.getAllPeople();
                }
            }
        },

        {
            name: 'people.person',
            url: '/{personId}',
            component: 'person',
            resolve: {
                person: function (people, $stateParams) {
                    return people.find(function (person) {
                        return person.id === $stateParams.personId;
                    });
                }
            }
        },
        {
            name: 'people.person.a',
            url: '/a',
            component: 'persons',
        }
    ]

    // Loop over the state definitions and register them
    states.forEach(function (state) {
        $stateProvider.state(state);
    });
});


myApp.run(function ($http, $uiRouter) {
    var Visualizer = window['ui-router-visualizer'].Visualizer;
    $uiRouter.plugin(Visualizer);
    $http.get('data/people.json', {cache: true});
});