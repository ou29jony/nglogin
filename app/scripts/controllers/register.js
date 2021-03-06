'use strict';
var app = angular
.module('ngloginApp');

app.controller('RegisterCtrl', ['$rootScope', '$scope', '$log', '$route',
	'$location', 'APIConfig', '$http', 'APIService','$timeout','$window','APIFactory',
	function ($rootScope, $scope, $log, $route,
		$location, APIConfig, $http, APIService,$timeout,$window,APIFactory) {

		var api = APIService;
		var fac = APIFactory;

		$scope.account = APIConfig.account;
		$scope.message = "";
		$scope.hasError = false;
		$scope.clicked = false;
		$scope.mailstoneurl = APIConfig.mailstone;
		$scope.userid = fac.getCookie('userid');

		var clickedcount = 0;

		$scope.initRegister = function () {

      $scope.inviteduser = {
        mandatid      : $location.search().mandatid,
        company_name  : $location.search().company_name,
        roleid        : $location.search().roleid,
        rolename      : $location.search().rolename,
        street : $location.search().street==null ? undefined:$location.search().street,
        ust_id : $location.search().ust_id,
        ort : $location.search().ort,
        plz : $location.search().plz,
        product : $location.search().product
      };

      $scope.account.company_name= $scope.inviteduser.company_name;
      $scope.account.street= $scope.inviteduser.street;
      $scope.account.ust_id= $scope.inviteduser.ust_id;
      $scope.account.ort= $scope.inviteduser.ort;
      $scope.account.plz= $scope.inviteduser.plz;
    };

		$scope.saveUser = function(isValid){

			$scope.clicked  = true;
			$scope.account.active =0;

			if(isValid && clickedcount ===0){

				clickedcount++;

				if($scope.account.password1 === $scope.account.password2){

					$scope.account.password = $scope.account.password1;

					if(!$scope.checkEmail($scope.account.username)){

						APIConfig.account = $scope.account;

						api.service('user').data($scope.account).save().then(function(savedUser){

               var data =	{};
              data.sendmail = true;

              data.userid = savedUser.id;

              var mandatdata = {'userid': data.userid};

              if($location.search().mandatid){
                mandatdata.mandatid = $location.search().mandatid;
              }
              api.service('mandat').data(mandatdata).save().then(function(result){

                if(!$location.search().mandatid){
                  api.service('mandat').id(result.id).data({'mandatid': result.id}).update().then(function(result){

                  });
                }
              });

              var roleid = 6;
              if($scope.inviteduser.roleid){
                roleid=$scope.inviteduser.roleid;
              }
              api.service('user_role').data({'user_id': data.userid,'role_id': roleid}).save().then(function(result){

              });
              api.service('usersetting').filter(data).get().then(function() {
                data = {};

                $location.path('register');

              },function (error) {
                clickedcount = 0;
                if(error.status ===-1){

                  $location.path('register');
                  $scope.hasError = false;

                }
              });

							clickedcount = 0;

						},function(error){


							if(error.status === 422){

								$scope.hasError = true;
								$scope.message = "Diese E-Mail-Adresse existiert schon";
							}
						});

					}else{
						clickedcount = 0;
						$scope.hasError = true;
						$scope.message = "Bitte geben Sie Ihre Unternehmens-E-Mail-Adresse an. E-Mail-Adressen von Massenmail-Providern wie beispielsweise gmx, icloud oder gmail können leider nicht akzeptiert werden.";

					}

				}else{

					clickedcount = 0;
					$scope.hasError = true;
					$scope.message = "Die Passwörter Stimmen nicht überein";
				}
			}
		};

		$scope.initUser = function(){

			if($scope.userid){

					api.service('user').id($scope.userid).get().then(function(user){

						$scope.account  = user;
					},function(){
						$location.path('/');
					});

			}else{
				$location.path('/');
			}

		};

		$scope.updateUser = function(isValid){

			$scope.clicked = true;

			if(isValid){


				var data = {
					'department': $scope.account.department,
					'ust_id' :$scope.account.ust_id,
					'street' :$scope.account.street,
					'plz' :$scope.account.plz,
					'ort' :$scope.account.ort,
					'phone' :$scope.account.phone
				};

				api.service('user').id($scope.userid).data(data).update().then(

					function(){

						$window.location.href = fac.getCookie('url');

					},function(){

					});

			}else{

			}
			 //$window.location.href = APIConfig.mailston;
			};
			$scope.checkEmail = function(){

				var result = false;

				var email =  $scope.account.username;

				for (var i=0; email !== undefined &&  i< APIConfig.b2c_emails.length; i++) {

					var em = APIConfig.b2c_emails[i];

					if(email.indexOf("@"+em+".")!==-1){
						result = true;
					}
				}

				return result;
			};

			$scope.goBackTime = function(){

				$timeout(function(){
					$location.path('/');
				}, 7000);
			};

			$scope.goBack = function(){

				$window.history.back();

			};

			$scope.activate= function(){

					APIConfig.userid = $location.search().userid;
					APIConfig.code   = $location.search().hash;

					api.service('usersetting').id(APIConfig.userid).get().then(function(usersetting){

						if(usersetting.code === APIConfig.code){

							var data = {
								'value':'activate',
								'code' : APIConfig.code
							};

							api.service('usersetting').id(APIConfig.userid).data(data).update().then(function(){

								$location.path('activateok');

							},function(){

								$location.path('activateerror');
							});
						}
					},function(){

						$scope.hasError = true;
					});

			};
		}]);
