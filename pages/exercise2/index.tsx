"use client";
import { ResultRangeValues } from "../../components/Range/Range.types";
import styles from "./styles.module.scss";
import { useState } from "react";
import Range from "../../components/Range";
import Link from "next/link";

export default function Exercise1() {
  const values = [0, 25, 50, 75, 100];
  const [selectedValues, setSelectedValues] = useState<ResultRangeValues>({
    minValue: 20,
    maxValue: 95,
  });

  const handleChange = (values: ResultRangeValues) => {
    setSelectedValues(values);
  };

  return (
    <main className={styles.main}>
      <Link href='/'>X</Link>
      <div className={styles.rangeContainer}>
        <h1>Range Fixed</h1>
        <h2>
          Values: {selectedValues.minValue} - {selectedValues.maxValue} €
        </h2>
        <Range
          min={0}
          max={200}
          onChange={handleChange}
          initialValues={selectedValues}
          withLabel
        />
      </div>
    </main>
  );
}
