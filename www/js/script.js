$(function() {	
	 $.ajax({
         type: "GET",
         url: 'xml/deutsch.xml',
         dataType: "xml",
         success: function(xml) {
        	 var i = 1;
         	$(xml).find('sura').each(function(){
	 			$("#select-choice-a").append("<option value='"+$(this).attr("name")+"'>"+ $(this).find('name').text() +"</option>");
	 			i++;
	 		});
         	$("#select-choice-a").selectmenu("refresh");
         },error: function(xhr, status, error){
             console.log(error);
             console.log(status);
         }
     });	 
});