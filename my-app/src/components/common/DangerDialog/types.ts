export interface IDangerModal {
  text?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isShown: boolean;
}
