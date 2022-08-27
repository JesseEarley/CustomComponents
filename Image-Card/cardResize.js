function cardResize() {
    if(document.body.clientWidth > '1100'){
        document.querySelector('.card-container').setAttribute('style','display:grid; grid-template-columns: repeat(4,1fr);');
    }
    if(document.body.clientWidth <= '1100' && document.body.clientWidth >= '540' ){
        document.querySelector('.card-container').setAttribute('style','display:grid; grid-template-columns: repeat(2,1fr);');
    }
    if(document.body.clientWidth < '540'){
        document.querySelector('.card-container').setAttribute('style','display:grid; grid-template-columns: repeat(1,1fr);');
    }
  }

  document.addEventListener("DOMContentLoaded", function(event) { 
    if (document.querySelectorAll('.card-container').length > 0) { 
        cardResize(); //need to kick this off once to set the initial styles on the container;
        window.addEventListener('resize', cardResize); //need to call on every resize
    }
  });

