import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import { FirstPersonControls } from './fp_nomouse.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const loader = new THREE.FileLoader();

var dataJson = {}
loader.load("./data/topDummy.json",function(data){
    dataJson = JSON.parse(data)
    console.log(typeof dataJson["features"])
    //console.log(dataJson["features"][0])
    for(var e in dataJson["features"]){
    //dataJson["features"].foreach(function(e){
        console.log(dataJson["features"][e])
        var triangleVectors = []
        
        var vertex = []
        for(var i=1;i<dataJson["features"][e]["geometry"]["coordinates"].length-1;i++){
            vertex.push(dataJson["features"][e]["geometry"]["coordinates"][0])
            vertex.push(dataJson["features"][e]["geometry"]["coordinates"][i])
            vertex.push(dataJson["features"][e]["geometry"]["coordinates"][i+1])
        }
        // shape.x = e["geometry"]["coordinates"][0][0]
        // shape.y = e["geometry"]["coordinates"][0][1]
        // shape.z = e["geometry"]["coordinates"][0][2]
        for(var i=0;i<vertex.length;i++){
            //shape.line(e["geometry"]["coordinates"][i][0],)
            //triangleVectors.push([e["geometry"]["coordinates"][0],])
            triangleVectors.push(vertex[i][0])
            triangleVectors.push(vertex[i][1])
            triangleVectors.push(vertex[i][2])
        }
        const vertices = new Float32Array(triangleVectors)
        // var triangle = new THREE.BufferGeometry()
        // var lineMaterial = new THREE.LineBasicMaterial({color:0xffffff, transparent:true, opacity:0.5});
        var triangleMaterial = new THREE.MeshPhongMaterial({color:0xff0000 ,side:THREE.DoubleSide,side: THREE.DoubleSide,flatShading: true});

        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        //geometry.vertices.push( triangleVectors[j][0], triangleVectors[j][1], triangleVectors[j][2] );
        //var face = new THREE.Face3(0, 1, 2);
        //geometry.faces.push(face);
        console.log("Add geometry")
        const mesh2 = new THREE.Mesh( geometry, triangleMaterial );
        scene.add(mesh2)
    }
})
// Objects
//const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry();

console.log(dataJson)

// Materials

const material = new THREE.MeshPhongMaterial({
    color: 0x156289,
	emissive: 0x072534,
	side: THREE.DoubleSide,
	flatShading: true
})
//material.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
const sphere2 = new THREE.Mesh(geometry,material)

sphere2.translateX(10)
sphere2.translateZ(2)
scene.add(sphere)
scene.add(sphere2)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.8)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//1289.6555, 1127.587620117187953, -185.0
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x =  0
camera.position.y =  0
camera.position.z =  2
// console.log(camera.lookAt.x,camera.lookAt.y,camera.lookAt.z)
// camera.lookAt.x = 0;
// camera.lookAt.y = 0;
// camera.lookAt.z = 0;
scene.add(camera)

// Controls
const controls = new FirstPersonControls(camera,canvas);
controls.movementSpeed = 0.01
controls.autoForward = false
controls.lookSpeed = 0.1
controls.mouseDragOn = false
controls.enableDamping = true
//controls.activeLook = false

// keyboard control
// var degreeXZ = 0.0
// window.addEventListener('keydown',(e)=>{
//     console.log(e.key);
//     switch(e.key){
//         case "ArrowLeft":
//             var currentVector = [camera.lookAt.x-camera.position.x,camera.lookAt.y-camera.position.y,camera.lookAt.z-camera.position.z];
//             var z = currentVector[2]
//             var x = currentVector[0]
//             degreeXZ-=0.1
//             var newX = z*Math.sin(degreeXZ)+x*Math.cos(degreeXZ)
//             var newZ = z*Math.cos(degreeXZ)-x*Math.sin(degreeXZ)
//             //currentVector [newX,newY]
//             //currentVector
//             camera.lookAt.x = newX+camera.position.x
//             camera.lookAt.z = newZ+camera.position.z
//             console.log(newX,newZ,Math.sin(degreeXZ),Math.cos(degreeXZ))
//             console.log(geometry.x,geometry.z,sphere.x,sphere.y)
//             break;
//         case "a":
//             //sphere.rotation.y += 0.5
//             camera.position.x-=0.1
//             break;
//         case "ArrowRight":
//             var currentVector = [camera.lookAt.x-camera.position.x,camera.lookAt.y-camera.position.y,camera.lookAt.z-camera.position.z];
//             var z = currentVector[2]
//             var x = currentVector[0]
//             degreeXZ+=0.1
//             var newX = z*Math.sin(degreeXZ)+x*Math.cos(degreeXZ)
//             var newZ = z*Math.cos(degreeXZ)-x*Math.sin(degreeXZ)
//             //currentVector [newX,newY]
//             //currentVector
//             camera.lookAt.x = newX+camera.position.x
//             camera.lookAt.z = newZ+camera.position.z
//             console.log(newX,newZ,Math.sin(degreeXZ),Math.cos(degreeXZ))
//             console.log(geometry.x,geometry.z,sphere.x,sphere.y)
//             break;
//         case "d":
//             //sphere.rotation.y -=0.5
//             camera.position.x+=0.1
//             break;
//         default:

//     }
// })


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update(elapsedTime)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()