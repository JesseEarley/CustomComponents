const template = document.createElement('template');
template.innerHTML = `
    <style>
        .wrapper {
            display: grid;
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
                
        a {
            background: linear-gradient(to right,#fff 50%,rgba(24,69,59,0) 50%);
            background-position: right bottom;
            background-size: 200% 100%;
            border: 2px solid #FFF;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            padding: 10px;
            text-decoration: none;
            text-transform: uppercase;
            transition: all .4s;
            width: 200px;
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
        <video autoplay muted loop tabindex="-1">
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
        const videoSource = this.getAttribute('src');
        let videoHeight = this.getAttribute('height');
        if(videoHeight == null){
            videoHeight = '400px'; //Need to set a default if one is not defined by the user
        }
        this.setVideo(videoHeight, videoSource);
        this.getDescription();
        this.shadowRoot.querySelector('video').play(); //need this for Safari;
    }

    //Method - Set video properties.
    setVideo(videoHeight, videoSource){
        this.shadowRoot.querySelector('video').style.height = videoHeight;
        this.shadowRoot.querySelector('source').src = videoSource;
    }

    getDescription(){
        //Check to see if user included a title
        let contentTitle = '';
        if (this.getElementsByTagName('h2').length >= 1) {
            contentTitle = this.getElementsByTagName('h2')[0].innerHTML; //If so, grab it.
        }
        else{
            contentTitle = 'Heading'; //Need to set a default if one is not defined by the user
        }

        //Check to see if user included a title
        let contentDescription = '';
        if (this.getElementsByTagName('p').length >= 1) {
            contentDescription = this.getElementsByTagName('p')[0].innerHTML; //If so, grab it.
        }
        else{
            contentDescription = 'Lorem ipsum dolor sit amet, an his etiam torquatos. Tollit soleat phaedrum te duo, eum cu recteque expetendis neglegentur. Cu mentitum maiestatis persequeris pro, pri ponderum tractatos ei. Id qui nemore latine molestiae, ad mutat oblique delicatissimi pro.'; //Need to set a default if one is not defined by the user
        }

        //Check to see if user included a link
        let contentLink = '';
        if (this.getElementsByTagName('a').length >= 1){
            contentLink = this.getElementsByTagName('a')[0].href; //If so, grab it.
        }
        else{
            contentLink = false; //If not, let's set it to false
        }

        this.populateContent(contentTitle, contentDescription, contentLink);
    }

    //Method - Populate the description box with title, paragraph and link (if applicable).
    populateContent(contentTitle, contentDescription, contentLink){
        this.shadowRoot.querySelector('h2').innerText = contentTitle;
        this.shadowRoot.querySelector('p').innerText = contentDescription;
        if(contentLink !== false){
            let anchor = document.createElement('a');
            anchor.innerText = 'View More';
            anchor.setAttribute('href', contentLink);
            this.shadowRoot.querySelector('.description').appendChild(anchor);
        }
    }

}

//If the element is on the page, we need to define it, otherwise we can ignore.
if (document.querySelectorAll('video-infobox').length > 0) { 
    window.customElements.define('video-infobox', VideoInfoBox);
}