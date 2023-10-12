export const userDatabase = JSON.parse(localStorage.getItem('userDatabase')) || [
    {
        userHandle: `@Mike45`,
        userName: 'MiketheMan',
        userPassword: 'Joviftjay007',
        userEmail: 'tallamichael007@gmail.com',
        followedbyCurrentUser: false ,
        isUser: false ,
        post: [
            {
                caption: 'Has anyone tried creating a fantasy mma app that is actually good?' ,
                media: '' ,
                tags: [
                    '#mma',
                    '#mixedMatialArts',
                    '#combatSports'
                ],
                userHandle: `@Mike45`,
                userName: 'MiketheMan',
                postId: 'C1' + 1,
                Likes: 0,
                liked: false,
                clickedComments: false,
                byCurrentUser: false,
                saved: false,
                comments: {
                    numberOfComments: 2 ,
                    commentIdIndexing: 2,
                    allComments: [
                        {
                            commenterName: 'Daily Combat Sports',
                            commenterHandle: '@all_combat',
                            comment: 'Lol I think mma Fanatics is great app for this, theres still more they could do tho.😩',
                            upvotes: 0,
                            downvotes: 0,
                            id: 1,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        },
                        {
                            commenterName: 'Footy News',
                            commenterHandle: '@footyNews',
                            comment: 'I think MMA will benefit graetly from a platform similar to that of fantasy football',
                            upvotes: 0,
                            downvotes: 0,  
                            id: 2,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        }
                    ]
                }
            }
        ],
    },
    {
        userHandle: `@all_combat`,
        userName: 'Fight Hub',
        userPassword: 'Joviftjay007',
        userEmail: 'tallamichael007@gmail.com',
        followedbyCurrentUser: false ,
        isUser: false ,
        post: [
            {
                caption: 'Tito vs Chuck 4 who wins?' ,
                media: '' ,
                tags: [
                    '#mma',
                    '#mixedMatialArts',
                    '#combatSports'
                ],
                userHandle: `@all_combat`,
                userName: 'Fight Hub',
                postId: 'C2' + 1,
                Likes: 500000,
                liked: false,
                clickedComments: false,
                byCurrentUser: false,
                saved: false,
                comments: {
                    numberOfComments: 3 ,
                    commentIdIndexing: 3,
                    allComments: [
                        {
                            commenterName: 'Fight Hub',
                            commenterHandle: '@all_combat',
                            comment: 'The tito Fans are going to have a field day with this one😂',
                            upvotes: 2500,
                            downvotes: 405,
                            id: 1,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        },
                        {
                            commenterName: 'Footy News',
                            commenterHandle: '@footyNews',
                            comment: 'Bro just loves creating controversy at this point🤣🤣',
                            upvotes: 0,
                            downvotes: 0,  
                            id: 2,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        },
                        {
                            commenterName: 'MiketheMan',
                            commenterHandle: '@Mike45',
                            comment: 'Chuck wins imo but tito fans are open to agure....',
                            upvotes: 512,
                            downvotes: 211,  
                            id: 3,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        }
                    ]
                }
            },
            {
                caption: 'Who saw that coming Boby green holy f*ck!! 😳' ,
                media: '' ,
                tags: [
                    '#mma',
                    '#mixedMatialArts',
                    '#combatSports'
                ],
                userHandle: `@all_combat`,
                userName: 'Fight Hub',
                postId: 'C2' + 2,
                Likes: 50,
                liked: false,
                clickedComments: false,
                byCurrentUser: false,
                saved: false,
                comments: {
                    numberOfComments: 0 ,
                    commentIdIndexing: 0,
                    allComments: [
                    ]
                }
            }
        ],
    },

    {
        userHandle: `@footyNews`,
        userName: 'Football Fanatics',
        userPassword: 'Joviftjay007',
        userEmail: 'tallamichael007@gmail.com',
        followedbyCurrentUser: false ,
        isUser: false ,
        post: [
            {
                caption: 'Football is like a game of chess' ,
                media: ' <img src="images and Icons/user-data/media/@footyNews/001.jpg" alt="" class="post-media-img js-post-media">' ,
                tags: [
                    '#football',
                    '#messivsronaldo',
                    '#theGoat'
                ],
                userHandle: `@footyNews`,
                userName: 'Football Fanatics',
                postId: 'C3' + 1,
                Likes: 0,
                liked: false,
                clickedComments: false,
                byCurrentUser: false,
                saved: false,
                comments: {
                    numberOfComments: 2 ,
                    commentIdIndexing: 2,
                    allComments: [
                        {
                            commenterName: 'Fight Hub',
                            commenterHandle: '@all_combat',
                            comment: 'preach brotha',
                            upvotes: 502,
                            downvotes: 22,
                            id: 1,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        },
                        {
                            commenterName: 'Football Fanatics',
                            commenterHandle: '@footyNews',
                            comment: 'Goat vs Goat🐐',
                            upvotes: 0,
                            downvotes: 0,  
                            id: 2,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        }
                    ]
                }
            }
        ],
    },

    {
        userHandle: `@thememgod`,
        userName: 'theMemeGod',
        userPassword: 'Joviftjay007',
        userEmail: 'tallamichael007@gmail.com',
        followedbyCurrentUser: false ,
        isUser: false ,
        post: [
            {
                caption: 'throw back to memes of the good ol days lol😂' ,
                media: '<video src="images and Icons/user-data/media/@thememgod/001.mp4" controls class="post-media-img js-post-media"></video>' ,
                tags: [
                    '#memes',
                    '#dailymemes',
                    '#funnymemes'
                ],
                userHandle: `@thememgod`,
                userName: 'theMemeGod',
                postId: 'C4' + 1,
                Likes: 20000000,
                liked: false,
                clickedComments: false,
                byCurrentUser: false,
                saved: false,
                comments: {
                    numberOfComments: 2 ,
                    commentIdIndexing: 2,
                    allComments: [
                        {
                            commenterName: 'Fight Hub',
                            commenterHandle: '@all_combat',
                            comment: 'lol forgot all about this song and the smurfs',
                            upvotes: 7702,
                            downvotes: 202,
                            id: 1,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        },
                        {
                            commenterName: 'MiketheMan',
                            commenterHandle: '@Mike45',
                            comment: 'this meme aged like milk ngl',
                            upvotes: 500,
                            downvotes: 20,  
                            id: 2,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        }
                    ]
                }
            }
        ],
    },

    {
        userHandle: `@danaWhiteMMa`,
        userName: 'Dovy',
        userPassword: 'Joviftjay007',
        userEmail: 'tallamichael007@gmail.com',
        followedbyCurrentUser: false ,
        isUser: false ,
        post: [
            {
                caption: 'i wish ufc weighed fighters on fight day, and put there octagon weight on the tale of the tape' ,
                media: '' ,
                tags: [
                    '#mma',
                    '#UFC',
                    '#weightcut'
                ],
                userHandle: `@danaWhiteMMa`,
                userName: 'Dovy',
                postId: 'C5' + 1,
                Likes: 30800,
                liked: false,
                clickedComments: false,
                byCurrentUser: false,
                saved: false,
                comments: {
                    numberOfComments: 2 ,
                    commentIdIndexing: 2,
                    allComments: [
                        {
                            commenterName: 'Fight Hub',
                            commenterHandle: '@all_combat',
                            comment: 'preach fam',
                            upvotes: 102,
                            downvotes: 24,
                            id: 1,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        },
                        {
                            commenterName: 'MiketheMan',
                            commenterHandle: '@Mike45',
                            comment: 'the dehydration issues would just be too much to deal with',
                            upvotes: 789,
                            downvotes: 455,  
                            id: 2,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        }
                    ]
                }
            },

            {
                caption: 'bro yoel romero is so scary.' ,
                media: '<video src="images and Icons/user-data/media/@danaWhiteMMa/001.mp4" controls class="post-media-img js-post-media"></video>' ,
                tags: [
                    '#mma',
                    '#UFC',
                    '#weightcut'
                ],
                userHandle: `@danaWhiteMMa`,
                userName: 'Dovy',
                postId: 'C5' + 2,
                Likes: 30800600,
                liked: false,
                clickedComments: false,
                byCurrentUser: false,
                saved: false,
                comments: {
                    numberOfComments: 2 ,
                    commentIdIndexing: 2,
                    allComments: [
                        {
                            commenterName: 'Fight Hub',
                            commenterHandle: '@all_combat',
                            comment: 'boogie man lol',
                            upvotes: 102,
                            downvotes: 24,
                            id: 1,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        },
                        {
                            commenterName: 'MiketheMan',
                            commenterHandle: '@Mike45',
                            comment: 'scary af',
                            upvotes: 0,
                            downvotes: 4,  
                            id: 2,
                            upvoted: false,
                            downvoted: false,
                            byCurrentUser: false
                        }
                    ]
                }
            }
        ],
    },
    
] ;

export const currentUserInformation = JSON.parse(localStorage.getItem('currentUser')) || {
    userName: '',
    userHandle: ``,
    userStory: localStorage.getItem('userStory') || 'images and Icons/user-data/current-user-data/generic-user-profile-picture.jpg',
    userProfilePicture: 'images and Icons/user-data/current-user-data/generic-user-profile-picture.jpg',
    userSavedPost: [] ,
    postIdIndexing: 0,
    userPost: []
} ;
