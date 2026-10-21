import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DDevice() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const w = el.clientWidth, h = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 50);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.PointLight(0x34d399, 120, 40); key.position.set(4, 4, 6); scene.add(key);
    const rim = new THREE.PointLight(0x2dd4bf, 60, 40); rim.position.set(-5, -3, 3); scene.add(rim);

    // Screen texture
    const c = document.createElement('canvas'); c.width = 256; c.height = 180;
    const g = c.getContext('2d');
    g.fillStyle = '#022c22'; g.fillRect(0, 0, 256, 180);
    g.fillStyle = '#34d399'; g.font = 'bold 56px sans-serif'; g.fillText('87%', 20, 85);
    g.font = '20px sans-serif'; g.fillText('Solar charge', 20, 125);

    const device = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(3, 4.2, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.25 })
    );
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x0b3b5a, metalness: 0.9, roughness: 0.15, emissive: 0x064e3b, emissiveIntensity: 0.4 })
    );
    panel.position.set(0, 1.15, 0.21);
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 1.8),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c) })
    );
    screen.position.set(0, -0.95, 0.21);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry), new THREE.LineBasicMaterial({ color: 0x34d399 }));
    device.add(body, panel, screen, edge);
    scene.add(device);

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    const clock = new THREE.Clock();
    let id;
    const animate = () => {
      const t = clock.getElapsedTime();
      device.position.y = Math.sin(t * 1.2) * 0.25;
      device.rotation.y += (Math.sin(t * 0.6) * 0.5 + mouse.x * 0.6 - device.rotation.y) * 0.05;
      device.rotation.x += (mouse.y * 0.25 - device.rotation.x) * 0.05;
      renderer.render(scene, camera);
      id = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', onMove);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) { o.material.map?.dispose(); o.material.dispose(); }
      });
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="absolute inset-0 z-10" />;
}