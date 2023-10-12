export function numberStandard(post){
    let postLikes

    if(post.Likes >= 1000 && post.Likes < 1000000){
        postLikes = (post.Likes / 1000).toFixed(0) + 'K' ;
        
        let postLikesCompare = (post.Likes / 1000).toFixed(0) ;

        const acceptableRoundNumbers = [100, 200, 300, 400, 500, 600, 700, 800, 900] ;

        let comparism = post.Likes - (postLikesCompare * 1000) ;

        let match = false ;

        acceptableRoundNumbers.forEach((number) => {
            if(comparism === number){
                match = true ;
            }
        }) ;

        if(match === true){
            postLikes = (post.Likes / 1000).toFixed(1) + 'K' ;
        }
    }else if(post.Likes >= 1000000){
        postLikes = (post.Likes / 1000000).toFixed(0) + 'M' ;

        let postLikesCompare = (post.Likes / 1000000).toFixed(0) ;

        const acceptableRoundNumbers = [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000] ;

        let comparism = post.Likes - (postLikesCompare * 1000000) ;

        let match = false ;

        acceptableRoundNumbers.forEach((number) => {
            if(comparism === number){
                match = true ;
            }
        }) ;

        if(match === true){
            postLikes = (post.Likes / 1000000).toFixed(1) + 'M' ;
        }
    }else{
        postLikes = post.Likes ;
    }

    return postLikes ;
}
