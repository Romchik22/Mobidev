import Point from './Point';
import Line from './Line';
//get html elements
let canvas = document.querySelector('canvas');
let colorSelect = document.querySelector('select');
let widthInput = document.querySelector('input');
let clearButton = document.querySelector('#clear');
let undoButton = document.querySelector('#undo');
let redoButton = document.querySelector('#redo');
let saveLS = document.querySelector('#saveLS');
let readLS = document.querySelector('#readLS');

// add Listeners to elements
canvas.addEventListener('click',click,false );
canvas.addEventListener('mousemove',move, false);
colorSelect.addEventListener('change', changeColor, false);
widthInput.addEventListener('change', changeWidth, false);
clearButton.addEventListener('click', removeAll, false);
undoButton.addEventListener('click', undo, false);
redoButton.addEventListener('click', redo, false);
saveLS.addEventListener('click', saveToLS, false);
readLS.addEventListener('click', readFromLS, false);

//set canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 70;

//get canvas context
let c = canvas.getContext('2d');

//initialize variable
let arrayLine = [],
  isMouseClick = false,
	startX,
	startY,
  pointA,
  pointB,
  line,
	lineColor = 'red',
	lineWidth = '3',
	indexHistory = 0;

//function for drawing array of lines
function drawLines() {
	clearCanvas();
	for (let i = 0; i < arrayLine.length; i++) {
		let line = arrayLine[i];
		if(i === indexHistory) break;
		c.beginPath();
		c.strokeStyle = line.color;
		c.lineWidth = line.width;
		c.moveTo(line.pointA.x, line.pointA.y);
		c.lineTo(line.pointB.x, line.pointB.y);
		c.stroke();
	}
}
function click(e) {
	isMouseClick = !isMouseClick;
	startX = e.pageX - canvas.offsetLeft;
	startY = e.pageY -  canvas.offsetTop;
	pointA = new Point(startX, startY);
	if (!isMouseClick) { // calling after second mouse click
		arrayLine.push(line);
		indexHistory++;
	}
}
function move(e) {
	let x, y;
	if (isMouseClick) {
		if (indexHistory !== arrayLine.length) {
			arrayLine = arrayLine.slice(0, indexHistory); //update arrayLine (state of image)
		}

		drawLines();
    c.beginPath();
    c.moveTo(startX, startY);
    c.lineWidth = lineWidth;
		c.strokeStyle = lineColor;
		x = e.pageX - canvas.offsetLeft;
		y = e.pageY -  canvas.offsetTop;
    c.lineTo(x, y);
		pointB = new Point(x, y);
		line = new Line(pointA, pointB, lineColor, lineWidth);
		c.stroke();


	}
}

function changeColor (e) {
	lineColor = e.target.value;
}

function changeWidth(e) {
	lineWidth = e.target.value;
}

function clearCanvas() {
	c.clearRect(0, 0, canvas.width, canvas.height);
}

function removeAll() {
	clearCanvas();
	arrayLine = [];
}

function undo() {
	if(indexHistory !== 0) {
		indexHistory--;
		drawLines();
	}

}
function redo() {
	if (indexHistory !== arrayLine.length) {
		indexHistory++;
		drawLines();
	}
}
function saveToLS() {
	let array = arrayLine.slice(0, indexHistory);
	window.localStorage.setItem('image', JSON.stringify(array));
}

function readFromLS () {
	let tempArrayLine = window.localStorage.getItem('image');

	if (tempArrayLine) {
		arrayLine = JSON.parse(tempArrayLine);
		indexHistory = arrayLine.length;
		drawLines();
	} else {
		alert('Local storage is empty');
	}
}



