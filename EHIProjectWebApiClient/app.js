var app;
(function () {
    'use strict'; 
    app = angular.module('ContactApp', []);
})();

app.controller('ContactCtrl', ['$scope', 'CrudService',
    function ($scope, CrudService) {
        
        $scope.contactList = {};

        
        // Base Url 
        var baseUrl = 'http://localhost/EHIProject/api/Contact/';

        $scope.btnText = "Save";       
        $scope.mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
        $scope.SaveUpdateContact = function () {
            

            var contact = {
                FirstName: $scope.firstName,
                LastName: $scope.lastName,
                Email: $scope.email,
                PhoneNumber: $scope.mobileNumber,
                Status: true
            }
            if ($scope.btnText == "Save") { 
                var apiRoute = baseUrl + 'SaveContacts';
                var saveContact = CrudService.post(apiRoute, contact);
                saveContact.then(function (response) {
                    if (response.data != "") {
                        alert("Data Saved Successfully");
                        $scope.Clear();
                        $scope.btnText = "Save";

                    } else { 
                        alert("Contact not saved");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
            if ($scope.btnText == "Update") {
                
                var apiRoute = baseUrl + 'PutContacts';
                var saveContact = CrudService.put(apiRoute, contact);
                saveContact.then(function (response) {
                    if (response.data != "") {
                        alert("Data updated Successfully");
                        $scope.Clear();
                        $scope.btnText = "Save";
                    } else {
                        alert("Contact not saved");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
            $scope.getAllContact();
        }

        $scope.EditContact = function (ContactId) {
            debugger;
            var apiRoute = baseUrl + 'GetContacts/';
            var getContact = CrudService.getbyID(apiRoute,ContactId);
            getContact.then(function (response) {
                if (response.data != "") {
                    $scope.firstName = response.data.FirstName;
                    $scope.lastName = response.data.LastName;
                    $scope.email = response.data.Email;
                    $scope.mobileNumber = response.data.PhoneNumber;
                    $scope.btnText = "Update";

                } else {
                    alert("no data found");
                }

            }, function (error) {
                console.log("Error: " + error);
            });
        }

        $scope.getAllContact = function () {
            var apiRoute = baseUrl + 'GetContacts/';
            var getContact = CrudService.getAll(apiRoute);
            getContact.then(function (response) {
                if (response.data != "") { 
                    $scope.contactList = response.data;

                } else {
                    alert("no data found");
                }

            }, function (error) {
                console.log("Error: " + error);
            });
        }

        $scope.Clear = function () {
            $scope.firstName = " ";
            $scope.lastName = " ";
            $scope.email = " ";
            $scope.mobileNumber = ""; 
        }

        $scope.DeleteContact = function (ContactId) {
            debugger;
            var apiRoute = baseUrl + 'DeleteContacts/'+ContactId;
            var getContact = CrudService.delete(apiRoute);
            getContact.then(function (response) {
                if (response.data != "") {
                    debugger;
                    alert("Deleted Successfully");
                    $scope.getAllContact();
                } else {
                    debugger;
                    alert("no data found");
                }

            }, function (error) {
                console.log("Error: " + error);
            });
        }


        $scope.getAllContact();
    }]);

app.service('CrudService', function ($http) {

    var urlGet = '';
    this.post = function (apiRoute, Model) {
        debugger;
        var request = $http({
            method: "post",
            url: apiRoute,
            data: Model
        });
        return request;
    }
    this.put = function (apiRoute, Model) {
        var request = $http({
            method: "put",
            url: apiRoute,
            data: Model
        });
        return request;
    }
    this.delete = function (apiRoute) {
        var request = $http({
            method: "delete",
            url: apiRoute
        });
        return request;
    }
    this.getAll = function (apiRoute) {

        urlGet = apiRoute;
        return $http.get(urlGet);
    }

    this.getbyID = function (apiRoute, ContactID) {

        urlGet = apiRoute + '/' + ContactID;
        return $http.get(urlGet);
    }
});



