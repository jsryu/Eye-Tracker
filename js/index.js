/**
 * TODO
 * 전역변수로 두지 말고, DB에서 가져오는 형태로 변경해야함 test
 */
var tempGlobalID = "";
var tempGlobalPW = "";

var init = function(){
    
	$("#loginBox").fadeIn(1200); // login box fade in
	
	initLoginFunctions();
	initSignupFunctions();
	initContentsFunctions();
	
	$("#footerSearchMyInfo").click(function(){
		console.log("click Find your ID/PW");
	});
	
	$("#footerPrivacy").click(function(){
		console.log("click privacy");
	});
	
};

var initLoginFunctions = function(){
	
	/**
	 * enter 입력 시 login 처리 
	 */
	$("#loginBoxPW").keypress(function(e) {
		if(e.keyCode == 13 || e.which == 13){
			doLoginProcess();
		}
	});
	
	/**
	 * login 버튼 click 이벤트 
	 */
	$("#loginBoxEnter").click(function(){
		doLoginProcess();
	});
	
	var doLoginProcess = function(){
		tempGlobalID = $("#loginBoxID").val();
		tempGlobalPW = $("#loginBoxPW").val();
		
		var data = {
				"user_id": tempGlobalID,
				"user_pw": tempGlobalPW
		};
		
		/**
		 * Signup 서버에 요청 
		 */
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "php/login.php", //Relative or absolute path to response.php file
			data: data,
			success: function(response) {
				if(response.result == 'success'){
					console.log("login success");
					
					$("#headerSignUp").hide();
					$("#headerLogOut").show();
					$("#backgroundBlur").fadeOut(700, function() {});
					$("#loginBox").fadeOut(800, function() {  // login box fade out
						
						currentTabPage = "mainPageContentsMyLibrary";
						$("#mainPageSearchContainer").show();
						
						$("#mainPageContentsMyLibrary").show();
						$("#mainPageContentsStore").hide();
						$("#mainPageContentsHWPurchase").hide();
						
						$("#paymentBox").hide();
						$("#descriptionBox").hide();
						$("#validPwBox").hide();
						
						$("#mainPageArea").fadeIn(300, function() {});
					});
					
				} else {
					alert(response.desc);
				}
			},
			error: function(response){
				alert("login error");
			}
		});
	};
	
	$("#loginBoxKeepLoginCheckImg").click(function(){
		var className = $(this).attr("class");
		if(className == "loginCheckImgUnchecked"){
			$(this).attr("class", "loginCheckImgChecked");
		} else {
			$(this).attr("class", "loginCheckImgUnchecked");
		}
	});
	
	$("#headerLogOut").click(function(){
		/**
		 * TODO
		 * login session 끊어주는 작업 필요 
		 */
		
		if($("#loginBoxKeepLoginCheckImg").attr("class") == "loginCheckImgUnchecked"){
			$("#loginBoxID").val("");
			$("#loginBoxPW").val("");
		}
        $.ajax({
            url:"php/logout.php",
            success: function(){
                $("#headerLogOut").hide();
                $("#headerSignUp").show();
                $("#mainPageTransparentLayer").hide();
                $("#validPwBox").hide();
                $("#backgroundBlur").fadeIn(300, function() {});
                $("#mainPageArea").fadeOut(300, function() {
                    $("#loginBox").fadeIn(800, function() {});
                });
            }
        });

	});
};

var initSignupFunctions = function(){
	/**
	 * signup 버튼 click 이벤트
	 */
	$("#headerSignUp").click(function(){
		$("#loginBox").hide();
		$("#loginBoxID").val("");
		$("#loginBoxPW").val("");
		
		$("#signupBox").fadeIn(500);
	});
	
	var isIDCheckSuccess = false;
	$("#signupBoxIDCheck").click(function(){
		var signupID = $("#signupBoxID").val();
		//var signupID = "checkID";
		var data = {
				"type": "checkID",
				"signupBoxID": signupID
		};
		
		/**
		 * 동일한 ID 체크 관련 서버에 요청 
		 */
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "php/signup.php", //Relative or absolute path to response.php file
			data: data,
			success: function(response) {
				if(response.isExist == 'false'){
					alert("You can use this ID.");
					isIDCheckSuccess = true;
				} else {
					alert("There exist same ID. Select other one.");
					isIDCheckSuccess = false;
				}
			},
			error: function(response){
				console.log("check ID error");
				isIDCheckSuccess = false;
			}
		});
	});
	
	var isSignupPasswordMatch = false;
	/**
	 * signup password check handler
	 */
	$("#signupBoxPWCheck").keyup(function(e) {
		var tempPW = $("#signupBoxPW").val();
		var searchValue = this.value;
		
		if(tempPW == searchValue){
			$("#signupBoxPasswordCheckDesc").text("Valid password").css("color", "green");
			isSignupPasswordMatch = true;
		} else{
			$("#signupBoxPasswordCheckDesc").text("Invalid password. Check again.").css("color", "red");
			isSignupPasswordMatch = false;
		}
	});
	
	$("#signupBoxSubmit").click(function(){
		
		if(isIDCheckSuccess && isSignupPasswordMatch){
		
			var signupID = $("#signupBoxID").val();
			var signupPW = $("#signupBoxPW").val();
			var signupAddress = $("#signupBoxAddress").val();
			var signupPhoneNumber = $("#signupBoxPhoneNumber").val();
			var signupEmail = $("#signupBoxEmail").val();
			
			var data = {
					"type": "signup",
					"signupBoxID": signupID,
					"signupBoxPW": signupPW,
					"signupBoxAddress": signupAddress,
					"signupBoxPhoneNumber": signupPhoneNumber,
					"signupBoxEmail": signupEmail
			};
    		
			/**
			 * Signup 서버에 요청 
			 */
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "php/signup.php", //Relative or absolute path to response.php file
				data: data,
				success: function(response) {
					if(response.result == 'success'){
						alert("signup success");
						$("#signupBox").hide();
						$("#loginBox").fadeIn(500);
					} else {
						alert("signup fail");
					}
				},
				error: function(response){
					console.log("signup error");
				}
			});

		} else{
			alert("Check your typed information again.");
		}
		
	});
	
	$("#signupBoxCloseBtn").click(function(){
		$("#signupBox").hide();
		$("#loginBox").fadeIn(500);
	});
};

var currentTabPage = "mainPageContentsMyLibrary"; // 처음 로그인 시 My Library 탭에 포커싱 되므로 My Library 로 초기화 

var initContentsFunctions = function(){
	/**
	 * 상단 탭 버튼 누를 시 div 교체 
	 */
	$(".mainPageHeaders").click(function(){
		
		switch($(this).attr("id")){
		case "mainPageHeaderMyLibrary":
			currentTabPage = "mainPageContentsMyLibrary";
			$("#mainPageSearchContainer").show();
			
			$("#mainPageContentsMyLibrary").show();
			$("#mainPageContentsStore").hide();
			$("#mainPageContentsHWPurchase").hide();
			
			$("#paymentBox").hide();
			$("#descriptionBox").hide();
			$("#validPwBox").hide();
			break;
		case "mainPageHeaderStore":
			currentTabPage = "mainPageContentsStore";
			$("#mainPageSearchContainer").show();
			
			$("#mainPageContentsMyLibrary").hide();
			$("#mainPageContentsStore").show();
			$("#mainPageContentsHWPurchase").hide();
			
			$("#paymentBox").hide();
			$("#descriptionBox").hide();
			$("#validPwBox").hide();
			break;
		case "mainPageHeaderHWPurchase":
			currentTabPage = "mainPageContentsHWPurchase";
			$("#mainPageSearchContainer").hide();
			
			$("#mainPageContentsMyLibrary").hide();
			$("#mainPageContentsStore").hide();
			$("#mainPageContentsHWPurchase").show();
			
			$("#backgroundBlur").fadeIn(1000,function(){});
			$("#descriptionBox").fadeIn(1000,function(){});
			$("#paymentBox").hide();
			$("#validPwBox").hide();
			break;
		}
		
		$("#mainPageContentsSearch").val("");
		$(".mainPageContentsItems").show();
		
	});
	
	/**
	 * 콘텐츠 클릭 시 이벤트 
	 */
	$(".mainPageContentsItems").click(function(){
		var item = $(this);
		console.log(item.children()[1].textContent + " clicked.");
	});
	

	userSettingsInit();
	contentsSearchInit();
	hardwarePurchaseInit();
};

var userSettingsInit = function(){
	
	$("#mainPageHeaderSettings").click(function(){
		$("#mainPageTransparentLayer").show();
		
		$("#validPwBoxCloseBtn").unbind("click");
		$("#validPwBoxCloseBtn").click(function(){
			$("#validPwBox").hide();
			$("#mainPageTransparentLayer").hide();
		});
		
		$("#validPWBoxPassword").val("");
		$("#validPwBox").show();
		
	});
	
	$("#validPWBoxPassword").keypress(function(e) {
		if(e.keyCode == 13 || e.which == 13){
			doValidatePasswordProcess();
		}
	});
	
    $("#validBoxEnter").click(function(){
    	doValidatePasswordProcess();  	
    });

    var doValidatePasswordProcess = function(){
  
    	var validPw = $("#validPWBoxPassword").val();
        if(tempGlobalPW == validPw) {
        	
        	$("#mainPageTransparentLayer").show();
            $("#settingBoxID").val(tempGlobalID);
            $("#validPwBox").hide();
            
            $("#infoSettingBoxCloseBtn").unbind("click");
    		$("#infoSettingBoxCloseBtn").click(function(){
    			$("#mainPageTransparentLayer").hide();
    			$("#infoSettingBox").hide();
    		});

            initializeSettingTextBox();
            $("#infoSettingBox").show();

        } else {
            alert("You input the wrong password!");
        }
    };
   
    var isSettingPasswordMatch = false;
	/**
	 * setting password check handler
	 */
	$("#settingBoxPWCheck").keyup(function(e) {
		var tempPW = $("#settingBoxPW").val();
		var searchValue = this.value;
		
		if(tempPW == searchValue){
			$("#settingBoxPasswordCheckDesc").text("Valid password").css("color", "green");
			isSettingPasswordMatch = true;
		} else{
			$("#settingBoxPasswordCheckDesc").text("Invalid password. Check again.").css("color", "red");
			isSettingPasswordMatch = false;
		}
	});
    
    $("#settingBoxConfirmBtn").click(function(){
    	
    	if(isSettingPasswordMatch){
    		var settingBoxID = $("#settingBoxID").val();
        	var settingBoxPW = $("#settingBoxPW").val();
        	var settingBoxAddress = $("#settingBoxAddress").val();
        	var settingBoxEmail = $("#settingBoxEmail").val();
        	var settingBoxPhoneNum = $("#settingBoxPhoneNum").val();
        	
        	/**
        	 * TODO
        	 * 유저 정보 테이블에 업데이트 필요 
        	 */
        	 var data = {
        	 	"type": "setinfo",
        	 	"settingBoxPW": settingBoxPW,
        	 	"settingBoxAddress": settingBoxAddress,
        	 	"settingBoxEmail": settingBoxEmail,
        	 	"settingBoxPhoneNum": settingBoxPhoneNum
        	 }

        	 $.ajax({
				type: "POST",
				dataType: "json",
				url: "php/userinfo.php", //Relative or absolute path to response.php file
				data: data,
				success: function(response) {
					if(response.info_result == 'update'){
						$("#mainPageTransparentLayer").hide();
        				$("#infoSettingBox").fadeOut(700, function(){
        					initializeSettingTextBox();
        				});
					} else {
						alert("update fail");
					}
				},
				error: function(response){
					console.log("user info update error");
				}
			});

    	} else {
    		alert("Check your typed information again.");
    	}
    	
    });
    
    var initializeSettingTextBox = function(){
    	$("#settingBoxID").val("");
    	$("#settingBoxPW").val("");
    	$("#settingBoxPWCheck").val("");
    	$("#settingBoxAddress").val("");
    	$("#settingBoxEmail").val("");
    	$("#settingBoxPhoneNum").val("");
    	$("#settingBoxPasswordCheckDesc").text("Checking your password validation").css("color", "black");

        userInfoInit();
    };
    
};

var userInfoInit = function(){

    var data = {
        "type": "getinfo"
    };

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "./php/userinfo.php", //Relative or absolute path to response.php file
        data: data,
        success: function(response) {
            if(response.info_result == 'select'){
                var userpw = response.password;
                var useraddress = response.address;
                var useremail = response.email;
                var userphone = response.phonenum;

                $("#settingBoxPW").val(userpw);
                $("#settingBoxAddress").val(useraddress);
                $("#settingBoxEmail").val(useremail);
                $("#settingBoxPhoneNum").val(userphone);
            }else{
                console.log("some thing wrong");
            }
        },
        error: function(response) {
            console.log("why error..");
        }
    });

}
var hardwarePurchaseInit = function(){
	$("#hwPurchaseButton").click(function(){
		$("#descriptionBox").fadeOut(500,function(){
			$("#paymentInfoEmail").val("");
			$("#paymentInfoAddress").val("");
			$("#paymentInfoPhoneNum").val("");
			$("#paymentInfoCardNum").val("");
			$("#paymentInfoCVC").val("");
			$("#paymentBox").fadeIn(1000,function(){});
		});
	});

	$("#paymentBoxCloseBtn").click(function(){
		$("#paymentBox").fadeOut(500,function(){
			$("#descriptionBox").fadeIn(1000,function(){});
		});
	});
	
	$("#payCheckOutBtn").click(function(){
		
		var paymentInfoEmail = $("#paymentInfoEmail").val();
		var paymentInfoAddress = $("#paymentInfoAddress").val();
		var paymentInfoPhoneNum = $("#paymentInfoPhoneNum").val();
		var paymentInfoCardNum = $("#paymentInfoCardNum").val();
		var paymentInfoCVC = $("#paymentInfoCVC").val();
		
		/**
		 * TODO
		 * payment 이력 테이블에 insert 
		 */
		
		$("#backgroundBlur").fadeOut(1000, function() {});
		$("#paymentBox").fadeOut(1000,function() {
			currentTabPage = "mainPageContentsMyLibrary";
			$("#mainPageSearchContainer").show();
			
			$("#mainPageContentsMyLibrary").show();
			$("#mainPageContentsStore").hide();
			$("#mainPageContentsHWPurchase").hide();
			
			$("#paymentBox").hide();
			$("#descriptionBox").hide();
			$("#validPwBox").hide();
			
			$("#mainPageArea").fadeIn(300, function() {});
		});
		
	});
};

/**
 * search box 에 대한 이벤트 핸들러들 모음 
 */
var contentsSearchInit = function(){
	
	$("#mainPageContentsSearch").val("");
	$("#mainPageContentsSearch").keyup(function(e) {
		
		var searchValue = this.value.toLowerCase();
		var itemList = $("#"+currentTabPage).children();
		
		$.each(itemList, function(i, v) {
			var curItemTitle = v.children[1].textContent;
			if(curItemTitle.toLowerCase().indexOf(searchValue) != -1){
				$(this).show();
			} else {
				$(this).hide();
			}
		});
		
	});
	
	/**
	 * search box 의 x 버튼을 눌렀을 때 이벤트 
	 */
	var onSearchHandler = function(){
		$(".mainPageContentsItems").show();
	};
	
	var searchBox = document.getElementById("mainPageContentsSearch");
	searchBox.removeEventListener("search", onSearchHandler, false);
	searchBox.addEventListener("search", onSearchHandler, false);
	
};