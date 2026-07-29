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
    image:
      "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785320985/camera-white_ya8ooq.webp",
    price: 27.98,
    originalPrice: 35.98,
    discount: 22,
    quantity: 1,
    options: [
      {
        variant_name: "White",
        color_value: "#ffffff",
        image:
          "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785320985/camera-white_ya8ooq.webp",
      },
      {
        variant_name: "Grey",
        color_value: "#bdbdbd",
        image:
          "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785330483/gJXkVHNwfjV9uLFJpwgyG9-970-80-removebg-preview_n91tdb.webp",
      },
      {
        variant_name: "Black",
        color_value: "#000000",
        image:
          "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785330065/64426d73-5b61-40ed-9235-1c40c26e4314_k7ztzq.webp",
      },
    ],
  },
  {
    id: "cam-pan-v3",
    category: "camera",
    name: "Wyze Cam Pan v3",
    description: "360° pan and 180° tilt security camera.",
    image:
      "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785205579/cam-pan_rjj5ed.png",
    price: 34.98,
    originalPrice: 39.98,
    discount: 17,
    quantity: 0,
    options: [
      {
        variant_name: "White",
        color_value: "#ffffff",
        image:
          "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785205579/cam-pan_rjj5ed.png",
      },
      {
        variant_name: "Black",
        color_value: "#000000",
        image:
          "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785330065/Wyze_Cam_Pan_v3_Main_v8-11_1_1_oplmyz.webp",
      },
    ],
  },
  {
    id: "cam-floodlight-v2",
    category: "camera",
    name: "Wyze Cam Floodlight v2",
    description:
      "2K floodlight camera with a 160° wide-angle view for your garage.",
    image:
      "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785330770/cam-flood-white-removebg-preview_xtqme2.png",
    price: 69.98,
    originalPrice: 89.98,
    discount: 22,
    quantity: 0,
    options: [
      {
        variant_name: "White",
        color_value: "#ffffff",
        image:
          "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785330770/cam-flood-white-removebg-preview_xtqme2.png",
      },
      {
        variant_name: "Black",
        color_value: "#000000",
        image:
          "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785330769/cam-flood-black-removebg-preview_mgwqcx.png",
      },
    ],
  },
  {
    id: "cam-duo-doorbell",
    category: "camera",
    name: "Wyze Duo Cam Doorbell",
    description: "Two cameras. Two views. Double the porch protection.",
    image:
      "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785320986/cam-doorbell_foubc1.webp",
    price: 69.98,
    quantity: 0,
  },
  {
    id: "battery-cam-pro",
    category: "camera",
    name: "Wyze Battery Cam Pro",
    description:
      "Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.",
    image:
      "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785320986/cam-pro-white_zzkrns.webp",
    price: 89.98,
    quantity: 0,
    options: [
      {
        variant_name: "White",
        color_value: "#ffffff",
        image:
          "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785320986/cam-pro-white_zzkrns.webp",
      },
      {
        variant_name: "Black",
        color_value: "#000000",
        image:
          "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785320987/cam-pro-black_v0nyk8.webp",
      },
    ],
  },
];

const sensorProducts: Product[] = [
  {
    id: "sense-hub",
    category: "sensor",
    name: "Wyze Sense Hub",
    description: "Required to connect Wyze Sense devices.",
    image:
      "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785320986/sense-hub_jhwoab.webp",
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
    image:
      "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785320986/sense-motion_cfgcdo.webp",
    price: 29.99,
    quantity: 0,
  },
];

const accessoryProducts: Product[] = [
  {
    id: "micro-sd-256",
    category: "accessory",
    name: "Wyze MicroSD Card (256GB)",
    description: "Continuous local recording.",
    image:
      "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785320985/micro-sd_m8wbla.webp",
    price: 41.96,
    quantity: 0,
  },
  {
    id: "micro-sd-512",
    category: "accessory",
    name: "Wyze MicroSD Card (512GB)",
    description: "Large local recording.",
    image:
      "https://res.cloudinary.com/dxmk4yvoj/image/upload/v1785320985/micro-sd_m8wbla.webp",
    price: 50,
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
    price: 9.99,
    quantity: 0,
  },
  {
    id: "cam-plus",
    category: "plan",
    name: "Cam Plus",
    description:
      "Smart AI detection, unlimited event video length, and cloud recording for one camera.",
    price: 2.99,
    quantity: 0,
  },
  {
    id: "cam-protect",
    category: "plan",
    name: "Home Monitoring",
    description:
      "24/7 professional home monitoring with emergency dispatch and Wyze Sense support.",
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
