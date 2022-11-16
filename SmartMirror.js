//Ejiroghene Greg-Amaihwe
//CS3366 Human Computer Interaction
//Project 2 (MAGIC MIRROR)


//images (blue tint and notification shape)
let notificationBanner;

//buttons
let onButton;
let offButton;
var buttonText;

//webcam
let capture;

//time and date
let hrDisplay, minDisplay, sec, dy, mo, yr;
var amorpm;
var date = new Date();
var dow = date.getDay();
var hr = date.getHours();
var min = date.getMinutes();



//reminders
let rem;
var reminders = ["Wire 6 Billion to Charity", "Meeting with UN officials", "Get Christmas Cards",];

//on/off state boolean
let state;

//drag and drop
var dragging = false; // Is the object being dragged?
var draggingCal = false;
var draggingWeather = false;
var draggingMusic = false;
var draggingLights = false;

var rollover = false; // Is the mouse over the ellipse?
var rolloverCal = false;
var rolloverWeather = false;
var rolloverMusic = false;
var rolloverLights = false;

var x, y, w, h;          // Location and size
var x2, y2, w2, h2;
var x3, y3, w3, h3;
var x4, y4, w4, h4;
var x5, y5, w5, h5;

var offsetX, offsetY;    // Mouseclick offset
var offsetX2, offsetY2;
var offsetX3, offsetY3;
var offsetX4, offsetY4;
var offsetX5, offsetY5;



//
var weatherList;
var currentWeather;
var currentTemp;
var currentIcon;
let source = "";
let json;
var img;
var articleOneShown = 0;
let news1;


let brightSlider;
let brightImg;


function preload() {

  let url = "https://api.openweathermap.org/data/2.5/forecast/daily?zip=79401,us&units=imperial&cnt=6&APPID=e812164ca05ed9e0344b89ebe273c141";
  weatherJson = loadJSON(url);
  
  let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Lubbock&units=imperial&APPID=e812164ca05ed9e0344b89ebe273c141";
  currentWeatherJson = loadJSON(currentWeatherUrl);
  
  newsApiKey = 'ebb9aecdae8c4a7b8b217b7bdb170aad';
  
  var newsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=ebb9aecdae8c4a7b8b217b7bdb170aad';
  newsJson = loadJSON(newsUrl);
  
    
  brightImg = loadImage('sun.png');
  

}

function setup() {

  createCanvas(1038, 1035);
  capture = createCapture(VIDEO);
  capture.size(1000, 650);
  capture.hide();
  
  
  notificationBanner = loadImage("notificationBlue.png");
  //bathroom = loadImage("bathroom.png");
  //volIcon = loadImage("volume.png");
  
  // Starting location of time/date
  x = 350;
  y = 10 + 40;
  // Dimensions of time/date
  w = 250;
  h = 60;
  
  // Starting location of calendar
  x2 = 12 + 18;
  y2 = 450;
  // Dimensions of calendar
  w2 = 250;
  h2 = 200;
  
  
  // Starting location of weather  
  x3 = 12 + 13;
  y3 = 120 + 34;
  // Dimensions of weather  
  w3 = 300;
  h3 = 250;
  
  
  // Starting location of lights
  x5 = 940;
  y5 = 520;
  // Dimensions of lights
  w5 = 85;
  h5 = 75;
 
  hr = hour();
  min = minute();
  minDisplay = minute();
  dy = day();
  mo = month();
  yr = year();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
  mo = months[mo-1];
  var daysow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
  dow = daysow[dow];
  
  state = false;
  powerButton(state);
  

  //weather
  weatherList = weatherJson.list;
  currentTemp = currentWeatherJson.main.temp;
  currentIcon = currentWeatherJson.weather[0].icon;
  
  //news
  source = newsJson.articles[0].source.name;
  title = newsJson.articles[0].title;
  description = newsJson.articles[0].description;
  newsImg = newsJson.articles[0].urlToImage;
  
  
  
  //Slider for adjusting brightness
  brightSlider = createSlider(0, 255, 0);
  brightSlider.style('width', '180px');
  brightSlider.hide();
  
  
  
}

function draw() {
  
  font = loadFont("Inconsolata-Regular.ttf");
  
 
  sec = second();
  
  
  
  //make it a mirror image, not backwards
  translate(1000, 0);
  scale(-1.0, 1.0);
  image(capture, -19, 34, 1000, 650);
  translate(1000, 0);
  scale(-1.0, 1.0);
  
  
  
  // Is mouse over date/time
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } 
  else {
    rollover = false;
  }
  
  //Is mouse over calendar
  if (mouseX > x2 && mouseX < x2 + w2 && mouseY > y2 && mouseY < y2 + h2) {
    rolloverCal = true;
  } 
  else {
    rolloverCal = false;
  }
  
  // Is mouse over weather
  if (mouseX > x3 && mouseX < x3 + w3 && mouseY > y3 && mouseY < y3 + h3) {
    rolloverWeather = true;
  } 
  else {
    rolloverWeather = false;
  }
  
  //// Is mouse over music
  //if (mouseX > x4 && mouseX < x4 + w4 && mouseY > y4 && mouseY < y4 + h4) {
  //  rolloverMusic = true;
  //} 
  //else {
  //  rolloverMusic = false;
  //}
  
  // Is mouse over lights
  if (mouseX > x5 && mouseX < x5 + w5 && mouseY > y5 && mouseY < y5 + h5) {
    rolloverLights = true;
  } 
  else {
    rolloverLights = false;
  }
  
  // Adjust date/time location if being dragged
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }
  
  // Adjust calendar location if being dragged
  if (draggingCal) {
    x2 = mouseX + offsetX2;
    y2 = mouseY + offsetY2;
  }
  
  // Adjust weather location if being dragged
  if (draggingWeather) {
    x3 = mouseX + offsetX3;
    y3 = mouseY + offsetY3;
  }
  
  
  // Adjust lights location if being dragged
  if (draggingLights) {
    x5 = mouseX + offsetX5;
    y5 = mouseY + offsetY5;
  }
  
  //font stuff
  strokeWeight(0.5);
  stroke(1);
  //textFont("Sicret_PERSONAL-SemiBold")

  
  //format minutes
  if(min < 10) {
    minDisplay = "0" + min.toString();
  }
  
  //format hours
  hrDisplay = hr;
  
  if(hr < 12) {
    amorpm = "AM";
    if(hr == 0) {
      hrDisplay = 12;
    }
  }
  else if(hr >= 12) {
    amorpm = "PM";
    if(hr != 12) {
      hrDisplay -= 12;
    }
  }
  
  // Different fill based on state of date/time
  if (dragging) {
    fill (125);
  } else if (rollover) {
    //fill(200);
    fill(255);
  } else {
    fill(255);
  }
  
  //draw time and date text
  textSize(23);
  textAlign(CENTER);
  text(dow + ', ' + mo + ' ' + dy + ', ' + yr + "\n" + "[" + hrDisplay + " : " + minDisplay + " " + amorpm + "]", x, y, w+100, h+100);
  
  // Different fill based on state of Cal
  if (draggingCal) {
    fill (125);
  } else if (rolloverCal) {
    //fill(200);
    fill(255);
  } else {
    fill(255);
  }
  
  //draw all elements when on/off button is on
  if(state == true) {
    textSize(16);
    textAlign(LEFT);
    textSize(20);
    text("CALENDAR", x2, y2, w2, h2 + 20);
    
    textSize(16);
    text("\t\t-Today at 10:00 AM", x2, y2 + 50);
    textSize(13);
    text("\t\t\t\t Cisco CCNA Exam", x2, y2 + 70);
    
    textSize(16);
    text("\t\t-Today at 2:30 PM", x2, y2 + 90);
    textSize(13);
    text("\t\t\t\t Meeting with Terry Cantona ", x2, y2 + 110);
    
    textSize(16);
    text("\t\t-Today at 8:00 PM", x2, y2 + 130);
    textSize(13);
    text("\t\t\t\t Dinner with Jay Z \n\n", x2, y2 + 150);
    
    textSize(16);
    text("\t\t-Tomorrow at 10:00 AM", x2, y2 + 170);
    textSize(13);
    text("\t\t\t\t 16th Annual NEXTGEN Conference", x2, y2 + 190);
    
    
    
    textAlign(CENTER);
    textSize(18);
    text('Reminders\n', 850 + 50, 560);
    textAlign(CENTER);
    textSize(16);
    fill(255);
    if(sec <= 20) {
      text("Get Christmas Cards", 900, 580);
    }
    if(sec > 20 && sec <= 40) {
      text("UN Meeting @ 9:30 ", 900, 580);
    }
    if(sec > 40 && sec <= 60) {
      text("Audi maintenace", 900, 580);
    }
    textAlign(CENTER);
    textSize(18);
    text('- Health and Activity -\n', 900, 130);
    textSize(15);
    text('Sleep: 6hr 20min\n Workout: 35mins\n Steps: 725 steps (0.31 mi)\n', 850 + 50, 150);
    //text('Daily Steps : 5,951 for 3.59 mi \n Exercise: 45 min today & 2 hrs this week \n Sleep Cycle : 5 hrs light sleep & 3 hrs REM sleep', 500 + 18, 570 + 34);
  
    
    // Different fill based on state of date/time
    if (draggingWeather) {
      fill (125);
    } else if (rolloverWeather) {
      fill(255);
    } else {
      fill(255);
    }
    textAlign(LEFT);
    //Show Weather
    textSize(40);
    text("LBK", x3 + 20, y3 + 4, w3, h3);
    textSize(18);
    text("F", x3 + 170, y3 + 5, w3, h3);
    textSize(40);
    text(int(currentTemp), x3 + 120, y3 + 3, w3, h3);
    currentIconUrl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
    img = createImg(currentIconUrl);
    img.hide();
    image(img, x3 + 160, y3 - 28, 100, 100);
    
    textSize(20);
    var date = new Date();
    var today = date.getDay();
    for (i = 1; i < weatherList.length; i++)
    {
      var showDay = ((today + i) % 7);
      var GABEy = i * 35 + 420 + 34;
      var GABEx = 25 + 18;
      if (showDay == 1)
      {
        text("MON", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
      if (showDay == 2)
      {
        text("TUE", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
      if (showDay == 3)
      {
        text("WED", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
      if (showDay == 4)
      {
        text("THU", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
          if (showDay == 5)
      {
        text("FRI", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
          if (showDay == 6)
      {
        text("SAT", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
          if (showDay == 0)
      {
        text("SUN", x3 + GABEx - 30, y3 + GABEy - 415, w3, h3);
      }
      data = weatherList[i];
      text('L:', x3 + 70, y3 + GABEy - 415, w3, h3);
      text(int(data.temp.min), x3 + 90, y3 + GABEy - 415, w3, h3);
      
      text('H:', x3 + 120, y3 + GABEy - 415, w3, h3); 
      text(int(data.temp.max), x3 + 140, y3 + GABEy - 415, w3, h3); 
      
      print(data);
      icon = data.weather[0].icon;
      url = "http://openweathermap.org/img/w/" + icon + ".png";
      img = createImg(url);
      img.hide(); 
      image(img, x3 + 170, y3 + GABEy - 432, 50, 50); 
      print(url);
      
    }
    
    //show news
    fill(255);
    url = newsImg;
    img = createImg(url);
    img.hide();
    news1 = image(img, 775 + 18, 320, 200, 90);
    
    //url2 = newsImg2;
    //img = createImg(url2);
    //img.hide();
    //news2 = image(img, 775 + 18, 155 + 34, 200, 90);
    
    var GABEx2 = 250 + 18;
    var GABEy2 = 125 + 34;
    var lineStart = 0;
    var lineEnd = 0;
    if (articleOneShown == 0 && mouseX > 775 + 18 && mouseY < 125 + 260)
    {
      for (i = 0; i < description.length; i++)
      {
        if (i % 60 == 1)
        {
          lineEnd = i-1;
          textAlign(CENTER);
          text(description.slice(lineStart, lineEnd), width*0.5, GABEy2-50);
          GABEy2 += 20;
          lineStart = lineEnd;
        }
      }
      textAlign(CENTER);
      text(description.slice(lineStart, description.length), width*0.5, GABEy2-50);
    }
    
    
    
    textAlign(LEFT);
    text(source, width*0.765, 300);   
    

    
    //Brightness icon
    image(brightImg, x5 - 515, y5 + 133);
    
    
    brightSlider.position(x5 - 500, y5 + 129);
    brightSlider.show();
    
    const bright = brightSlider.value();
    
    //Backlight
    noFill();
    stroke(bright);
    strokeWeight(10);
    line(2 + 18, 1 + 34, 998 + 18 , 1 + 34);
    line(998 + 18, 1 + 34, 998 + 18, 648 + 34);
    line(998 + 18, 648 + 34, 2 + 18, 648 + 34);
    line(2 + 18, 648 + 34, 2 + 18, 1 + 34);
    
    //RGB setting labeling
    if (draggingLights) {
      fill(125);
    } else if (rolloverLights) {
      fill(255);
    } else {
      fill(255);
    }
    
    }
  
}

function powerButton() {
  
  if(state == true) {
    offButton = createImg('PowerOFF.png');
    offButton.position(500, 610);
    offButton.size(40,40);
    offButton.mousePressed(power);    
  }
  
  if(state == false) {
    
    onButton = createImg('PowerON.png');    
    onButton.position(500, 610);
    onButton.size(40,40);
    onButton.mousePressed(power);
  }
  
}

function power() {
  
  if(state == false) {
    state = true;
    onButton.hide();
    powerButton();
  }
  
  else {
    state = false;
    offButton.hide();
    powerButton();
    //volSlider.hide();
    brightSlider.hide();
    //rSlider.hide();
    //gSlider.hide();
    //bSlider.hide();
  }
  
}

function mousePressed() {
  
  // Did I click on the date/time?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
    offsetY = y-mouseY;
  }
  
  //Did I click on the Cal?
  if (mouseX > x2 && mouseX < x2 + w2 && mouseY > y2 && mouseY < y2 + h2) {
    draggingCal = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX2 = x2-mouseX;
    offsetY2 = y2-mouseY;
  }
  
  //Did I click on the Weather?
  if (mouseX > x3 && mouseX < x3 + w3 && mouseY > y3 && mouseY < y3 + h3) {
    draggingWeather = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX3 = x3 - mouseX;
    offsetY3 = y3 - mouseY;
  }
  
  ////Did I click on the Music?
  //if (mouseX > x4 && mouseX < x4 + w4 && mouseY > y4 && mouseY < y4 + h4) {
  //  draggingMusic = true;
  //  // If so, keep track of relative location of click to corner of rectangle
  //  offsetX4 = x4 - mouseX;
  //  offsetY4 = y4 - mouseY;
  //}
  
   //Did I click on the Lights?
  if (mouseX > x5 && mouseX < x5 + w5 && mouseY > y5 && mouseY < y5 + h5) {
    draggingLights = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX5 = x5 - mouseX;
    offsetY5 = y5 - mouseY;
  }
  

}
function mouseReleased() {
  
  // Quit dragging
  dragging = false;
  draggingCal = false;
  draggingWeather = false;
  draggingMusic = false;
  draggingLights = false;
  
  }
