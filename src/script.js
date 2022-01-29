import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import earcut from 'earcut/src/earcut.js'
import { FirstPersonControls } from './fp_nomouse.js'
import * as dat from 'dat.gui'
import interact from 'interactjs'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const loader = new THREE.FileLoader();

// scaler
const x_scale = 0.01 // scale to 1/100 of original size
const y_scale = 0.01
const z_scale = 0.05
function getHeightColor(height){
    if (height<-150){
        return 0xee82ee
    }else if (height<-100){
        return 0x4b0082
    }else if (height<0){
        return 0x0000ff
    }else if(height<100){
        return 0x008000
    }else if(height<150){
        return 0xffff00
    }else if(height<200){
        return 0xffa500
    }else{
        return 0xff0000
    }
}
var dataJson = {}
loader.load("./data/zi2.csv",function(data){
    //return
    /*
     *  X = -1891.675555 3417.558576
     *  Y = -386.917141 2911.797642
     *  Z = -185.000000 194.000000
     *  Size xi 700920
     *   Size yi 700920
     *   ans =
     *           1   700920
     *   ans =
     *           1   700920
     *   ans =
     *      700920        1
     *   1062 660
     * 
     *
     */

    var planeWidth = 531*2
    var planeHeight = 330*2
    // const planeWidth = 43
    // const planeHeight = 73
    // Objects
    const texture = new THREE.TextureLoader().load( "data/jj.jpg" );
    var lines = data.split("\n")
    //console.log(lines)
    //const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
    const geometry = new THREE.PlaneGeometry(planeWidth/10,planeHeight/10,planeWidth-1,planeHeight-1)//SphereBufferGeometry();
    const vertices = geometry.attributes.position.array;
    //var colors = []
    geometry.rotateX( - Math.PI / 2) 
    for (let idx=0, idxH=1,k=vertices.length;idx<k;idx++,idxH+=3){
        console.log(lines[idx])
        if(lines[idx]==undefined){
            continue
        }
        var pp = lines[idx].split(";")[2]
        if (pp=="NaN"){
            continue
        }
        // console.log(pp*z_scale)
        vertices[idxH] = pp*z_scale
    }
    
    //console.log(geometry.center())
    //console.log(vertices)
    //console.log(geometry.getIndex())
    //console.log(colors)
    //geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    const material = new THREE.MeshStandardMaterial({
        //color: 0x156289,
        //vertexColors:false,
        //emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
        wireframe:false
    })
    material.map = texture
    const sphere = new THREE.Mesh(geometry,material)
    //terlaly berat. Di-komen dulu
    //geometry.computeBoundingBox()
    //geometry.computeVertexNormals()
    //const sphere2 = new THREE.Mesh(geometry,material)

    //sphere2.translateX(10)
    //sphere2.translateZ(2)
    scene.add(sphere)
    //scene.rotateX(Math.PI / 2)
    console.log("Done Loading")
})

// const geometry = new THREE.PlaneGeometry(1,1,2,2)
// const texture = new THREE.TextureLoader().load( "data/ssb.jpg" );
// const material = new THREE.MeshPhongMaterial({
//     color:0x156289,
//     wireframe:false,
//     map:texture
// })
// const plane = new THREE.Mesh(geometry,material)
// scene.add(plane)
//geometry.normalizeNormals();

// Materials


//material.color = new THREE.Color(0xff0000)

// Mesh

//scene.add(sphere2)

// Lights

const pointLight = new THREE.DirectionalLight(0xffffff, 1.0)//new THREE.PointLight(0xffffff, 1.0)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
scene.add(pointLight)

// const HemisphereLight = new THREE.HemisphereLight();
// scene.add(HemisphereLight)

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
camera.position.x =  0//1289*x_scale
camera.position.y =  0//1127*y_scale
camera.position.z =  2//-150*z_scale

//camera.lookAt(1289*x_scale,1127*y_scale,-185*z_scale)
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
//renderer.setClearColor( 0x0f0f0f, 1 );
/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update(elapsedTime)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
const position = { x: 0, y: 0 }
interact('.draggable').draggable({
    listeners: {
        start (event) {
            console.log("Start Dragging")
          },
        move (event) {
            position.x += event.dx
            position.y += event.dy
      
            event.target.style.transform =
              `translate(${position.x}px, ${position.y}px)`
          },
    },
    
    modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
  })