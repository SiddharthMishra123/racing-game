import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Box, Text } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function PlayerCar({ speed, steering }) {
  const carRef = useRef();

  useFrame(() => {
    if (!carRef.current) return;

    carRef.current.position.x += steering;

    if (carRef.current.position.x > 5)
      carRef.current.position.x = 5;

    if (carRef.current.position.x < -5)
      carRef.current.position.x = -5;
  });

  return (
    <group ref={carRef} position={[0, 0.5, 0]}>
      {/* Main Body */}
      <mesh castShadow>
        <boxGeometry args={[1.8, 0.6, 4]} />
        <meshStandardMaterial color="#111111" metalness={1} roughness={0.2} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 0.5, -0.2]} castShadow>
        <boxGeometry args={[1.4, 0.5, 2]} />
        <meshStandardMaterial color="#222222" metalness={1} roughness={0.15} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.5, 0.8]} rotation={[-0.6, 0, 0]}>
        <boxGeometry args={[1.3, 0.05, 1]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.5} />
      </mesh>

      {/* Wheels */}
      {[
        [-1, -0.2, 1.3],
        [1, -0.2, 1.3],
        [-1, -0.2, -1.3],
        [1, -0.2, -1.3],
      ].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.5, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}

      {/* Headlights */}
      <mesh position={[-0.5, 0.1, 2.05]}>
        <boxGeometry args={[0.3, 0.15, 0.05]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={3} />
      </mesh>

      <mesh position={[0.5, 0.1, 2.05]}>
        <boxGeometry args={[0.3, 0.15, 0.05]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={3} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.5, 0.1, -2.05]}>
        <boxGeometry args={[0.3, 0.15, 0.05]} />
        <meshStandardMaterial emissive="red" emissiveIntensity={3} />
      </mesh>

      <mesh position={[0.5, 0.1, -2.05]}>
        <boxGeometry args={[0.3, 0.15, 0.05]} />
        <meshStandardMaterial emissive="red" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

function Road() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 300]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      {/* Center Lines */}
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.01, -i * 8]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.3, 4]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}

      {/* Guardrails */}
      <mesh position={[7, 0.5, -100]}>
        <boxGeometry args={[0.3, 1, 200]} />
        <meshStandardMaterial color="red" metalness={1} />
      </mesh>

      <mesh position={[-7, 0.5, -100]}>
        <boxGeometry args={[0.3, 1, 200]} />
        <meshStandardMaterial color="red" metalness={1} />
      </mesh>
    </group>
  );
}

function Traffic({ obstacles, setGameOver }) {
  useFrame(() => {
    obstacles.forEach((obs) => {
      obs.position.z += 0.4;

      if (obs.position.z > 10) {
        obs.position.z = -120;
        obs.position.x = (Math.random() - 0.5) * 8;
      }

      if (
        Math.abs(obs.position.z) < 2 &&
        Math.abs(obs.position.x) < 1.5
      ) {
        setGameOver(true);
      }
    });
  });

  return (
    <>
      {obstacles.map((obs, i) => (
        <mesh
          key={i}
          position={obs.position}
          castShadow
        >
          <boxGeometry args={[1.8, 1, 4]} />
          <meshStandardMaterial color="#0088ff" metalness={0.8} />
        </mesh>
      ))}
    </>
  );
}

function CameraFollow() {
  useFrame(({ camera }) => {
    camera.position.lerp(new THREE.Vector3(0, 5, 10), 0.05);
    camera.lookAt(0, 0, -20);
  });

  return null;
}

export default function UltimateRacingGame() {
  const [speed, setSpeed] = useState(120);
  const [distance, setDistance] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [steering, setSteering] = useState(0);

  const [obstacles] = useState(
    Array.from({ length: 6 }).map((_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        0.5,
        -20 - i * 20
      ),
    }))
  );

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setSteering(-0.15);
      }

      if (e.key === 'ArrowRight' || e.key === 'd') {
        setSteering(0.15);
      }

      if (e.key === 'ArrowUp' || e.key === 'w') {
        setSpeed((s) => Math.min(s + 10, 320));
      }

      if (e.key === 'ArrowDown' || e.key === 's') {
        setSpeed((s) => Math.max(s - 10, 60));
      }

      if (e.key === ' ') {
        setGameStarted(true);

        if (gameOver) {
          window.location.reload();
        }
      }
    };

    const up = () => {
      setSteering(0);
    };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setDistance((d) => d + 1);
      setScore((s) => s + 5);
    }, 100);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative text-white">
      {!gameStarted && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/90">
          <div className="text-center max-w-2xl p-8 rounded-3xl border border-yellow-500 bg-zinc-900 shadow-2xl">
            <h1 className="text-6xl font-black text-yellow-400 mb-6">
              BMW HIGHWAY RACER
            </h1>

            <p className="text-xl mb-4 text-zinc-300">
              Ultra Realistic 3D Racing Experience
            </p>

            <div className="text-left text-lg space-y-2 mb-8">
              <p>⬅️ ➡️ Arrow Keys / A D = Steering</p>
              <p>⬆️ ⬇️ Arrow Keys / W S = Speed Control</p>
              <p>SPACE = Start / Restart</p>
              <p>Avoid Blue Traffic Cars</p>
            </div>

            <button
              onClick={() => setGameStarted(true)}
              className="bg-yellow-400 text-black px-8 py-4 rounded-2xl text-2xl font-bold hover:scale-105 transition"
            >
              START ENGINE
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/90">
          <div className="bg-zinc-900 border border-red-500 p-10 rounded-3xl text-center shadow-2xl">
            <h1 className="text-6xl font-black text-red-500 mb-4">
              GAME OVER
            </h1>

            <p className="text-3xl mb-2">Final Score: {score}</p>
            <p className="text-2xl mb-6">Distance: {distance} m</p>

            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 px-8 py-4 rounded-2xl text-2xl font-bold"
            >
              RESTART
            </button>
          </div>
        </div>
      )}

      {/* HUD */}
      <div className="absolute top-0 left-0 z-10 p-6 flex gap-6 text-xl font-bold">
        <div className="bg-black/60 px-4 py-2 rounded-xl border border-yellow-500">
          SPEED: {speed} km/h
        </div>

        <div className="bg-black/60 px-4 py-2 rounded-xl border border-yellow-500">
          DISTANCE: {distance} m
        </div>

        <div className="bg-black/60 px-4 py-2 rounded-xl border border-yellow-500">
          SCORE: {score}
        </div>
      </div>

      <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.6} />

        <directionalLight
          position={[10, 20, 10]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <fog attach="fog" args={['#ff9966', 20, 140]} />

        <Environment preset="sunset" />

        <Road />

        <PlayerCar speed={speed} steering={steering} />

        <Traffic obstacles={obstacles} setGameOver={setGameOver} />

        <CameraFollow />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
