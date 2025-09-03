import { SIPEntry } from "../organisms/SIPPopupCard/type";

export interface SIPManagerProps {
  isOpen: boolean;
  onClose: () => void;
  sipList: SIPEntry[];
}