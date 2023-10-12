const mediaQueries = matchMedia('(max-width: 884px)') ;

mediaQueries.addEventListener('', () => {
    document.querySelectorAll('.link-label').forEach((para) => {
        para.remove() ;
    }) ;
}) ;