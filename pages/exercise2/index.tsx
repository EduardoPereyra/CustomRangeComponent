"use client";
import { MinMaxValues } from "../../components/Range/Range.types";
import styles from "./styles.module.scss";
import { useState } from "react";
import Range from "../../components/Range";
import Link from "next/link";

export default function FixedRange() {
  const possibleValues = [0, 25, 50, 75, 100];
  const [selectedValues, setSelectedValues] = useState<MinMaxValues>({
    minValue: possibleValues[0],
    maxValue: possibleValues[1],
  });

  const handleChange = (values: MinMaxValues) => {
    setSelectedValues(values);
  };

  return (
    <main className={styles.main}>
      <Link href='/'>X</Link>
      <div className={styles.rangeContainer}>
        <h1>Fixed Range</h1>
        <h2>
          Values: {selectedValues.minValue} - {selectedValues.maxValue} €
        </h2>
        <Range
          min={0}
          max={200}
          possibleValues={possibleValues}
          onChange={handleChange}
          initialValues={selectedValues}
          withLabel
        />
      </div>
    </main>
  );
}
