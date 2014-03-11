$(document).ready(function () {

    $('#newitem').validate({
        onkeyup: true,
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
        highlight: function (element) {
            alert("hi");
            $(element).parent().find('span:first').removeClass('right').addClass('wrong');
                    },
        success: function (element) {
            $(element).parent().find('span:first').removeClass('wrong').addClass('right');
            $(element).parent().find('span:first').empty().html("<i class='fa fa-check'></i>");
           // $(element).closest('.input-group-addon').removeClass('wrong').addClass('right');
        }
    });

});