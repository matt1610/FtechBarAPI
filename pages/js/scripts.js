

var BarAdmin = angular.module('BarAdmin', [])

.controller('MainCtrl', function( $scope, API ){
	
	$scope.Bills = [];
	$scope.LoggedIn = false;
	$scope.ListBills = true;
	$scope.Loading = false;

	API.GetBills().then(function(response) {
		$scope.Bills = response.data;
	});

	$scope.LogIn = function() {
		$scope.Loading = true;
		API.Login($scope.LoginUser).then(function(response) {
			if (response.data.success) {
				$scope.LoggedIn = response.data.success;
				$scope.Loading = false;
			};
			
		});
	}

	$scope.AddItem = function() {
		$scope.Loading = true;
		API.AddItem($scope.NewItem).then(function(response) {
			alert(response.data.message);
			$scope.Loading = false;
			$scope.NewItem = {};
		});
	}

	$scope.AddEvent = function() {
		$scope.Loading = true;
		API.AddEvent($scope.AddEventUser).then(function(response) {
			alert(response.data.message);
			$scope.Loading = false;
			$scope.AddEventUser = {};
		});
	}

	$scope.GetTotal = function(bill) {
		var total = 0;
		for (var i = 0; i < bill.orders.length; i++) {
			total += parseFloat(bill.orders[i].price);
		};
		return total.toFixed(2);
	}

	$scope.SendBill = function(user) {
		$scope.Loading = true;
		API.SendBarBillViaEmail(user).then(function(response) {
			console.log(response);
			$scope.Loading = false;
			if (response.data.success) {
				alert('Email Sent');
			};
		});
	}

	$scope.SendToAll = function() {
		if (confirm('Send everyone their bar bills?')) {
			$scope.Loading = true;
			for (var i = 0; i < $scope.Bills.length; i++) {
				API.SendBarBillViaEmail($scope.Bills[i]).then(function(response) {
					console.log(response);
				});
			};
			$scope.Loading = false;
			alert('Done');
		};
	}






	$scope.tabs = [{
            title: 'Bills',
            name : 'bills'
        }, {
            title: 'Add Bar Menu Item',
            name : 'additems'
        }, {
            title: 'Add User/Event',
            name : 'addevents'
    }];

    $scope.currentTab = $scope.tabs[0].name;

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.name;
        console.log($scope.currentTab);
    }
    
    $scope.isActiveTab = function(tabname) {
        return tabname == $scope.currentTab;
    }

})

.controller('NewAdminCtrl', function($scope, API){
	
	$scope.CreateNewAdmin = function() {
		API.NewAdmin($scope.NewAdmin).then(function(response) {
			alert(response.data.message);
		});
	}

})

.factory('API', function($http, APIPath, Base64){
	return {
		GetBills : function() {
			return $http({
	          url : APIPath + 'getBills',
	          method : 'GET',
	          headers : {'Content-Type': 'application/json'}
	        });
		},
		NewAdmin : function(user) {
			return $http({
	          url : APIPath + 'newAdmin',
	          method : 'POST',
	          data : user,
	          headers : {'Content-Type': 'application/json'}
	        });
		},
		Login : function(user) {
			$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(user.username + ':' + user.password);
			return $http({
	          url : APIPath + 'loginAdmin',
	          method : 'POST',
	          headers : {'Content-Type': 'application/json'}
	        });
		},
		AddItem : function(item) {
			return $http({
	          url : APIPath + 'newItem',
	          method : 'POST',
	          data : item,
	          headers : {'Content-Type': 'application/json'}
	        });
		},
		AddEvent : function(event) {
			return $http({
	          url : APIPath + 'newEvent',
	          method : 'POST',
	          data : event,
	          headers : {'Content-Type': 'application/json'}
	        });
		},
		SendBarBillViaEmail : function(user) {
			$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode('mattstarkey' + ':' + 'element');
			return $http({
	          url : APIPath + 'sendMail',
	          method : 'POST',
	          data : user,
	          headers : {'Content-Type': 'application/json'}
	        });
		}
	};
})

.factory('APIPath', function(){
	// return 'http://localhost:5000/';
	return 'http://ftechbar.azurewebsites.net/';
})

.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
            'QRSTUVWXYZabcdef' +
            'ghijklmnopqrstuv' +
            'wxyz0123456789+/' +
            '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
});