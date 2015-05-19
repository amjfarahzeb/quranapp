var xmlDoc = 0;

$(function() {	
	$('#select-choice-b').selectmenu('disable');
	$("input[type='radio']").checkboxradio('disable');
	
	//get the xml document and fills the select menu with the surat names
	 $.ajax({
         type: "GET",
         url: 'xml/deutsch.xml',
         dataType: "xml",
         success: function(xml) {
        	 fillSuratMenu(xml);        	 
         },error: function(xhr, status, error){
             console.log(error);
             console.log(status);
         }
     });
	 
	 //listener on the select menu surat names
	 $('#select-choice-a').on('change', function () {
		 //get the sura name value and set the second select menu of verses 
		    var $this = $(this);
		    var selectedSura = $(xmlDoc).find('sura')[$this.val()];
         	var ayaat = $(selectedSura).find('ayaat')[0];         	
         	var ayat_no = $(ayaat).find('ayat').size();
         	
         	fillAyatMenu(ayat_no);
         	
         	//enable radio buttons and change color of ok button
         	$("input[type='radio']").checkboxradio('enable');
		});
	 
	 $('input:radio[name="radio-choice-h-2"]').change(
			    function(){
			        if (this.checked && this.value == 'off') {
			        	$('#select-choice-b').selectmenu('enable');
			        	$('#select-choice-b-button').addClass('blue');
			        	$("#select-choice-b").selectmenu("refresh");
			        } else if (this.checked && this.value == 'on') {
			        	$('#select-choice-b').selectmenu('disable');
			        	$("#select-choice-b").selectmenu("refresh");
			        }
			    });

	 $('#ok').click(function() {
	 	$("#selectedSura").empty();
	 	$("#sura_name").empty();

	 	var selected_sura_no = $('#select-choice-a').val();

    	//if the value is 0
	    if (selected_sura_no == '0'){
	    	selected_sura_no = 1;
	    }

    	var selectedSura = $(xmlDoc).find('sura')[selected_sura_no-1];
     	var ayaat = $(selectedSura).find('ayaat')[0];
     	var name = $(selectedSura).find('name')[0];

     	$("#sura_name").append(name);

     	for(i=1; i<=$(ayaat).find('ayat').size();i++){
     		var ayat = $(ayaat).find('ayat')[i-1];
     		$("#selectedSura").append("<div id='ayat"+i+"'><img src='img/quranverses/"+addZeros(selected_sura_no)+"-"+addZeros(i)+".png'>"
     			+"<p>"+$(ayat).find('ayat_no').text()+" - "+$(ayat).find('ayat_german').text()+"</p></div>");
     	}

     	//falls "ab Vers .." ausgewählt wurde
     	var anchor = $("#select-choice-b").val();
     	//TO DO
	});
});

function fillSuratMenu(xml){
	var i = 0;
	var sura_no = 0;
	 xmlDoc = xml;
	$(xml).find('sura').each(function(){
		sura_no = i+1;
		$("#select-choice-a").append("<option id='"+$(this).attr("name")+"' value='"+sura_no+"'>"+sura_no+": "+ $(this).find('name').text() +"</option>");
		i++;
	});        	
	$("#select-choice-a").selectmenu("refresh");
}

function fillAyatMenu(ayat_no){
	$("#select-choice-b").empty();
	for(i=1;i<=ayat_no;i++){
		$("#select-choice-b").append("<option id='vers"+i+"' value='"+i+"'>"+i+"</option>");
	}
	$("#select-choice-b").selectmenu("refresh");
}

function addZeros(num) {
  var zero = 3 - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}






















