export interface IModal {
  outerClassName?: string;
  containerClassName?: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
}
