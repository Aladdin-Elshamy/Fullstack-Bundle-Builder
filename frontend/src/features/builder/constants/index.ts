import CamIcon from "#icons/CamIcon";
import ProtectionIcon from "#icons/ProtectionIcon";
import SensorIcon from "#icons/SensorIcon";
import ShieldIcon from "#icons/ShieldIcon";

const ACCORDION_SECTIONS = [
  {
    value: "cameras",
    trigger: "Choose your cameras",
    icon: CamIcon,
  },
  {
    value: "plan",
    trigger: "Choose your plan",
    icon: ShieldIcon,
  },
  {
    value: "sensors",
    trigger: "Choose your sensors",
    icon: SensorIcon,
  },
  {
    value: "protection",
    trigger: "Add extra protection",
    icon: ProtectionIcon,
  },
] as const;

type BuilderSectionValue = (typeof ACCORDION_SECTIONS)[number]["value"];

export { ACCORDION_SECTIONS };
export type { BuilderSectionValue };