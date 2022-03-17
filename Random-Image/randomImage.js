const template = document.createElement('template');
template.innerHTML = `
    <style>
    .randomImage{
        display: block;
        margin: 1rem;
    }
    .randomImage img{
        max-height: 100%;
        max-width: 100%;
    }

    @media only screen and (max-width: 500px) {
        .randomImage{
            height: auto !important;
        }
      }
    </style>
    <div class="randomImage">
        <img src="" alt="" title="" />
    </div>
`;

class RandomImage extends HTMLElement{
    constructor(){
        super();     

        this.attachShadow({mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        let userDefinedHeight = this.getAttribute('height');
        let userDefinedFloat = this.getAttribute('float');
        if(userDefinedHeight == null){
            userDefinedHeight = '400px'; //Need to set a default if one is not defined by the user
        }
        if(userDefinedFloat == null){
            userDefinedFloat = 'none'; //Need to set a default if one is not defined by the user
        }
        this.shadowRoot.querySelector('.randomImage').style.height = userDefinedHeight;
        this.shadowRoot.querySelector('.randomImage').style.float = userDefinedFloat;
        const randomImages = document.querySelectorAll('random-image img');
        this.getRandomImage(randomImages);
    }

    //Method - Determine which photo to display at random.
    getRandomImage(randomImages){
        let min = Math.ceil(0);
        let max = Math.floor(randomImages.length);
        this.displayRandomImage(randomImages[(Math.floor(Math.random() * (max-min)+min))]);
    }

    //Method - Assign the randomly selected image to the img tag 
    displayRandomImage(randomizedImage) {
        this.shadowRoot.querySelector('img').src = randomizedImage.src;
        let altText = randomizedImage.alt;
        if(altText == ''){ //Need to see if user supplied alt text (as they should have for accessibility). If not, need to add default alt text.
            altText = 'Randomized Image'
        }
        this.shadowRoot.querySelector('img').alt = altText;
        this.shadowRoot.querySelector('img').title = altText;
    }
}

//If the element is on the page, we need to define it, otherwise we can ignore.
if (document.querySelectorAll('random-image').length > 0) { 
    window.customElements.define('random-image', RandomImage);
}


