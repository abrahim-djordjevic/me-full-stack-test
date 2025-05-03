import { CarbonIntensityRecord } from "./carbonIntensityRecord";

export interface ModalProps {
    record: CarbonIntensityRecord;
    cancelMethod: () => void;
    submitMethod: (() => void) | null;
}