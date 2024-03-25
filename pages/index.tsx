import Link from "next/link";
import styles from "./index.module.scss";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>Home Page</h1>
      <ul>
        <Link href='/exercise1'>
          <li>Range Normal</li>
        </Link>
        <Link href='/exercise2'>
          <li>Range Fixed</li>
        </Link>
      </ul>
    </main>
  );
}
