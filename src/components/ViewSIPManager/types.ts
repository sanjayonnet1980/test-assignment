import { SIPEntry } from "../molecules/SIPPopupCard";

export interface SIPManagerProps {
  isOpen: boolean;
  onClose: () => void;
  sipList: SIPEntry[];
}