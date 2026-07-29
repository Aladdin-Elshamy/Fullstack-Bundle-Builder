import CamIcon from "#icons/CamIcon";
import ProtectionIcon from "#icons/ProtectionIcon";
import SensorIcon from "#icons/SensorIcon";
import ShieldIcon from "#icons/ShieldIcon";
import type { Product } from "../../../shared/types/components";

const ACCORDION_SECTIONS = [
  {
    value: "cameras",
    trigger: "Choose your cameras",
    content:
      "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
    icon: CamIcon,
  },
  {
    value: "plan",
    trigger: "Choose your plan",
    content:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
    icon: ShieldIcon,
  },
  {
    value: "sensors",
    trigger: "Choose your sensors",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
    icon: SensorIcon,
  },
  {
    value: "protection",
    trigger: "Add extra protection",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
    icon: ProtectionIcon,
  },
] as const;

type BuilderSectionValue = (typeof ACCORDION_SECTIONS)[number]["value"];

const cameraProducts: Product[] = [
  {
    id: "cam-v4",
    category: "camera",
    name: "Wyze Cam v4",
    description: "The clearest Wyze Cam ever made.",
    image: "/images/products/cam-v4.png",
    price: 27.98,
    originalPrice: 35.98,
    discount: 22,
    quantity: 1,
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Grey", value: "#bdbdbd" },
      { name: "Black", value: "#000000" },
    ],
  },
  {
    id: "cam-pan-v3",
    category: "camera",
    name: "Wyze Cam Pan v3",
    description: "360° pan and 180° tilt security camera.",
    image: "/images/products/cam-pan-v3.png",
    price: 47.98,
    originalPrice: 57.98,
    discount: 17,
    quantity: 0,
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
    ],
  },
  {
    id: "cam-floodlight-v2",
    category: "camera",
    name: "Wyze Cam Floodlight v2",
    description: "2K floodlight camera with a 160° viewing angle.",
    image: "/images/products/floodlight-v2.png",
    price: 69.98,
    originalPrice: 89.98,
    discount: 22,
    quantity: 0,
    colors: [{ name: "White", value: "#ffffff" }],
  },
  {
    id: "cam-duo-doorbell",
    category: "camera",
    name: "Wyze Duo Cam Doorbell",
    description: "Two cameras. Two views. Double the porch protection.",
    image: "/images/products/duo-doorbell.png",
    price: 69.98,
    quantity: 0,
    colors: [{ name: "Black", value: "#000000" }],
  },
  {
    id: "battery-cam-pro",
    category: "camera",
    name: "Wyze Battery Cam Pro",
    description: "Protect anywhere. No power outlet required.",
    image: "/images/products/battery-cam-pro.png",
    price: 89.98,
    quantity: 0,
  },
];

const sensorProducts: Product[] = [
  {
    id: "sense-hub",
    category: "sensor",
    name: "Wyze Sense Hub",
    description: "Required to connect Wyze Sense devices.",
    image: "/images/products/sense-hub.png",
    price: 0,
    originalPrice: 29.92,
    required: true,
    quantity: 1,
  },
  {
    id: "motion-sensor",
    category: "sensor",
    name: "Wyze Sense Motion Sensor",
    description: "Detects motion and triggers automations.",
    image: "/images/products/motion-sensor.png",
    price: 29.99,
    quantity: 0,
  },
  {
    id: "entry-sensor",
    category: "sensor",
    name: "Wyze Sense Entry Sensor",
    description: "Know when doors and windows open.",
    image: "/images/products/entry-sensor.png",
    price: 23.99,
    quantity: 0,
  },
  {
    id: "climate-sensor",
    category: "sensor",
    name: "Wyze Climate Sensor",
    description: "Monitor temperature and humidity.",
    image: "/images/products/climate-sensor.png",
    price: 19.99,
    quantity: 0,
  },
];

const accessoryProducts: Product[] = [
  {
    id: "micro-sd-256",
    category: "accessory",
    name: "Wyze MicroSD Card (256GB)",
    description: "Continuous local recording.",
    image: "/images/products/microsd-256.png",
    price: 41.96,
    quantity: 0,
  },
  {
    id: "outdoor-power-adapter",
    category: "accessory",
    name: "Outdoor Power Adapter",
    description: "Weather-resistant power supply.",
    image: "/images/products/power-adapter.png",
    price: 14.99,
    quantity: 0,
  },
  {
    id: "mounting-kit",
    category: "accessory",
    name: "Universal Mounting Kit",
    description: "Mount your cameras almost anywhere.",
    image: "/images/products/mounting-kit.png",
    price: 19.99,
    quantity: 0,
  },
];

const planProducts: Product[] = [
  {
    id: "cam-unlimited-monthly",
    category: "plan",
    name: "Cam Unlimited",
    description:
      "Unlimited cloud recording for all your Wyze cameras with AI-powered event detection.",
    image: "/images/plans/cam-unlimited.png",
    price: 9.99,
    quantity: 0,
  },
  {
    id: "cam-plus",
    category: "plan",
    name: "Cam Plus",
    description:
      "Smart AI detection, unlimited event video length, and cloud recording for one camera.",
    image: "/images/plans/cam-plus.png",
    price: 2.99,
    quantity: 0,
  },
  {
    id: "cam-protect",
    category: "plan",
    name: "Home Monitoring",
    description:
      "24/7 professional home monitoring with emergency dispatch and Wyze Sense support.",
    image: "/images/plans/home-monitoring.png",
    price: 9.99,
    quantity: 0,
  },
];

const productsBySection = {
  cameras: cameraProducts,
  plan: planProducts,
  sensors: sensorProducts,
  protection: accessoryProducts,
} satisfies Record<BuilderSectionValue, Product[]>;

const allProducts = [
  ...cameraProducts,
  ...sensorProducts,
  ...accessoryProducts,
  ...planProducts,
];

const wait = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const fetchProductsBySection = async (section: BuilderSectionValue) => {
  await wait(350);

  return productsBySection[section];
};

export {
  ACCORDION_SECTIONS,
  allProducts,
  cameraProducts as camera,
  sensorProducts,
  accessoryProducts,
  planProducts,
  productsBySection,
  fetchProductsBySection,
};
export type { BuilderSectionValue };