$(document).ready(function () {

    $('#newitem').validate({
        errorPlacement: function(error,element) {
            return true;
        },
        rules: {
            brand: {
                required: true
            },
            name: {
                required: true,
            },
            price: {
                required: true,
                digits: true
            },
            imageURL:{
                required:true,
                url:true
            }
        },
        highlight:function(element){
            $(element).parent().find('span:first')
            .addClass('wrong')
            .removeClass('right');
            $(element).parent().find('span:first').empty().html("<i class='fa fa-exclamation'></i>");
        },
        unhighlight: function(element, errorClass, validClass) {
             $(element).parent().find('span:first')
            .removeClass('wrong')
            .addClass('right');
             $(element).parent().find('span:first').empty().html("<i class='fa fa-check'></i>");
        },
        success: function (element) {
            $(element).parent().find('span:first').removeClass('wrong').addClass('right');
            $(element).parent().find('span:first').empty().html("<i class='fa fa-check'></i>");
           // $(element).closest('.input-group-addon').removeClass('wrong').addClass('right');
       }
   });

});