import '../src/style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import testVertex from '../Shaders/vertex.glsl'
import testFrag from '../Shaders/fragment.glsl'
import * as dat from 'dat.gui';
import { deltaTime, mod } from 'three/webgpu';




// const gui = new dat.GUI();
const scene=new THREE.Scene()

let Sizes={width:window.innerWidth,
            height:window.innerHeight}




//txture
const txtureLoader=new THREE.TextureLoader()
const colorTxt=txtureLoader.load('./Model/Base.png',(model)=>{}
,(progress)=>{},(error)=>{})

let uniforms = {
  uTime: { value: 0 },
  uTexture: { value: null },
  uMouse: { value: new THREE.Vector2(0, 0) },
  uHover: { value: 0 }
};

// Remove the window mouseenter/mouseleave listeners and replace with raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let modelPath; // Declare this at a higher scope so we can access it in the mousemove handler

// Update the mousemove handler
window.addEventListener('mousemove', (event) => {
  // Update mouse and uniform coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  uniforms.uMouse.value.x = mouse.x;
  uniforms.uMouse.value.y = mouse.y;

  // Check for intersection with the model
  raycaster.setFromCamera(mouse, camera);
  if (modelPath) {
    const intersects = raycaster.intersectObject(modelPath);
    uniforms.uHover.value = intersects.length > 0 ? 1.0 : 0.0;
  }
});

//Model
const loader=new GLTFLoader()
loader.load('./Model/ticket_glb.glb',(model)=>{
  modelPath = model.scene.children[0];  // Assign to our higher-scoped variable
  let modelPathMaterial=model.scene.children[0].material;
  modelPath.position.set(-0.01,0.1,0.65)
  modelPath.rotation.set(-5.05,-6.6,-5.9)



  // //gui
  // const modelPosition=gui.addFolder('modelPosition')
  // modelPosition.add(modelPath.position,'x',-10,10,0.05)
  // modelPosition.add(modelPath.position,'y',-10,10,0.05)
  // modelPosition.add(modelPath.position,'z',-10,10,0.05)
  
  // const modelRotation=gui.addFolder('modelRotation')
  // modelRotation.add(modelPath.rotation,'x',-10,10,0.05)
  // modelRotation.add(modelPath.rotation,'y',-10,10,0.05)
  // modelRotation.add(modelPath.rotation,'z',-10,10,0.05)
  



  modelPathMaterial=new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: `    uniform float uTime;
      uniform vec2 uMouse;
      uniform float uHover;
      
      varying vec2 vTexCoords;
      
      void main() {
          vec3 newPosition = position;
          
          // Modified cylindrical bend along z-axis
          float bendAmount = -0.09 ;
          float xOffset = position.x + 8.0;
          float zOffset = position.z + 1.0;  // Changed from x to z offset
          float yBend = -(xOffset * xOffset + zOffset * zOffset) * bendAmount;  // Apply bend to y-axis
          newPosition.y += yBend;  // Apply to y instead of z
          
          // Global wave effect when hovering
          float globalWave = sin(position.x * -0.5 + uTime * 2.0) * 0.5 * uHover;
          globalWave += sin(position.z * 1.0 + uTime * 1.5) * 0.1 * uHover;  // Changed from y to z
          
          // Add mouse interaction wave
          float distanceFromMouse = distance(newPosition.xz, uMouse * 5.0);  // Changed from xy to xz
          float mouseWave = sin(distanceFromMouse * 3.0 - uTime * 2.0) * 0.2;
          float mouseInfluence = smoothstep(2.0, 0.0, distanceFromMouse) * uHover;
          
          newPosition.y += globalWave + (mouseWave * mouseInfluence);  // Apply to y instead of z
          
          vTexCoords = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }`,
    fragmentShader: `uniform sampler2D uTexture;
      varying vec2 vTexCoords;

      void main() {
          vec4 texColor = texture(uTexture, vec2(vTexCoords.x, 1.0 - vTexCoords.y));
          gl_FragColor = texColor;
      }`
  })
  modelPath.material = modelPathMaterial;
  
  uniforms.uTexture.value = colorTxt;
  let modelPath2=modelPath.clone()
  modelPath.position.set(0.01,0.09,0.65)
 
  //  const modelPosition1=gui.addFolder('modelPosition1')
  // modelPosition1.add(modelPath2.position,'x',-10,10,0.01)
  // modelPosition1.add(modelPath2.position,'y',-10,10,0.01)
  // modelPosition1.add(modelPath2.position,'z',-10,10,0.01)
  
  // const modelRotation1=gui.addFolder('modelRotation1')
  // modelRotation1.add(modelPath2.rotation,'x',-10,10,0.01)
  // modelRotation1.add(modelPath2.rotation,'y',-10,10,0.01)
  // modelRotation1.add(modelPath2.rotation,'z',-10,10,0.01)


  
  
  modelPath.castShadow=true;
  modelPath.receiveShadow=true;
  modelPath2.castShadow=true;
  modelPath2.receiveShadow=true;
  let tickets=new THREE.Group()
  tickets.add(modelPath)
  tickets.add(modelPath2)
  tickets.scale.set(1,1,1)
  // console.log(tickets);
  
  scene.add(modelPath,modelPath2)
  // console.log(modelPath)
  // console.log(modelPathMaterial)




}
,(progress)=>{},
(error)=>{})



//Megaphone
let model2=null
loader.load('./Model/mega_colored2.glb',
  (Model)=>{ model2=Model.scene.children[0]
    model2.scale.set(0.15,0.15,0.15)
    model2.position.set(-0.18,0.15,0.7)
    model2.rotation.set(0.02,0.07,-0.37)


  //   const model2Position=gui.addFolder('model2Position')
  // model2Position.add(model2.position,'x',-10,10,0.01)
  // model2Position.add(model2.position,'y',-10,10,0.01)
  // model2Position.add(model2.position,'z',-10,10,0.01)

  // const model2Rotation=gui.addFolder('model2Rotation')
  // model2Rotation.add(model2.rotation,'x',-10,10,0.01)
  // model2Rotation.add(model2.rotation,'y',-10,10,0.01)
  // model2Rotation.add(model2.rotation,'z',-10,10,0.01)

    scene.add(model2)

  },
  ()=>{},
  ()=>{}
)



let calender=null
loader.load('./Model/calender.glb',
  (model)=>{calender=model.scene.children[0];
    calender.scale.set(0.06,0.06,0.06)
    calender.position.set(0.15,0.05,0.68)
    calender.rotation.set(-0.64,-2.18,-1.52)
    scene.add(calender)
    
  //   const calenderp=gui.addFolder('calP')
  // calenderp.add(calender.position,'x',-10,10,0.01)
  // calenderp.add(calender.position,'y',-10,10,0.01)
  // calenderp.add(calender.position,'z',-10,10,0.01)

  // const calr=gui.addFolder('calr')
  // calr.add(calender.rotation,'x',-10,10,0.01)
  // calr.add(calender.rotation,'y',-10,10,0.01)
  // calr.add(calender.rotation,'z',-10,10,0.01)








  },
  ()=>{},
  ()=>{},

)



const amb=new THREE.AmbientLight(0xffffff,0.6)
const light=new THREE.PointLight(0xffffff,0.05)
const light2=new THREE.PointLight(0xffffff,0.05)
const lightHel=new THREE.PointLightHelper(light,0.01,0xffffff)
const lightHel1=new THREE.PointLightHelper(light2,0.01,0xffffff)
light.position.set(-0.1,0.15,0.85)
light2.position.set(0.1,0.15,0.65)
light.castShadow=true;

scene.add(light,amb,light2)

//Light Controlls
// let whitePointControlls=gui.addFolder('White_Light')
// whitePointControlls.add(light.position,'x',0,100,0.01)
// whitePointControlls.add(light.position,'y',0,100,0.01)
// whitePointControlls.add(light.position,'z',0,100,0.01)











const camera=new THREE.PerspectiveCamera(75,Sizes.width/Sizes.height,0.1,100)
camera.position.setZ(1)
scene.add(camera)


const canvas=document.querySelector('canvas')
const renderer=new THREE.WebGLRenderer({antialias:true,canvas:canvas,alpha:true})
renderer.shadowMap.enabled=true
renderer.shadowMap.type=THREE.PCFShadowMap;
renderer.setSize(Sizes.width,Sizes.height)
renderer.render(scene,camera)



window.addEventListener('resize',()=>{
Sizes.width=window.innerWidth
Sizes.height=window.innerHeight
camera.aspect=Sizes.width/Sizes.height
camera.updateProjectionMatrix()
renderer.setSize(Sizes.width,Sizes.height)
}
)



let clock=new THREE.Clock()
let prevTime=0
const tick=()=>{
let elapsed=clock.getElapsedTime()

  let deltaTime=elapsed-prevTime;
  
    if(model2!==null && calender!==null && modelPath!==undefined){
      model2.position.setY(0.13-Math.cos(elapsed)*0.005)
      calender.position.setY(0.03-Math.sin(elapsed)*0.005)
      modelPath.position.setY(0.08-Math.sin(elapsed)*0.001)
    }

  uniforms.uTime.value += 0.03;
  renderer.render(scene,camera)
  requestAnimationFrame(tick)
}
tick()