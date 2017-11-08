var ocean;
var foods;
var FISHSIZE = 20;
var SCHOOLLIMIT = 10;
var SCHOOLMOVESPEED = .3;
var FISH_MOVE_RATE = .3;
var FISHSPEEDLIMIT = 40;
var SCHOOLPOPULATION = 10;
var FISHDENSITY = 200;

function setup() {

	createCanvas(windowWidth, windowHeight);

	noStroke();
	makeOcean();

	setTimeout(function () {
		document.getElementById('welcomeText').style.opacity = 0;
	}, 1000);
	setTimeout(function () {
		document.getElementById('welcomeText').style.display = 'none';
	}, 2000);

}

function draw() {

	background(5);

	if(ocean.length>SCHOOLLIMIT){
		ocean.splice(SCHOOLLIMIT);
	}

	if (random(1) < .01 && ocean.length < SCHOOLLIMIT) {
		addSchool();
	}

	for (var i = ocean.length - 1; i >= 0; i--) {
		if (ocean[i].update()) {
			ocean.splice(i, 1);
		}
		else {
			ocean[i].display();
		}
	}

	for (let f of foods) {
		f.update();
		f.display();
	}
}

function makeOcean() {
	ocean = [];
	foods = [];
	addSchool();
	addSchool();
	addSchool();
}

function addSchool() {
	ocean.push(new School());
}

function addFood() {
	foods.push(new Food(mouseX, mouseY));
}

function killAll(){
	ocean = [];
}

function addSchoolAtMouse(){
	ocean.push(new School(mouseX, mouseY));
}

function addSchoolAtCenter(){
	ocean.push(new School(width/2, height/2));
}

function keyTyped() {
	if (key == 'x') {
		ocean = [];
		makeOcean();
	}
}

function mousePressed() {
	if (mouseY < height - 80 || mouseY > height - 20) {
		addFood();
	}
}

function mouseDragged() {
	if (millis() % 20 == 0) {
		if (mouseY < height - 80 || mouseY > height - 20) {
			addFood();
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
