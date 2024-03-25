import {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  TouchEvent,
  useCallback,
} from "react";
import { MinMax, RangeContainerProps, MinMaxValues } from "./Range.types";
import Range from "./Range";

const RangeContainer = ({
  min,
  max,
  initialValues,
  onChange,
  width,
  withLabel = false,
  possibleValues,
}: RangeContainerProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentValues, setCurrentValues] =
    useState<MinMaxValues>(initialValues);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState<MinMax | null>(null);
  const [minMax, setMinMax] = useState<MinMaxValues>({
    minValue: possibleValues?.length ? possibleValues[0] : min,
    maxValue: possibleValues?.length
      ? possibleValues[possibleValues.length - 1]
      : max,
  });

  const moveSliderPosition = useCallback(
    (event: MouseEvent | TouchEvent, handle: MinMax) => {
      const sliderBoundingClientRect =
        sliderRef.current?.getBoundingClientRect();

      if (sliderBoundingClientRect) {
        const posX =
          ((event as MouseEvent).clientX ||
            (event as TouchEvent).touches[0].clientX) -
          sliderBoundingClientRect.left;
        const totalWidth = sliderBoundingClientRect.width;

        let selectedValue = Math.round(
          (posX / totalWidth) * (minMax.maxValue - minMax.minValue) +
            minMax.minValue
        );
        selectedValue = Math.max(minMax.minValue, selectedValue);
        selectedValue = Math.min(minMax.maxValue, selectedValue);

        if (handle === "min") {
          setCurrentValues({ ...currentValues, minValue: selectedValue });
          if (selectedValue >= currentValues.maxValue) {
            setCurrentValues({
              ...currentValues,
              maxValue:
                selectedValue + 1 < minMax.maxValue
                  ? selectedValue + 1
                  : minMax.maxValue,
            });
          }
        } else if (handle === "max") {
          setCurrentValues({ ...currentValues, maxValue: selectedValue });
          if (selectedValue <= currentValues.minValue) {
            setCurrentValues({
              ...currentValues,
              minValue:
                selectedValue - 1 > minMax.minValue
                  ? selectedValue - 1
                  : minMax.minValue,
            });
          }
        }
      }
    },
    [minMax, currentValues]
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent, handle: MinMax) => {
      setActiveHandle(handle);
      moveSliderPosition(event, handle);
      setIsDragging(true);
    },
    [moveSliderPosition]
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent, handle: MinMax) => {
      setActiveHandle(handle);
      setIsDragging(true);
      moveSliderPosition(event, handle);
    },
    [moveSliderPosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    onChange(currentValues);
    setActiveHandle(null);
  }, [currentValues, onChange]);

  const handleMouseMove = useCallback(
    (event: Event) => {
      if (isDragging && activeHandle) {
        moveSliderPosition(event as unknown as MouseEvent, activeHandle);
      }
    },
    [isDragging, activeHandle, moveSliderPosition]
  );

  const handleTouchMove = useCallback(
    (event: Event) => {
      if (isDragging && activeHandle) {
        moveSliderPosition(event as unknown as TouchEvent, activeHandle);
      }
    },
    [isDragging, activeHandle, moveSliderPosition]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    onChange(currentValues);
    setActiveHandle(null);
  }, [currentValues, onChange]);

  useEffect(() => {
    const onMouseMoveHandler = (event: Event) => handleMouseMove(event);
    const onMouseUpHandler = () => handleMouseUp();
    const onTouchMoveHandler = (event: Event) => handleTouchMove(event);
    const onTouchEndHandler = () => handleTouchEnd();

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMoveHandler);
      window.addEventListener("mouseup", onMouseUpHandler);
      window.addEventListener("touchmove", onTouchMoveHandler, {
        passive: true,
      });
      window.addEventListener("touchend", onTouchEndHandler);
    } else {
      window.removeEventListener("mousemove", onMouseMoveHandler);
      window.removeEventListener("mouseup", onMouseUpHandler);
      window.removeEventListener("touchmove", onTouchMoveHandler);
      window.removeEventListener("touchend", onTouchEndHandler);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMoveHandler);
      window.removeEventListener("mouseup", onMouseUpHandler);
      window.removeEventListener("touchmove", onTouchMoveHandler);
      window.removeEventListener("touchend", onTouchEndHandler);
    };
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  useEffect(() => {
    setCurrentValues(initialValues);
    setMinMax({
      minValue: possibleValues?.length ? possibleValues[0] : min,
      maxValue: possibleValues?.length
        ? possibleValues[possibleValues.length - 1]
        : max,
    });
  }, [initialValues, min, max, possibleValues]);

  return (
    <Range
      min={minMax.minValue}
      max={minMax.maxValue}
      width={width}
      withLabel={withLabel}
      currentValues={currentValues}
      isDragging={isDragging}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      sliderRef={sliderRef}
    />
  );
};

export default RangeContainer;
