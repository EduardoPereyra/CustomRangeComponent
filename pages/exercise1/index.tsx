"use client";
import { ResultRangeValues } from "../../components/Range/Range.types";
import styles from "./styles.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import Range from "../../components/Range";
import Link from "next/link";
import { getMinMax } from "../../helpers/api-util";

export default function Exercise1() {
  const [selectedValues, setSelectedValues] = useState<ResultRangeValues>({
    minValue: 20,
    maxValue: 77,
  });
  const [rangeValues, setRangeValues] = useState<ResultRangeValues>({
    minValue: 0,
    maxValue: 200,
  });

  const handleChange = (values: ResultRangeValues) => {
    setSelectedValues(values);
  };

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const minValueNumber = Number(e.target.value);
    if (minValueNumber > selectedValues.minValue) {
      setSelectedValues({ ...selectedValues, minValue: minValueNumber });
    }

    if (minValueNumber > rangeValues.maxValue) {
      setRangeValues({
        minValue: minValueNumber,
        maxValue: minValueNumber + 1,
      });
    } else {
      setRangeValues({
        ...rangeValues,
        minValue: Number(e.target.value),
      });
    }
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maxValueNumber = Number(e.target.value);
    if (maxValueNumber < selectedValues.maxValue) {
      setSelectedValues({ ...selectedValues, maxValue: maxValueNumber });
    }

    if (maxValueNumber < rangeValues.minValue) {
      setRangeValues({
        minValue: maxValueNumber - 1,
        maxValue: maxValueNumber,
      });
    } else {
      setRangeValues({
        ...rangeValues,
        maxValue: Number(e.target.value),
      });
    }
  };

  const getDataMinMax = async () => {
    const data = await getMinMax();
    setRangeValues({
      minValue: data.min,
      maxValue: data.max,
    });
  };

  useEffect(() => {
    getDataMinMax();
  }, []);

  return (
    <main className={styles.main}>
      <Link href='/'>X</Link>
      <div className={styles.rangeContainer}>
        <h1>Range Normal</h1>
        <div className={styles.inputsContainer}>
          <label>
            Min Value
            <input
              type='number'
              name='minValue'
              value={rangeValues.minValue}
              onChange={(e) => handleMinChange(e)}
            />
          </label>
          <label>
            Max Value
            <input
              type='number'
              name='maxValue'
              value={rangeValues.maxValue}
              onChange={(e) => handleMaxChange(e)}
            />
          </label>
        </div>
        <h2>
          Range values:
          <span>
            {selectedValues.minValue} - {selectedValues.maxValue} €
          </span>
        </h2>
        <Range
          min={rangeValues.minValue}
          max={rangeValues.maxValue}
          onChange={handleChange}
          initialValues={selectedValues}
          withLabel
        />
      </div>
    </main>
  );
}
