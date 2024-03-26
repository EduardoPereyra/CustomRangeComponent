"use client";
import { MinMaxValues } from "../../components/Range/Range.types";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Range from "../../components/Range";
import Link from "next/link";
import { getPosibleValues } from "../../helpers/api-util";

export default function FixedRange() {
  const [possibleValues, setPossibleValues] = useState<number[]>([]);
  const [selectedValues, setSelectedValues] = useState<MinMaxValues>({
    minValue: 0,
    maxValue: 0,
  });

  const handleChange = (values: MinMaxValues) => {
    setSelectedValues(values);
  };

  const getDataPosibleValues = async () => {
    const data = await getPosibleValues();
    setPossibleValues(data.rangeValues);
    setSelectedValues({
      minValue: Math.min(...data.rangeValues),
      maxValue: Math.max(...data.rangeValues),
    });
  };

  useEffect(() => {
    getDataPosibleValues();
  }, []);

  if (possibleValues.length === 0) {
    return (
      <main className={styles.main}>
        <Link href='/'>X</Link>
        <h2 className={styles.loading}>Loading...</h2>
      </main>
    );
  }

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
