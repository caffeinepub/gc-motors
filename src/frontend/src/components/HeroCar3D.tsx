import { Environment, Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function CarBody() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.05, 0.05, 0.06),
    metalness: 0.95,
    roughness: 0.05,
    envMapIntensity: 1.5,
  });

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.8, 0.62, 0.22),
    metalness: 1.0,
    roughness: 0.1,
    envMapIntensity: 2.0,
    emissive: new THREE.Color(0.15, 0.1, 0.02),
    emissiveIntensity: 0.3,
  });

  const glassMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.1, 0.15, 0.2),
    metalness: 0.1,
    roughness: 0.0,
    transparent: true,
    opacity: 0.6,
    envMapIntensity: 2.0,
  });

  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.05, 0.05, 0.05),
    metalness: 0.8,
    roughness: 0.2,
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.7, 0.55, 0.2),
    metalness: 1.0,
    roughness: 0.05,
  });

  return (
    <group ref={groupRef}>
      {/* Main body lower */}
      <mesh material={bodyMaterial} position={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[2.6, 0.35, 1.1]} />
      </mesh>

      {/* Main body cabin */}
      <mesh material={bodyMaterial} position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[1.7, 0.38, 1.0]} />
      </mesh>

      {/* Roof */}
      <mesh material={bodyMaterial} position={[0.1, 0.5, 0]} castShadow>
        <boxGeometry args={[1.2, 0.15, 0.9]} />
      </mesh>

      {/* Windshield */}
      <mesh
        material={glassMaterial}
        position={[0.65, 0.38, 0]}
        rotation={[0, 0, -0.5]}
      >
        <boxGeometry args={[0.55, 0.35, 0.88]} />
      </mesh>

      {/* Rear window */}
      <mesh
        material={glassMaterial}
        position={[-0.55, 0.38, 0]}
        rotation={[0, 0, 0.5]}
      >
        <boxGeometry args={[0.45, 0.3, 0.88]} />
      </mesh>

      {/* Hood */}
      <mesh
        material={bodyMaterial}
        position={[1.15, 0.1, 0]}
        rotation={[0, 0, 0.12]}
      >
        <boxGeometry args={[0.55, 0.08, 1.0]} />
      </mesh>

      {/* Front splitter */}
      <mesh material={goldMaterial} position={[1.38, -0.22, 0]}>
        <boxGeometry args={[0.12, 0.05, 1.15]} />
      </mesh>

      {/* Rear diffuser */}
      <mesh material={goldMaterial} position={[-1.38, -0.22, 0]}>
        <boxGeometry args={[0.12, 0.05, 1.0]} />
      </mesh>

      {/* Side skirts */}
      <mesh material={goldMaterial} position={[0, -0.24, 0.56]}>
        <boxGeometry args={[2.2, 0.06, 0.08]} />
      </mesh>
      <mesh material={goldMaterial} position={[0, -0.24, -0.56]}>
        <boxGeometry args={[2.2, 0.06, 0.08]} />
      </mesh>

      {/* Wheels - Front Right */}
      <group position={[0.85, -0.33, 0.62]}>
        <mesh material={wheelMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.18, 16]} />
        </mesh>
        <mesh material={rimMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.2, 8]} />
        </mesh>
      </group>

      {/* Wheels - Front Left */}
      <group position={[0.85, -0.33, -0.62]}>
        <mesh material={wheelMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.18, 16]} />
        </mesh>
        <mesh material={rimMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.2, 8]} />
        </mesh>
      </group>

      {/* Wheels - Rear Right */}
      <group position={[-0.85, -0.33, 0.62]}>
        <mesh material={wheelMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.18, 16]} />
        </mesh>
        <mesh material={rimMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.2, 8]} />
        </mesh>
      </group>

      {/* Wheels - Rear Left */}
      <group position={[-0.85, -0.33, -0.62]}>
        <mesh material={wheelMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.18, 16]} />
        </mesh>
        <mesh material={rimMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.2, 8]} />
        </mesh>
      </group>

      {/* Rear spoiler */}
      <mesh material={goldMaterial} position={[-1.1, 0.42, 0]}>
        <boxGeometry args={[0.08, 0.22, 1.1]} />
      </mesh>
      <mesh material={goldMaterial} position={[-1.1, 0.52, 0]}>
        <boxGeometry args={[0.35, 0.05, 1.1]} />
      </mesh>

      {/* Headlights */}
      <mesh position={[1.32, 0.0, 0.38]}>
        <boxGeometry args={[0.05, 0.1, 0.22]} />
        <meshStandardMaterial
          color={new THREE.Color(0.9, 0.85, 0.6)}
          emissive={new THREE.Color(0.9, 0.85, 0.6)}
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[1.32, 0.0, -0.38]}>
        <boxGeometry args={[0.05, 0.1, 0.22]} />
        <meshStandardMaterial
          color={new THREE.Color(0.9, 0.85, 0.6)}
          emissive={new THREE.Color(0.9, 0.85, 0.6)}
          emissiveIntensity={2}
        />
      </mesh>

      {/* Tail lights */}
      <mesh position={[-1.32, 0.0, 0.38]}>
        <boxGeometry args={[0.04, 0.08, 0.2]} />
        <meshStandardMaterial
          color={new THREE.Color(0.9, 0.1, 0.1)}
          emissive={new THREE.Color(0.9, 0.1, 0.1)}
          emissiveIntensity={1.5}
        />
      </mesh>
      <mesh position={[-1.32, 0.0, -0.38]}>
        <boxGeometry args={[0.04, 0.08, 0.2]} />
        <meshStandardMaterial
          color={new THREE.Color(0.9, 0.1, 0.1)}
          emissive={new THREE.Color(0.9, 0.1, 0.1)}
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} color="#1a2030" />
      <pointLight position={[3, 3, 3]} intensity={3} color="#c8a45a" />
      <pointLight position={[-3, 2, -2]} intensity={2} color="#4060a0" />
      <pointLight position={[0, -1, 2]} intensity={1} color="#c8a45a" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      <Environment preset="city" />
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <CarBody />
      </Float>
      <Sparkles
        count={80}
        scale={5}
        size={1.5}
        speed={0.3}
        color="#c8a45a"
        opacity={0.6}
      />
    </>
  );
}

export default function HeroCar3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3.5, 1.5, 3.5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
