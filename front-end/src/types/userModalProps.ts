import { User } from "./user";

export interface UserModalProps {
    user: User;
    cancelMethod: () => void;
    submitMethod: (() => void) | null;
}