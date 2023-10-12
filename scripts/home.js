import {currentUserInformation, userDatabase} from "../data/user-data.js" ;

import {following} from "../data/current-user-information.js" ;

import {numberStandard} from "./utilities.js";

let storiesHtml = '' ;

following.forEach((follow) => {
    storiesHtml += `
        <div class="story-template js-story story-holder">
            <a href="utility-pages/user-profile.html"><img src="images and Icons/user-data/profile-pictures/${follow}.jpg" alt="profile-picture" class="story-pp"></a>
            <div class="story-cover"></div>
            <img src="images and Icons/user-data/stories/${follow}.jpg" alt="user's status" class="js-story-img story-image" data-story-handle="${follow}">
        </div>
    ` ;
}) ;

document.querySelector('.js-all-stories').innerHTML += storiesHtml ;

document.querySelectorAll('.js-story-img').forEach((story) => {
    story.addEventListener('click', () => {
        const imageTag = story.dataset.storyHandle ;

        document.querySelector('.js-overlay').innerHTML = `
            <img src="images and Icons/user-data/stories/${imageTag}.jpg" alt="profile-picture" class="zommed-story">
            <button class="js-close-overlay close-overlay-button"><img src="images and Icons/Icons/Close-icon.PNG" alt=""></button>
        `;

        document.querySelector('.js-overlay').classList.add('overlay-on') ;

        document.querySelector('.js-close-overlay').addEventListener('click', () => {
            document.querySelector('.js-overlay').classList.remove('overlay-on') ;
            document.querySelector('.js-overlay').innerHTML = ``;
        }) ;
    }) ;
});

document.querySelector('.js-story-template-user').innerHTML = `
    <img src="${currentUserInformation.userProfilePicture}" alt="profile-picture" width="" class="story-user-pp">
    <img src="${currentUserInformation.userStory}" alt="user's status" width="" class="js-user-story-img story-image">
    <div class="story-cover"></div>
    <div class="add-story-button">
        <label for="user-story" class="add-story-symbol"><img src="images and Icons/Icons/add-icon.png" alt=""></label>
        <input type="file" name="" id="user-story" hidden>
    </div>
` ;

document.getElementById('user-story').addEventListener('change', () => {
    const reader = new FileReader() ;

    reader.addEventListener('load', () => {
        localStorage.setItem('userStory', reader.result) ;
    }) ;

    reader.readAsDataURL(document.getElementById('user-story').files[0]) ;

    window.location.href = 'home.html' ;
}) ;

document.addEventListener('DOMContentLoaded', () => {
    const userStory = localStorage.getItem('userStory') ;

    if(userStory){
        document.querySelector('.js-user-story-img').setAttribute('src', userStory) ;
    }
}) ;


document.querySelector('.js-user-story-img').addEventListener('click', () => {
    if(localStorage.getItem('userStory')){
        document.querySelector('.js-overlay').innerHTML = `
            <img src="${localStorage.getItem('userStory')}" alt="profile-picture" class="zommed-story">
            <button class="js-close-overlay close-overlay-button"><img src="images and Icons/Icons/Close-icon.PNG" alt=""></button>
            <button class="js-delete-story delete-story"><img src="images and Icons/Icons/delete-icon.png" alt=""></button>
        `;

        document.querySelector('.js-overlay').classList.add('overlay-on') ;

        document.querySelector('.js-close-overlay').addEventListener('click', () => {
            document.querySelector('.js-overlay').classList.remove('overlay-on') ;
            document.querySelector('.js-overlay').innerHTML = ``;
        }) ;

        document.querySelector('.js-delete-story').addEventListener('click', () => {
            localStorage.removeItem('userStory') ;

            document.querySelector('.js-overlay').classList.remove('overlay-on') ;
            document.querySelector('.js-overlay').innerHTML = ``;

            document.querySelector('.js-story-template-user').innerHTML = `
                <img src="${currentUserInformation.userProfilePicture}" alt="profile-picture" width="" class="story-user-pp">
                <img src="${currentUserInformation.userStory}" alt="user's status" width="" class="js-user-story-img story-image">
                <div class="story-cover"></div>
                <div class="add-story-button">
                    <label for="user-story" class="add-story-symbol"><img src="images and Icons/Icons/add-icon.png" alt=""></label>
                    <input type="file" name="" id="user-story" hidden>
                </div>">
            ` ;
        }) ;
    }
});

function selectItem(postList){
    const pickingRandomItem = (min, max) => {
        let first = max - min + 1 ;
        let second = Math.random() * first ;
        let result = Math.floor(second) + min ;

        return result ;
    }

    const randomIndex = pickingRandomItem(0, postList.length - 1) ;
    return postList[randomIndex] ;
}

//post for the website

function forYouPostRendering(){
    //localStorage.removeItem('userDatabase') ;

    let postHTML = '' ;
    const forYou = [] ;

    userDatabase.forEach((user) => {
        user.post.forEach((userPost) => {
            forYou.push(userPost) ;
        }) ;
    }) ;

    currentUserInformation.userPost.forEach((post) => {
        forYou.push(post) ;
    }) ;

    const forYouRandomized = [] ;

    for(let i = 0; forYouRandomized.length !== forYou.length ; i ++){
        const randomPost = selectItem(forYou) ;
        
        let postExist = false ;

        forYouRandomized.forEach((post) => {
            if(post === randomPost){
                postExist = true ;
            }
        }) ;

        if(postExist === false){
            forYouRandomized.push(randomPost) ;
        }
    } ;

    forYouRandomized.forEach((post) => {
        let postTagsHtml = '' ;

        post.tags.forEach((tag) => {
            postTagsHtml += `
                <a href="utility-pages/settings.html">${tag}</a>
            `;
        }) ;

        let postLikes = numberStandard(post);

        if(post.byCurrentUser === false){
            postHTML += ` 
            <div class="post-template">
                <div class="post-header">
                    <div class="user-info">
                        <a href="utility-pages/user-profile.html"><img src="images and Icons/user-data/profile-pictures/${post.userHandle}.jpg" alt="" class="post-profile-picture"><a/>
    
                        <div class="specifications">
                            <p class="users-name">${post.userName}</p>
                            <p class="users-handle">${post.userHandle}</p>
                            
                            <button class="js-follow-button-${post.postId} follow-btn" data-user-handle="${post.userHandle}">Follow</button>
                        </div>
                    </div>
    
                    <div class="caption">
                        <p class="post-caption">${post.caption}</p>
                    </div>
    
                    <div class="post-media">
                        ${post.media}
                    </div>

                    <div class="post-tags">
                        ${postTagsHtml}
                    </div>
                    
                    <div class="post-interactions">
                        <div class="interaction-template">
                            <button class="js-like-button-${post.postId} like-btn"><i class="fa fa-thumbs-o-up like-icon-${post.postId}"></i></button>
                            <p class="js-like-counter-${post.postId}">${postLikes} Likes</p>
                        </div>
    
                        <div class="interaction-template">
                            <button class="js-comment-button-${post.postId} comment-btn"><i class="fa fa-comment-o"></i></button>
                            <p class="js-comments-counter-${post.postId}">${post.comments.numberOfComments} Comments</p>
                        </div>
    
                        <div class="interaction-template">
                            <button class="js-save-post-${post.postId} save-btn"><i class="fa fa-save save-post-${post.postId}"></i></button>
                        </div>
                    </div>
    
                    <div class="js-all-comments-${post.postId} comment-box">
                        
                    </div>
                </div>
            </div>
        ` ;
        }else{
            postHTML += ` 
            <div class="post-template">
                <div class="post-header">
                    <div class="user-info">
                        <a href="utility-pages/user-profile.html"><img src="${currentUserInformation.userProfilePicture}" alt="" class="post-profile-picture"></a>
                        <a>      
                            <div class="specifications">
                                <p class="users-name">${post.userName}</p>
                                <p class="users-handle">${post.userHandle}</p>
                            </div>
                        </a>
                    </div>
    
                    <div class="caption">
                        <p class="post-caption">${post.caption}</p>
                    </div>
    
                    <div class="post-media">
                        ${post.media}
                    </div>

                    <div class="post-tags">
                        ${postTagsHtml}
                    </div>
                    
                    <div class="post-interactions">
                        <div class="interaction-template">
                            <button class="js-like-button-${post.postId} like-btn"><i class="fa fa-thumbs-o-up like-icon-${post.postId}"></i></button>
                            <p class="js-like-counter-${post.postId}">${postLikes} Likes</p>
                        </div>
    
                        <div class="interaction-template">
                            <button class="js-comment-button-${post.postId} comment-btn"><i class="fa fa-comment-o"></i></button>
                            <p class="js-comments-counter-${post.postId}">${post.comments.numberOfComments} Comments</p>
                        </div>
    
                        <div class="interaction-template">
                            <button class="js-save-post-${post.postId} save-btn"><i class="fa fa-save save-post-${post.postId}"></i></button>
                        </div>
                    </div>
    
                    <div class="js-all-comments-${post.postId} comment-box">
                        
                    </div>
                </div>
            </div>
        ` ;
        }


    }) ;



    document.querySelector('.js-post-content').innerHTML = postHTML ;

    document.querySelector('.js-see-forYou-post').classList.add('post-on') ;
    document.querySelector('.js-see-followed-post').classList.add('post-off') ;
    document.querySelector('.js-see-followed-post').classList.remove('post-on') ;
    document.querySelector('.js-see-forYou-post').classList.remove('post-off') ;
    document.querySelector('.bar-for-you').classList.add('js-bar-for-you') ;
    document.querySelector('.bar-following').classList.remove('js-bar-following') ;

    //FOLLOW BUTTON FUNCTIONALITY
    const postChecker = [] ;

    userDatabase.forEach((user) => {
        user.post.forEach((userPost) => {
            postChecker.push(userPost) ;
        }) ;
    }) ;

    postChecker.forEach((post) => {
        const handle = post.userHandle ;
        let theUser;
        userDatabase.forEach((user) => {
            if(user.userHandle === handle){
                theUser = user ;
            }
        }) ;
       
        if(theUser.followedbyCurrentUser === false){
            document.querySelector(`.js-follow-button-${post.postId}`).classList.remove('followed') ;
            document.querySelector(`.js-follow-button-${post.postId}`).innerHTML = 'Follow' ;
        }else{
            document.querySelector(`.js-follow-button-${post.postId}`).classList.add('followed') ;
            document.querySelector(`.js-follow-button-${post.postId}`).innerHTML = 'Unfollow' ;
        }

        document.querySelector(`.js-follow-button-${post.postId}`).addEventListener('click', () => {
            if(document.querySelector(`.js-follow-button-${post.postId}`).classList.contains('followed')){
                forYouRandomized.forEach((refrence) => {
                    if(refrence.userHandle === handle){
                        document.querySelector(`.js-follow-button-${refrence.postId}`).classList.remove('followed') ;
                        document.querySelector(`.js-follow-button-${refrence.postId}`).innerHTML = 'Follow' ;
                        theUser.followedbyCurrentUser = false ;
                        following.forEach((user, index) => {
                            if(user === handle){
                                following.splice(index, 1) ;
                                theUser.followedbyCurrentUser = false ;
                                localStorage.setItem('userFollowing', JSON.stringify(following)) ;
                            }
                        }) ;
                    }
                }) ;
                //console.log('hi') ;
                localStorage.setItem('userFollowing', JSON.stringify(following)) ;
                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                return
            }else{
                forYouRandomized.forEach((refrence) => {
                    if(refrence.userHandle === handle){
                        let exist = false ;
                        document.querySelector(`.js-follow-button-${refrence.postId}`).classList.add('followed') ;
                        document.querySelector(`.js-follow-button-${refrence.postId}`).innerHTML = 'Unfollow' ;
                        following.forEach((user) => {
                            if(user === post.userHandle){
                                exist = true ;
                            }
                        }) ;
                        if(exist === false){
                            following.push(post.userHandle) ;
                        }
                        theUser.followedbyCurrentUser = true ;
                    }
                }) ;
                //console.log('no')
                localStorage.setItem('userFollowing', JSON.stringify(following)) ;
                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                return
            }
        }) ;
    }) ;

    forYouRandomized.forEach((post) => {
        if(post.liked === true){
            document.querySelector(`.like-icon-${post.postId}`).classList.add('liked') ;
        }else{
            document.querySelector(`.like-icon-${post.postId}`).classList.remove('liked') ;
        }

        document.querySelectorAll(`.js-like-button-${post.postId}`).forEach((button) => {
            button.addEventListener('click', () => {
                if(post.liked === false){
                    post.Likes ++ ;
                    let postLikes = numberStandard(post) ;
                    document.querySelector(`.js-like-counter-${post.postId}`).innerHTML = `${postLikes} Likes` ;
                    post.liked = true ;
                    document.querySelector(`.like-icon-${post.postId}`).classList.add('liked') ;
                }else{
                    post.Likes -- ;
                    let postLikes = numberStandard(post) ;
                    document.querySelector(`.js-like-counter-${post.postId}`).innerHTML = `${postLikes} Likes` ;
                    post.liked = false ;
                    document.querySelector(`.like-icon-${post.postId}`).classList.remove('liked') ;
                }
                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
            }) ;
        }) ;
    }) ;

    forYouRandomized.forEach((post) => {
        if(post.saved === true){
            document.querySelector(`.save-post-${post.postId}`).classList.add('saved') ;
        }else{
            document.querySelector(`.save-post-${post.postId}`).classList.remove('saved') ;
        }

        document.querySelector(`.js-save-post-${post.postId}`).addEventListener('click', () => {
            if(post.saved === false){
                currentUserInformation.userSavedPost.push(post) ;
                post.saved = true ;
                localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;
                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                console.log(currentUserInformation.userSavedPost) ;
                document.querySelector(`.save-post-${post.postId}`).classList.add('saved') ;
            }else{
                post.saved = false ;
                currentUserInformation.userSavedPost.forEach((postCheck, index) => {
                    if(post.postId === postCheck.postId){
                        currentUserInformation.userSavedPost.splice(index, 1) ;
                    }
                }) ;
                document.querySelector(`.save-post-${post.postId}`).classList.remove('saved') ;
                localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;
                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                console.log(currentUserInformation.userSavedPost) ;
            }
        }) ;
    }) ;


    forYouRandomized.forEach((post) => {
        post.clickedComments = false
        document.querySelector(`.js-comment-button-${post.postId}`).addEventListener('click', () => {
            if(post.clickedComments === false){
                function renderComments(){
                    document.querySelector(`.js-all-comments-${post.postId}`).innerHTML = `
                    <form action="" class="js-submit-a-comment-${post.postId} my-comment" method="Get">
                        <img src="${currentUserInformation.userProfilePicture}" alt="user-pp" class="user-comment-profile">
                        <input type="text" name="" placeholder="Write a comment" id="" class="js-comment-input-${post.postId} comment-input" required>
                        <button type="submit" enabled={formState.isSubmitting} class="comment-button"><i class="fa fa-paper-plane"></i></button>
                    </form>
                    ` ;
    
                    if(post.comments.allComments.length > 0){
                        let commentsHtml = '' ;
                        let userComment = false ;
                        post.comments.allComments.forEach((comment) => {
                            if(comment.byCurrentUser === true){
                                userComment = true ;
                                commentsHtml += `
                                <div class="comment-template">
                                    <div class="comment-header">
                                        <div class="comment-header-left">
                                            <img src="${currentUserInformation.userProfilePicture}" alt="commenter's-pp" class="commenters-pp">
                                            <div class="commenters-info">
                                                <p>${comment.commenterName}</p>
                                                <p class="commenters-handle">${comment.commenterHandle}</p>
                                            </div>
                                        </div>
                        
                                        <button class="js-delete-current-user-comment-${comment.id} delete-comment-btn" data-comment-id="${comment.id}"><img src="images and Icons/Icons/delete-icon.png" alt=""></button>
                                    </div>
                        
                                    <div class="comment">
                                        <p class="actual-comment">${comment.comment}</p>
                                    </div>
                        
                                    <div class="comment-reaction">
                                        <div class="vote-box">
                                            <button class="js-upvote-button-${comment.id} upvote-btn"><i class="fa fa-arrow-up upvote-${comment.id}"></i></button>
                                            <p class="js-upvote-counter-${comment.id}">${comment.upvotes}</p>
                                        </div>
                                        <div class="vote-box">
                                            <button class="js-downvote-button-${comment.id} downvote-btn"><i class="fa fa-arrow-down downvote-${comment.id}"></i></button>
                                            <p class="js-downvote-counter-${comment.id}">${comment.downvotes}</p>
                                        </div>
                                    </div>
                                </div>
                            ` ;
                            }else{
                                commentsHtml += `
                                <div class="comment-template">
                                    <div class="comment-header">
                                        <div class="comment-header-left">
                                            <img src="images and Icons/user-data/profile-pictures/${comment.commenterHandle}.jpg" alt="commenter's-pp" class="commenters-pp">
                                            <div class="commenters-info">
                                                <p>${comment.commenterName}</p>
                                                <p class="commenters-handle">${comment.commenterHandle}</p>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <div class="comment">
                                        <p class="actual-comment">${comment.comment}</p>
                                    </div>
                        
                                    <div class="comment-reaction">
                                        <div class="vote-box">
                                            <button class="js-upvote-button-${comment.id} upvote-btn"><i class="fa fa-arrow-up upvote-${comment.id}"></i></button>
                                            <p class="js-upvote-counter-${comment.id}">${comment.upvotes}</p>
                                        </div>
                                        <div class="vote-box">
                                            <button class="js-downvote-button-${comment.id} downvote-btn"><i class="fa fa-arrow-down downvote-${comment.id}"></i></button>
                                            <p class="js-downvote-counter-${comment.id}">${comment.downvotes}</p>
                                        </div>
                                    </div>
                                </div>
                            ` ;
                            }
                        }) ;
        
                        document.querySelector(`.js-all-comments-${post.postId}`).innerHTML  += commentsHtml ;

                        if(userComment === true){
                            post.comments.allComments.forEach((comment) => {
                                document.querySelectorAll(`.js-delete-current-user-comment-${comment.id}`).forEach((button) => {
                                    button.addEventListener('click', () => {
                                        const commentId = Number(document.querySelector(`.js-delete-current-user-comment-${comment.id}`).dataset.commentId) ;
                                        post.comments.allComments.forEach((comment, index) => {
                                            if(commentId === comment.id){
                                                post.comments.allComments.splice(index, 1) ;
                                                post.comments.numberOfComments -- ;
                                                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                                                localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;
                                                renderComments() ;
                                            }
                                    }) ;
                                }) ;
                                
                                }) ;
                            }) ;
                        }

                        post.comments.allComments.forEach((comment) => {
                            if(comment.upvoted === true){
                                document.querySelector(`.upvote-${comment.id}`).classList.add('liked') ;
                            }

                            if(comment.downvoted === true){
                                document.querySelector(`.downvote-${comment.id}`).classList.add('liked') ;
                            }

                            document.querySelector(`.js-upvote-button-${comment.id}`).addEventListener('click', () => {
                                if(comment.upvoted === false){
                                    comment.upvotes ++ ;
                                    if(comment.downvoted === true){ comment.downvotes -- ; } ;
                                    comment.upvoted = true ;
                                    comment.downvoted = false ;
                                    document.querySelector(`.upvote-${comment.id}`).classList.add('liked') ;
                                    document.querySelector(`.downvote-${comment.id}`).classList.remove('liked') ;
                                    document.querySelector(`.js-upvote-counter-${comment.id}`).innerHTML = comment.upvotes ;
                                    document.querySelector(`.js-downvote-counter-${comment.id}`).innerHTML = comment.downvotes ;
                                }else if(comment.upvoted === true){
                                    comment.upvotes -- ;
                                    comment.upvoted = false ;
                                    document.querySelector(`.upvote-${comment.id}`).classList.remove('liked') ;
                                    document.querySelector(`.js-upvote-counter-${comment.id}`).innerHTML = comment.upvotes ;
                                }
                                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                                localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;
                            }) ;
                
                            document.querySelector(`.js-downvote-button-${comment.id}`).addEventListener('click', () => {
                                if(comment.downvoted === false){
                                    comment.downvotes ++ ;
                                    if(comment.upvoted === true){ comment.upvotes -- ; } ;
                                    comment.downvoted = true ;
                                    comment.upvoted = false ;
                                    document.querySelector(`.downvote-${comment.id}`).classList.add('liked') ;
                                    document.querySelector(`.upvote-${comment.id}`).classList.remove('liked') ;
                                    document.querySelector(`.js-downvote-counter-${comment.id}`).innerHTML = comment.downvotes ;
                                    document.querySelector(`.js-upvote-counter-${comment.id}`).innerHTML = comment.upvotes ;
                                }else if(comment.downvoted === true){
                                    comment.downvotes -- ;
                                    comment.downvoted = false ;
                                    document.querySelector(`.downvote-${comment.id}`).classList.remove('liked') ;
                                    document.querySelector(`.js-downvote-counter-${comment.id}`).innerHTML = comment.downvotes ;
                                }
                                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                                localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;
                            }) ;
                        }) ;
                    }
                }
            

                renderComments() ;

                document.querySelector(`.js-submit-a-comment-${post.postId}`).addEventListener('submit', (event) => {
                    event.preventDefault() ;
                    //event.isSubmited = false ;
                    
                    const commentInput = document.querySelector(`.js-comment-input-${post.postId}`) ;

                    post.comments.numberOfComments ++ ;

                    post.comments.commentIdIndexing ++ ;

                    post.comments.allComments.push(
                        {
                            commenterName: `${currentUserInformation.userName}`,
                            commenterHandle: `${currentUserInformation.userHandle}`,
                            comment: `${commentInput.value}`,
                            upvotes: 0,
                            downvotes: 0,
                            id: post.comments.commentIdIndexing,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: true 
                        }
                    ) ;

                    localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                    localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;
                    commentInput.value = '' ;

                    renderComments() ;
                    return false 
                }) ;

                post.clickedComments = true ;
            }else if(post.clickedComments === true){
                document.querySelector(`.js-all-comments-${post.postId}`).innerHTML  = '' ;
                post.clickedComments = false ;
                
            }
        }) ;
          
    }) ;

    document.querySelectorAll('.js-post-media').forEach((postMedia) => {
        postMedia.addEventListener('click', () => {
            let postMediaHtml = postMedia.outerHTML ;
            console.log(postMediaHtml)
            document.querySelector('.js-overlay').innerHTML = `
            <div class="adjust-img">${postMediaHtml}</div>
            <button class="js-close-overlay close-overlay-button"><img src="images and Icons/Icons/Close-icon.PNG" alt=""></button>
        `;
    
            document.querySelector('.js-overlay').classList.add('overlay-on') ;
    
            document.querySelector('.js-close-overlay').addEventListener('click', () => {
                document.querySelector('.js-overlay').classList.remove('overlay-on') ;
                document.querySelector('.js-overlay').innerHTML = ``;
            }) ;
        }) ;
    }) ;
}
FollowingPostRendering() ;
forYouPostRendering() ;

document.querySelector('.js-post-a-tweet').addEventListener('click', () => {
    document.querySelector('.js-overlay').innerHTML = `
        <div class="post-a-tweet-box">      
            <form method="get" class="js-write-a-tweet">
                <div class="write-tweet-header">
                    <img src="${currentUserInformation.userProfilePicture}" alt="" class="post-a-tweet-pp">
                    <input type="text" placeholder="What's going on?" class="js-post-caption post-a-tweet-input" required>
                </div>

                <div class="write-tweet-body">
                    <div class="write-tags">
                        <input type="text" placeholder="add a tag" class="js-post-tag tag-input">
                        <button class="js-add-post-tag tag-button" type="button">add</button>
                    </div>
                    <div class="js-tag-holder"></div>
                </div>

                <div class="write-tweet-footer">
                    <label for="upload-tweet-img" class="upload-photo-label">Choose a photo <i class="fa fa-arrow-up"></i></label>
                    <input type="file" name="" id="upload-tweet-img" class='js-upload-image input-tweet-img' required>
                </div>

                <button type="submit" class="submit-the-tweet">Post</button>
            </form>
        </div>
        <button class="js-close-overlay close-overlay-button"><img src="images and Icons/Icons/Close-icon.PNG" alt=""></button>
    `;

        
    document.querySelector('.js-close-overlay').addEventListener('click', () => {
        document.querySelector('.js-overlay').classList.remove('overlay-on') ;
        document.querySelector('.js-overlay').innerHTML = ``;
    }) ;

    document.querySelector('.js-overlay').classList.add('overlay-on') ;

    const tags = [] ;

    document.querySelector('.js-add-post-tag').addEventListener('click', () => {
        if(tags.length < 3){
            const tag = document.querySelector('.js-post-tag') ;
            tags.push(tag.value) ;
            document.querySelector('.js-tag-holder').innerHTML += `<p class="tag-check">#${tag.value}</p>`;
            tag.value = '' ;
        }else{
            const tag = document.querySelector('.js-post-tag') ;
            tag.value = '' ;
        }
    }) ;
    let imageChosen = false ;

    document.querySelector('.js-upload-image').addEventListener('change', () => {
        console.log('working') ;
        imageChosen = true ;

        currentUserInformation.postIdIndexing ++ ;

        const reader = new FileReader() ;

        reader.addEventListener('load', () => {
            localStorage.setItem(`userPostImg${currentUserInformation.postIdIndexing}`, reader.result) ;
        }) ;
    
        reader.readAsDataURL(document.querySelector('.js-upload-image').files[0]) ;
    }); 

    document.querySelector('.js-write-a-tweet').addEventListener('submit', (event) => {
        event.preventDefault() ;

        const postCaption = document.querySelector('.js-post-caption') ;

        if(imageChosen === false){
            currentUserInformation.postIdIndexing ++ ;
        }

        currentUserInformation.userPost.push(
            {
                caption: postCaption.value ,
                media:`<img src="${localStorage.getItem(`userPostImg${currentUserInformation.postIdIndexing}`) || ''}" alt="" class="js-post-media post-media-img">`,
                tags: tags ,
                userHandle: currentUserInformation.userHandle,
                userName: currentUserInformation.userName,
                postId: 'U' + currentUserInformation.postIdIndexing ,
                Likes: 0,
                liked: false,
                clickedComments: false,
                byCurrentUser: true ,
                comments: {
                    numberOfComments: 0,
                    commentIdIndexing: 0,
                    allComments: [
                    ]
                }
            }
            
        ) ;

        localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;

        window.location = 'home.html' ;
    }) ;
}) ;

//rendering following page

function FollowingPostRendering(){
    let postHTML = '' ;
    const followingMain = [] ;
    
    following.forEach((user) => {
        userDatabase.forEach((potentialFollowing) => {
            if(user === potentialFollowing.userHandle){
                potentialFollowing.followedbyCurrentUser = true ;
            }
        }) ;
    }) ;

    userDatabase.forEach((user) => {
        if(user.followedbyCurrentUser === true){
            user.post.forEach((userPost) => {
                followingMain.push(userPost) ;
            }) ;
        }
    }) ;

    const forYouRandomized = [] ;

    for(let i = 0; forYouRandomized.length !== followingMain.length ; i ++){
        const randomPost = selectItem(followingMain) ;
        
        let postExist = false ;

        forYouRandomized.forEach((post) => {
            if(post === randomPost){
                postExist = true ;
            }
        }) ;

        if(postExist === false){
            forYouRandomized.push(randomPost) ;
        }
    } ;

    forYouRandomized.forEach((post) => {
        let postTagsHtml = '' ;

        post.tags.forEach((tag) => {
            postTagsHtml += `
                <a href="utility-pages/settings.html">${tag}</a>
            `;
        }) ;

        let postLikes = numberStandard(post);

        if(post.byCurrentUser === false){
            postHTML += ` 
            <div class="post-template">
                <div class="post-header">
                    <div class="user-info">
                    <a href="utility-pages/user-profile.html"><img src="images and Icons/user-data/profile-pictures/${post.userHandle}.jpg" alt="" class="post-profile-picture"><a/>
                        <div class="specifications">
                            <p class="users-name">${post.userName}</p>
                            <p class="users-handle">${post.userHandle}</p>
                        </div>
                    </div>

                    <div class="caption">
                        <p class="post-caption">${post.caption}</p>
                    </div>

                    <div class="post-media">
                        ${post.media}
                    </div>

                    <div class="post-tags">
                        ${postTagsHtml}
                    </div>
                    
                    <div class="post-interactions">
                        <div class="interaction-template">
                            <button class="js-like-button-${post.postId} like-btn"><i class="fa fa-thumbs-o-up like-icon-${post.postId}"></i></button>
                            <p class="js-like-counter-${post.postId}">${postLikes} Likes</p>
                        </div>
    
                        <div class="interaction-template">
                            <button class="js-comment-button-${post.postId} comment-btn"><i class="fa fa-comment-o"></i></button>
                            <p class="js-comments-counter-${post.postId}">${post.comments.numberOfComments} Comments</p>
                        </div>
    
                        <div class="interaction-template">
                            <button class="js-save-post-${post.postId} save-btn"><i class="fa fa-save save-post-${post.postId}"></i></button>
                        </div>
                    </div>
    
                    <div class="js-all-comments-${post.postId} comment-box">
                        
                    </div>
                </div>
            </div>
        ` ;
        }else{
            postHTML += ` 
            <div class="post-template">
                <div class="post-header">
                    <div class="user-info">
                    <a href="utility-pages/user-profile.html"><img src="${currentUserInformation.userProfilePicture}" alt="" class="post-profile-picture"></a>
    
                        <div class="specifications">
                            <p class="users-name">${post.userName}</p>
                            <p class="users-handle">${post.userHandle}</p>
                        </div>
                    </div>
    
                    <div class="caption">
                        <p class="post-caption">${post.caption}</p>
                    </div>
    
                    <div class="post-media">
                        ${post.media}
                    </div>

                    <div class="post-tags">
                        ${postTagsHtml}
                    </div>
                    
                    <div class="post-interactions">
                        <div class="interaction-template">
                            <button class="js-like-button-${post.postId} like-btn"><i class="fa fa-thumbs-o-up like-icon-${post.postId}"></i></button>
                            <p class="js-like-counter-${post.postId}">${postLikes} Likes</p>
                        </div>
    
                        <div class="interaction-template">
                            <button class="js-comment-button-${post.postId} comment-btn"><i class="fa fa-comment-o"></i></button>
                            <p class="js-comments-counter-${post.postId}">${post.comments.numberOfComments} Comments</p>
                        </div>
    
                        <div class="interaction-template">
                            <button class="js-save-post-${post.postId} save-btn"><i class="fa fa-save save-post-${post.postId}"></i></button>
                        </div>
                    </div>
    
                    <div class="js-all-comments-${post.postId} comment-box">
                        
                    </div>
                </div>
            </div>
        ` ;
        }


    }) ;


    document.querySelector('.js-post-content').innerHTML = postHTML ;

    document.querySelector('.js-see-forYou-post').classList.remove('post-on') ;
    document.querySelector('.js-see-followed-post').classList.add('post-on') ;
    document.querySelector('.js-see-followed-post').classList.remove('post-off') ;
    document.querySelector('.js-see-forYou-post').classList.add('post-off') ;
    document.querySelector('.bar-for-you').classList.remove('js-bar-for-you') ;
    document.querySelector('.bar-following').classList.add('js-bar-following') ;

    forYouRandomized.forEach((post) => {
        if(post.liked === true){
            document.querySelector(`.like-icon-${post.postId}`).classList.add('liked') ;
        }else{
            document.querySelector(`.like-icon-${post.postId}`).classList.remove('liked') ;
        }

        document.querySelector(`.js-like-button-${post.postId}`).addEventListener('click', () => {
            if(post.liked === false){
                post.Likes ++ ;
                let postLikes = numberStandard(post) ;
                document.querySelector(`.js-like-counter-${post.postId}`).innerHTML = `${postLikes} Likes` ;
                post.liked = true ;
                document.querySelector(`.like-icon-${post.postId}`).classList.add('liked') ;
            }else{
                post.Likes -- ;
                let postLikes = numberStandard(post) ;
                document.querySelector(`.js-like-counter-${post.postId}`).innerHTML = `${postLikes} Likes` ;
                post.liked = false ;
                document.querySelector(`.like-icon-${post.postId}`).classList.remove('liked') ;
            }
            localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
        }) ;
    }) ;

    forYouRandomized.forEach((post) => {
        if(post.saved === true){
            document.querySelector(`.save-post-${post.postId}`).classList.add('saved') ;
        }else{
            document.querySelector(`.save-post-${post.postId}`).classList.remove('saved') ;
        }

        document.querySelector(`.js-save-post-${post.postId}`).addEventListener('click', () => {
            if(post.saved === false){
                currentUserInformation.userSavedPost.push(post) ;
                post.saved = true ;
                localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;
                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                console.log(currentUserInformation.userSavedPost) ;
                document.querySelector(`.save-post-${post.postId}`).classList.add('saved') ;
            }else{
                post.saved = false ;
                currentUserInformation.userSavedPost.forEach((postCheck, index) => {
                    if(post.postId === postCheck.postId){
                        currentUserInformation.userSavedPost.splice(index, 1) ;
                    }
                }) ;
                document.querySelector(`.save-post-${post.postId}`).classList.remove('saved') ;
                localStorage.setItem('currentUser', JSON.stringify(currentUserInformation)) ;
                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                console.log(currentUserInformation.userSavedPost) ;
            }
        }) ;
    }) ;

    forYouRandomized.forEach((post) => {
        post.clickedComments = false
        document.querySelector(`.js-comment-button-${post.postId}`).addEventListener('click', () => {
            if(post.clickedComments === false){
                function renderComments(){
                    document.querySelector(`.js-all-comments-${post.postId}`).innerHTML = `
                    <form action="" class="js-submit-a-comment-${post.postId} my-comment" method="Get">
                        <img src="${currentUserInformation.userProfilePicture}" alt="user-pp" class="user-comment-profile">
                        <input type="text" name="" placeholder="Write a comment" id="" class="js-comment-input-${post.postId} comment-input" required>
                        <button type="submit" enabled={formState.isSubmitting} class="comment-button"><i class="fa fa-paper-plane"></i></button>
                    </form>
                    ` ;
    
                    if(post.comments.allComments.length > 0){
                        let commentsHtml = '' ;
                        let userComment = false ;
                        post.comments.allComments.forEach((comment) => {
                            if(comment.byCurrentUser === true){
                                userComment = true ;
                                commentsHtml += `
                                <div class="comment-template">
                                    <div class="comment-header">
                                        <div class="comment-header-left">
                                            <img src="${currentUserInformation.userProfilePicture}" alt="commenter's-pp" class="commenters-pp">
                                            <div class="commenters-info">
                                                <p>${comment.commenterName}</p>
                                                <p class="commenters-handle">${comment.commenterHandle}</p>
                                            </div>
                                        </div>
                        
                                        <button class="js-delete-current-user-comment-${comment.id} delete-comment-btn" data-comment-id="${comment.id}"><img src="images and Icons/Icons/delete-icon.png" alt=""></button>
                                    </div>
                        
                                    <div class="comment">
                                        <p class="actual-comment">${comment.comment}</p>
                                    </div>
                        
                                    <div class="comment-reaction">
                                        <div class="vote-box">
                                            <button class="js-upvote-button-${comment.id} upvote-btn"><i class="fa fa-arrow-up upvote-${comment.id}"></i></button>
                                            <p class="js-upvote-counter-${comment.id}">${comment.upvotes}</p>
                                        </div>
                                        <div class="vote-box">
                                            <button class="js-downvote-button-${comment.id} downvote-btn"><i class="fa fa-arrow-down downvote-${comment.id}"></i></button>
                                            <p class="js-downvote-counter-${comment.id}">${comment.downvotes}</p>
                                        </div>
                                    </div>
                                </div>
                            ` ;
                            }else{
                                commentsHtml += `
                                <div class="comment-template">
                                    <div class="comment-header">
                                        <div class="comment-header-left">
                                            <img src="images and Icons/user-data/profile-pictures/${comment.commenterHandle}.jpg" alt="commenter's-pp" class="commenters-pp">
                                            <div class="commenters-info">
                                                <p>${comment.commenterName}</p>
                                                <p class="commenters-handle">${comment.commenterHandle}</p>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <div class="comment">
                                        <p class="actual-comment">${comment.comment}</p>
                                    </div>
                        
                                    <div class="comment-reaction">
                                        <div class="vote-box">
                                            <button class="js-upvote-button-${comment.id} upvote-btn"><i class="fa fa-arrow-up upvote-${comment.id}"></i></button>
                                            <p class="js-upvote-counter-${comment.id}">${comment.upvotes}</p>
                                        </div>
                                        <div class="vote-box">
                                            <button class="js-downvote-button-${comment.id} downvote-btn"><i class="fa fa-arrow-down downvote-${comment.id}"></i></button>
                                            <p class="js-downvote-counter-${comment.id}">${comment.downvotes}</p>
                                        </div>
                                    </div>
                                </div>
                            ` ;
                            }
                        }) ;
        
                        document.querySelector(`.js-all-comments-${post.postId}`).innerHTML  += commentsHtml ;

                        if(userComment === true){
                            post.comments.allComments.forEach((comment) => {
                                document.querySelectorAll(`.js-delete-current-user-comment-${comment.id}`).forEach((button) => {
                                    button.addEventListener('click', () => {
                                        const commentId = Number(document.querySelector(`.js-delete-current-user-comment-${comment.id}`).dataset.commentId) ;
                                        post.comments.allComments.forEach((comment, index) => {
                                            if(commentId === comment.id){
                                                post.comments.allComments.splice(index, 1) ;
                                                post.comments.numberOfComments -- ;
                                                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                                                renderComments() ;
                                            }
                                    }) ;
                                }) ;
                                
                                }) ;
                            }) ;
                        }

                        post.comments.allComments.forEach((comment) => {
                            if(comment.upvoted === true){
                                document.querySelector(`.upvote-${comment.id}`).classList.add('liked') ;
                            }

                            if(comment.downvoted === true){
                                document.querySelector(`.downvote-${comment.id}`).classList.add('liked') ;
                            }

                            document.querySelector(`.js-upvote-button-${comment.id}`).addEventListener('click', () => {
                                if(comment.upvoted === false){
                                    comment.upvotes ++ ;
                                    if(comment.downvoted === true){ comment.downvotes -- ; } ;
                                    comment.upvoted = true ;
                                    comment.downvoted = false ;
                                    document.querySelector(`.upvote-${comment.id}`).classList.add('liked') ;
                                    document.querySelector(`.downvote-${comment.id}`).classList.remove('liked') ;
                                    document.querySelector(`.js-upvote-counter-${comment.id}`).innerHTML = comment.upvotes ;
                                    document.querySelector(`.js-downvote-counter-${comment.id}`).innerHTML = comment.downvotes ;
                                }else if(comment.upvoted === true){
                                    comment.upvotes -- ;
                                    comment.upvoted = false ;
                                    document.querySelector(`.upvote-${comment.id}`).classList.remove('liked') ;
                                    document.querySelector(`.js-upvote-counter-${comment.id}`).innerHTML = comment.upvotes ;
                                }
                                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                            }) ;
                
                            document.querySelector(`.js-downvote-button-${comment.id}`).addEventListener('click', () => {
                                if(comment.downvoted === false){
                                    comment.downvotes ++ ;
                                    if(comment.upvoted === true){ comment.upvotes -- ; } ;
                                    comment.downvoted = true ;
                                    comment.upvoted = false ;
                                    document.querySelector(`.downvote-${comment.id}`).classList.add('liked') ;
                                    document.querySelector(`.upvote-${comment.id}`).classList.remove('liked') ;
                                    document.querySelector(`.js-downvote-counter-${comment.id}`).innerHTML = comment.downvotes ;
                                    document.querySelector(`.js-upvote-counter-${comment.id}`).innerHTML = comment.upvotes ;
                                }else if(comment.downvoted === true){
                                    comment.downvotes -- ;
                                    comment.downvoted = false ;
                                    document.querySelector(`.downvote-${comment.id}`).classList.remove('liked') ;
                                    document.querySelector(`.js-downvote-counter-${comment.id}`).innerHTML = comment.downvotes ;
                                }
                                localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;
                            }) ;
                        }) ;
                    }
                }
            

                renderComments() ;

                document.querySelector(`.js-submit-a-comment-${post.postId}`).addEventListener('submit', (event) => {
                    event.preventDefault() ;
                    event.isSubmited = false ;

                    const commentInput = document.querySelector(`.js-comment-input-${post.postId}`) ;

                    post.comments.numberOfComments ++ ;

                    post.comments.commentIdIndexing ++ ;

                    post.comments.allComments.push(
                        {
                            commenterName: `${currentUserInformation.userName}`,
                            commenterHandle: `${currentUserInformation.userHandle}`,
                            comment: `${commentInput.value}`,
                            upvotes: 0,
                            downvotes: 0,
                            id: post.comments.commentIdIndexing,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: true 
                        }
                    ) ;

                    localStorage.setItem('userDatabase', JSON.stringify(userDatabase)) ;

                    commentInput.value = '' ;

                    renderComments() ;
                    return false 
                }) ;

                post.clickedComments = true ;
            }else if(post.clickedComments === true){
                document.querySelector(`.js-all-comments-${post.postId}`).innerHTML  = '' ;
                post.clickedComments = false ;
                
            }
        }) ;  
    }) ;

    document.querySelectorAll('.js-post-media').forEach((postMedia) => {
        postMedia.addEventListener('click', () => {
            let postMediaHtml = postMedia.outerHTML ;
            console.log(postMediaHtml)
            document.querySelector('.js-overlay').innerHTML = `
            <div class="adjust-img">${postMediaHtml}</div>
            <button class="js-close-overlay close-overlay-button"><img src="images and Icons/Icons/close-icon.png" alt=""></button>
        `;
    
            document.querySelector('.js-overlay').classList.add('overlay-on') ;
    
            document.querySelector('.js-close-overlay').addEventListener('click', () => {
                document.querySelector('.js-overlay').classList.remove('overlay-on') ;
                document.querySelector('.js-overlay').innerHTML = ``;
            }) ;
        }) ;
    }) ;
}


document.querySelector('.js-see-followed-post').addEventListener('click', () => {
    FollowingPostRendering()
}) ;


document.querySelector('.js-see-forYou-post').addEventListener('click', () => {
    forYouPostRendering()
}) ;


//trending page rendering

//geting the tags
const allTags = [] ;

userDatabase.forEach((user) => {
    user.post.forEach((post) => {
        post.tags.forEach((tag) => {
            allTags.push(tag) ;
        }) ;
    }) ;
}) ;

//filtering the tags by frequency and name
const fillteredTags = [] ;

allTags.forEach((tag) => {
    let tagFrequency = 0 ;
    const tagText = tag ;

    allTags.forEach((cTag, cindex) => {
        if(tagText === cTag){
            tagFrequency ++ ;
            //allTags.splice(cindex, 1) ;
        }
    }) ;

    let exist = false ;

    fillteredTags.forEach((fTag) => {
        if(fTag.tag === tagText){
            exist = true ;
        }
    }) ;

    if(exist === false){
        fillteredTags.push(
            {
                tag: tagText,
                frequency: tagFrequency 
            }
        ) ;
    }

}) ;

//sorting the tag
function AscendingOrder(array){
    const solution = [] ;
    
    while(array.length > 0){
        array.forEach((value, index) => {
            let count = 0 ;
            array.forEach((compare) => {
                if(value.frequency < compare.frequency || value.frequency === compare.frequency){
                    count++
                }
            })
            if(count === array.length){
                solution.push(value) ;
                array.splice(index, 1) ;
            }
        })
    }

    return solution ;
}

const sortedTags = AscendingOrder(fillteredTags).reverse() ;

//rendering the tags ;
let trendingHtml = '' ;
for(let i = 0 ; i < 5 ; i++){
    if(sortedTags[i]){
        trendingHtml += `
        <div class="trend-template">
            <div class="trend-name">
                <p><a href="utility-pages/search.html" class="trend-link">${sortedTags[i].tag}</a></p>
            </div>
            <div class="number-of-post">
               <p>${sortedTags[i].frequency}k post</p>
            </div>
        </div>
        ` ;
    }
}

document.querySelector('.js-treding-bar').innerHTML = trendingHtml ;

//document.querySelector('js-page-on').classList.add('page-on') ;

