var init = function(){
	
	/**
	 * TODO
	 * 전역변수로 두지 말고, DB에서 가져오는 형태로 변경해야함 
	 */
	var id = "";
    var pw = "";
    
	$("#loginBox").fadeIn(1200); // login box fade in
	
	initSignupFunctions();
	
	$("#headerLogOut").click(function(){
		/**
		 * TODO
		 * login session 끊어주는 작업 필요 
		 */
		
		if($("#loginBoxKeepLoginCheckImg").attr("class") == "loginCheckImgUnchecked"){
			$("#loginBoxID").val("");
			$("#loginBoxPW").val("");
		}
		
		$("#headerLogOut").hide();
		$("#headerSignUp").show();
		$("#backgroundBlur").fadeIn(300, function() {});
		$("#mainPageArea").fadeOut(300, function() {
			$("#loginBox").fadeIn(800, function() {});
		});
	});

	/**
	 * login 버튼 click 이벤트 
	 */
	$("#loginBoxEnter").click(function(){
		id = $("#loginBoxID").val();
		pw = $("#loginBoxPW").val();
		
		if(id == "" || pw == ""){
			alert("Type correctly.");
			return;
		}
		
		$("#headerSignUp").hide();
		$("#headerLogOut").show();
		$("#backgroundBlur").fadeOut(700, function() {});
		$("#loginBox").fadeOut(800, function() {  // login box fade out
			$("#mainPageArea").fadeIn(300, function() {});
		});
	});
	
	$("#loginBoxKeepLoginCheckImg").click(function(){
		var className = $(this).attr("class");
		if(className == "loginCheckImgUnchecked"){
			$(this).attr("class", "loginCheckImgChecked");
		} else {
			$(this).attr("class", "loginCheckImgUnchecked");
		}
	});
	
	$("#footerSearchMyInfo").click(function(){
		console.log("click Find your ID/PW");
	});
	
	$("#footerPrivacy").click(function(){
		console.log("click privacy");
	});
	
	/**
	 * 상단 탭 버튼 누를 시 div 교체 
	 */
	$(".mainPageHeaders").click(function(){
		switch($(this).attr("id")){
		case "mainPageHeaderMyLibrary":
			$("#mainPageContentsMyLibrary").show();
			$("#mainPageContentsStore").hide();
			$("#mainPageContentsHWPurchase").hide();
			
			$("#paymentBox").hide();
			$("#descriptionBox").hide();
			$("#validPwBox").hide();
			break;
		case "mainPageHeaderStore":
			$("#mainPageContentsMyLibrary").hide();
			$("#mainPageContentsStore").show();
			$("#mainPageContentsHWPurchase").hide();
			
			$("#paymentBox").hide();
			$("#descriptionBox").hide();
			$("#validPwBox").hide();
			break;
		case "mainPageHeaderHWPurchase":
			$("#mainPageContentsMyLibrary").hide();
			$("#mainPageContentsStore").hide();
			$("#mainPageContentsHWPurchase").show();
			
			$("#backgroundBlur").fadeIn(1000,function(){});
			$("#descriptionBox").fadeIn(1000,function(){});
			$("#paymentBox").hide();
			$("#validPwBox").hide();
			break;
		}
	});
	
	/**
	 * 콘텐츠 클릭 시 이벤트 
	 */
	$(".mainPageContentsItems").click(function(){
		var item = $(this);
		console.log(item.children()[1].textContent + " clicked.");
	});
	
    // valid the password
	$("#mainPageHeaderSettings").click(function(){
		$("#paymentBox").hide();
		$("#descriptionBox").hide();
		$("#backgroundBlur").show();
		$("#validPassword").val("");
		$("#validPwBox").fadeIn(1200, function() {});
	});
	
	/*
	 * 경필
	 */
    $("#validBoxEnter").click(function(){
        var validPw = $("#validPassword").val();
        if(pw == validPw)
        {
            $("#memberIdBox").val(id);
            $("#validPwBox").hide();
            $("#infoSettingBox").show();
        }else {
            alert("You input the wrong password!");
            $("#validPwBox").hide();
            $("#backgroundBlur").hide();
        }
    });
    /*
     * 경필
     */
    
    /*
     * 경미 
     */
	$("#hwPurchaseButton").click(function(){
		$("#descriptionBox").fadeOut(500,function(){
			$("#paymentBox").fadeIn(1000,function(){});
		});
	});

	$("#payCheckOut").click(function(){
		$("#paymentBox").fadeOut(1000,function(){});
		$("#backgroundBlur").fadeOut(1000, function() {});
	});
	/*
	 * 경미
	 */
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
	
	$("#signupBoxIDCheck").click(function(){
		alert("check ID");
		/**
		 * TODO
		 * DB를 검색해서 중복되는 아이디 있는지 체크 필요 
		 */
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
		
		if(isSignupPasswordMatch){
		
			var signupID = $("#signupBoxID").val();
			var signupPW = $("#signupBoxPW").val();
			var signupAddress = $("#signupBoxAddress").val();
			var signupPhoneNumber = $("#signupBoxPhoneNumber").val();
			var signupEmail = $("#signupBoxEmail").val();
			
			/**
			 * TODO
			 * 입력받은 정보를 서버에 전송 
			 */
			
		} else{
			alert("Check your typed information again.");
		}
		
	});
	$("#signupBoxCloseBtn").click(function(){
		$("#signupBox").hide();
		$("#loginBox").fadeIn(500);
	});
};