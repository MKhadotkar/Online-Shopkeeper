app.controller("skcloginontroller",function($scope,$http,$location){
  console.log("skcloginontroller");
        $scope.submit_registation = function()
        {
          $scope.name_msg = ""
          $scope.passwd_msg = ""
          $scope.last_name = ""
          $scope.shop_name = ""
          $scope.email = ""
          $scope.msg = ""
        console.log("++",$scope.sk.password);

        if ($scope.sk.password === $scope.sk.reenter_password) {
          $scope.passwd_msg = ""

        }else {
          $scope.passwd_msg = "Re-enter password"
        }
        if ($scope.sk.first_name === undefined || $scope.sk.first_name === "") {
          $scope.name_msg = " Enter the first name"
        }else {
          $scope.name_msg = ""

        }

        if ($scope.sk.last_name === undefined || $scope.sk.last_name === "") {
          $scope.last_name = " Enter the last name"
        }else {
          $scope.last_name = ""

        }

        if ($scope.sk.shop_name === undefined || $scope.sk.shop_name === "") {
          $scope.shop_name = " Enter the address"
        }else {
          $scope.shop_name = ""
        }

        if ($scope.sk.email === undefined || $scope.sk.email === "") {
          $scope.email = " Enter the email"
        }else {
          $scope.email = ""
        }

          if ($scope.passwd_msg === "" && $scope.name_msg === "" && $scope.last_name === "" && $scope.shop_name === "" && $scope.email === "") {
            $http({
              url : urls+"skregistration",
              method : "POST",
              headers : {"content-type":"application/json"},
              data : $scope.sk
            }).then(function(response){
              console.log("response",response)
              if(response.data.status === false)
              {
                $scope.msg = "Email already exist"

              }else {
                $scope.msg = "Registration successfully"
                $scope.sk = undefined
              }

            },function(error){
              console.log("error",error);

            })
          }
        }

          $scope.msg1 = ""
          $scope.msg2 = ""
          $scope.login_data = function()
          {
            console.log("---",$scope.login);
            $http({
              url : urls+"userlogin",
              method : "POST",
              headers : {"content-type":"application/json"},
              data : $scope.login
            }).then(function(response){
              console.log("response",response.data.data)
              if(response.data.status === false)
              {
                $scope.msg1 = "invalid UserName and password"

              }else {
                if (response.data.data === "shopkeeper") {
                  // $scope.msg1 = "Login successfully"
                  window.location.href = "#/" // same page
                // window.open("https://www.google.com") //new tab
                  // window.location.href = "https://www.google.com"
                }
                else{
                  $scope.msg2 = "you are customer"
                }

              }

            },function(error){
              console.log("error",error);

            })

          }

})
