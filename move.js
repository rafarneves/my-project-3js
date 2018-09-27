var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var MovingCube;

var objeto = [];
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var turnSpeed= Math.PI * 0.02;

camera.rotation.order = "YXZ";
//var controls = new THREE.TrackballControls( camera );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
var cube = new THREE.Mesh( geometry, material );
objeto.push(cube);
scene.add( cube );

//Plano
var geometryp = new THREE.BoxGeometry(10, 0.3, 10);
var materialp = new THREE.MeshBasicMaterial({color: 0x00ff00});
var plane = new THREE.Mesh(geometryp, materialp);
scene.add(plane);

camera.position.z = 5;
camera.position.y = 2;
camera.rotation.x = -0.5;
plane.position.y = -0.7;

camera.position.y = cube.position.y;
camera.position.z = cube.position.z;
cube.add(camera);
function update()
{
	var delta = clock.getDelta(); // seconds.
	var moveDistance = 2 * delta; // 200 pixels per second
	var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
	
	// local coordinates

	// local transformations

	// move forwards/backwards/left/right
	if ( keyboard.pressed("W") )
		cube.translateZ( -moveDistance );
	if ( keyboard.pressed("S") )
		cube.translateZ(  moveDistance );
	if ( keyboard.pressed("Q") )
		cube.translateX( -moveDistance );
	if ( keyboard.pressed("E") )
		cube.translateX(  moveDistance );	

	// rotate left/right/up/down
	var rotation_matrix = new THREE.Matrix4().identity();
	if ( keyboard.pressed("A") )
		cube.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
	if ( keyboard.pressed("D") )
		cube.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
	if ( keyboard.pressed("R") )
		cube.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
	if ( keyboard.pressed("F") )
		cube.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
	
	if ( keyboard.pressed("Z") )
	{
		cube.position.set(0,25.1,0);
		cube.rotation.set(0,0,0);
	}
		
	// global coordinates
	
	if ( keyboard.pressed("up") )
		if(camera.rotation.x < Math.PI/2){
		camera.rotation.x += moveDistance;
	}
	if ( keyboard.pressed("down") )
		if(camera.rotation.x > -Math.PI/2){
		camera.rotation.x -= moveDistance;
	}
		
	controls.update();
	stats.update();
}

var animate = function () {
	requestAnimationFrame( animate );
	
	renderer.render( scene, camera );
	update();
};

animate();
