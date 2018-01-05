$(document).ready(function() { 


    $('#table-row-highlight tr').hover(function() {
            //Change cursor to pointing finger to make it clear to user that they can click anywhere on row
            $(this).css('cursor','pointer');
            //Highlight active row for user
        	$(this).addClass("row-orange");
        }, function() {
            //Remove active row highlight when row not hovered over
        	$(this).removeClass("row-orange");
    });

    $('.order_id').click(function() {
		// Some JS to call page from product table row
        window.location.href = "/orders/detail/?id=" + $(this).text();
        console.log(this);
    });


});

