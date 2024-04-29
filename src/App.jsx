import * as THREE from "three";
import "./App.css";
import { useRef } from "react";
import { useEffect } from "react";

function App() {
  const imageUrl = "https://i.imgur.com/8k1f1jI.jpg";
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    camera.position.z = 5;

    const handleOrientation = (event) => {
      const { beta, gamma } = event;

      // Convertir los ángulos de orientación a radianes
      const betaRad = (beta * Math.PI) / 180;
      const gammaRad = (gamma * Math.PI) / 180;

      // Mover el objeto en función de los ángulos de orientación
      mesh.rotation.x = betaRad;
      mesh.rotation.y = gammaRad;
    };

    window.addEventListener("deviceorientation", handleOrientation);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Limpiar recursos al desmontar el componente
      geometry.dispose();
      texture.dispose();
      material.dispose();
      scene.remove(mesh);
      renderer.dispose();
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [imageUrl]);

  return <canvas ref={canvasRef} />;
}

export default App;
