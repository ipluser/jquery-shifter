## jquery-shifter
Simple and lightweight shift/slide plugin for jquery(less than 1kb).

![jquery-shifter-samples](public/img/samples.gif)

## Resources
- [online example](http://ipluser.github.io/jquery-shifter/)

## How to use
### Installing
```
bower install jquery-shifter
```

or

```
npm install jquery-shifter
```

### Include jquery, jquery-shifter and css
```html
<script src="jquery-latest.min.js"></script>
<script src="jquery-shifter.min.js"></script>
<link href="jquery-shifter.css" rel="stylesheet" />
```

### Ready your HTML
```html
<div class="shifter-wrap">
  <ul class="shifter">
    <li><img src="images/img1.jpg" /></li>
    <li><img src="images/img2.jpg" /></li>
    <li><img src="images/img3.jpg" /></li>
    <li><img src="images/img4.jpg" /></li>
    <li><img src="images/img5.jpg" /></li>
    <li><img src="images/img6.jpg" /></li>
    <li><img src="images/img7.jpg" /></li>
    <li><img src="images/img8.jpg" /></li>
    <li><img src="images/img9.jpg" /></li>
  </ul>
</div>
```

### Plug it all together
```javascript
$(function() {
  $('.shifter').shifter();
});
```

## Options
```javascript
  $('.shifter').shifter({
    forwardText: 'left',    // Text for the "forward" button, default is "forward"
    backwardText: 'right',  // Text for the "backward" button, default is "backward"
    forwardSelector: '#forwardArrow',   // Declare selector of "forward" button 
    backwardSelector: '#backwardArrow', // Declare selector of "backward" button
    switcher: true, // Whether navigator auto to switch
    speed: 1000,    // The speed to animate each shift (in milliseconds), default is 2000
    responsive: true,  // true/false or { delay: 200 }, default open responsive ability and set delay is 200
    maxShift: 3     // The maximum number of each shift, default is 4
  });
```

## Changelog
### 0.6.0
- add responsive ability
- add switcher option
- supports amd and umd

10.07.2016

### 0.5.3
- refactor codes
- add gulp, eslint, etc

26.04.2016

### 0.5.2
- fix reverse elements of arrow

07.04.2016

### 0.5.1
- fix can not show custom forward and backward selector

05.12.2015

### 0.5.0
- initial release

08.11.2015

## License

  [MIT](LICENSE)
