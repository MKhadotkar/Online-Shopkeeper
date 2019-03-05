app.controller("custlogin_contoller",function($scope,$http){
  console.log("custlogin_contoller");


  $scope.submit_registation = function()
  {
    $scope.name_msg = ""
    $scope.passwd_msg = ""
    $scope.last_name = ""
    $scope.address = ""
    $scope.email = ""
    $scope.msg = ""
  console.log("++",$scope.customer.password);

  if ($scope.customer.password === $scope.customer.reenter_password) {
    $scope.passwd_msg = ""

  }else {
    $scope.passwd_msg = "Re-enter password"
  }


  if ($scope.customer.first_name === undefined || $scope.customer.first_name === "") {
    $scope.name_msg = " Enter the first name"
  }else {
    $scope.name_msg = ""

  }

  if ($scope.customer.last_name === undefined || $scope.customer.last_name === "") {
    $scope.last_name = " Enter the last name"
  }else {
    $scope.last_name = ""

  }

  if ($scope.customer.address === undefined || $scope.customer.address === "") {
    $scope.address = " Enter the address"
  }else {
    $scope.address = ""
  }

  if ($scope.customer.email === undefined || $scope.customer.email === "") {
    $scope.email = " Enter the email"
  }else {
    $scope.email = ""
  }

    if ($scope.passwd_msg === "" && $scope.name_msg === "" && $scope.last_name === "" && $scope.address === "" && $scope.email === "") {
      $http({
        url : urls+"custregistration",
        method : "POST",
        headers : {"content-type":"application/json"},
        data : $scope.customer
      }).then(function(response){
        console.log("response",response)
        if(response.data.status === false)
        {
          $scope.msg = "Email already exist"

        }else {
          $scope.msg = "Registration successfully"
          $scope.customer = undefined
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
        if (response.data.data === "customer") {
          // $scope.msg1 = "Login successfully"
          window.location.href = "http://localhost:3333/cart/cart.html" // same page
        // window.open("https://www.google.com") //new tab
          // window.location.href = "https://www.google.com"

        }else {
          $scope.msg2 ="you are shopkeeper"
        }
      }

    },function(error){
      console.log("error",error);

    })

  }


})
