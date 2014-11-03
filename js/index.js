var init = function(){
	
	var id = "";
    var pw = "";
    
	$("#loginBox").fadeIn(1200, function() {}); // login box fade in
	
	/**
	 * login 버튼 click 이벤트 
	 */
	$("#loginBoxEnter").click(function(){
		id = $("#loginBoxID").val();
		pw = $("#loginBoxPW").val();
		
		if(id == "" || pw == ""){
			alert("test test test");
			alert("Type correctly.");
			return;
		}
		
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