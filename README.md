# CustomComponents

CustomComponents is my own personal custom web components library.

## Demo
[https://jesseearley.github.io/CustomComponents/](https://jesseearley.github.io/CustomComponents/)

## Installation

Download or clone the project and import the minified JS files into your own projects. 

## Usage 
### Page-Alert
### JS
```javascript
<script src="pageAlert.min.js"></script>
```
#### HTML
```html
<page-alert 
    data-alertSeverity="warning" 
    data-alertHeading='This is a Warning alert' 
    data-alertInfo ="This alert has an associated link button"
    data-alertLink="https://www.google.com">
</page-alert>
```

#### Available Attributes
```html
<!-- <page-alert> component
    Available attributes:
    data-alertSeverity - options include: 'info', 'danger', 'warning', 'success'
    data-alertHeading - specify the title to appear in the alert box
    data-alertInfo - specify alert information that should follow the title
    data-alertLink - specify URL to be used for button (OPTIONAL)

    Excluded attributes will default to the following:
    data-alertSeverity - info
    data-alertHeading - 'Alert Heading'
    data-alertInfo - 'Alert information should go here.'
-->   
```

### Random-Image
#### JS
```javascript
<script src="randomImage.min.js"></script>
```
#### HTML
```html
<random-image data-height="400px" data-float="left">
    <img src="images/1.jpg" alt="image 1"/>
    <img src="images/2.jpg" alt="image 2" />
    <img src="images/3.jpg" alt="image 3" />
    <img src="images/4.jpg" alt="image 4">
    <img src="images/5.jpg" alt="image 5">
</random-image>
```

#### Available Attributes
```html
<!-- <random-image> component
    Available attributes:
    data-height - specify height in px
    data-float - options: left, right, none

    Excluded attributes will default to the following:
    height - 400px
    float - none
-->    
```

### Video-InfoBox
#### JS
```javascript
<script src="videoInfoBox.min.js"></script>
```
#### HTML
```html
<video-infobox 
    data-videoURL="https://www.w3schools.com/howto/rain.mp4" 
    data-height="500px"
    data-title="Title" 
    data-description="Description of video or content." 
    data-linkURL="https://www.google.com">
</video-infobox>
```

#### Available Attributes
```html
<!-- <video-infobox> component
    Available attributes:
    data-videoURL - specify URL for video file
    data-height - specify height in px
    data-title - specify title that will appear as a heading
    data-description - specify description that will appear below the heading
    data-linkURL - specify URL to be used for button (OPTIONAL)

    Excluded attributes will default to the following:
    data-height - 400px
    data-title - 'Default Heading'
    data-description - 'Lorem ipsum dolor sit amet, an his etiam torquatos.'
-->   
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
