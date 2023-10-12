import {userDatabase, currentUserInformation} from "../data/user-data.js";

let userNameAvailability;

//checking to see if a user already exist

document.querySelector('.js-user-name-input-signup').addEventListener('change', () => {
    userNameAvailability = true ;
    userDatabase.forEach((user) => {
        if(user.userName === document.querySelector('.js-user-name-input-signup').value){
            userNameAvailability = false ;
        }
    }) ;

    if(userNameAvailability === false){
        document.querySelector('.js-user-name-availability').innerHTML = 'This user name is already taken' ;
        document.querySelector('.js-user-name-availability').classList.remove('green') ;
        document.querySelector('.js-user-name-availability').classList.add('red') ;
        document.querySelector('.js-user-name-input-signup').value = '' ;
    }else if(document.querySelector('.js-user-name-input-signup').value === ''){
        document.querySelector('.js-user-name-availability').innerHTML = '' ;
    }else{
        document.querySelector('.js-user-name-availability').innerHTML = 'This user name is available' ;
        document.querySelector('.js-user-name-availability').classList.remove('red') ;
        document.querySelector('.js-user-name-availability').classList.add('green') ;
    }

});

//password rules

document.querySelector('.js-password-input-signup').addEventListener('keyup', ()=> {
    if(document.querySelector('.js-password-input-signup').value.length < 8 ){
        document.querySelector('.js-check-password-box').innerHTML = 'password is too short' ;
        document.querySelector('.js-check-password-box').classList.add('red') ;
        document.querySelector('.js-check-password-box').classList.remove('green') ;
    }else{
        document.querySelector('.js-check-password-box').innerHTML = 'valid password' ;
        document.querySelector('.js-check-password-box').classList.add('green') ;
        document.querySelector('.js-check-password-box').classList.remove('red') ;
    }
}) ;

//saving the user's information

document.getElementById('js-sign-up-form').addEventListener('submit', (event) => {
    event.preventDefault() ;
    
    const userEmail = document.querySelector('.js-email-input-signup').value ;
    const userPassword = document.querySelector('.js-password-input-signup').value ;
    const userName = document.querySelector('.js-user-name-input-signup').value ;

    if(userNameAvailability === true && userEmail !== '' && userPassword !== '' && userName !== ''){
        userDatabase.push(
            {
                userHandle: `@${userName}`,
                userName: userName,
                userPassword: userPassword,
                userEmail: userEmail,
                followedbyCurrentUser: true ,
                isUser: false ,
                post: [],
            }
        ) ;

        currentUserInformation.userName = userName ;
        currentUserInformation.userHandle = `@${userName}` ; 
        localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;
        localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;

        window.location.href = 'home.html' ;
    }
}) ;

