$(document).ready(function () {
    if ($('.input-block').length > 0){
        $('.input-block input, .input-block textarea').each(function () {
            if ($(this).val() != '') $(this).addClass('not-empty');
        });
        $('.input-block input, .input-block textarea').on('change keyup paste',function () {
            if ($(this).val() != '') {
                $(this).addClass('not-empty');
            } else {
                $(this).removeClass('not-empty')
            }
        });
    }

    $('input[data-group]').on('change keyup paste',function () {
        var group = $(this).data('group');
        if ($(this).val() != '') {
            $('input[data-group="'+group+'"]').not(this).prop('disabled',true);
        } else {
            $('input[data-group="'+group+'"]').not(this).prop('disabled',false);
        }
    });

    $('.input-block__password-toggle').click(function () {
        var input = $(this).siblings('input');
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
        } else {
            input.attr('type', 'password');
        }
    });



    $('.orders-table__row--item .checkbox input').on('change',function () {
        if ($(this).is(":checked")){
            $(this).parents('.orders-table__row--item').addClass('active');
        } else {
            $(this).parents('.orders-table__row--item').removeClass('active');
        }
    });

    $('.check-all input').on('change',function () {
        if ($(this).is(":checked")){
            $('.orders-table__row--item').addClass('active');
            $('.orders-table__row--item .checkbox input').prop( "checked", true );
        } else {
            $('.orders-table__row--item').removeClass('active');
            $('.orders-table__row--item .checkbox input').prop( "checked", false );
        }
    });

    $('.orders-table__row--item').click(function (event) {
        event.preventDefault();
        $(this).next().slideToggle('',function () {
            $(this).toggleClass('active');
        });
        $(this).find('.orders-table__toggle').toggleClass('active');
    });

    $('.topbar__menu').click(function () {
        $('.sidebar').addClass('active');
        $('.bgoverflow').addClass('active');
    });
    $('.bgoverflow').click(function () {
        $('.sidebar').removeClass('active');
        $('.bgoverflow').removeClass('active');
    });

    $('.mask-vin').inputmask({ "mask": "* ", "repeat": 20, "greedy": true,showMaskOnHover: false });
    $('.mask-rub').inputmask({ "mask": "9{1,10} руб.",  "greedy": false, "placeholder": "0",showMaskOnHover: false });
    $('.mask-phone').inputmask({ "mask": "+7 (999) 999-99-99",  "greedy": true,showMaskOnHover: false });


    function formatContact (contact) {
        if (!contact.id) {
            return contact.text;
        }
        var baseUrl = "/img";
        var $contact = $(
            '<span><img src="' + baseUrl + '/' + contact.element.dataset.img + '" class="img-contact" /> ' + contact.text + '</span>'
        );
        return $contact;
    };


    function formatSelection (contact) {
        if (!contact.id) {
            return contact.text;
        }

        var baseUrl = "/img";
        var $state = $(
            '<span><img class="img-contact" /> <span></span></span>'
        );

        $state.find("span").text(contact.text);
        $state.find("img").attr("src", baseUrl + "/" + contact.element.dataset.img);

        return $state;
    };

    $(".js-contact-select").select2({
        templateResult: formatContact,
        templateSelection: formatSelection,
        language: "ru"
    });

    $('.js-select').select2({
        language: "ru"
    });

    const inputHints = document.querySelectorAll('.input-block__hints button');

    if (inputHints.length) {
        inputHints.forEach(it => {
            it.addEventListener('click', (e) => {
                const input = it.parentElement.parentElement.querySelector('input');
                let mode = it.dataset.mode;
                if (mode != 'other'){
                    input.value = it.textContent;
                    input.classList.add('not-empty');
                } else {
                    input.focus();
                    let val = input.value;
                    input.value = '';
                    input.value = val;
                }
            })
        })
    }

    $('.js-bank-toggle').on('click',function (){
       event.preventDefault();
       $('.bank__content').slideToggle();
    });
});
