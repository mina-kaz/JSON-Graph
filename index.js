// Graph taken from: https://www.ielts-exam.net/academic_writing_samples_task_1/718/

var points = [ {"x" : 100, "y" : 32, "color" : "#ae4949", "caption" : "British home students", "year" : 2010},
               {"x" : 150, "y" : 14, "color" : "#adb9c5", "caption" : "International students", "year" : 2010},
               {"x" : 250, "y" : 44, "color" : "#ae4949", "caption" : "British home students", "year" : 2011},
               {"x" : 300, "y" : 18, "color" : "#adb9c5", "caption" : "International students", "year" : 2011},
               {"x" : 400, "y" : 45, "color" : "#ae4949", "caption" : "British home students", "year" : 2012},
               {"x" : 450, "y" : 20, "color" : "#adb9c5", "caption" : "International students", "year" : 2012}];
var scale = 10;
var baseline = 550;
var lineHorizX = 550;
var percent = 0;
var canvas;
var draw;

function start()
{
  canvas = document.getElementById("drawCanvas");
  draw = canvas.getContext("2d");
  barChart();
}

// Draws the lines of the axis
function drawline(x1,y1, x2,y2, color) {
  draw.beginPath();
  draw.moveTo(x1, y1);
  draw.lineTo(x2, y2);
  draw.strokeStyle = color;
  draw.stroke();
}
function drawAxis()
{
  // Draws Axis Y
  drawline(50, baseline, 50, 45, "black");
  // Draws Axis X
  drawline(45, baseline, lineHorizX, baseline, "black")
  var lineOffset = 45;
  var textOffset = 0;
  draw.fillStyle = "black";
  for (var i = 0; i <= 9; i++)
  {
    // Draw the horizontal lines
    drawline(45, lineOffset, lineHorizX, lineOffset, "grey");
    // The horizontal lines have the following space between them
    lineOffset += 50;
  }
  for (var i = 0; i <= 50; i += 5)
  {
    // Draw the numbers on the Axe Y
    draw.fillText(i, 25, baseline - textOffset);
    //The number have the following space between them
    textOffset += 50;
  }
  var textPositionX = 150;
  var nextPositionX = 0;
  for (var i = 2010; i <= 2012; i++)
  {
    // Center the legends and place them in the following position
    draw.textAlign = 'center';
    draw.fillText(i, textPositionX + nextPositionX, baseline + 30);
    nextPositionX += 150;
  }
}
function barChart()
{
  //if not 100%, request another frame to animate the bars
  if (percent++ < 100)
  {
    requestAnimationFrame(barChart);
  }
  draw.clearRect(0, 0, canvas.width, canvas.height);
  /* Draw the axis and the legends here so they
  are not wipped from the canvas */
  drawAxis();
  legends();
  // Draw the bars by accessing the values from the JSON object
  for (var i = 0; i < points.length; i++)
  {
    // Draw the bars and add the (percent / 100) in order to grow all bars at an even rate
    drawbar(points[i].x, points[i].y * percent /100,  points[i].color);
  }

}
// Draw the bars
function drawbar(x, y, color) {
  draw.beginPath();
  draw.rect(x, baseline - (y * scale), 50, (y * scale));
  draw.fillStyle = color;
  draw.fill();
}
// Draw the legends that are located at the bottom of the screen
function legends()
{
  draw.beginPath();
  draw.textAlign = 'left';
  var space = 0;
  for (var i = 0; i <= 1; i ++)
  {
    draw.beginPath();
    draw.rect(points[i].x + space, baseline + 100, 15, 15);
    draw. fillStyle = points[i].color;
    draw.fill();
    draw.fillStyle = "black";
    draw.font = "italic 13px Arial";
    draw.fillText(points[i].caption, (points[i].x + 20) + space, baseline + 112);
    space += 250;
  }

}
