'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  isDarkMode: boolean;
  completedTasks: number;
}

export default function ThreeBackground({ isDarkMode, completedTasks }: ThreeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Brighter floating particles with more visibility
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 25;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: isDarkMode ? 0x818cf8 : 0x6366f1,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // More visible rotating rings with bright colors
    const torusGeometry = new THREE.TorusGeometry(3, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x818cf8 : 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.z = -5;
    scene.add(torus);

    // Add second torus for more visual interest
    const torus2 = new THREE.Mesh(torusGeometry.clone(), torusMaterial.clone());
    torus2.position.z = -5;
    torus2.rotation.x = Math.PI / 2;
    scene.add(torus2);

    // Brighter animated gradient plane
    const planeGeometry = new THREE.PlaneGeometry(40, 40);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x4f46e5 : 0xa5b4fc,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = -10;
    scene.add(plane);

    // Brighter stars
    const starGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const stars: THREE.Mesh[] = [];
    
    for (let i = 0; i < 20; i++) {
      const starMaterial = new THREE.MeshBasicMaterial({
        color: i < completedTasks ? 0xfbbf24 : (isDarkMode ? 0x818cf8 : 0x6366f1),
        transparent: true,
        opacity: i < completedTasks ? 1 : 0.7
      });
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        -2
      );
      scene.add(star);
      stars.push(star);
    }

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // More visible particle animation
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      // Faster torus rotation
      torus.rotation.x += 0.002;
      torus.rotation.y += 0.003;
      
      torus2.rotation.x += 0.0015;
      torus2.rotation.z += 0.0025;

      // Animated plane rotation
      plane.rotation.z += 0.0005;

      // Pulse completed stars more visibly
      stars.forEach((star, i) => {
        if (i < completedTasks) {
          star.scale.setScalar(1 + Math.sin(Date.now() * 0.005 + i) * 0.3);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      starGeometry.dispose();
      stars.forEach(star => {
        if (Array.isArray(star.material)) {
          star.material.forEach(mat => mat.dispose());
        } else {
          star.material.dispose();
        }
      });
    };
  }, [isDarkMode, completedTasks]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}