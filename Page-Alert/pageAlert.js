const template = document.createElement('template');
template.innerHTML = `
<style>
    .page-alert{
        border: 1px solid #ccc;
        border-top: 10px solid;
        box-shadow: 0 1px 0 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 1px 1px -1px rgba(0,0,0,.2);
        font-family: inherit;
        padding: 1rem;
        position: relative;
    }
    .warning{
        border-top-color: #ff9800;
    }
        .warning::after{
            content: "WARNING";
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: -1;
            font-size: 3rem;
            color: #eee;
        }
    .info{
        border-top-color: #03a9f4;
    }
        .info::after{
            content: "INFORMATION";
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: -1;
            font-size: 3rem;
            color: #eee;
        }
    .danger{
        border-top-color: #f44336;
    }
        .danger::after{
            content: "DANGER";
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: -1;
            font-size: 3rem;
            color: #eee;
        }
    .success{
        border-top-color: #4caf50;
    }
        .success::after{
            content: "SUCCESS";
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: -1;
            font-size: 3rem;
            color: #eee;
        }
    h2{
        margin: 0 0 1rem;
    }
    .alert-info{
        margin: 1rem 0;
    }
    a {
        background: linear-gradient(to right,#EEE 50%,rgba(238,238,238,.5) 50%);
        background-position: right bottom;
        background-size: 200% 100%;
        border: 2px solid #eee;
        color: #000;
        display: inline-block;
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

<div class="page-alert" role="alert">
    <h2></h2>
    <div class="alert-info">
    </div>
</div>
`;

class PageAlert extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        document.body.insertBefore(this, document.body.firstChild); //need to insert it at the top of the page
        this.getAtrtibuteValues();
    }
    //Method - Get attribute values
    getAtrtibuteValues(){
        let alertSeverity = '';
        let alertHeading = '';
        let alertInfo = ''
        let alertLink = '';
        let alertLinkTextSize = '';

        if (this.getAttribute('data-alertSeverity')){  //Check to see if user included severity
            alertSeverity = this.getAttribute('data-alertSeverity'); //If so, grab it...
        }
        else{
            alertSeverity = 'info' //...otherwise assign a default
        }
        if (this.getAttribute('data-alertHeading')){ //Check to see if user included a heading
            alertHeading = this.getAttribute('data-alertHeading'); //If so, grab it...
        }
        else{
            alertHeading = 'Alert Heading' //...otherwise assign a default
        }
        if (this.getAttribute('data-alertInfo')){ //Check to see if user included alert information
            alertInfo = this.getAttribute('data-alertInfo'); //If so, grab it...
        }
        else{
            alertInfo = 'Alert information should go here.' //...otherwise assign a default
        }
        if (this.getAttribute('data-alertLink')){ //Check to see if user included a link
            alertLink = this.getAttribute('data-alertLink'); //If so, grab it...
        }
        else{
            alertLink = false; //...otherwise default to 'false'
        }
        if (this.getAttribute('data-alertLinkTextSize')){ //Check to see if user included a link text size
            alertLinkTextSize ="font-size:" + this.getAttribute('data-alertLinkTextSize').toString(); //If so, grab it...
        }
        else{
            alertLinkTextSize = '1rem';
        }
        this.populateAlert(alertSeverity,alertHeading,alertInfo,alertLink,alertLinkTextSize); //call method to populate alert box
    }
    //Method - Populate alert box with user provided input or default values
    populateAlert(alertSeverity,alertHeading,alertInfo,alertLink){
        this.shadowRoot.querySelector('.page-alert').classList.add(alertSeverity);
        this.shadowRoot.querySelector('h2').innerText = alertHeading
        this.shadowRoot.querySelector('.alert-info').innerHTML = alertInfo
        if(alertLink !== false){ //If user supplied a link, need to create an anchor and append to the alert box
            let anchor = document.createElement('a');
            anchor.innerText = 'View More';
            anchor.setAttribute('href', alertLink);
            anchor.setAttribute('title','View More');
            anchor.setAttribute('style', alertLinkTextSize);
            let svgIcon = '<span aria-hidden="true"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><!-- Font Awesome Free 5.15.4 by fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path></svg></span>'; 
            anchor.insertAdjacentHTML('beforeend',svgIcon);
            this.shadowRoot.querySelector('.page-alert').appendChild(anchor);
        }

    }

}
//If the element is on the page, we need to define it, otherwise we can ignore.
if (document.querySelectorAll('page-alert').length > 0) { 
    window.customElements.define('page-alert', PageAlert);
}