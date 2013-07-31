'use strict';

/* Services */
var service = angular.module('angularProject.services', ['ngResource']);

// Prepare to create resources from endpoints
var resourceObjects = constants.resources;

// Creates angular resource objects for each endpoint in constants.js
for (var resourceName in resourceObjects) {
  if (resourceObjects.hasOwnProperty(resourceName)) {
    addResourceFactoryToService(service, resourceName, resourceObjects[resourceName].endpoint);
  }
}

// Angular resource definition
function addResourceFactoryToService (service, resourceName, resourceEndpoint) {
  service.factory(resourceName, function($resource) {
          return $resource(
          	constants.serverAddress + resourceEndpoint + '/:id',
            // Creates a PUT method defined as 'update'
          	{	id: '@id', },
    				{
            	update: {
          			method: 'PUT',
          			params: {id: '@id'}
          		},
        	 }
        );
  });
}