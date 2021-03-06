// Eye-Tracker Project Web Platform
//
// Author: Jaesung Ryu
// Creation date: 2014/10/24
//
// © Team Confidence
//
// Modification history
// Version 	Modifier 	Date 		Change Reason
// 1.0.1 	Jaesung Ryu 2014/11/05 	Add sign up/contents/log out feature etc.
// 1.0.2	Jaesung Ryu 2014/11/16 	Add hardware purchase feature etc.
// 1.0.3	Jaesung Ryu	2014/12/02	Add contents detail feature and DB feature etc.
// 1.0.4	Jaesung Ryu	2014/12/07	Improve features and support.

var userInfoArray = {}; // user 정보를 담고있는 객체 
var isInitializeFinished = false;

/**
 * 최초 진입 부분 
 */
var init = function(){
    
	$("#loginBox").fadeIn(1200); // login box fade in
	
	initLoginFunctions();
	initSignupFunctions();
	
};

/**
 * Login 동작에 필요한 함수들 초기화 
 */
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
	
	/**
	 * 서버와 login 통신 처리 
	 */
	var doLoginProcess = function(){
		
		$("#mainPageTransparentLayer").show();
		
		var data = {
				"user_id": $("#loginBoxID").val(),
				"user_pw": $("#loginBoxPW").val()
		};
		
		/**
		 * login 서버에 요청 
		 */
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "php/login.php", //Relative or absolute path to response.php file
			data: data,
			success: function(response) {
				if(response.result == 'success'){
					console.log("login success");
					setContentsLists();
					
					userInfoArray.address = response.address;
                    userInfoArray.email = response.email;
                    userInfoArray.phonenumber = response.phonenumber;
                    userInfoArray.id = $("#loginBoxID").val();
                    userInfoArray.pw = $("#loginBoxPW").val();
                    
					$("#headerSignUp").hide();
					$("#headerLogOut").show();
					$("#backgroundBlur").fadeOut(700, function() {});
					$("#loginBox").fadeOut(800, function() {  // login box fade out
						
						currentTabPage = "mainPageContentsMyLibrary";
                        $("#mainPageHeaderMyLibrary").css({"font-weight": "bold", "color": "#045FB4"});
                		$("#mainPageHeaderStore").css({"font-weight": "normal", "color": "#FFF"});
                		$("#mainPageHeaderHWPurchase").css({"font-weight": "normal", "color": "#FFF"});
						
						$("#mainPageSearchContainer").show();
						
						$("#mainPageContentsMyLibrary").show();
						$("#mainPageContentsStore").hide();
						$("#mainPageContentsHWPurchase").hide();
						
						$("#paymentBoxArea").hide();
						$("#descriptionBox").hide();
						$("#validPwBox").hide();
						
						$("#mainPageArea").fadeIn(300, function() {
							$("#mainPageTransparentLayer").hide();
						});
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
		 * login session 끊어줌  
		 */
		
		if($("#loginBoxKeepLoginCheckImg").attr("class") == "loginCheckImgUnchecked"){
			$("#loginBoxID").val("");
			$("#loginBoxPW").val("");
		}
        $.ajax({
            url:"php/logout.php",
            success: function(){
                userInfoArray.address = '';
                userInfoArray.email = '';
                userInfoArray.phonenumber = '';
                $("#headerLogOut").hide();
                $("#headerSignUp").show();
                $("#mainPageTransparentLayer").hide();
                $("#validPwBox").hide();
                $("#contentsPurchasePopup").hide();
                $("#backgroundBlur").fadeIn(300, function() {});
                $("#mainPageArea").fadeOut(300, function() {
                    $("#loginBox").fadeIn(800, function() {});
                });
            }
        });

	});
};

/**
 * signup 동작에 필요한 함수들 초기화 
 */
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
	
	/**
	 * signup 버튼 클릭 이벤트 
	 */
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

var myLibraryList = {};
var contentsList = {};
/**
 * 서버에서 contents 항목 받아오는 부분  
 */
var setContentsLists = function(){
	
	myLibraryList = {};
	contentsList = {};
	
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "php/get_buy_contents.php", //Relative or absolute path to response.php file
		success: function(response) {
			myLibraryList = response;
			
			$("#mainPageContentsMyLibrary").empty();
			$.each(myLibraryList, function(i, v){
		        
				var icon = $("<img/>", {"class":"mainPageContentsItemIcon", "src":v.thumbnail}); //content image
		        var title = $("<div/>", {"class": "mainPageContentsItemTitle"}).text(v.contentName); //content title

		        var item = $("<div/>", {"class": "mainPageContentsItems", "id":"contents_my_library_"+i});
		        item.append(icon);
		        item.append(title);
		        
		        item.click(function(){
		        	/**
			         * 이곳의 item 은 구매한 contents 항목들임.
			         * 클릭 시 플레이 가능하게 처리  
			         */
		        	playContents(v);
		        });
		        
		        $("#mainPageContentsMyLibrary").append(item);
		    });
			
			if(!isInitializeFinished) {
				initContentsFunctions(); //My Library list 가 모두 받아지고 나서 필요 함수들 초기화
				isInitializeFinished = true;
			}
			 
		},
		error: function(response){
			console.log("get buy contents error");
		}
	});
	
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "php/get_all_contents.php", //Relative or absolute path to response.php file
		success: function(response) {
            contentsList = response;
		},
		error: function(response){
			console.log("get contents error");
		}
	});
	
};

var currentTabPage = "mainPageContentsMyLibrary"; // 처음 로그인 시 My Library 탭에 포커싱 되므로 My Library 로 초기화 

/**
 * contents 및 my library 부분에서 필요한 함수들 초기화 
 */
var initContentsFunctions = function(){
	
	/**
	 * 상단 탭 버튼 누를 시 div 교체 
	 */
	$(".mainPageHeaders").click(function(){
		
		$("#mainPageHeaderMyLibrary").css({"font-weight": "normal", "color": "#FFF"});
		$("#mainPageHeaderStore").css({"font-weight": "normal", "color": "#FFF"});
		$("#mainPageHeaderHWPurchase").css({"font-weight": "normal", "color": "#FFF"});
		
		switch($(this).attr("id")){
		case "mainPageHeaderMyLibrary":
			currentTabPage = "mainPageContentsMyLibrary";
			$("#mainPageHeaderMyLibrary").css({"font-weight": "bold", "color": "#045FB4"});
			
			$("#mainPageSearchContainer").show();
			
			$("#mainPageContentsMyLibrary").show();
			$("#mainPageContentsStore").hide();
			$("#mainPageContentsHWPurchase").hide();
			
			$("#paymentBoxArea").hide();
			$("#descriptionBox").hide();
			$("#validPwBox").hide();
			$("#mainPageTransparentLayer").hide();
			
			$("#mainPageContentsMyLibrary").empty();
			$.each(myLibraryList, function(i, v){
		        
				var icon = $("<img/>", {"class":"mainPageContentsItemIcon", "src":v.thumbnail}); //content image
		        var title = $("<div/>", {"class": "mainPageContentsItemTitle"}).text(v.contentName); //content title

		        var item = $("<div/>", {"class": "mainPageContentsItems", "id":"contents_my_library_"+i});
		        item.append(icon);
		        item.append(title);
		        
		        item.click(function(){
		        	/**
			         * 이곳의 item 은 구매한 contents 항목들임.
			         * 클릭 시 플레이 가능하게 처리  
			         */
		        	playContents(v);
		        });
		        
		        $("#mainPageContentsMyLibrary").append(item);
		    });
			
			break;
		case "mainPageHeaderStore":
			currentTabPage = "mainPageContentsStore";
			$("#mainPageHeaderStore").css({"font-weight": "bold", "color": "#045FB4"});
			
			$("#mainPageSearchContainer").show();
			
			$("#mainPageContentsMyLibrary").hide();
			$("#mainPageContentsStore").show();
			$("#mainPageContentsHWPurchase").hide();
			
			$("#paymentBoxArea").hide();
			$("#descriptionBox").hide();
			$("#validPwBox").hide();
			$("#mainPageTransparentLayer").hide();
			
			$("#mainPageContentsStore").empty();
			$.each(contentsList, function(i, v){
		        
		        var icon = $("<img/>", {"class":"mainPageContentsItemIcon", "src":v.thumbnail}); //content image
		        var title = $("<div/>", {"class": "mainPageContentsItemTitle"}).text(v.contentName); //content title

		        var item = $("<div/>", {"class": "mainPageContentsItems", "id":"contents_my_library_"+i});
		        item.append(icon);
		        item.append(title);
		        
		        item.click(function(){
		        	/**
		        	 * 아이템 구매 세부 창 띄워줌 
		        	 */
		        	contentsBuyShow(v);
		        });
		        
		        $("#mainPageContentsStore").append(item);
		    });
			
			break;
		case "mainPageHeaderHWPurchase":
			currentTabPage = "mainPageContentsHWPurchase";
			$("#mainPageHeaderHWPurchase").css({"font-weight": "bold", "color": "#045FB4"});
			
			$("#mainPageSearchContainer").hide();
			
			$("#mainPageContentsMyLibrary").hide();
			$("#mainPageContentsStore").hide();
			$("#mainPageContentsHWPurchase").show();
			$("#mainPageTransparentLayer").hide();
			
			$("#backgroundBlur").fadeIn(1000,function(){});
			$("#descriptionBox").fadeIn(1000,function(){});
			$("#paymentBoxArea").hide();
			$("#validPwBox").hide();
			
			$("#payCheckOutBtn").text("Check Out 49,900 Won");
			$("#payCheckOutBtn").unbind("click");
			$("#payCheckOutBtn").click(function(){

		        var data = {
		            "purchaseType": "hardware"        // hardware or contents
		        };
		        
		        $.ajax({
		            type: "POST",
		            dataType: "json",
		            url: "./php/insert_buyTable.php",
		            data: data,
		            success: function(response) {
		                console.log(response.result);
		                if(response.result == 'success'){
		                    setContentsLists();
		                	$("#backgroundBlur").fadeOut(1000, function() {});
		            		$("#paymentBoxArea").fadeOut(1000,function() {
		            			alert("Purchase success!");
                                
                                currentTabPage = "mainPageContentsMyLibrary";
                                $("#mainPageHeaderMyLibrary").css({"font-weight": "bold", "color": "#045FB4"});
                        		$("#mainPageHeaderStore").css({"font-weight": "normal", "color": "#FFF"});
                        		$("#mainPageHeaderHWPurchase").css({"font-weight": "normal", "color": "#FFF"});
                        		
		            			$("#mainPageSearchContainer").show();

		            			$("#mainPageContentsMyLibrary").show();
		            			$("#mainPageContentsStore").hide();
		            			$("#mainPageContentsHWPurchase").hide();
		            			$("#contentsPurchasePopup").hide();
		            			$("#mainPageTransparentLayer").hide();

		            			$("#paymentBoxArea").hide();
		            			$("#descriptionBox").hide();
		            			$("#validPwBox").hide();

		            			$("#mainPageArea").fadeIn(300, function() {});
		            		});
		            		
		                }else{
		                    console.log("some thing wrong");
		                }
		            },
		            error: function(request,error) {
		                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		            }
		        });

			});
			break;
		}
		
		$("#mainPageContentsSearch").val("");
		$(".mainPageContentsItems").show();
		
	});
	
	userSettingsInit();
	contentsSearchInit();
	hardwarePurchaseInit();
};

/**
 * 구매한 컨텐츠에 대한 동작 
 */
var playContents = function(item){
		window.open(item.executeFile);
};

/**
 * contents 눌렀을 때 buy 확정 팝업 띄워줌 
 */
var contentsBuyShow = function(item){
	
	$("#mainPageTransparentLayer").show();
	
	$("#contentsPurchasePopupClose").unbind("click");
	$("#contentsPurchasePopupClose").click(function(){
		$("#contentsPurchasePopup").hide();
		$("#mainPageTransparentLayer").hide();
	});
	
	$("#contentsPurchasePopupIcon").attr("src", item.thumbnail);
	$("#contentsPurchasePopupTitle").text(item.contentName);
	if(item.price == 0){
		$("#contentsPurchasePopupPrice").text("Free").digits();
	} else{
		$("#contentsPurchasePopupPrice").text(item.price + " Won").digits();
	}
	$("#contentsPurchasePopupDesc").text(item.description);
	
	var isAlreadyHave = false;
	$.each(myLibraryList,function(i,v){
        if(item.cid == v.cid){
            isAlreadyHave = true;
            return false;
        }
    });
	
	// 이미 구입한 컨텐츠는 buy button 을 보여주지 말자 
	if(!isAlreadyHave){
		$("#contentsPurchasePopupBuyBtn").show();
		$("#contentsPurchasePopupBuyBtn").unbind("click");
		$("#contentsPurchasePopupBuyBtn").click(function(){
			
			$("#paymentInfoEmail").val(userInfoArray.email);
			$("#paymentInfoAddress").val(userInfoArray.address);
			$("#paymentInfoPhoneNum").val(userInfoArray.phonenumber);
			$("#paymentInfoCardNum").val("");
			$("#paymentInfoCVC").val("");
			
			var insertCallback = function(){
				
				var data = {
                    "purchaseType": "contents",        // hardware or contents
                    "contents": item.cid
                };
				
				$.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "./php/insert_buyTable.php",
                    data: data,
                    success: function(response) {
                        console.log(response.result);
                        if(response.result == 'success'){
                            setContentsLists();
                            $("#backgroundBlur").fadeOut(1000, function() {});
                            $("#paymentBoxArea").fadeOut(1000,function() {
                        		
                                alert("Purchase success!");
                                
                                currentTabPage = "mainPageContentsMyLibrary";
                                $("#mainPageHeaderMyLibrary").css({"font-weight": "bold", "color": "#045FB4"});
                        		$("#mainPageHeaderStore").css({"font-weight": "normal", "color": "#FFF"});
                        		$("#mainPageHeaderHWPurchase").css({"font-weight": "normal", "color": "#FFF"});
                        		
                                $("#mainPageSearchContainer").show();

                                $("#mainPageContentsMyLibrary").show();
                                $("#mainPageContentsStore").hide();
                                $("#mainPageContentsHWPurchase").hide();
                                $("#contentsPurchasePopup").hide();
                                $("#mainPageTransparentLayer").hide();

                                $("#paymentBoxArea").hide();
                                $("#descriptionBox").hide();
                                $("#validPwBox").hide();

                                $("#mainPageArea").fadeIn(300, function() {});
                            });

                        }else{
                            console.log("some thing wrong");
                        }
                    },
                    error: function(request,error) {
                        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
			};
			
			// 공짜앱은 pay 창 띄워줄 필요가 없음 
			if(item.price == 0){
				insertCallback();
			} else {
				$("#payCheckOutBtn").text("Check Out " + item.price + " Won").digits();
				$("#paymentBoxArea").fadeIn(1000,function(){
					$("#payCheckOutBtn").unbind("click");
		            $("#payCheckOutBtn").click(function(){
		                insertCallback();
		            });
		        });
			}
			
		});
	} else{
		$("#contentsPurchasePopupBuyBtn").hide();
	}
	
	$("#contentsPurchasePopup").show();
};

/**
 * 유저 정보 수정 부분에 필요한 함수들 초기화 
 */
var userSettingsInit = function(){
	
	/**
	 * header 쪽에 있는 setting 버튼 클릭 이벤트 
	 */
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
        if(userInfoArray.pw == validPw) {
        	
        	$("#mainPageTransparentLayer").show();
            $("#settingBoxID").val(userInfoArray.id);
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
//    		var settingBoxID = $("#settingBoxID").val();
        	var settingBoxPW = $("#settingBoxPW").val();
        	var settingBoxAddress = $("#settingBoxAddress").val();
        	var settingBoxEmail = $("#settingBoxEmail").val();
        	var settingBoxPhoneNum = $("#settingBoxPhoneNum").val();
        	
        	/**
        	 * 유저 정보 테이블에 업데이트 
        	 */
        	 var data = {
        	 	"type": "setInfo",
        	 	"settingBoxPW": settingBoxPW,
        	 	"settingBoxAddress": settingBoxAddress,
        	 	"settingBoxEmail": settingBoxEmail,
        	 	"settingBoxPhoneNum": settingBoxPhoneNum
        	 };

        	 $.ajax({
				type: "POST",
				dataType: "json",
				url: "php/userInfo.php", //Relative or absolute path to response.php file
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
    	$("#settingBoxID").val(userInfoArray.id);
    	$("#settingBoxPW").val("");
    	$("#settingBoxPWCheck").val("");
    	$("#settingBoxAddress").val(userInfoArray.address);
    	$("#settingBoxEmail").val(userInfoArray.email);
    	$("#settingBoxPhoneNum").val(userInfoArray.phonenumber);
    	$("#settingBoxPasswordCheckDesc").text("Checking your password validation").css("color", "black");

        userInfoInit();
    };
    
};

/**
 * 서버에서 유저 정보 받아와서 화면에 출력 
 */
var userInfoInit = function(){

    var data = {
        "type": "getInfo"
    };

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "./php/userInfo.php", //Relative or absolute path to response.php file
        data: data,
        success: function(response) {
            if(response.info_result == 'select'){
                var userpw = response.password;
                var useraddress = response.address;
                var useremail = response.email;
                var userphone = response.phonenumber;

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

};

/**
 * hardware 구입 과정에 필요한 함수들 초기화 
 */
var hardwarePurchaseInit = function(){
	$("#hwPurchaseButton").click(function(){
		$("#descriptionBox").fadeOut(500,function(){
			$("#paymentInfoEmail").val(userInfoArray.email);
			$("#paymentInfoAddress").val(userInfoArray.address);
			$("#paymentInfoPhoneNum").val(userInfoArray.phonenumber);
			$("#paymentInfoCardNum").val("");
			$("#paymentInfoCVC").val("");
			$("#paymentBoxArea").fadeIn(1000,function(){});
		});
	});

	$("#paymentBoxCloseBtn").click(function(){
		$("#paymentBoxArea").fadeOut(0,function(){
			$("#descriptionBox").fadeIn(1000,function(){});
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

//세 자리마다 comma 추가
$.fn.digits = function(){ 
	return this.each(function(){ 
		$(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
	});
};