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
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: isDarkMode ? 0x6366f1 : 0x818cf8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Rotating torus
    const torusGeometry = new THREE.TorusGeometry(2, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x4f46e5 : 0xa5b4fc,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.z = -3;
    scene.add(torus);

    // Stars that light up with completed tasks
    const starGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const stars: THREE.Mesh[] = [];
    
    for (let i = 0; i < 20; i++) {
      const starMaterial = new THREE.MeshBasicMaterial({
        color: i < completedTasks ? 0xffd700 : (isDarkMode ? 0x334155 : 0xe2e8f0),
        transparent: true,
        opacity: i < completedTasks ? 1 : 0.6
      });
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        -2
      );
      scene.add(star);
      stars.push(star);
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
      
      torus.rotation.x += 0.001;
      torus.rotation.y += 0.001;

      // Pulse completed stars
      stars.forEach((star, i) => {
        if (i < completedTasks) {
          star.scale.setScalar(1 + Math.sin(Date.now() * 0.003 + i) * 0.2);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
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
      starGeometry.dispose();
      stars.forEach(star => star.material.dispose());
    };
  }, [isDarkMode, completedTasks]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
    />
  );
}