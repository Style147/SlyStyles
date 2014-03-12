/*$(document).ready(function () {

   $('.likeable').click(function( event ) {*/
    
$(document).on("click", ".likeable", function(){
    event.preventDefault();
    $.ajax({ 
           context:this,
           url: '/likeitem',
           type: 'POST',
           cache: false, 
           data: { id:$(this).attr('id') }, 
           success: function(data){
            $(this).find('i:first').removeClass('unliked').addClass('liked');
            $(this).removeClass("likeable").addClass("unlikeable");
             $(this).closest('td').find('h4').text(parseInt($(this).closest('td').find('h4').text()) + 1);
            //$(element).parent().find('span:first').empty().html("<i class='fa fa-exclamation'></i>");
        }
     })
});

$(document).on("click", ".unlikeable", function(){
    event.preventDefault();
    $.ajax({ 
           context:this,
           url: '/dislikeitem',
           type: 'POST',
           cache: false, 
           data: { id:$(this).attr('id') }, 
           success: function(data){
            $(this).find('i:first').removeClass('liked').addClass('unliked');
            $(this).removeClass("unlikeable").addClass("likeable");
            $(this).closest('td').find('h4').text(parseInt($(this).closest('td').find('h4').text()) - 1);
            //$(element).parent().find('span:first').empty().html("<i class='fa fa-exclamation'></i>");
        }
     })
});

$(document).on("click", ".altlikeable", function(){
    event.preventDefault();
    $.ajax({ 
           context:this,
           url: '/likealtitem',
           type: 'POST',
           cache: false, 
           data: { id:$(this).attr('id') }, 
           success: function(data){
            $(this).find('i:first').removeClass('unliked').addClass('liked');
            $(this).removeClass("altlikeable").addClass("altunlikeable");
             $(this).closest('td').find('h4').text(parseInt($(this).closest('td').find('h4').text()) + 1);
            //$(element).parent().find('span:first').empty().html("<i class='fa fa-exclamation'></i>");
        }
     })
});

$(document).on("click", ".altunlikeable", function(){
    event.preventDefault();
    $.ajax({ 
           context:this,
           url: '/dislikealtitem',
           type: 'POST',
           cache: false, 
           data: { id:$(this).attr('id') }, 
           success: function(data){
            $(this).find('i:first').removeClass('liked').addClass('unliked');
            $(this).removeClass("altunlikeable").addClass("altlikeable");
            $(this).closest('td').find('h4').text(parseInt($(this).closest('td').find('h4').text()) - 1);
            //$(element).parent().find('span:first').empty().html("<i class='fa fa-exclamation'></i>");
        }
     })
});
    
    
 /*   });
   
    

});*/
