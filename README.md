# CustomComponents

CustomComponents is my own personal custom web components library.

## Installation

Download or clone the project and import the minified JS files into your own projects. 

## Usage 
### Page-Alert
### JS
```javascript
<script src="pageAlert.min.js">pageAlert.min.js</script>
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

### Random-Image
### JS
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

### Vide-InfoBox
### JS
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
