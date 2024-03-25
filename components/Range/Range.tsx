import { MinMax, RangeProps } from "./Range.types";
import styles from "./Range.module.scss";

const Range = ({
  min,
  max,
  width,
  withLabel,
  currentValues,
  isDragging,
  onMouseDown,
  onTouchStart,
  sliderRef,
}: RangeProps) => {
  const minValueRatio = ((currentValues.minValue - min) / (max - min)) * 100;
  const maxValueRatio =
    ((currentValues.maxValue - min) / (max - min)) * 100 - minValueRatio;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    handle: MinMax
  ) => {
    onMouseDown(event, handle);
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
    handle: MinMax
  ) => {
    onTouchStart(event, handle);
  };

  return (
    <div
      ref={sliderRef}
      role='slider'
      tabIndex={0}
      aria-valuemin={min}
      aria-valuemax={max}
      style={{
        width: width ? `${width}px` : "100%",
      }}
      className={styles.rangeSlider}
    >
      <div
        className={styles.rangeSliderBar}
        onMouseDown={(e) => handleMouseDown(e, "min")}
        onTouchStart={(e) => handleTouchStart(e, "min")}
        style={{
          width: `${minValueRatio}%`,
        }}
      >
        <span
          className={styles.rangeSliderHandle}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <span
            className={`${styles.rangeSliderLabel} ${
              !withLabel && styles.srOnly
            }`}
          >
            {currentValues.minValue}€
          </span>
        </span>
      </div>
      <div
        className={styles.rangeSliderBarBetween}
        onMouseDown={(e) => handleMouseDown(e, "max")}
        onTouchStart={(e) => handleTouchStart(e, "max")}
        style={{
          width: `${maxValueRatio}%`,
          marginLeft: `${minValueRatio}%`,
        }}
      >
        <span
          className={styles.rangeSliderHandle}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <span
            className={`${styles.rangeSliderLabel} ${
              !withLabel && styles.srOnly
            }`}
          >
            {currentValues.maxValue}€
          </span>
        </span>
      </div>
    </div>
  );
};

export default Range;
