import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import {
  Globe,
  MapPin,
  Navigation,
  Info,
  Settings,
  X,
  Plus,
  Trash2,
  Edit3,
  Route,
  Star,
  Heart,
  Activity,
  Sparkles,
  Loader2,
  Wand2,
  Play,
  Pause,
  Image as ImageIcon,
  Layers,
  ChevronLeft,
  ExternalLink,
  Search,
} from "lucide-react";

// --- INITIAL DATA ---
const INITIAL_LOCATIONS = [
  // --- Timeline Locations (Lived / Living / specific Visited in path) ---
  {
    id: "6",
    name: "Azerbaijan, Baku",
    lat: 40.4093,
    lng: 49.8671,
    status: "lived",
    year: "2016-2018",
    members: "ALL Family",
    note: "In 1998, dad moved here from Qax for university and met mom. They then moved to Russia (Kazan) in 2000 for work, where Furgan was born in 2006. Meryem was born the next year in 2007, and ayshe was born in 2012. We lived in Kazan until 2012 before moving to Cameroon (Maroua). The family lived there until 2016, before moving back to Azerbaijan for two years (2016-2018), and then Traveled to Iraq.",
    flag: "🇦🇿",
    order: 1,
    galleryLink:
      "https://drive.google.com/drive/folders/1ZCe5Q6zsegdZ7ovIi3D-rzlpU-x3Rvop?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "3",
    name: "Russia, Kazan",
    lat: 55.7963,
    lng: 49.1088,
    status: "visited",
    year: "2001-20012",
    members: "ALL Family",
    note: "Furgan, Meryem, Ayshe, were born here. Before Moving to Maruoa.",
    flag: "🇷🇺",
    order: 2,
    galleryLink:
      "https://drive.google.com/drive/folders/1dR3coRbtlSaSNK9HTUqqNKEgr2X4ZNgX?usp=sharing",
    pinStyle: "pulse-breath",
  },
  {
    id: "4",
    name: "Cameroon, Maroua",
    lat: 10.5938,
    lng: 14.3159,
    status: "lived",
    year: "2012-2016",
    members: "ALL Family",
    note: "",
    flag: "🇨🇲",
    order: 3,
    galleryLink:
      "https://drive.google.com/drive/folders/1786i2vaW9AmKAVexnZCdh8PiJ5IuDukT?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "2",
    name: "Iraq, Baghdad",
    lat: 33.3152,
    lng: 44.3661,
    status: "lived",
    year: "2018-2024",
    members: "ALL Family",
    note: "",
    flag: "🇮🇶",
    order: 4,
    galleryLink:
      "https://drive.google.com/drive/folders/1JTHZ9SnwQvvUftBs4sdDF5R-pYrkwKYu?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "5",
    name: "Mauritania, Nouakchott",
    lat: 18.079,
    lng: -15.9652,
    status: "living",
    year: "2024-Present",
    members: "ALL Family",
    note: "Current home base.",
    flag: "🇲🇷",
    order: 5,
    galleryLink:
      "https://drive.google.com/drive/folders/1yVBW5zEz07g0uEmtBIwWdW2gAlf4BhVI?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "1",
    name: "Türkiye, Trabzon",
    lat: 41.0027,
    lng: 39.7168,
    status: "living",
    year: "2025-Present",
    members: "Furgan & Meryem",
    note: "Current home base.",
    flag: "🇹🇷",
    order: 6,
    galleryLink:
      "https://drive.google.com/drive/folders/1Kvt3vjdlwSGpIfi7MZtZB7jQQTHeuMTh?usp=sharing",
    pinStyle: "default",
  },

  // --- Lived Locations (No Order) ---
  {
    id: "l1",
    name: "Azerbaijan, Zengilan (Karabagh)",
    lat: 39.0822,
    lng: 46.6669,
    status: "lived",
    year: "1984-1993",
    members: "Layaqat",
    note: "Mom was born here and lived until 9 years old before fleeing due to war. Currently occupied territory with no access.",
    flag: "🇦🇿",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1ZCe5Q6zsegdZ7ovIi3D-rzlpU-x3Rvop?usp=sharing",
    pinStyle: "default",
  },

  // --- Visited Locations (No Order) ---
  {
    id: "v1",
    name: "Azerbaijan, Sheki",
    lat: 41.1975,
    lng: 47.1436,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇦🇿",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1ZCe5Q6zsegdZ7ovIi3D-rzlpU-x3Rvop?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v2",
    name: "Azerbaijan, Qax",
    lat: 41.4206,
    lng: 46.9324,
    status: "visited",
    year: "1980s-1998",
    members: "ALL Family",
    note: "Dad was born here.",
    flag: "🇦🇿",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1ZCe5Q6zsegdZ7ovIi3D-rzlpU-x3Rvop?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v3",
    name: "Azerbaijan, Saatli",
    lat: 39.9362,
    lng: 48.3688,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇦🇿",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1ZCe5Q6zsegdZ7ovIi3D-rzlpU-x3Rvop?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v4",
    name: "Azerbaijan, Zaqatala",
    lat: 41.6296,
    lng: 46.6433,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇦🇿",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1ZCe5Q6zsegdZ7ovIi3D-rzlpU-x3Rvop?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v5",
    name: "Russia, Moscow",
    lat: 55.7558,
    lng: 37.6173,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇷🇺",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1dR3coRbtlSaSNK9HTUqqNKEgr2X4ZNgX?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v6",
    name: "Kazakhstan",
    lat: 48.0196,
    lng: 66.9237,
    status: "visited",
    year: "Past",
    members: "Rashad",
    note: "",
    flag: "🇰🇿",
    order: "",
    galleryLink: "",
    pinStyle: "default",
  },
  {
    id: "v7",
    name: "Georgia",
    lat: 42.3154,
    lng: 43.3569,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇬🇪",
    order: "",
    galleryLink: "",
    pinStyle: "default",
  },
  {
    id: "v8",
    name: "UAE, Dubai",
    lat: 25.2048,
    lng: 55.2708,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇦🇪",
    order: "",
    galleryLink: "",
    pinStyle: "default",
  },
  {
    id: "v9",
    name: "Iraq, Karbala",
    lat: 32.616,
    lng: 44.0249,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇮🇶",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1JTHZ9SnwQvvUftBs4sdDF5R-pYrkwKYu?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v10",
    name: "Iraq, Najaf",
    lat: 31.9973,
    lng: 44.3149,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇮🇶",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1JTHZ9SnwQvvUftBs4sdDF5R-pYrkwKYu?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v11",
    name: "Cameroon, Yaounde",
    lat: 3.848,
    lng: 11.5021,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇨🇲",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1786i2vaW9AmKAVexnZCdh8PiJ5IuDukT?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v12",
    name: "Cameroon, Garoua",
    lat: 9.3,
    lng: 13.3958,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇨🇲",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1786i2vaW9AmKAVexnZCdh8PiJ5IuDukT?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v13",
    name: "Cameroon, Ngaoundere",
    lat: 7.322,
    lng: 13.5836,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇨🇲",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1786i2vaW9AmKAVexnZCdh8PiJ5IuDukT?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v14",
    name: "Cameroon, Bafoussam",
    lat: 5.4729,
    lng: 10.4217,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇨🇲",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1786i2vaW9AmKAVexnZCdh8PiJ5IuDukT?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v15",
    name: "Cameroon, Foumban",
    lat: 5.728,
    lng: 10.895,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇨🇲",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1786i2vaW9AmKAVexnZCdh8PiJ5IuDukT?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v16",
    name: "Cameroon, Douala",
    lat: 4.0511,
    lng: 9.7679,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇨🇲",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1786i2vaW9AmKAVexnZCdh8PiJ5IuDukT?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v17",
    name: "Türkiye, Istanbul",
    lat: 41.0082,
    lng: 28.9784,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇹🇷",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1Kvt3vjdlwSGpIfi7MZtZB7jQQTHeuMTh?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v18",
    name: "Türkiye, Gaziantep",
    lat: 37.0662,
    lng: 37.3833,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇹🇷",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1Kvt3vjdlwSGpIfi7MZtZB7jQQTHeuMTh?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v19",
    name: "Türkiye, Ankara",
    lat: 39.9334,
    lng: 32.8597,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇹🇷",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1Kvt3vjdlwSGpIfi7MZtZB7jQQTHeuMTh?usp=sharing",
    pinStyle: "default",
  },
  {
    id: "v20",
    name: "Chad",
    lat: 15.4542,
    lng: 18.7322,
    status: "visited",
    year: "Past",
    members: "ALL Family",
    note: "",
    flag: "🇹🇩",
    order: "",
    galleryLink: "",
    pinStyle: "default",
  },
  {
    id: "v21",
    name: "Mali",
    lat: 17.5707,
    lng: -3.9962,
    status: "visited",
    year: "Past",
    members: "Rashad",
    note: "",
    flag: "🇲🇱",
    order: "",
    galleryLink: "",
    pinStyle: "default",
  },
  {
    id: "v22",
    name: "Russia, Dagestan",
    lat: 42.9831,
    lng: 47.5046,
    status: "visited",
    year: "Past",
    members: "Rashad",
    note: "",
    flag: "🇷🇺",
    order: "",
    galleryLink:
      "https://drive.google.com/drive/folders/1dR3coRbtlSaSNK9HTUqqNKEgr2X4ZNgX?usp=sharing",
    pinStyle: "default",
  },
];

const COLORS = {
  visited: "#10b981", // Emerald Green
  lived: "#06b6d4", // Cyan
  living: "#0ea5e9", // Light Blue
  bgBase: "#020617", // Slate 950
  atmosphere: "#1e3a8a",
};

// --- API & HELPERS ---
const apiKey = ""; // <--- PASTE YOUR API KEY HERE BETWEEN THE QUOTES!
const callGemini = async (prompt, jsonSchema = null) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  if (jsonSchema) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: jsonSchema,
    };
  }
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return jsonSchema ? JSON.parse(text) : text;
    } catch (error) {
      if (i === 4) throw error;
      await new Promise((r) =>
        setTimeout(r, [1000, 2000, 4000, 8000, 16000][i]),
      );
    }
  }
};

const latLongToVector3 = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const calcDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth Radius in km
  const p = Math.PI / 180;
  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

const createGlowTexture = (colorCode) => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, colorCode);
  gradient.addColorStop(0.2, colorCode);
  gradient.addColorStop(0.5, colorCode + "80");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const createSunGlowTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.1, "rgba(255, 250, 230, 0.8)");
  gradient.addColorStop(0.3, "rgba(100, 150, 255, 0.3)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const createTextSprite = (
  text,
  fontSize = "22px",
  textColor = "rgba(255, 255, 255, 0.95)",
) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 128;

  context.font = `600 ${fontSize} 'Inter', sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = textColor;

  context.shadowColor = "rgba(0, 0, 0, 1)";
  context.shadowBlur = 8;
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.fillText(text, 256, 64);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  });
  return new THREE.Sprite(material);
};

// --- COMPONENT: 3D Globe ---
const WebGLGlobe = ({
  locations,
  onMarkerClick,
  onMarkerHover,
  isPaused,
  layerMode,
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const markersGroupRef = useRef(null);
  const arcsGroupRef = useRef(null);
  const cloudsRef = useRef(null);

  // Materials refs for layer toggling
  const globeMatRef = useRef(null);
  const borderMatRef = useRef(null);
  const bordersGroupRef = useRef(null);
  const wireframeMatRef = useRef(null);

  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const frameIdRef = useRef(null);
  const interactablesRef = useRef([]);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Setup Scene once
  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020617, 0.0018);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.z = 280;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    // 1. Setup Layer Materials
    const globeRadius = 100;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);

    // Load required maps
    const colorMap = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
      (tex) => {
        console.log(
          "Success! Map size:",
          tex.image.width,
          "x",
          tex.image.height,
        );
        tex.needsUpdate = true;
      },
    );
    const bumpMap = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-topology.png",
    );
    const waterMap = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-night.jpg",
    );

    // Layer 0: Realistic
    const matRealistic = new THREE.MeshStandardMaterial({
      map: colorMap,
      bumpMap: bumpMap,
      bumpScale: 4,
      roughness: 0.6,
      metalness: 0.15,
    });

    // Layer 1: Dark Minimal
    const matDark = new THREE.MeshStandardMaterial({
      color: 0x010208,
      roughness: 0.8,
      metalness: 0.2,
    });

    // Layer 2: True Thermal Shader
    const matHeat = new THREE.ShaderMaterial({
      uniforms: { earthMap: { value: waterMap } },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D earthMap;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          float isWater = texture2D(earthMap, vUv).r; // white is water, black is land
          
          // Temperature gradient based on distance from equator (vUv.y = 0.5)
          float distFromEquator = abs(vUv.y - 0.5) * 2.0; // 0 at equator, 1 at poles
          
          vec3 heatColor;
          if (distFromEquator < 0.25) {
             heatColor = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.5, 0.0), distFromEquator / 0.25); // Red -> Orange
          } else if (distFromEquator < 0.5) {
             heatColor = mix(vec3(1.0, 0.5, 0.0), vec3(1.0, 1.0, 0.0), (distFromEquator - 0.25) / 0.25); // Orange -> Yellow
          } else if (distFromEquator < 0.75) {
             heatColor = mix(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.8, 0.2), (distFromEquator - 0.5) / 0.25); // Yellow -> Green
          } else {
             heatColor = mix(vec3(0.0, 0.8, 0.2), vec3(0.0, 0.2, 0.8), (distFromEquator - 0.75) / 0.25); // Green -> Blue
          }
          
          vec3 waterColor = vec3(0.0, 0.02, 0.1); // Deep dark blue
          vec3 finalColor = mix(heatColor, waterColor, isWater);
          
          // Add rim lighting
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
          finalColor += vec3(0.2, 0.4, 0.8) * intensity * 0.4;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });

    const globe = new THREE.Mesh(globeGeometry, matRealistic);
    globe.rotation.y = -Math.PI / 2;
    scene.add(globe);

    // Store references to all materials for easy switching
    globeMatRef.current = {
      realistic: matRealistic,
      dark: matDark,
      heat: matHeat,
      mesh: globe,
    };

    // 2. Dynamic Clouds Layer
    const cloudGeo = new THREE.SphereGeometry(globeRadius + 0.6, 64, 64);
    const cloudTex = textureLoader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
    );
    const cloudMat = new THREE.MeshPhongMaterial({
      map: cloudTex,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    clouds.rotation.y = -Math.PI / 2;
    scene.add(clouds);
    cloudsRef.current = clouds;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffee, 2.0);
    dirLight.position.set(250, 120, 180);
    scene.add(dirLight);
    const backLight = new THREE.DirectionalLight(0x1e3a8a, 1.0);
    backLight.position.set(-200, -100, -150);
    scene.add(backLight);

    // Sun Rays / Gloom Effect
    const sunTexture = createSunGlowTexture();
    const sunSpriteMat = new THREE.SpriteMaterial({
      map: sunTexture,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const sunSprite = new THREE.Sprite(sunSpriteMat);
    sunSprite.position.copy(dirLight.position).multiplyScalar(1.2);
    sunSprite.scale.set(600, 600, 1);
    scene.add(sunSprite);

    // Load Real Country Borders
    const bordersGroup = new THREE.Group();
    bordersGroup.rotation.y = -Math.PI / 2;
    scene.add(bordersGroup);
    bordersGroupRef.current = bordersGroup;

    const borderMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.25,
    });
    borderMatRef.current = borderMat;

    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json",
    )
      .then((res) => res.json())
      .then((data) => {
        data.features.forEach((feature) => {
          const geom = feature.geometry;
          if (!geom) return;

          const coords = geom.coordinates;

          const addLine = (ring) => {
            const points = [];
            ring.forEach((coord) =>
              points.push(latLongToVector3(coord[1], coord[0], 101.2)),
            );
            const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
            bordersGroup.add(new THREE.Line(lineGeo, borderMatRef.current));
          };

          if (geom.type === "Polygon") {
            coords.forEach((ring) => addLine(ring));
          } else if (geom.type === "MultiPolygon") {
            coords.forEach((poly) => poly.forEach((ring) => addLine(ring)));
          }
        });
      })
      .catch((err) => console.log("Borders failed to load:", err));

    // Graticule
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x475569,
      transparent: true,
      opacity: 0.1,
    });
    wireframeMatRef.current = wireframeMaterial;
    const wireframeGeometry = new THREE.WireframeGeometry(
      new THREE.SphereGeometry(globeRadius + 0.5, 32, 32),
    );
    const wireframe = new THREE.LineSegments(
      wireframeGeometry,
      wireframeMaterial,
    );
    wireframe.rotation.y = -Math.PI / 2;
    scene.add(wireframe);

    // Atmosphere Ring
    const haloGeometry = new THREE.SphereGeometry(globeRadius + 6, 64, 64);
    const haloMaterial = new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color("#3b82f6") } },
      vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform vec3 color; varying vec3 vNormal; void main() { float intensity = pow(0.45 - dot(vNormal, vec3(0, 0, 1.0)), 2.0); gl_FragColor = vec4(color, intensity * 0.5); }`,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    //scene.add(new THREE.Mesh(haloGeometry, haloMaterial));

    // Aurora Australis
    const auroraGeo = new THREE.TorusGeometry(32, 12, 16, 100);
    const auroraMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const aurora = new THREE.Mesh(auroraGeo, auroraMat);
    aurora.rotation.x = Math.PI / 2;
    aurora.position.y = -95;
    //globe.add(aurora);

    // The Moon (Texture mapped)
    const moonOrbit = new THREE.Group();
    const moonGeo = new THREE.SphereGeometry(10, 32, 32);
    const moonTex = textureLoader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg",
    );
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTex,
      roughness: 0.9,
      metalness: 0.1,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(350, 80, -200);
    moonOrbit.add(moon);
    scene.add(moonOrbit);

    // Orbiting Satellites
    const satOrbit = new THREE.Group();
    satOrbit.rotation.z = Math.PI / 6;
    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          metalness: 0.9,
          roughness: 0.2,
        }),
      );
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.2, 1.2),
        new THREE.MeshStandardMaterial({
          color: 0x1e40af,
          metalness: 0.8,
          roughness: 0.3,
        }),
      );
      sat.add(panel);
      const angle = (i / 4) * Math.PI * 2;
      const radius = 135 + Math.random() * 15;
      sat.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 20,
        Math.sin(angle) * radius,
      );
      sat.lookAt(0, 0, 0);
      satOrbit.add(sat);
    }
    scene.add(satOrbit);

    const arcsGroup = new THREE.Group();
    arcsGroup.rotation.y = -Math.PI / 2;
    scene.add(arcsGroup);
    arcsGroupRef.current = arcsGroup;

    const markersGroup = new THREE.Group();
    markersGroup.rotation.y = -Math.PI / 2;
    scene.add(markersGroup);
    markersGroupRef.current = markersGroup;

    // Interaction Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let previousTouchDistance = 0;
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (isDragging) {
        targetRotation.y += (e.clientX - previousMousePosition.x) * 0.005;
        targetRotation.x += (e.clientY - previousMousePosition.y) * 0.005;
        targetRotation.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, targetRotation.x),
        );
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onMouseLeave = () => {
      isDragging = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      } else if (e.touches.length === 2) {
        isDragging = false;
        previousTouchDistance = Math.sqrt(
          Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
            Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2),
        );
      }
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      if (e.touches.length === 1 && isDragging) {
        targetRotation.y +=
          (e.touches[0].clientX - previousMousePosition.x) * 0.005;
        targetRotation.x +=
          (e.touches[0].clientY - previousMousePosition.y) * 0.005;
        targetRotation.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, targetRotation.x),
        );
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      } else if (e.touches.length === 2) {
        const currentDistance = Math.sqrt(
          Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
            Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2),
        );
        camera.position.z += (previousTouchDistance - currentDistance) * 0.5;
        camera.position.z = Math.max(120, Math.min(450, camera.position.z));
        previousTouchDistance = currentDistance;
      }
    };
    const onTouchEnd = (e) => {
      if (e.touches.length === 0) isDragging = false;
    };

    const onClick = (e) => {
      let clientX = e.clientX,
        clientY = e.clientY;
      if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      }
      if (clientX === undefined || clientY === undefined) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(
        interactablesRef.current,
      );
      if (intersects.length > 0) {
        const locId = intersects[0].object.userData.id;
        if (locId) onMarkerClick(locId);
      }
    };

    const onWheel = (e) => {
      camera.position.z += e.deltaY * 0.15;
      camera.position.z = Math.max(120, Math.min(450, camera.position.z));
    };

    mountRef.current.addEventListener("mousedown", onMouseDown);
    mountRef.current.addEventListener("mousemove", onMouseMove);
    mountRef.current.addEventListener("mouseup", onMouseUp);
    mountRef.current.addEventListener("mouseleave", onMouseLeave);
    mountRef.current.addEventListener("click", onClick);
    mountRef.current.addEventListener("wheel", onWheel, { passive: true });
    mountRef.current.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    mountRef.current.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
    mountRef.current.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", () => {
      if (!mountRef.current) return;
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight,
      );
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
    });

    const timer = new THREE.Timer();
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      timer.update();
      const time = timer.getElapsed();

      // Ambient celestial animations
      moonOrbit.rotation.y += 0.0008;
      satOrbit.rotation.y += 0.002;
      satOrbit.rotation.x += 0.001;
      if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0004;

      aurora.scale.set(
        1 + Math.sin(time * 2) * 0.05,
        1,
        1 + Math.cos(time * 2) * 0.05,
      );
      aurora.material.opacity = 0.1 + Math.sin(time * 1.5) * 0.08;

      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;

      if (
        !isDragging &&
        !isPausedRef.current &&
        Math.abs(targetRotation.y - currentRotation.y) < 0.01
      ) {
        targetRotation.y -= 0.001;
      }
      scene.rotation.y = currentRotation.y;
      scene.rotation.x = currentRotation.x;

      markersGroup.children.forEach((child) => {
        if (child.userData.type === "ring-living") {
          const cycle = (time * 1.5 + child.userData.offset) % 2;
          const scale = 1 + cycle;
          child.scale.set(scale, scale, scale);
          child.material.opacity = Math.max(0, 1 - cycle / 1.5);
        } else if (child.userData.type === "ring-lived") {
          const scale =
            1.1 +
            (Math.sin(time * 2 + child.userData.offset) * 0.5 + 0.5) * 0.3;
          child.scale.set(scale, scale, scale);
          child.material.opacity =
            0.5 + Math.sin(time * 2 + child.userData.offset) * 0.3;
        } else if (child.userData.type === "ring-visited") {
          child.rotateZ(0.02);
          const scale = 1 + Math.sin(time * 3 + child.userData.offset) * 0.15;
          child.scale.set(scale, scale, scale);
        } else if (child.userData.type === "core") {
          const scale = 1 + Math.sin(time * 2 + child.userData.offset) * 0.15;
          child.scale.set(scale, scale, scale);
        }
      });

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(
        interactablesRef.current,
      );
      if (intersects.length > 0) {
        document.body.style.cursor = "pointer";
        const hoveredId = intersects[0].object.userData.id;
        if (hoveredId) onMarkerHover(hoveredId);
      } else {
        document.body.style.cursor = "default";
        onMarkerHover(null);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Globe Layers Logic (0: Realistic, 1: Dark Minimal, 2: Heat)
  useEffect(() => {
    if (
      globeMatRef.current &&
      borderMatRef.current &&
      wireframeMatRef.current
    ) {
      const { realistic, dark, heat, mesh } = globeMatRef.current;
      const bMat = borderMatRef.current;

      if (layerMode === 0) {
        // Realistic
        mesh.material = realistic;

        bMat.opacity = 0.4;
        bMat.color.setHex(0x60a5fa);
        bMat.blending = THREE.NormalBlending;

        if (cloudsRef.current) cloudsRef.current.visible = true;
      } else if (layerMode === 1) {
        // Dark Minimal
        mesh.material = dark;

        // Brilliant glowing borders
        bMat.opacity = 1.0;
        bMat.color.setHex(0x0ea5e9); // Bright Cyan glow
        bMat.blending = THREE.AdditiveBlending;

        if (cloudsRef.current) cloudsRef.current.visible = false;
      } else if (layerMode === 2) {
        // True Thermal Heat Map
        mesh.material = heat;

        // High opacity white borders for heat map
        bMat.opacity = 0.6;
        bMat.color.setHex(0xffffff);
        bMat.blending = THREE.AdditiveBlending;

        if (cloudsRef.current) cloudsRef.current.visible = false;
      }

      // Crucial: Tell Three.js the material has updated so blending changes take effect
      bMat.needsUpdate = true;
    }
  }, [layerMode]);

  // Update Markers & Timeline Arcs
  useEffect(() => {
    if (!markersGroupRef.current || !arcsGroupRef.current) return;
    const group = markersGroupRef.current;
    const arcsGroup = arcsGroupRef.current;

    while (group.children.length > 0) {
      const c = group.children[0];
      group.remove(c);
      if (c.material) c.material.dispose();
      if (c.geometry) c.geometry.dispose();
    }
    while (arcsGroup.children.length > 0) {
      const c = arcsGroup.children[0];
      arcsGroup.remove(c);
      if (c.geometry) c.geometry.dispose();
      if (c.material) c.material.dispose();
    }
    interactablesRef.current = [];

    const textures = {
      visited: createGlowTexture(COLORS.visited),
      lived: createGlowTexture(COLORS.lived),
      living: createGlowTexture(COLORS.living),
    };

    locations.forEach((loc, index) => {
      const lat = isNaN(parseFloat(loc.lat)) ? 0 : parseFloat(loc.lat);
      const lng = isNaN(parseFloat(loc.lng)) ? 0 : parseFloat(loc.lng);
      const pos = latLongToVector3(lat, lng, 101);
      const color = COLORS[loc.status] || COLORS.visited;
      const texture = textures[loc.status] || textures.visited;

      // Determine explicit pin style
      let activeStyle = loc.pinStyle || "default";
      if (activeStyle === "default") {
        if (loc.status === "living") activeStyle = "pulse-radar";
        else if (loc.status === "lived") activeStyle = "pulse-breath";
        else if (loc.status === "visited") activeStyle = "diamond";
      }

      // Core Marker
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(pos);

      const coreSize = activeStyle === "diamond" ? 1.5 : 4;
      sprite.scale.set(coreSize, coreSize, 1);
      sprite.userData = { id: loc.id, type: "core", offset: index };
      group.add(sprite);
      interactablesRef.current.push(sprite);

      // Label
      const labelName = loc.name.split(",").pop().trim();
      const textSprite = createTextSprite(
        labelName,
        "26px",
        "rgba(255, 255, 255, 1)",
      );
      textSprite.position.copy(latLongToVector3(lat, lng, 103));
      textSprite.scale.set(16, 4, 1);
      group.add(textSprite);

      // Rings based on selected style
      if (activeStyle === "pulse-radar" || activeStyle === "pulse-breath") {
        const ringGeo = new THREE.RingGeometry(1.5, 2, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          transparent: true,
          side: THREE.DoubleSide,
          opacity: 0.8,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        ring.userData = {
          id: loc.id,
          type: activeStyle === "pulse-radar" ? "ring-living" : "ring-lived",
          offset: index,
        };
        group.add(ring);
        interactablesRef.current.push(ring);
      } else if (activeStyle === "diamond") {
        const ringGeo = new THREE.RingGeometry(0.3, 0.6, 4);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          transparent: true,
          side: THREE.DoubleSide,
          opacity: 0.9,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        ring.rotateZ(Math.PI / 4);
        ring.userData = { id: loc.id, type: "ring-visited", offset: index };
        group.add(ring);
        interactablesRef.current.push(ring);
      }
    });

    // Timeline Arcs & Distance Calculator
    const timelineLocs = locations
      .filter(
        (l) => l.order && !isNaN(parseInt(l.order)) && parseInt(l.order) > 0,
      )
      .sort((a, b) => parseInt(a.order) - parseInt(b.order));

    for (let i = 0; i < timelineLocs.length - 1; i++) {
      const startLoc = timelineLocs[i];
      const endLoc = timelineLocs[i + 1];
      const startLat = isNaN(parseFloat(startLoc.lat))
        ? 0
        : parseFloat(startLoc.lat);
      const startLng = isNaN(parseFloat(startLoc.lng))
        ? 0
        : parseFloat(startLoc.lng);
      const endLat = isNaN(parseFloat(endLoc.lat)) ? 0 : parseFloat(endLoc.lat);
      const endLng = isNaN(parseFloat(endLoc.lng)) ? 0 : parseFloat(endLoc.lng);

      const vStart = latLongToVector3(startLat, startLng, 101);
      const vEnd = latLongToVector3(endLat, endLng, 101);
      const distance = vStart.distanceTo(vEnd);

      const mid = new THREE.Vector3()
        .addVectors(vStart, vEnd)
        .multiplyScalar(0.5);
      mid.normalize().multiplyScalar(101 + distance * 0.25);

      const curve = new THREE.QuadraticBezierCurve3(vStart, mid, vEnd);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      arcsGroup.add(new THREE.Line(geometry, material));

      // Distance & Flight Time Sprite
      const distKm = calcDistanceKm(startLat, startLng, endLat, endLng);
      if (distKm > 100) {
        const hours = distKm / 800; // rough 800km/h flight speed
        const labelText = `${Math.round(distKm)} km ✈️ ${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`;
        const distSprite = createTextSprite(
          labelText,
          "18px",
          "rgba(56, 189, 248, 1)",
        );

        const midCurve = curve.getPoint(0.5);
        const currentDistFromCenter = midCurve.length();
        // Correctly push outward from the arc's actual mathematical length
        midCurve.normalize().multiplyScalar(currentDistFromCenter + 3);

        distSprite.position.copy(midCurve);
        distSprite.scale.set(36, 9, 1);
        arcsGroup.add(distSprite);
      }
    }
  }, [locations]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
    />
  );
};

// --- COMPONENT: Background Nebula & Meteors ---
const NebulaBackground = () => {
  const meteors = useMemo(
    () =>
      [...Array(6)].map(() => ({
        top: `${Math.random() * 50}%`, // Higher range for more variety
        left: `${60 + Math.random() * 20}%`, // Starts 110% to 130% off-screen to the right
        animationDelay: `${Math.random() * 25}s`,
        animationDuration: `${1.5 + Math.random() * 2}s`,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-black" />
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse"
        style={{ animationDuration: "12s" }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 10px 10px, rgba(255,255,255,0.8), rgba(0,0,0,0)), radial-gradient(1px 1px at 30px 40px, rgba(255,255,255,0.6), rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 60px 80px, rgba(255,255,255,0.9), rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 20px, rgba(255,255,255,0.5), rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 60px, rgba(255,255,255,1), rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 110px, rgba(255,255,255,0.4), rgba(0,0,0,0)), radial-gradient(1px 1px at 190px 180px, rgba(255,255,255,0.8), rgba(0,0,0,0)), radial-gradient(1px 1px at 220px 30px, rgba(255,255,255,0.6), rgba(0,0,0,0))`,
          backgroundRepeat: "repeat",
          backgroundSize: "250px 250px",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 20px 130px, rgba(255,255,255,0.7), rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 50px 160px, rgba(255,255,255,0.9), rgba(0,0,0,0)), radial-gradient(1px 1px at 80px 190px, rgba(255,255,255,0.4), rgba(0,0,0,0)), radial-gradient(1px 1px at 110px 120px, rgba(255,255,255,0.8), rgba(0,0,0,0)), radial-gradient(2px 2px at 140px 170px, rgba(255,255,255,0.5), rgba(0,0,0,0))`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
          opacity: 0.4,
        }}
      />
      <div className="absolute inset-0">
        {meteors.map((style, i) => (
          <div key={i} className="meteor" style={style} />
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [selectedLocId, setSelectedLocId] = useState(null);
  const [hoveredLocId, setHoveredLocId] = useState(null);

  // Sidebar states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedGalleryLocId, setSelectedGalleryLocId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Globe visual states
  const [isPaused, setIsPaused] = useState(false);
  const [layerMode, setLayerMode] = useState(0); // 0: Realistic, 1: Dark Minimal, 2: Heat Map

  // Gemini feature states
  const [isAutoFilling, setIsAutoFilling] = useState({});
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [aiInsights, setAiInsights] = useState({});

  // Timeline slider state
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  const selectedLoc = locations.find((l) => l.id === selectedLocId);
  const hoveredLoc = locations.find((l) => l.id === hoveredLocId);
  const galleryLoc = locations.find((l) => l.id === selectedGalleryLocId);

  const stats = useMemo(() => {
    const visited = locations.filter((l) => l.status === "visited").length;
    const lived = locations.filter(
      (l) => l.status === "lived" || l.status === "living",
    ).length;
    const completion = (((visited + lived) / 195) * 100).toFixed(1);
    return { visited, lived, completion };
  }, [locations]);

  // Derived filtered locations based on the search box
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [locations, searchQuery]);

  // Filter for lived/living locations sorted by timeline order
  const livedLocations = useMemo(() => {
    return locations
      .filter((l) => l.status === "living" || l.status === "lived")
      .sort((a, b) => (parseInt(a.order) || 0) - (parseInt(b.order) || 0));
  }, [locations]);

  // Handle timeline scroll and globe navigation
  const handleTimelineScroll = (index) => {
    setActiveTimelineIndex(index);
    const loc = livedLocations[index];
    if (loc) {
      setSelectedLocId(loc.id);
      setHoveredLocId(loc.id);
    }
  };

  useEffect(() => {
    if (activeTimelineIndex >= livedLocations.length) {
      setActiveTimelineIndex(Math.max(0, livedLocations.length - 1));
    }
  }, [livedLocations.length, activeTimelineIndex]);

  useEffect(() => {
    const selectedIndex = livedLocations.findIndex(
      (loc) => loc.id === selectedLocId,
    );
    if (selectedIndex >= 0 && selectedIndex !== activeTimelineIndex) {
      setActiveTimelineIndex(selectedIndex);
    }
  }, [selectedLocId, livedLocations, activeTimelineIndex]);

  const handleUpdateLocation = (id, field, value) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, [field]: value } : loc)),
    );
  };

  const handleDeleteLocation = (id) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
    if (selectedLocId === id) setSelectedLocId(null);
  };

  const handleAddLocation = () => {
    const newId = Date.now().toString();
    setLocations([
      {
        id: newId,
        name: "New Country",
        lat: 0,
        lng: 0,
        status: "visited",
        year: "2024",
        members: "",
        note: "",
        flag: "🏳️",
        order: "",
        galleryLink: "",
        pinStyle: "default",
      },
      ...locations,
    ]);
    setSelectedLocId(newId);
    setSearchQuery(""); // Clear search to see the new entry
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
      setIsGalleryOpen(false);
    }
  };
  const handleGenerateInsight = async (loc) => {
    setIsGeneratingInsight(true);
    try {
      const result = await callGemini(
        `You are an engaging family travel companion. The family visited or lived in ${loc.name} in ${loc.year}. Family members: ${loc.members || "The family"}. Existing note: "${loc.note || "None"}". Write a fun, vivid 2-sentence travel memory or interesting cultural fact tailored to this family's visit. Keep it warm, exciting, and inspiring. Add an emoji or two.`,
      );
      if (result) setAiInsights((prev) => ({ ...prev, [loc.id]: result }));
    } catch (error) {
      setAiInsights((prev) => ({
        ...prev,
        [loc.id]:
          "✨ Oops, the AI needs a quick rest from traveling. Try again in a moment!",
      }));
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  // Vertical Life Path Timeline Component
  const LifePathTimeline = () => {
    if (livedLocations.length === 0) return null;

    const progressPercent =
      ((activeTimelineIndex + 1) / livedLocations.length) * 100;

    return (
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 flex gap-6 items-center group">
        {/* The Interactive Slider/Scroller */}
        <div className="relative h-[60vh] w-1 bg-white/10 rounded-full overflow-hidden border border-white/5 shadow-lg">
          {/* Active Progress Fill */}
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
            style={{ height: `${progressPercent}%` }}
          />

          {/* Draggable/Clickable Track */}
          <input
            type="range"
            min="0"
            max={livedLocations.length - 1}
            value={activeTimelineIndex}
            onChange={(e) => handleTimelineScroll(parseInt(e.target.value))}
            className="timeline-slider absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
          />
        </div>

        {/* The Timeline Labels */}
        <div className="flex flex-col gap-8 py-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          {livedLocations.map((loc, index) => (
            <div
              key={loc.id}
              onClick={() => handleTimelineScroll(index)}
              className={`flex items-center gap-4 cursor-pointer transition-all duration-300 ${
                index === activeTimelineIndex
                  ? "opacity-100 translate-x-2"
                  : "opacity-30 hover:opacity-60"
              }`}
            >
              {/* Status Dot */}
              <div
                className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-all duration-300 ${
                  loc.status === "living"
                    ? "bg-cyan-400 border-cyan-200 shadow-[0_0_10px_#22d3ee]"
                    : "bg-transparent border-white/40"
                }`}
              />

              {/* Text Details */}
              <div className="flex flex-col whitespace-nowrap min-w-max">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                  {loc.year || "Past"}
                </span>
                <span className="text-white font-medium text-sm leading-tight">
                  {loc.name.split(",").pop().trim()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-slate-100 font-sans selection:bg-blue-500/30">
      <NebulaBackground />

      {/* Vertical Life Path Timeline */}
      <LifePathTimeline />

      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-10">
        <WebGLGlobe
          locations={locations}
          onMarkerClick={setSelectedLocId}
          onMarkerHover={setHoveredLocId}
          isPaused={isPaused}
          layerMode={layerMode}
        />
      </div>

      {/* Header Controls */}
      <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-6 pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <h1 className="text-3xl font-light tracking-widest flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            AYLE <span className="font-bold text-white">ATLAS</span>
          </h1>
          <p className="text-slate-400 text-sm tracking-wide ml-11">
            OUR JOURNEY THROUGH TIME
          </p>
        </div>

        <div className="flex gap-4 pointer-events-auto">
          <button
            onClick={() => {
              setIsGalleryOpen(!isGalleryOpen);
              setIsSidebarOpen(false);
              setSelectedGalleryLocId(null);
            }}
            className={`border backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 group ${isGalleryOpen ? "bg-indigo-500/20 border-indigo-400 text-indigo-300" : "bg-white/5 hover:bg-white/10 border-white/10"}`}
          >
            <ImageIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Gallery</span>
          </button>
          <button
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              setIsGalleryOpen(false);
            }}
            className={`border backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 group ${isSidebarOpen ? "bg-blue-500/20 border-blue-400 text-blue-300" : "bg-white/5 hover:bg-white/10 border-white/10"}`}
          >
            <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span className="text-sm font-medium">Manage Atlas</span>
          </button>
        </div>
      </header>

      {/* Hover Tooltip Card */}
      {hoveredLoc && !selectedLoc && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-24 z-20 pointer-events-none mt-8">
          <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl shadow-blue-900/40 animate-fade-in-up-centered min-w-[220px]">
            <div className="flex justify-between items-start mb-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl filter drop-shadow-md">
                  {hoveredLoc.flag}
                </span>
                <div className="flex flex-col">
                  <span className="font-bold tracking-wide text-white text-base">
                    {hoveredLoc.name.split(",")[0]}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${hoveredLoc.status === "visited" ? "text-emerald-400" : hoveredLoc.status === "living" ? "text-sky-400" : "text-cyan-400"}`}
                  >
                    {hoveredLoc.status === "lived"
                      ? "Lived Here"
                      : hoveredLoc.status === "living"
                        ? "Currently Living"
                        : "Visited"}
                  </span>
                </div>
              </div>
              <div
                className={`w-2 h-2 rounded-full mt-1 ${hoveredLoc.status === "visited" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : hoveredLoc.status === "living" ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" : "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"}`}
              />
            </div>
            <div className="flex flex-col gap-2 mt-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-slate-500" />{" "}
                <span className="font-medium text-slate-200">
                  {hoveredLoc.year || "Unknown Year"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-slate-500" />{" "}
                <span className="font-medium text-slate-200 truncate max-w-[150px]">
                  {hoveredLoc.members || "Unknown Members"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Glass Panel Overlay (Right Side) for Pin Details */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-[400px] z-30 transition-transform duration-500 ease-out ${selectedLoc && !isSidebarOpen && !isGalleryOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {selectedLoc && (
          <div className="h-full w-full bg-slate-950/60 backdrop-blur-2xl border-l border-white/10 p-8 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-y-auto">
            <div className="flex justify-between items-start mb-8">
              <div className="flex flex-col">
                <span className="text-6xl mb-4 filter drop-shadow-lg">
                  {selectedLoc.flag}
                </span>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {selectedLoc.name.split(",")[0]}
                </h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedLoc.status === "visited" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : selectedLoc.status === "living" ? "bg-sky-500/20 text-sky-400 border border-sky-500/30" : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"}`}
                  >
                    {selectedLoc.status === "lived"
                      ? "Lived Here"
                      : selectedLoc.status === "living"
                        ? "Currently Living"
                        : "Visited"}
                  </span>
                  <span className="text-slate-400 text-sm flex items-center gap-1">
                    <Activity className="w-3 h-3" /> {selectedLoc.year}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLocId(null)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                <div className="flex gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg h-fit">
                    <Heart className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 uppercase tracking-widest mb-1">
                      Family Members
                    </h4>
                    <p className="text-slate-200">
                      {selectedLoc.members || "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-white/5" />
                <div className="flex gap-3">
                  <div className="p-2 bg-cyan-500/10 rounded-lg h-fit">
                    <Info className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 uppercase tracking-widest mb-1">
                      Memory Note
                    </h4>
                    <p className="text-slate-200 leading-relaxed text-sm">
                      {selectedLoc.note || "No notes added yet."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick links to Editors */}
              <div className="flex gap-3">
                <div
                  className="flex-1 bg-gradient-to-br from-indigo-900/20 to-transparent border border-indigo-500/20 rounded-xl p-4 relative overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setIsGalleryOpen(true);
                    setSelectedGalleryLocId(selectedLoc.id);
                    setSelectedLocId(null);
                  }}
                >
                  <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-indigo-300 group-hover:text-white transition-colors">
                    <ImageIcon className="w-5 h-5" />
                    <span className="font-medium text-sm">View Gallery</span>
                  </div>
                </div>
                <div
                  className="flex-1 bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 rounded-xl p-4 relative overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setIsSidebarOpen(true);
                    setSelectedLocId(null);
                  }}
                >
                  <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-blue-300 group-hover:text-white transition-colors">
                    <Edit3 className="w-5 h-5" />
                    <span className="font-medium text-sm">Edit Details</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editor Sidebar (Left Side) */}
      <div
        className={`absolute top-0 left-0 h-full w-full sm:w-[450px] z-40 transition-transform duration-500 ease-out flex ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full w-full bg-slate-950/80 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col shadow-[20px_0_40px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-400" /> Data Manager
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <button
            onClick={handleAddLocation}
            className="w-full py-3 mb-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-5 h-5" /> Add New Location
          </button>

          {/* Quick Search Bar */}
          <div className="mb-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search countries or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors"
            />
          </div>

          <div className="flex-grow overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {["living", "lived", "visited"].map((statusGroup) => {
              const groupLocs = filteredLocations.filter(
                (l) => l.status === statusGroup,
              );
              if (groupLocs.length === 0) return null;

              return (
                <div key={statusGroup} className="mb-6">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2 flex items-center gap-2">
                    {statusGroup === "living" && (
                      <Navigation className="w-3 h-3 text-sky-400" />
                    )}
                    {statusGroup === "lived" && (
                      <Star className="w-3 h-3 text-cyan-400" />
                    )}
                    {statusGroup === "visited" && (
                      <MapPin className="w-3 h-3 text-emerald-400" />
                    )}
                    {statusGroup === "living"
                      ? "Currently Living"
                      : statusGroup === "lived"
                        ? "Lived Here"
                        : "Visited"}
                  </h3>

                  <div className="space-y-3">
                    {groupLocs.map((loc) => (
                      <div
                        key={loc.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 transition-all focus-within:border-blue-500/50 focus-within:bg-white/10 relative group"
                      >
                        {loc.order && (
                          <div className="absolute top-3 right-12 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-1 rounded border border-indigo-500/30 flex items-center gap-1">
                            <Route className="w-3 h-3" /> Step {loc.order}
                          </div>
                        )}
                        <button
                          onClick={() => handleDeleteLocation(loc.id)}
                          className="absolute top-3 right-3 p-1.5 bg-red-500/10 text-red-400 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-2">
                            <label className="block text-[10px] text-slate-500 uppercase mb-1">
                              Flag
                            </label>
                            <input
                              type="text"
                              value={loc.flag}
                              onChange={(e) =>
                                handleUpdateLocation(
                                  loc.id,
                                  "flag",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-black/30 border border-white/10 rounded p-2 text-center text-xl outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="col-span-10 relative">
                            <label className="block text-[10px] text-slate-500 uppercase mb-1">
                              Country / Place Name
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={loc.name}
                                onChange={(e) =>
                                  handleUpdateLocation(
                                    loc.id,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm outline-none focus:border-blue-500 text-white font-medium"
                              />
                            </div>
                          </div>
                          <div className="col-span-6">
                            <label className="block text-[10px] text-slate-500 uppercase mb-1">
                              Status
                            </label>
                            <select
                              value={loc.status}
                              onChange={(e) =>
                                handleUpdateLocation(
                                  loc.id,
                                  "status",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm outline-none focus:border-blue-500 text-slate-200 appearance-none"
                            >
                              <option value="visited">Visited</option>
                              <option value="lived">Lived</option>
                              <option value="living">Living</option>
                            </select>
                          </div>
                          <div className="col-span-6">
                            <label className="block text-[10px] text-slate-500 uppercase mb-1">
                              Year(s)
                            </label>
                            <input
                              type="text"
                              value={loc.year}
                              onChange={(e) =>
                                handleUpdateLocation(
                                  loc.id,
                                  "year",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm outline-none focus:border-blue-500"
                            />
                          </div>

                          {/* New Pin Style Selector */}
                          <div className="col-span-12">
                            <label className="block text-[10px] text-slate-500 uppercase mb-1">
                              Map Pin Style
                            </label>
                            <select
                              value={loc.pinStyle || "default"}
                              onChange={(e) =>
                                handleUpdateLocation(
                                  loc.id,
                                  "pinStyle",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm outline-none focus:border-blue-500 text-slate-200 appearance-none"
                            >
                              <option value="default">
                                Default (By Status)
                              </option>
                              <option value="pulse-radar">
                                Radar Pulse (Expanding Rings)
                              </option>
                              <option value="pulse-breath">
                                Breathing Halo (Soft Glow)
                              </option>
                              <option value="diamond">Rotating Diamond</option>
                              <option value="core-only">
                                Simple Dot (No animation)
                              </option>
                            </select>
                          </div>

                          <div className="col-span-4">
                            <label className="block text-[10px] text-slate-500 uppercase mb-1">
                              Latitude
                            </label>
                            <input
                              type="number"
                              step="0.0001"
                              value={loc.lat}
                              onChange={(e) =>
                                handleUpdateLocation(
                                  loc.id,
                                  "lat",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-black/30 border border-white/10 rounded p-2 text-xs outline-none focus:border-blue-500 font-mono"
                            />
                          </div>
                          <div className="col-span-4">
                            <label className="block text-[10px] text-slate-500 uppercase mb-1">
                              Longitude
                            </label>
                            <input
                              type="number"
                              step="0.0001"
                              value={loc.lng}
                              onChange={(e) =>
                                handleUpdateLocation(
                                  loc.id,
                                  "lng",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-black/30 border border-white/10 rounded p-2 text-xs outline-none focus:border-blue-500 font-mono"
                            />
                          </div>
                          <div className="col-span-4">
                            <label className="block text-[10px] text-slate-500 uppercase mb-1">
                              Timeline Order
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={loc.order || ""}
                              onChange={(e) =>
                                handleUpdateLocation(
                                  loc.id,
                                  "order",
                                  e.target.value
                                    ? parseInt(e.target.value)
                                    : "",
                                )
                              }
                              className="w-full bg-black/30 border border-indigo-500/30 rounded p-2 text-xs outline-none focus:border-indigo-500 font-mono text-indigo-300"
                              placeholder="e.g. 1"
                            />
                          </div>

                          <div className="col-span-12 flex items-center gap-2 mt-1 mb-1">
                            <input
                              type="checkbox"
                              id={`timeline-toggle-${loc.id}`}
                              checked={loc.order !== "" && loc.order != null}
                              onChange={(e) =>
                                handleUpdateLocation(
                                  loc.id,
                                  "order",
                                  e.target.checked ? 1 : "",
                                )
                              }
                              className="w-3.5 h-3.5 accent-indigo-500 cursor-pointer"
                            />
                            <label
                              htmlFor={`timeline-toggle-${loc.id}`}
                              className="text-[10px] text-slate-400 font-bold uppercase cursor-pointer tracking-wider hover:text-white transition-colors"
                            >
                              Include in Timeline Web
                            </label>
                          </div>
                          {loc.order !== "" && loc.order != null && (
                            <div className="col-span-12 animate-fade-in-up">
                              <label className="block text-[10px] text-indigo-400 uppercase mb-1 font-bold">
                                Timeline Step Number
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={loc.order || ""}
                                onChange={(e) =>
                                  handleUpdateLocation(
                                    loc.id,
                                    "order",
                                    e.target.value
                                      ? parseInt(e.target.value)
                                      : "",
                                  )
                                }
                                className="w-full bg-indigo-500/10 border border-indigo-500/30 rounded p-2 text-xs outline-none focus:border-indigo-400 font-mono text-indigo-300"
                                placeholder="e.g. 1"
                              />
                            </div>
                          )}
                          <div className="col-span-12">
                            <label className="block text-[10px] text-slate-500 uppercase mb-1">
                              Members
                            </label>
                            <input
                              type="text"
                              value={loc.members}
                              onChange={(e) =>
                                handleUpdateLocation(
                                  loc.id,
                                  "members",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm outline-none focus:border-blue-500"
                              placeholder="e.g. Mom, Dad"
                            />
                          </div>
                          <div className="col-span-12">
                            <label className="block text-[10px] text-slate-500 uppercase mb-1">
                              Notes
                            </label>
                            <textarea
                              rows={2}
                              value={loc.note}
                              onChange={(e) =>
                                handleUpdateLocation(
                                  loc.id,
                                  "note",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-black/30 border border-white/10 rounded p-2 text-sm outline-none focus:border-blue-500 resize-none"
                              placeholder="Memories..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gallery Sidebar (Left Side) */}
      <div
        className={`absolute top-0 left-0 h-full w-full sm:w-[450px] z-40 transition-transform duration-500 ease-out flex ${isGalleryOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full w-full bg-slate-950/80 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col shadow-[20px_0_40px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-indigo-400" /> Photo Galleries
            </h2>
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {/* Search Bar for Gallery */}
          <div className="mb-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search countries or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 text-white placeholder-slate-500 transition-colors"
            />
          </div>
          {!galleryLoc ? (
            <div className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 w-full">
              {["living", "lived", "visited"].map((statusGroup) => {
                const groupLocs = filteredLocations.filter(
                  (l) => l.status === statusGroup,
                );
                if (groupLocs.length === 0) return null;
                return (
                  <div key={`gal-${statusGroup}`} className="mb-6">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2">
                      {statusGroup === "living"
                        ? "Currently Living"
                        : statusGroup === "lived"
                          ? "Lived Here"
                          : "Visited"}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {groupLocs.map((loc) => (
                        <div
                          key={loc.id}
                          onClick={() => setSelectedGalleryLocId(loc.id)}
                          className="bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/50 rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center group"
                        >
                          <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                            {loc.flag}
                          </span>
                          <span className="text-sm font-medium text-slate-200 group-hover:text-white line-clamp-1">
                            {loc.name.split(",")[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col flex-grow animate-fade-in-up overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 w-full">
              <button
                onClick={() => setSelectedGalleryLocId(null)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 w-fit flex-shrink-0"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Galleries
              </button>

              <div className="flex flex-col items-center text-center mb-8 w-full flex-shrink-0">
                <span className="text-6xl mb-4 filter drop-shadow-lg">
                  {galleryLoc.flag}
                </span>
                <h3 className="text-3xl font-bold text-white mb-2 break-words w-full px-2 leading-tight">
                  {galleryLoc.name}
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Country Memories & Photos
                </p>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-5 space-y-4 w-full flex-shrink-0">
                <div className="w-full">
                  <label className="block text-xs text-indigo-300 uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Google Drive Link
                  </label>
                  <p className="text-[11px] text-slate-400 mb-3 leading-relaxed w-full break-words">
                    Paste a shared link to your Google Drive or photo album
                    here. Viewers will be able to click through to see your
                    memories from {galleryLoc.name.split(",")[0]}.
                  </p>
                  <input
                    type="text"
                    value={galleryLoc.galleryLink || "No link available"}
                    readOnly
                    className="w-full bg-black/40 border border-indigo-500/40 rounded-lg p-3 text-sm outline-none text-slate-300 cursor-default select-all"
                    placeholder="No album link provided."
                  />
                </div>

                <button
                  onClick={() => {
                    if (galleryLoc.galleryLink)
                      window.open(
                        galleryLoc.galleryLink,
                        "_blank",
                        "noopener,noreferrer",
                      );
                  }}
                  disabled={!galleryLoc.galleryLink}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20"
                >
                  Open Album Link{" "}
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Bar (Bottom Center) */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${isSidebarOpen || isGalleryOpen ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"}`}
      >
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl shadow-blue-900/20 w-[90vw] max-w-md">
          <div className="flex justify-between items-end px-2">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-light text-white">
                  {stats.visited}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Visited
                </span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-light text-white">
                  {stats.lived}
                </span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                  <Star className="w-3 h-3" /> Lived
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-xl font-medium text-white">
                {stats.completion}%
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                World Explored
              </span>
            </div>
          </div>
          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden relative border border-white/5">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-400 transition-all duration-1000 ease-out relative"
              style={{ width: `${stats.completion}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 skew-x-[-45deg] animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons (Bottom Right) */}
      <div
        className={`absolute bottom-8 right-8 z-20 flex gap-3 transition-all duration-500 ${isSidebarOpen || isGalleryOpen ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 translate-y-0"}`}
      >
        <button
          onClick={() => setLayerMode((prev) => (prev + 1) % 3)}
          className={`bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-xl border p-4 rounded-2xl shadow-2xl shadow-blue-900/20 flex items-center justify-center transition-all ${layerMode !== 0 ? (layerMode === 2 ? "border-orange-500 text-orange-500" : "border-sky-400 text-sky-400") : "border-white/10 text-slate-300"}`}
          title={
            layerMode === 0
              ? "Switch to Dark Minimal View"
              : layerMode === 1
                ? "Switch to Heat Map View"
                : "Switch to Realistic View"
          }
        >
          <Layers className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl shadow-blue-900/20 group flex items-center justify-center transition-all"
          title={isPaused ? "Resume Rotation" : "Pause Rotation"}
        >
          {isPaused ? (
            <Play
              className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform"
              fill="currentColor"
            />
          ) : (
            <Pause
              className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform"
              fill="currentColor"
            />
          )}
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer { 100% { transform: translateX(200%); } }

/* Fix: Normal Slide Up for Sidebars */
.animate-fade-in-up { 
  animation: fadeInUp 0.3s ease-out forwards; 
}

/* Fix: Centered Slide Up for the Hover Tooltip only */
.animate-fade-in-up-centered { 
  animation: fadeInUpCentered 0.3s ease-out forwards; 
}

@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(10px); } 
  to { opacity: 1; transform: translateY(0); } 
}

@keyframes fadeInUpCentered { 
  from { opacity: 0; transform: translate(-50%, 10px); } 
  to { opacity: 1; transform: translate(-50%, 0); } 
}

@keyframes meteor { 
  0% { transform: rotate(215deg) translateX(0); opacity: 1; } 
  70% { opacity: 1; } 
  100% { transform: rotate(215deg) translateX(-2500px); opacity: 0; } 
}

.meteor { 
  position: absolute; 
  width: 100px; 
  height: 2px; 
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%); 
  border-radius: 999px; 
  filter: drop-shadow(0 0 6px rgba(255,255,255,0.8)); 
  animation: meteor linear infinite; 
  opacity: 0;                /* Keeps them hidden while in the "queue" */
  transform: rotate(215deg); /* Ensures they are tilted correctly instantly */
}
.meteor::before { content: ''; position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #fff; top: -1px; left: 0; box-shadow: 0 0 10px 2px #fff; }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

/* Timeline z-index fix for stacked layout */
.z-25 { z-index: 25; }
      `,
        }}
      />
    </div>
  );
}
