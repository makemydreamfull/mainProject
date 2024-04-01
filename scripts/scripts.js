const modal = $('.hidden');
const buttonModal = $('.hidden-button');
const header = $('.accaunt-input');
const button = $('.button');
const formInputs = $('.input');
const password = $('#password');
const repeat = $('#repeat');
$('.eyes').on('click', function () {
    if (password.attr('type') === 'password') {
        password.attr('type', 'text')
        $('.eyes').css('fill', '#0000005e')
    } else {
        password.attr('type', 'password')
        $('.eyes').css('fill', 'black')
    }
})
$('.eyes2').on('click', function () {
    if (repeat.attr('type') === 'password') {
        repeat.attr('type', 'text')
        $('.eyes2').css('fill', '#0000005e')
    } else {
        repeat.attr('type', 'password')
        $('.eyes2').css('fill', 'black')
    }
})
buttonModal.click(() => {
    modal.removeClass("open");
    loginBlock();
});
// function borderHandle(event) {
//     const input = event.target;
//     input.value !== '' ? input.css('border-color', 'greenyellow') : input.css('border-color', '')
// }
// formInputs.forEach((input) => {
//     input.on('input', borderHandle)
// })
const divCheckbox = $('.div-checkbox');
let checkValue = null;
divCheckbox.click(() => {
    $('#checkbox').is(':checked') ? checkValue = true : checkValue = false;
})

const form = $('form');

const errorInput = $('.error-input');
button.on('click', function (event) {
    event.preventDefault()
    let hasError = false;
    errorInput.hide()
    formInputs.css('border-bottom', '1px solid greenyellow')
    if (!formInputs.eq(0).val().match(/^([А-ЯA-z][а-яa-z]+\s*)+$/)) {
        formInputs.eq(0).next().show();
        formInputs.eq(0).css('border-bottom', '1px solid red')
        hasError = true;
    }
    if (localStorage.getItem('person') && JSON.parse(localStorage.getItem('person')).findIndex(item => item.username === formInputs.eq(1).val()) > -1) {
        errorInput.eq(1).text('Пользователь с таким именем уже существует')
        formInputs.eq(1).next().show();
        formInputs.eq(1).css('border-bottom', '1px solid red')
        hasError = true;
    }

    if (!formInputs.eq(1).val().match(/^(\w+\-*\s*)+$/)) {
        formInputs.eq(1).next().show()
        formInputs.eq(1).css('border-bottom', '1px solid red')
        hasError = true;
    }
    if (!formInputs.eq(2).val().match(/^[\w\-]+\@{1}[a-zA-Z_]+\.[a-zA-Z]{2,4}\s*$/)) {
        formInputs.eq(2).next().show()
        formInputs.eq(2).css('border-bottom', '1px solid red')
        hasError = true;
    }
    if (localStorage.getItem('person') && JSON.parse(localStorage.getItem('person')).findIndex(item => item.email === formInputs.eq(2).val()) > -1) {
        errorInput.eq(2).text('Такой email уже существует')
        formInputs.eq(2).next().show();
        formInputs.eq(2).css('border-bottom', '1px solid red')
        hasError = true;
    }
    //Можешь объяснить строчку ниже, как она работает?
    if (!formInputs.eq(3).val().match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\-\_\&\$\@]).{8,})/)) {
        formInputs.eq(3).next().show()
        formInputs.eq(3).css('border-bottom', '1px solid red')
        hasError = true;
        // /^([a-zA-Z]+[A-Za-z]+\d+[\-\_\&\$\@])+\w*$/ это моя регулярка
    }
    if (!formInputs.eq(4).val().match(/^(\w+[\-\_\&\$\@])+\w*$/)) {
        formInputs.eq(4).next().show()
        formInputs.eq(4).css('border-bottom', '1px solid red')
        hasError = true;
    }
    if (formInputs.eq(3).val() !== formInputs.eq(4).val() && formInputs.eq(3).val() !== '') {
        formInputs.eq(4).css('border-bottom', '1px solid red')
        formInputs.eq(4).next().text('Неправильно набранный пароль').show()
        hasError = true;
    }
    if (!$('#checkbox').is(':checked')) {
        $('.error-input.check').show()
        hasError = true;
    }
    if (!hasError) {
        let person = []
        let cart = {
            fullname: formInputs.eq(0).val(),
            username: formInputs.eq(1).val(),
            email: formInputs.eq(2).val(),
            password: formInputs.eq(3).val(),
            agree: checkValue,
        }
        let personCart = localStorage.getItem('person')
        if (personCart) {
            person = JSON.parse(personCart)
        }
        person.push(cart)
        localStorage.setItem('person', JSON.stringify(person))
        form[0].reset();
        modal.addClass("open")
    }
});
const footer = $('.link');
footer.click(() => {
    $('.button').off('click');
    formInputs.css('border-bottom', '1px solid #C6C6C4')
    errorInput.hide()
    loginBlock();
});
const loginBlock = () => {
    $('.input').val('')
    formInputs.css('border-bottom', '1px solid #C6C6C4')
    const listLabel = $('label');
    const accauntHeader = $('.accaunt-input-h1')
    accauntHeader.text('Login in the System');
    $('.accaunt-input-p').remove();
    button.html('Sign In');
    listLabel.eq(0).hide()
    listLabel.eq(2).hide()
    listLabel.eq(4).hide()
    listLabel.eq(5).hide()
    footer.text('Registration');
    footer.click(() => {
        location.reload()
    })
    button.on('click', function (event) {
        event.preventDefault()
        errorInput.hide()

        formInputs.css('border-bottom', '1px solid greenyellow')
        let hasError = false

        //Как обойти ошибку, возникающую в строчке снизу(без использования try/catch)? Возможно ли сделать этот код проще?
        if ((JSON.parse(localStorage.getItem('person')).findIndex(item => item.username === formInputs.eq(1).val()))<0 && formInputs.eq(1).val() !== '') {
            formInputs.eq(1).next().text('Такой пользователь не зарегистрирован').show()
            formInputs.eq(1).css('border-bottom', '1px solid red')
            hasError = true;
        }
        if (!formInputs.eq(1).val().match(/^(\w+\-*\s*)+$/)) {
            formInputs.eq(1).next().text('Введите ваше имя пользователя').show()
            formInputs.eq(1).css('border-bottom', '1px solid red')
            hasError = true;
        }

        if ((JSON.parse(localStorage.getItem('person')).findIndex(item => item.password === formInputs.eq(3).val() && item.username === formInputs.eq(1).val())) < 0 && formInputs.eq(3).val() !== '') { //Есть ли другой способ обойти ошибку связанную с .name (undefined). Без try/catch?
            formInputs.eq(3).next().text('Неверный пароль').show()
            formInputs.eq(3).css('border-bottom', '1px solid red')
            hasError = true;
        }
        if (!formInputs.eq(3).val().match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\-\_\&\$\@]).{8,})/)) {
            formInputs.eq(3).next().text('Введите сложный пароль').show()
            formInputs.eq(3).css('border-bottom', '1px solid red')
            hasError = true;
            // /^([a-zA-Z]+[A-Za-z]+\d+[\-\_\&\$\@])+\w*$/ это моя регулярка
        }
        if (formInputs.eq(3).val().match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\-\_\&\$\@]).{8,})/) && formInputs.eq(1).val() === '') {
            formInputs.eq(3).next().text('Введите имя пользователя').show()
            formInputs.eq(1).css('border-bottom', '1px solid red')
            hasError = true;
        }
        if (!hasError) {
            accauntHeader.text(`Welcome, ${JSON.parse(localStorage.getItem('person')).find(item => item.username === formInputs.eq(1).val()).fullname}!`);
            listLabel.eq(1).hide()
            listLabel.eq(3).hide()
            header.css('text-align', 'center')
            button.text('Exit')
            footer.hide();
            button.click(() => {
                location.reload()
            })
        }
    })
};
