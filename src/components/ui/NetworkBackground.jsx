import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const NetworkBackground = ({ theme = 'dark' }) => {
    const mountRef = useRef(null);
    const themeRef = useRef(theme);

    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        let W = window.innerWidth;
        let H = window.innerHeight;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
        camera.position.set(0, 0, 28);

        // ─── Mouse tracking ────────────────────────────────────────────
        const mouse = new THREE.Vector2(0, 0);
        const mouseTarget = new THREE.Vector2(0, 0);

        const handleMouseMove = (e) => {
            mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // ─── Node System ───────────────────────────────────────────────
        const NODE_COUNT = 120;
        const BOUNDS = 18;
        const CONNECT_DIST = 5.5;

        const nodePositions = [];
        const nodeVelocities = [];
        const nodePhases = [];

        for (let i = 0; i < NODE_COUNT; i++) {
            nodePositions.push(new THREE.Vector3(
                (Math.random() - 0.5) * BOUNDS * 2,
                (Math.random() - 0.5) * BOUNDS * 1.2,
                (Math.random() - 0.5) * BOUNDS * 0.6
            ));
            nodeVelocities.push(new THREE.Vector3(
                (Math.random() - 0.5) * 0.012,
                (Math.random() - 0.5) * 0.008,
                (Math.random() - 0.5) * 0.005
            ));
            nodePhases.push(Math.random() * Math.PI * 2);
        }

        // ─── Node Spheres ──────────────────────────────────────────────
        const nodeMeshes = [];
        const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);

        for (let i = 0; i < NODE_COUNT; i++) {
            const isSpecial = i < 8; // a few brighter nodes
            const mat = new THREE.MeshBasicMaterial({
                color: isSpecial ? 0x9b7eff : 0x5a3dcc,
                transparent: true,
                opacity: isSpecial ? 0.95 : 0.55,
            });
            const mesh = new THREE.Mesh(nodeGeo, mat);
            mesh.position.copy(nodePositions[i]);
            scene.add(mesh);
            nodeMeshes.push(mesh);
        }

        // ─── Edge Lines (redrawn each frame) ───────────────────────────
        const MAX_EDGES = 400;
        const edgePositions = new Float32Array(MAX_EDGES * 2 * 3);
        const edgeColors = new Float32Array(MAX_EDGES * 2 * 3);

        const edgeGeo = new THREE.BufferGeometry();
        edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
        edgeGeo.setAttribute('color', new THREE.BufferAttribute(edgeColors, 3));

        const edgeMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
        scene.add(edgeLines);

        // ─── Mouse Repulsor Glow ────────────────────────────────────────
        const glowGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x7c5cfc,
            transparent: true,
            opacity: 0.15,
        });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        scene.add(glowMesh);

        // Raycasting plane to get 3D mouse position
        const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const raycaster = new THREE.Raycaster();
        const mouseWorld = new THREE.Vector3();

        // ─── Floating skill labels (CSS2D-like via canvas texture) ──────
        const skills = ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Express.js'];
        const labelMeshes = [];

        skills.forEach((skill, i) => {
            const canvas = document.createElement('canvas');
            canvas.width = 256; canvas.height = 64;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, 256, 64);
            ctx.strokeStyle = 'rgba(124,92,252,0.6)';
            ctx.lineWidth = 1;
            ctx.strokeRect(1, 1, 254, 62);
            ctx.fillStyle = 'rgba(124,92,252,0.08)';
            ctx.fillRect(1, 1, 254, 62);
            ctx.font = 'bold 22px Syne, sans-serif';
            ctx.fillStyle = 'rgba(180,160,255,0.9)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(skill, 128, 32);

            const tex = new THREE.CanvasTexture(canvas);
            const geo = new THREE.PlaneGeometry(2.8, 0.7);
            const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
            const mesh = new THREE.Mesh(geo, mat);

            // place them in right half
            const angle = (i / skills.length) * Math.PI * 2;
            mesh.position.set(
                9 + Math.cos(angle) * 5.5,
                Math.sin(angle) * 3.8,
                Math.cos(angle * 0.5) * 2
            );
            mesh.userData.baseAngle = angle;
            mesh.userData.radius = 5.5 + Math.random() * 1.5;
            mesh.userData.yOffset = Math.sin(angle) * 3.8;
            mesh.userData.phase = Math.random() * Math.PI * 2;
            scene.add(mesh);
            labelMeshes.push(mesh);
        });

        // ─── Animate ───────────────────────────────────────────────────
        let frameId;
        const clock = new THREE.Clock();

        function animate() {
            frameId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Smooth mouse
            mouse.x += (mouseTarget.x - mouse.x) * 0.06;
            mouse.y += (mouseTarget.y - mouse.y) * 0.06;

            // Camera subtle drift following mouse
            camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.02;
            camera.lookAt(0, 0, 0);

            // Get 3D mouse world position
            raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
            raycaster.ray.intersectPlane(mousePlane, mouseWorld);
            glowMesh.position.copy(mouseWorld);

            // Update nodes
            for (let i = 0; i < NODE_COUNT; i++) {
                const pos = nodePositions[i];
                const vel = nodeVelocities[i];

                // Gentle float
                pos.add(vel);
                pos.y += Math.sin(t * 0.3 + nodePhases[i]) * 0.003;

                // Bounce bounds
                if (Math.abs(pos.x) > BOUNDS) vel.x *= -1;
                if (Math.abs(pos.y) > BOUNDS * 0.7) vel.y *= -1;
                if (Math.abs(pos.z) > BOUNDS * 0.4) vel.z *= -1;

                // Mouse repulsion
                const dx = pos.x - mouseWorld.x;
                const dy = pos.y - mouseWorld.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 4) {
                    const force = (4 - dist) / 4 * 0.04;
                    pos.x += (dx / dist) * force;
                    pos.y += (dy / dist) * force;
                }

                nodeMeshes[i].position.copy(pos);

                // Pulse opacity
                const op = 0.4 + 0.3 * Math.sin(t * 0.8 + nodePhases[i]);
                nodeMeshes[i].material.opacity = i < 8 ? 0.9 : op;
            }

            const isLight = themeRef.current === 'light';

            // Update node colors dynamically - darker and bolder for light mode
            const specialColor = isLight ? 0x6138cc : 0x9b7eff;
            const normalColor = isLight ? 0x3d258a : 0x5a3dcc;
            glowMesh.material.color.setHex(isLight ? 0x8260eb : 0x7c5cfc);
            glowMesh.material.opacity = isLight ? 0.15 : 0.15;

            for (let i = 0; i < NODE_COUNT; i++) {
                nodeMeshes[i].material.color.setHex(i < 8 ? specialColor : normalColor);
                if (isLight) {
                    nodeMeshes[i].material.opacity = i < 8 ? 1.0 : (0.6 + 0.4 * Math.sin(t * 0.8 + nodePhases[i]));
                }
            }

            // Rebuild edges
            let edgeIdx = 0;
            for (let a = 0; a < NODE_COUNT && edgeIdx < MAX_EDGES; a++) {
                for (let b = a + 1; b < NODE_COUNT && edgeIdx < MAX_EDGES; b++) {
                    const pa = nodePositions[a];
                    const pb = nodePositions[b];
                    const dx = pa.x - pb.x, dy = pa.y - pb.y, dz = pa.z - pb.z;
                    const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (d < CONNECT_DIST) {
                        const alpha = 1 - d / CONNECT_DIST;
                        const ei = edgeIdx * 6;
                        edgePositions[ei] = pa.x; edgePositions[ei + 1] = pa.y; edgePositions[ei + 2] = pa.z;
                        edgePositions[ei + 3] = pb.x; edgePositions[ei + 4] = pb.y; edgePositions[ei + 5] = pb.z;

                        // Edge colors depend on theme - darker for light mode
                        const baseR = isLight ? 0.4 : 0.35;
                        const baseG = isLight ? 0.2 : 0.22;
                        const baseB = isLight ? 0.8 : 0.8;

                        // Give lines more contrast in light mode
                        const edgeAlpha = isLight ? alpha * 1.5 : alpha;

                        const r = baseR + edgeAlpha * 0.35;
                        const g = baseG + edgeAlpha * 0.1;
                        const bl = baseB + edgeAlpha * 0.2;

                        edgeColors[ei] = r; edgeColors[ei + 1] = g; edgeColors[ei + 2] = bl;
                        edgeColors[ei + 3] = r * alpha; edgeColors[ei + 4] = g * alpha; edgeColors[ei + 5] = bl * alpha;
                        edgeIdx++;
                    }
                }
            }

            // Zero out unused
            for (let i = edgeIdx * 6; i < MAX_EDGES * 6; i++) edgePositions[i] = 0;

            edgeGeo.attributes.position.needsUpdate = true;
            edgeGeo.attributes.color.needsUpdate = true;
            edgeGeo.setDrawRange(0, edgeIdx * 2);

            // Orbit label cards
            labelMeshes.forEach((m, i) => {
                const speed = 0.08 + i * 0.01;
                const angle = m.userData.baseAngle + t * speed * 0.25;
                const r = m.userData.radius;
                m.position.x = 9 + Math.cos(angle) * r;
                m.position.y = Math.sin(angle * 0.7 + m.userData.phase) * 3.2;
                m.position.z = Math.sin(angle) * 1.5;
                m.lookAt(camera.position);
                m.material.opacity = 0.5 + 0.4 * Math.abs(Math.cos(angle));
            });

            renderer.render(scene, camera);
        }
        animate();

        // ─── Resize ────────────────────────────────────────────────────
        const handleResize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            camera.aspect = W / H;
            camera.updateProjectionMatrix();
            renderer.setSize(W, H);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    // Set height 100vh just for safety if absolute inset-0 gets tricky but we'll use utility classes
    return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />;
};

export default NetworkBackground;
