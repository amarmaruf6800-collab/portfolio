import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

const COLORS = {
    primary: 0x7fffe5,   // Cyan terang (hanya untuk core/highlight)
    secondary: 0x2a8f82, // Cyan gelap (untuk struktur utama)
    dim: 0x154d45,       // Sangat redup (untuk background/grid)
    faint: 0x0a2a25,     // Hampir tak terlihat
    white: 0xcffff7,
};

/* =========================================================
   LINES & FRAMES (Hierarchy Adjusted)
========================================================= */
function WideLine({ points, width = 1, opacity = 1, color = COLORS.primary, glow = false }) {
    const line = useMemo(() => {
        const geometry = new LineGeometry();
        geometry.setPositions(points.flatMap(([x, y, z]) => [x, y, z]));
        const material = new LineMaterial({
            color, linewidth: width, transparent: true, opacity, depthWrite: false, depthTest: true, worldUnits: false, alphaToCoverage: true,
        });
        return new Line2(geometry, material);
    }, [points, width, opacity, color]);

    return <primitive object={line} dispose={null} renderOrder={glow ? 1 : 2} />;
}

// Glow hanya diaktifkan secara selektif, tidak pada semua garis
function HoloLine({ points, width = 1, color = COLORS.secondary, opacity = 0.5, enableGlow = false }) {
    return (
        <group>
            {enableGlow && (
                <>
                    <WideLine points={points} width={width * 5} opacity={opacity * 0.05} color={color} glow />
                    <WideLine points={points} width={width * 2} opacity={opacity * 0.1} color={color} glow />
                </>
            )}
            <WideLine points={points} width={width} opacity={opacity} color={color} />
        </group>
    );
}

function BlueprintFrame({ width, height, z, opacity = 0.3, lineWidth = 1, color = COLORS.secondary }) {
    const [hw, hh] = [width / 2, height / 2];
    const points = useMemo(() => [[-hw, -hh, z], [hw, -hh, z], [hw, hh, z], [-hw, hh, z], [-hw, -hh, z]], [hw, hh, z]);
    return <HoloLine points={points} width={lineWidth} color={color} opacity={opacity} />;
}

/* =========================================================
   ABSTRACT ARCHITECTURE MODULES (Static, no floating)
========================================================= */
function HoloModule({ position = [0, 0, 0], width = 1.8, height = 0.6, label = "SYS", isMobile }) {
    const [hw, hh, front, back] = [width / 2, height / 2, 0.2, 0];

    return (
        <group position={position}>
            {/* Cangkang Modul - Statis & Redup */}
            <BlueprintFrame width={width} height={height} z={front} opacity={0.4} lineWidth={1} />
            <BlueprintFrame width={width} height={height} z={back} opacity={0.15} lineWidth={0.7} color={COLORS.dim} />

            {/* Detail Garis dalam modul */}
            <HoloLine points={[[-hw + 0.15, hh - 0.15, front], [hw - 0.15, hh - 0.15, front]]} width={0.5} opacity={0.2} color={COLORS.secondary} />
            <HoloLine points={[[-hw + 0.15, -hh + 0.15, front], [-0.1, -hh + 0.15, front]]} width={0.5} opacity={0.15} color={COLORS.dim} />

            {/* Subtle Annotation inside module */}
            {!isMobile && (
                <Text position={[-hw + 0.15, hh + 0.12, front]} fontSize={0.06} color={COLORS.secondary} fillOpacity={0.65} anchorX="left">
                    {label}
                </Text>
            )}
        </group>
    );
}

/* =========================================================
   DYNAMIC CORE (Slow pulse, brightest element)
========================================================= */
function Core() {
    const group = useRef();
    const ring1 = useRef();
    const ring2 = useRef();
    const innerSphere = useRef();

    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.elapsedTime;
        const { pointer } = state;

        const mouseDist = Math.sqrt(pointer.x ** 2 + pointer.y ** 2);
        const interaction = Math.max(0, 1 - mouseDist * 1.5);

        // Denyut sangat pelan (sekitar 4 detik per siklus) jika tidak di-hover
        const pulse = 1 + Math.sin(t * (1.5 + interaction * 4)) * (0.03 + interaction * 0.1);

        group.current.scale.setScalar(pulse);
        group.current.rotation.x = t * 0.05;
        group.current.rotation.y = t * 0.08;

        if (innerSphere.current) {
            innerSphere.current.rotation.y = t * 0.4;
            innerSphere.current.rotation.z = t * 0.2;
        }
        if (ring1.current) {
            ring1.current.rotation.x = t * 0.2;
            ring1.current.rotation.y = t * 0.15;
        }
        if (ring2.current) {
            ring2.current.rotation.x = -t * 0.15;
            ring2.current.rotation.z = t * 0.2;
        }
    });

    return (
        <group
            ref={group}
            onPointerOver={() => (document.body.style.cursor = "grab")}
            onPointerOut={() => (document.body.style.cursor = "auto")}
        >
            <mesh ref={innerSphere}>
                <icosahedronGeometry args={[0.35, 1]} />
                {/* Core adalah satu-satunya objek dengan cahaya menyilaukan */}
                <meshStandardMaterial color="#0a5f56" emissive="#58ffe6" emissiveIntensity={1.3} transparent opacity={0.64} />
            </mesh>

            <mesh ref={ring1}>
                <torusGeometry args={[0.6, 0.008, 16, 64]} />
                <meshBasicMaterial color={COLORS.primary} transparent opacity={0.7} />
            </mesh>
            <mesh ref={ring2}>
                <torusGeometry args={[0.75, 0.005, 16, 64]} />
                <meshBasicMaterial color={COLORS.secondary} transparent opacity={0.4} />
            </mesh>
            <mesh>
                <boxGeometry args={[1.2, 1.2, 1.2]} />
                <meshBasicMaterial color={COLORS.secondary} transparent opacity={0.08} wireframe />
            </mesh>
        </group>
    );
}

/* =========================================================
   LAYER 2: SLOW ROTATING RINGS & BACKGROUND
========================================================= */
function RadarRings() {
    const innerRef = useRef();
    const outerRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Putaran sangat pelan (Outer ~30s, Inner ~18s)
        if (outerRef.current) outerRef.current.rotation.z = -t * 0.02;
        if (innerRef.current) innerRef.current.rotation.z = t * 0.035;
    });

    return (
        <group position={[0, 0, -1]}>
            <mesh ref={outerRef}>
                <ringGeometry args={[4.05, 4.07, 64, 1, 0, Math.PI * 1.6]} />
                <meshBasicMaterial color={COLORS.dim} transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
            <mesh ref={innerRef}>
                <ringGeometry args={[2.95, 3.1, 48, 1, 0, Math.PI * 1.8]} />
                <meshBasicMaterial color={COLORS.dim} transparent opacity={0.08} wireframe side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

/* =========================================================
   LAYER 3: DYNAMIC SCANS & PARTICLES
========================================================= */
function Scanline({ isMobile }) {
    const ref = useRef();
    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime;
        const speed = 0.8; // Sekitar 5 detik per siklus
        const travelDistance = 5.5;
        ref.current.position.y = 2.5 - ((t * speed) % travelDistance);
    });

    const scanWidth = 6.8;

    return (
        <group ref={ref} position={[-0.5, 0, 0.2]}>
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[scanWidth, 0.015]} />
                <meshBasicMaterial color={COLORS.primary} transparent opacity={isMobile ? 0.07 : 0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh position={[0, 0.08, -0.02]}>
                <planeGeometry args={[scanWidth, 0.15]} />
                <meshBasicMaterial color={COLORS.primary} transparent opacity={isMobile ? 0.006 : 0.013} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
        </group>
    );
}

function SubtleParticles() {
    const groupRef = useRef();
    const points = useMemo(() => Array.from({ length: 30 }, () => ({
        x: (Math.random() - 0.5) * 7, y: (Math.random() - 0.5) * 5, z: (Math.random() - 0.5) * 2,
        speed: Math.random() * 0.2 + 0.05, opacity: Math.random() * 0.3 + 0.05
    })), []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.children.forEach((child, i) => {
            child.position.y += points[i].speed * delta;
            if (child.position.y > 2.8) child.position.y = -2.8;
        });
    });

    return (
        <group ref={groupRef}>
            {points.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]}>
                    <sphereGeometry args={[0.015, 4, 4]} />
                    <meshBasicMaterial color={COLORS.secondary} transparent opacity={p.opacity} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
}

/* =========================================================
   SUBTLE ANNOTATIONS (Point 4)
========================================================= */
function TechnicalAnnotations() {
    const annotations = [
        { text: "STATUS: ACTIVE", pos: [1.2, -1.8, 0], size: 0.05, align: "left" },
        { text: "PORT: 8080 // ONLINE", pos: [-3.2, 2.2, 0], size: 0.04, align: "left" },
        { text: "LAT: 07.24 // LON: 110.24", pos: [3.2, 2.2, 0], size: 0.04, align: "right" },
        { text: "V. 2.0.4", pos: [-3.2, -2.2, 0], size: 0.04, align: "left" }
    ];
    return (
        <group>
            {annotations.map((t, i) => (
                <Text key={i} position={t.pos} fontSize={t.size} color={COLORS.secondary} fillOpacity={0.55} anchorX={t.align} anchorY="middle" letterSpacing={0.15}>
                    {t.text}
                </Text>
            ))}
        </group>
    );
}

/* =========================================================
   MAIN SCENE (Grid Aligned & Abstract Architecture)
========================================================= */
function BlueprintSystem({ isMobile }) {
    const root = useRef();

    useFrame((state) => {
        if (!root.current) return;
        const { pointer } = state;
        // Interaksi rotasi global sangat subtle
        root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, pointer.x * 0.04, 0.02);
        root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -pointer.y * 0.02, 0.02);
    });

    // Koordinat Arsitektur Abstrak (Fullstack Flow)
    const uiPos = [0, 1.8, 0];       // Atas (User Interface)
    const fePos = [-2.4, 0.2, 0];    // Kiri (Frontend)
    const bePos = [2.4, 0.2, 0];     // Kanan (Backend)
    const dbPos = [0, -1.5, 0];      // Bawah (Database)

    return (
        // Posisi X 3.1 menyeimbangkan blueprint ke kanan tanpa memotong modul Backend.
        // Skala 0.75 menjaga seluruh arsitektur tetap muat di berbagai rasio layar.
        <group ref={root} position={[3.1, 0, 0]} scale={0.75} rotation={[0, -0.05, 0]}>

            {/* Background & Radar */}
            <RadarRings />
            <BlueprintFrame width={7} height={4.8} z={-0.5} opacity={0.1} lineWidth={0.5} color={COLORS.dim} />

            <group position={[-0.35, 0, 0]}>
                {/* Garis Koneksi Arsitektur (Data Flow) - Opacity Sangat Redup */}
                <group position={[0, 0, 0.1]}>
                    {/* UI to FE & BE */}
                    <HoloLine points={[[0, 1.5, 0], [-2.4, 0.5, 0]]} width={0.8} opacity={0.15} />
                    <HoloLine points={[[0, 1.5, 0], [2.4, 0.5, 0]]} width={0.8} opacity={0.15} />
                    {/* FE & BE to DB */}
                    <HoloLine points={[[-2.4, -0.1, 0], [0, -1.2, 0]]} width={0.8} opacity={0.15} />
                    <HoloLine points={[[2.4, -0.1, 0], [0, -1.2, 0]]} width={0.8} opacity={0.15} />
                    {/* FE & BE to Core */}
                    <HoloLine points={[[-1.5, 0.2, 0], [-0.5, 0, 0]]} width={1} opacity={0.3} enableGlow />
                    <HoloLine points={[[1.5, 0.2, 0], [0.5, 0, 0]]} width={1} opacity={0.3} enableGlow />
                </group>

                {/* Modul Arsitektur Abstrak */}
                <HoloModule position={uiPos} label="INTERFACE // 01" isMobile={isMobile} />
                <HoloModule position={fePos} label="FRONTEND // 02" isMobile={isMobile} />
                <HoloModule position={bePos} label="BACKEND // 03" isMobile={isMobile} />
                <HoloModule position={dbPos} label="DATABASE // 04" isMobile={isMobile} />

                {!isMobile && <TechnicalAnnotations />}
                {!isMobile && <SubtleParticles />}

                {/* Core di tengah arsitektur */}
                <Core />
            </group>

            <Scanline isMobile={isMobile} />
        </group>
    );
}

export default function HeroVisual() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="hero-3d hero-3d-reveal">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 42, near: 0.1, far: 20 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 1.75]}
                onCreated={({ scene }) => {
                    // Point 3: Kabut tebal menciptakan efek fade to darkness di pinggiran
                    scene.fog = new THREE.FogExp2(new THREE.Color("#000806"), 0.08);
                }}
            >
                <color attach="background" args={["#000504"]} />

                {/* Pencahayaan difokuskan, ambient dikurangi */}
                <ambientLight intensity={0.02} />
                <pointLight position={[3.8, 0, 2]} intensity={2.5} distance={6} color="#48ffe1" />
                <pointLight position={[0, -2, 1]} intensity={0.5} distance={5} color="#0d7568" />

                <BlueprintSystem isMobile={isMobile} />

                <EffectComposer multisampling={4}>
                    <Bloom intensity={1.0} luminanceThreshold={0.8} luminanceSmoothing={0.3} mipmapBlur />
                    <Vignette eskil={false} offset={0.25} darkness={0.65} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}