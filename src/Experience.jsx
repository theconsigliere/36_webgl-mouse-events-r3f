import { useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { useGLTF, meshBounds } from "@react-three/drei"

export default function Experience() {
  const cube = useRef()
  const hamburger = useGLTF("./hamburger.glb")

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2
  })

  const eventHandler = (e) => {
    console.log(e.distance)
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 50%)`)
  }

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh
        position-x={-2}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={eventHandler}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer"
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default"
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(event) => {
          console.log(event.object.name)
          // stop other objects from receiving the event so we only get the event for the clicked object
          event.stopPropagation()
        }}
      />
    </>
  )
}
