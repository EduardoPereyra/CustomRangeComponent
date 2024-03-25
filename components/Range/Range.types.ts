import { KeyboardEvent, MouseEvent, RefObject, TouchEvent } from "react";

// Shared between RangeSlider and RangeSliderContainer
interface SharedRangeProps {
  min: number;
  max: number;
  possibleValues?: number[];
  width?: number;
  withLabel?: boolean;
}

export interface MinMaxValues {
  minValue: number;
  maxValue: number;
}

export type MinMax = "min" | "max";

export interface RangeProps extends SharedRangeProps {
  currentValues: MinMaxValues;
  isDragging: boolean;
  onMouseDown: (event: MouseEvent, handle: MinMax) => void;
  onTouchStart: (event: TouchEvent, handle: MinMax) => void;
  sliderRef: RefObject<HTMLDivElement>;
}

export interface RangeContainerProps extends SharedRangeProps {
  initialValues: MinMaxValues;
  onChange: (currentValue: MinMaxValues) => void;
}
