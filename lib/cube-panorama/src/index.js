import * as THREE from 'three';
import CDN_IMAGES from '../images/cdnurl.json';

let camera, scene, renderer;

let isUserInteracting = false;
let onMouseDownMouseX = 0, onMouseDownMouseY = 0;
let lon = 0, onMouseDownLon = 0;
let lat = 0, onMouseDownLat = 0;
let phi = 0, theta = 0;

let container;
let cubeGroup;

// ----------------------------------------------------------------------------------------------------
const getWhichPlane = directionNormal => {
  let x = directionNormal.x;
  let y = directionNormal.y;
  let z = directionNormal.z;
  let absX = Math.abs(x);
  let absY = Math.abs(y);
  let absZ = Math.abs(z);
  
  if (absX >= absY && absX >= absZ) {
    return 'x';
  }
  if (absY >= absX && absY >= absZ) {
    return 'y';
  }
  if (absZ >= absX && absZ >= absY) {
    return 'z';
  }
};

const getWhichTexturePrefix = directionNormal => {
  let x = directionNormal.x;
  let y = directionNormal.y;
  let z = directionNormal.z;
  let absX = Math.abs(x);
  let absY = Math.abs(y);
  let absZ = Math.abs(z);

  let isXPositive = x > 0 ? 1 : 0;
  let isYPositive = y > 0 ? 1 : 0;
  let isZPositive = z > 0 ? 1 : 0;
  if (absX >= absY && absX >= absZ) {
    return isXPositive ? 'px_' : 'nx_';
  }
  if (absY >= absX && absY >= absZ) {
    return isYPositive ? 'py_' : 'ny_';
  }
  if (absZ >= absX && absZ >= absY) {
    return isZPositive ? 'pz_' : 'nz_';
  }
};

const getXYSegments = (directionNormal, widthSegments, heightSegments, depthSegments) => {
  let x = directionNormal.x;
  let y = directionNormal.y;
  let z = directionNormal.z;
  let absX = Math.abs(x);
  let absY = Math.abs(y);
  let absZ = Math.abs(z);

  // yz
  if (absX >= absY && absX >= absZ) {
    return {
      xSegments: depthSegments,
      ySegments: heightSegments
    };
  }
  // xz
  if (absY >= absX && absY >= absZ) {
    return {
      xSegments: widthSegments,
      ySegments: depthSegments
    };
  }
  // xy
  if (absZ >= absX && absZ >= absY) {
    return {
      xSegments: widthSegments,
      ySegments: heightSegments
    }
  }
};


const init = () => {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
  // camera.position.set(0, 0, 6);
  camera.target = new THREE.Vector3(0, 0, 0);

  scene = new THREE.Scene();

  cubeGroup = new THREE.Object3D();
  let widthSegments = 3;
  let heightSegments = 3;
  let depthSegments = 3;
  let cubeGeometry = new THREE.BoxGeometry(4, 4, 4, widthSegments, heightSegments, depthSegments);
  /*
  cubeGeometry.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, - 1 ) );
  cubeGeometry.computeVertexNormals();
  cubeGeometry.computeFaceNormals(); 
   */

  let tmptmp;
  let row, col;

  let tmpI = 0;
  let prevTmp = 0;

  for (let i = 0, len = cubeGeometry.faces.length; i < len; i++) {
    let face = cubeGeometry.faces[i];
    // 决定下载哪张贴图
    // 6面，每个面分成4个块
    // px_00 px_01 px_10 px_11
    // nx_00 nx_01 nx_10 nx_11
    // py_00 py_01 py_10 py_11
    // ny_00 ny_01 ny_10 ny_11
    // pz_00 pz_01 pz_10 pz_11
    // nz_00 nz_01 nz_10 nz_11

    let whichTexturePrefix = getWhichTexturePrefix(face.normal);
    let xySegments = getXYSegments(face.normal, widthSegments, heightSegments, depthSegments);
    let plane = getWhichPlane(face.normal);
    let xSegments = xySegments.xSegments;
    let ySegments = xySegments.ySegments;
    tmpI = i - prevTmp;
    if (tmpI >= 2 * xSegments * ySegments - 1) {
      prevTmp += 2 * xSegments * ySegments;
    }

    let uvs = [
      new THREE.Vector2(1, 0),
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1)
    ];
    // 对py和ny两个面做特殊处理
    if (plane === 'y') {
      // 旋转180
      uvs = [
        new THREE.Vector2(0, 1),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(1, 0)
      ];
    }

    let tmpJ = tmpI % 2;
    if (tmpJ === 0) {
      tmptmp = tmpI / 2;
      uvs = [
        new THREE.Vector2(1, 1),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(0, 1)
      ];
      if (plane === 'y') {
        // 旋转180
        uvs = [
          new THREE.Vector2(0, 0),
          new THREE.Vector2(0, 1),
          new THREE.Vector2(1, 0)
        ];
      }
    }
    row = Math.floor(tmptmp / xSegments);
    col = tmptmp % xSegments;

    let tmpGeometry = new THREE.Geometry();

    tmpGeometry.vertices = [
      cubeGeometry.vertices[face.a],
      cubeGeometry.vertices[face.b],
      cubeGeometry.vertices[face.c]
    ];

    tmpGeometry.faceVertexUvs[0][0] = uvs;
    tmpGeometry.faces.push(new THREE.Face3(0, 1, 2));

    let textureImage = whichTexturePrefix + row + '' + (xSegments - 1 - col);
    if (plane === 'y') {
      textureImage = whichTexturePrefix + (ySegments - 1 - row) + '' + col;
    }
    let tmpMaterail = new THREE.MeshBasicMaterial({
      // map: new THREE.TextureLoader().load('../images/' + textureImage + '.jpg'),
      map: new THREE.TextureLoader().load(CDN_IMAGES[textureImage + '.jpg']),
      side: THREE.BackSide,
      // color: new THREE.Color(Math.random(), Math.random(), Math.random())
    });
    tmpMaterail.map.minFilter = THREE.LinearFilter;

    cubeGroup.add(new THREE.Mesh(tmpGeometry, tmpMaterail));
  }

  scene.add(cubeGroup);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  document.addEventListener('wheel', onDocumentMouseWheel, false);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
  event.preventDefault();

  isUserInteracting = true;

  onMouseDownMouseX = event.clientX;
  onMouseDownMouseY = event.clientY;

  onMouseDownLon = lon;
  onMouseDownLat = lat;
}

function onDocumentMouseMove(event) {
  if (isUserInteracting === true) {
    lon = (onMouseDownMouseX - event.clientX) * 0.1 + onMouseDownLon;
    lat = (event.clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
  }
}

function onDocumentMouseUp(event) {
  isUserInteracting = false;
}

function onDocumentMouseWheel(event) {
  camera.fov += event.deltaY * 0.05;
  camera.updateProjectionMatrix();
}

const animate = () => {
  requestAnimationFrame(animate);
  update();
};

const update = () => {
  if (isUserInteracting === false) {
    lon += 0.1;
  }

  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);

  camera.target.x = 4 * Math.sin(phi) * Math.cos(theta);
  camera.target.y = 4 * Math.cos(phi);
  camera.target.z = 4 * Math.sin(phi) * Math.sin(theta);

  // camera.lookAt(new THREE.Vector3(0, -2, 0));
  camera.lookAt(camera.target);

  renderer.render(scene, camera);
};

window.addEventListener('DOMContentLoaded', () => {
  init();
  animate();  
});
