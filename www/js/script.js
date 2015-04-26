$(function() {
	// Handler for .ready() called.
	$.ajax({
		type: "GET",
		url: "xml\deutsch.xml",
		dataType: "xml",
		success: function(xml) {
			$(xml).find('sura').each(function(){
				$("#select-choice-a").append(
						"<option>" + i+1	+ ":"
						+ $(this).find('name').text() + 
				"</option>");
			});
		}
	});

	

});