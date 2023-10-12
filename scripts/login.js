import {userDatabase, currentUserInformation} from "../data/user-data.js" ;

//checking to see if the user's accuont actually exist

let userNameOrEmailExist;

document.querySelector('.js-email-or-name-input-login').addEventListener('change', () => {
    userNameOrEmailExist = false ;

    const userNameOrEmailInput = document.querySelector('.js-email-or-name-input-login').value

    userDatabase.forEach((user) => {
        if(user.userHandle === userNameOrEmailInput){
            userNameOrEmailExist = true ;
        }
    }) ;

    if(userNameOrEmailExist === false){
        document.querySelector('.js-check-email-or-name-box-login').innerHTML = 'User handle does not exist' ;
        document.querySelector('.js-check-email-or-name-box-login').classList.add('red') ;
    }else{
        document.querySelector('.js-check-email-or-name-box-login').innerHTML = '' ;
    }
}) ;

//Authentication

document.querySelector('.js-login-form').addEventListener('submit', (event) => {
    event.preventDefault() ;

    let validUser = false ;

    const userEmailOrName = document.querySelector('.js-email-or-name-input-login').value ;
    const userPassword = document.querySelector('.js-password-input-login').value ;

    let name;
    let handle;

    userDatabase.forEach((user) => {
        if((user.userHandle === userEmailOrName) && user.userPassword === userPassword){
            validUser = true ;
            name = user.userName ;
            handle = user.userHandle ;

        }
    }) ;

    if(validUser === true){
        currentUserInformation.userName =  name ;
        currentUserInformation.userHandle = handle ; 

        localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;
        localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;

        window.location.href = 'home.html' ;
    }else{
        document.querySelector('.js-error-message').innerHTML = 'Invalid name, email or password' ;
        document.querySelector('.js-error-message').classList.add('red') ;
    }
}) ;

