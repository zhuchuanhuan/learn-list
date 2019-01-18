angular.module('hello').component('people', {
    bindings: {people: '<'},

    templateUrl: 'tpl/people.html'
});