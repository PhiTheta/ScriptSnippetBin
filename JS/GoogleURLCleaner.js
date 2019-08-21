
var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
}
  
cleanUrl = function() {

    var str = document.getElementById("url-input").value;
	str = str.replace(/.*?[&?]url=/i, "");
	str = str.replace(/&.*/, "");
	str = decodeURIComponent(str);

    var escapedStr = escapeHtml(str);
    
    var httpFtpPattern=new RegExp("^(http:\/\/|https:\/\/|ftp:\/\/).*$");
    var disallowedCharPattern = new RegExp('[<>"]');
    
    if (httpFtpPattern.test(str) && !disallowedCharPattern.test(str)) {
        document.getElementById("clean-link").setAttribute("href", str);
        document.getElementById("clean-link").innerHTML=escapedStr;
        document.getElementById("message-span").innerHTML="";
        document.getElementById("hidden-well").style.visibility="visible"
    } else {
        document.getElementById("clean-link").setAttribute("href", "");
        document.getElementById("clean-link").innerHTML="";
        document.getElementById("message-span").innerHTML="Sorry, couldn't extract the proper link.";
        document.getElementById("hidden-well").style.visibility="visible"    
    }
}

// Create an HTML Button element and add onclick="cleanUrl()" 
// Create an HTML an anchor tag with id='clean-link' and a span element with id='message-span' and an HTML input with id="url-input"
// User enters an url copied from Google into the input box and presses a button and "cleanUrl()" method will be called, cleaned url will be shown in a span element