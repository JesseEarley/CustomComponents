const template = document.createElement('template');
template.innerHTML = `
    <style>
    .card{

    }

    .card{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        margin: 1rem;
        text-align: center;
        transition: all .2s;
    }

        .card img{
            width: 100%;
        }

    .card.hover:hover{
        transform: scale(1.05);
        box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14),0 9px 46px 8px rgba(0,0,0,0.12),0 11px 15px -7px rgba(0,0,0,0.2);
    }

    .card-description{
        padding: 1rem;
    }
                
    a {
        background: linear-gradient(to right,#EEE 50%,rgba(238,238,238,.5) 50%);
        background-position: right bottom;
        background-size: 200% 100%;
        border: 2px solid #eee;
        color: #000;
        display: inline-block;
        font-size: 1.6rem;
        font-weight: bold;
        padding: 10px;
        text-decoration: none;
        text-transform: uppercase;
        transition: all .4s;
    }
        a:hover,
        a:focus {
            background-position: left bottom;
            color: black;
        }
        a:focus{
            outline: 2px dotted #AAA;
        }
        a svg{
            display: inline-block;
            height: auto;
            padding-left: 1rem;
            width:1.2rem;
        }
               
    </style>

    <div class="card">
        <img src="" alt="">
        <div class="card-description">
            <h2></h2>
        </div>
    </div>
`;

class ImageCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.getCardContent();
    }

     //Method - Get the content for the card
     getCardContent(){
        let cardHover = '';
        if (this.getAttribute('data-cardHover')) {
            cardHover = this.getAttribute('data-cardHover').toLowerCase(); //If so, grab it.
        }
        //Check to see if user included an image
        let cardImageURL = '';
        if (this.getAttribute('data-cardImageURL')) {
            cardImageURL = this.getAttribute('data-cardImageURL'); //If so, grab it.
        }

        let cardHeading = '';
        if (this.getAttribute('data-cardHeading')) {
            cardHeading = this.getAttribute('data-cardHeading'); //If so, grab it.
        }
        else{
            cardHeading = 'Card Heading';
        }

        let cardDescription = '';
        if (this.getAttribute('data-cardDescription')) {
            cardDescription = this.getAttribute('data-cardDescription'); //If so, grab it.
        }

        let cardLink = '';
        if (this.getAttribute('data-cardLink')) {
            cardLink = this.getAttribute('data-cardLink'); //If so, grab it.
        }
        this.setCardContent(cardHover,cardImageURL, cardHeading, cardDescription, cardLink);
    }

    //Method - Populate the description box with title, paragraph and link (if applicable).
    setCardContent(cardHover,cardImageURL, cardHeading, cardDescription, cardLink){
        if(cardHover == 'true'){
            this.shadowRoot.querySelector('.card').classList.add('hover');
        }
        this.shadowRoot.querySelector('img').src = cardImageURL;
        this.shadowRoot.querySelector('img').alt = cardHeading + ' image.';
        this.shadowRoot.querySelector('img').title = cardHeading + ' image.';
        this.shadowRoot.querySelector('h2').innerHTML = cardHeading;
        if (cardDescription != ''){
            let description = document.createElement('p');
            description.innerText = cardDescription;
            this.shadowRoot.querySelector('.card-description').appendChild(description);
        }
        if (cardLink != ''){
            let anchor = document.createElement('a');
            anchor.innerText = 'View More';
            anchor.setAttribute('href', cardLink);
            anchor.setAttribute('title','View More');
            let svgIcon = '<span aria-hidden="true"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><!-- Font Awesome Free 5.15.4 by fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path></svg></span>'; 
            anchor.insertAdjacentHTML('beforeend',svgIcon);
            this.shadowRoot.querySelector('.card-description').appendChild(anchor);
        }
    }

}

//If the element is on the page, we need to define it, otherwise we can ignore.
if (document.querySelectorAll('image-card').length > 0) { 
    window.customElements.define('image-card', ImageCard);
}