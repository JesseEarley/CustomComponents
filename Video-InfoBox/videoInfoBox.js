const template = document.createElement('template');
template.innerHTML = `
    <style>
        .wrapper {
            display: grid;
            font-family: inherit;
            grid-template-columns: repeat(6,1fr);
            margin: 1.6rem;
            position: relative;
        }

        video {
            grid-column: 1/-1;
            height: 500px;
            object-fit: cover;
            width: 100%;
        }

        .description {
            background: rgba(0, 0, 0, 0.5);
            bottom: 0;
            box-sizing: border-box;
            color: #f1f1f1;
            font-size: 2rem;
            padding: 1.6rem 1.6rem 2rem;
            position: absolute;
            width: 100%;
        }
            h2{
                margin: 0;
            }
            p{
                margin: 1rem 0 2rem;
            }
                
            a {
                background: linear-gradient(to right,#fff 50%,rgba(24,69,59,0) 50%);
                background-position: right bottom;
                background-size: 200% 100%;
                border: 2px solid #FFF;
                color: #fff;
                display: inline-block;
                font-size: 18px;
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
                    outline: 2px dotted #FFF;
                }
    </style>

    <div class="wrapper">
        <video autoplay playsinline muted loop tabindex="-1">
        <source src="" type="video/mp4">
        Your browser does not support HTML5 video.
        </video>

        <div class="description">
            <h2></h2>
            <p></p>
        </div>
    </div>
`;

class VideoInfoBox extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.setVideo( );
        this.getInfoBoxContent();
        if(navigator.userAgent.toLowerCase().indexOf('safari/') > -1) {
            this.shadowRoot.querySelector('video').play(); //need this for Safari;
          }
    }

    //Method - Get/Set video properties.
    setVideo(){
        let videoURL = this.getAttribute('data-videoURL');
        let height = this.getAttribute('data-height');
        if(height == null){
            height = '400px'; //Need to set a default if one is not defined by the user
        }
        this.shadowRoot.querySelector('source').src = videoURL;
        this.shadowRoot.querySelector('video').style.height = height;
    }

     //Method - Get the content for the infobox
    getInfoBoxContent(){
        //Check to see if user included a title
        let contentTitle = '';
        if (this.getAttribute('data-title')) {
            contentTitle = this.getAttribute('data-title'); //If so, grab it.
        }
        else{
            contentTitle = 'Default Heading'; //Need to set a default if one is not defined by the user
        }

        //Check to see if user included a title
        let contentDescription = '';
        if (this.getAttribute('data-description')) {
            contentDescription = this.getAttribute('data-description') //If so, grab it.
        }
        else{
            contentDescription = 'Lorem ipsum dolor sit amet, an his etiam torquatos.'; //Need to set a default if one is not defined by the user
        }

        //Check to see if user included a link
        let contentLink = '';
        if (this.getAttribute('data-linkURL')){
            contentLink = this.getAttribute('data-linkURL'); //If so, grab it.
        }
        else{
            contentLink = false; //If not, let's set it to false
        }

        this.setDescription(contentTitle, contentDescription, contentLink);
    }

    //Method - Populate the description box with title, paragraph and link (if applicable).
    setDescription(contentTitle, contentDescription, contentLink){
        this.shadowRoot.querySelector('h2').innerText = contentTitle;
        this.shadowRoot.querySelector('p').innerText = contentDescription;
        if(contentLink !== false){
            let anchor = document.createElement('a');
            anchor.innerText = 'View More';
            anchor.setAttribute('href', contentLink);
            anchor.setAttribute('title','View More');
            this.shadowRoot.querySelector('.description').appendChild(anchor);
        }
    }

}

//If the element is on the page, we need to define it, otherwise we can ignore.
if (document.querySelectorAll('video-infobox').length > 0) { 
    window.customElements.define('video-infobox', VideoInfoBox);
}