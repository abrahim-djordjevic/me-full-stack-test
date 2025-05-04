import { CarbonIntensityRecord } from "./carbonIntensityRecord";

export interface RecordModalProps {
    record: CarbonIntensityRecord;
    cancelMethod: () => void;
    submitMethod: (() => void) | null;
}