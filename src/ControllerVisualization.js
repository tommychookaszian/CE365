import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import './ControllerVisualization.css';
import m5stickcGLB from './m5stickc.glb';

const ControllerVisualization = () => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [objectType, setObjectType] = useState('rectangle');
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const [yaw, setYaw] = useState(0);
  const [isLoadingGLB, setIsLoadingGLB] = useState(false);

  const loader = new GLTFLoader();
  let container;
  let camera, scene, renderer;
  let object;
  let lastTimestamp = 0;
  let animationRequestId;

  const loadGLBModel = () => {
    setIsLoadingGLB(true);
    loader.load(
      m5stickcGLB,
      (gltf) => {
        console.log('GLB file loaded:', gltf);

        if (object) {
          scene.remove(object);
        }

        object = gltf.scene;
        object.name = 'GLBObject';

        object.traverse((child) => {
          if (child.isMesh) {
            child.material.visible = true;
            child.material.opacity = 1;
            child.material.transparent = false;
          }
        });

        const box = new THREE.Box3().setFromObject(object);
        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());

        object.position.copy(boxCenter).multiplyScalar(-1);
        const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);
        object.scale.setScalar(2 / maxDim);

        console.log('Object box size:', boxSize);
        console.log('Object box center:', boxCenter);
        console.log('Object visibility:', object.visible);
        object.traverse((child) => {
          if (child.isMesh) {
            console.log('Child material:', child.material);
          }
        });

        const near = boxSize / 100;
        const far = boxSize * 100;
        camera.near = near;
        camera.far = far;
        camera.updateProjectionMatrix();

        camera.position.copy(boxCenter);
        camera.position.z += boxSize * 2.5;
        camera.lookAt(boxCenter);

        scene.add(object);
        setIsLoadingGLB(false);
      },
      undefined,
      (error) => console.error('Error loading GLB file:', error)
    );
  };

  useEffect(() => {
    if (objectType === 'GLB') {
      loadGLBModel();
    }
  }, [objectType]);

  useEffect(() => {
    const init = () => {
  container = containerRef.current;

  if (container) {
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10); // Update camera position
    console.log('Camera position:', camera.position);

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();

    if (objectType === 'rectangle') {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      object = new THREE.Mesh(geometry, material);
      scene.add(object);
    }

    if (object) {
      console.log('Object position:', object.position);
      console.log('Object scale:', object.scale);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true });
    console.log('Renderer:', renderer);
    console.log('Renderer context:', renderer.getContext());

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
  }
};


    const animate = (timestamp) => {
  if (isPaused) return;

  const delta = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  const gamepad = navigator.getGamepads()[0];
  if (!gamepad) {
    // No gamepad data, set rotation values to zero
    setPitch(0);
    setRoll(0);
    setYaw(0);

    if (object) {
      object.rotation.x = 0;
      object.rotation.y = 0;
      object.rotation.z = 0;
    }

    renderer.render(scene, camera);
  } else {
    const pitchAxis = gamepad.axes[0] * 90;
    const rollAxis = -gamepad.axes[1] * 90;
    const yawAxis = gamepad.axes[2] * 90;

    setPitch(pitchAxis);
    setRoll(rollAxis);
    setYaw(yawAxis);

    if (objectType === 'GLB' && !isLoadingGLB) {
      object = scene.getObjectByName('GLBObject');
    }

    if (object) {
      object.rotation.x = THREE.MathUtils.degToRad(pitchAxis);
      object.rotation.y = THREE.MathUtils.degToRad(rollAxis);
      object.rotation.z = THREE.MathUtils.degToRad(yawAxis);
      object.position.set(0, 0, 0);
    } else {
      console.log('Object not found in scene');
    }

    renderer.render(scene, camera);
  }

  animationRequestId = requestAnimationFrame(animate);
};


    const onWindowResize = () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize, false);
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(animationRequestId);
    };
  }, [isPaused, objectType, isLoadingGLB]);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleObjectTypeChange = () => {
    if (!isLoadingGLB) {
      setObjectType(objectType === 'rectangle' ? 'GLB' : 'rectangle');
    }
  };

  return (
    <div className="container">
      <div className="visualization" ref={containerRef} />
      <div className="info">
        <div>Pitch: {pitch.toFixed(2)}</div>
        <div>Roll: {roll.toFixed(2)}</div>
        <div>Yaw: {yaw.toFixed(2)}</div>
      </div>
      <button className="button" onClick={handlePause}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <button className="button" onClick={handleObjectTypeChange}>
        Switch to {objectType === 'rectangle' ? 'GLB' : 'rectangle'}
      </button>
    </div>
  );
};

export default ControllerVisualization;
