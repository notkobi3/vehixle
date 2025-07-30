declare module 'react-colorful' {
  import { ComponentType } from 'react';

  export interface ColorPickerProps {
    color?: string;
    onChange?: (color: string) => void;
  }

  export const HexColorPicker: ComponentType<ColorPickerProps>;
  export const RgbColorPicker: ComponentType<ColorPickerProps>;
  export const HslColorPicker: ComponentType<ColorPickerProps>;
}
