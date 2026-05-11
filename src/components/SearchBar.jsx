import styles from "./BSTVisualizer.module.css";

export default function SearchBar({ value, onChange, onSearch, result }) {
  return (
    <section className={styles.controls}>
      <div className={styles.inputGroup}>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Buscar valor..."
          className={styles.input}
        />
        <button type="button" onClick={onSearch} className={styles.button}>
          Search
        </button>
      </div>
      <p>{result !== null ? `Encontrado: ${result}` : "No encontrado"}</p>
    </section>
  );
}