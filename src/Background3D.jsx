import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.03);
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.PointLight(0x34d399, 80, 60);
    light.position.set(5, 5, 8);
    scene.add(light);

    // Central object group
    const group = new THREE.Group();
    scene.add(group);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(3, 0.8, isMobile ? 120 : 220, 24),
      new THREE.MeshStandardMaterial({
        color: 0x10b981, wireframe: true, emissive: 0x059669,
        emissiveIntensity: 0.6, transparent: true, opacity: 0.55,
      })
    );
    group.add(knot);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.4, 1),
      new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x10b981, emissiveIntensity: 0.9, flatShading: true })
    );
    group.add(core);

    const rings = [4.6, 6].map((r, i) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.02, 8, 120),
        new THREE.MeshBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.5 })
      );
      m.rotation.x = Math.PI / 2 + i * 0.5;
      group.add(m);
      return m;
    });

    // Particles
    const count = isMobile ? 500 : 1500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * 50;
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x6ee7b7, size: 0.07, transparent: true, opacity: 0.8 })
    );
    scene.add(points);

    // Floating wireframe cubes
    const cubes = Array.from({ length: isMobile ? 6 : 14 }, () => {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.6, 0.6),
        new THREE.MeshStandardMaterial({ color: 0x14b8a6, wireframe: true })
      );
      m.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10 - 4);
      m.userData.s = Math.random() * 0.01 + 0.003;
      scene.add(m);
      return m;
    });

    // Interaction
    const mouse = { x: 0, y: 0 };
    let scrollY = window.scrollY;
    let pulse = 0;
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { scrollY = window.scrollY; };
    const onHash = () => { pulse = 1; };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('verde-nav', onHash);
    window.addEventListener('resize', onResize);

    // Animation loop
    const clock = new THREE.Clock();
    let id;
    const animate = () => {
      const t = clock.getElapsedTime();
      knot.rotation.x = t * 0.15;
      knot.rotation.y = t * 0.2;
      core.rotation.y = -t * 0.5;
      core.scale.setScalar(1 + Math.sin(t * 2) * 0.08 + pulse * 0.6);
      rings.forEach((r, i) => { r.rotation.z = t * (0.2 + i * 0.15); });
      points.rotation.y = t * 0.02;
      cubes.forEach((c) => {
        c.rotation.x += c.userData.s * 2;
        c.rotation.y += c.userData.s * 3;
        c.position.y += Math.sin(t + c.position.x) * 0.003;
      });

      group.rotation.y += (mouse.x * 0.6 - group.rotation.y) * 0.03;
      group.rotation.x += (mouse.y * 0.3 - group.rotation.x) * 0.03;
      group.rotation.z = scrollY * 0.001;
      group.position.y += (Math.min(scrollY * 0.004, 6) - group.position.y) * 0.05;
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.03;
      camera.position.z = 14 - pulse * 3;
      camera.lookAt(0, 0, 0);
      pulse *= 0.93;

      renderer.render(scene, camera);
      if (!reduce) id = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('verde-nav', onHash);
      window.removeEventListener('resize', onResize);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}