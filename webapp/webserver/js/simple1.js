var counter = 0;
var text = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

for( var i=0; i < 5; i++ )
	text += possible.charAt(Math.floor(Math.random() * possible.length));

function check(){
	
	var str = 0;
	var chkbox = document.getElementsByName('box');

	for(var i = 0; i < chkbox.length; i++){
		   if(chkbox[i].checked){
			   
		 str = str + 1000;	  
			  
		   }
		   
	   }
	   
   if (confirm("총 가격 " + str +"원 구매하시겠습니까?") == true){ 
	   for(var i = 0; i < chkbox.length; i++){
		   
		   var then,now; 
		    
		   then=new Date().getTime(); 

			  now=then; 

			  while((now-then)<1000){ 

			    now=new Date().getTime();  

			  } 	
			 
		   if(chkbox[i].checked){

			  var ip = "http://192.168.0.6:1235/images/download/" + userId + "?obj=";
			  var str1 = String(chkbox[i].value);
			  var split_str = str1.split('=');
	  
			  var filename = "lifeshotmaker" + text + (counter++).toString();      
			  ip = ip + split_str[1] + "&idx=" + String(filename);
			  
			  location.href = ip;

			
		   }		   
		   
	   }
	   alert("구매 완료 되었습니다.");
	   
	 }else{   //취소

	     return false;

	 }

}
