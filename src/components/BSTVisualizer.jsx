import { useState, useCallback, useMemo } from "react";
import Tree from "react-d3-tree";

import { createNode, insert, search, inOrder, preOrder, postOrder, toD3Format, randomInt } from "../utils/bst";
import TraversalPanel from "./TraversalPanel";
import SearchBar from "./SearchBar";

import styles from "./BSTVisualizer.module.css";

const getTraversalResult = (root, type) => {
  switch (type) {
    case "inOrder":   return inOrder(root);
    case "preOrder":  return preOrder(root);
    case "postOrder": return postOrder(root);
    default: return [];
  }
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function BSTVisualizer() {
  const [root, setRoot]                   = useState(null);
  const [inputValue, setInputValue]       = useState("");
  const [activeTraversal, setTraversal]   = useState(null);
  const [searchTerm, setSearchTerm]       = useState("");
  const [foundNode, setFoundNode]         = useState(null);
  const [errorMessage, setErrorMessage]   = useState("");

  // ── Insert ──────────────────────────────────────────────────────────────────
  const handleInsert = useCallback(() => {
    const parsed = parseInt(inputValue, 10);

    if (isNaN(parsed)) {
      setErrorMessage("Por favor ingresa un número válido.");
    } else {
      setRoot((prevRoot) => {
        if (prevRoot === null || prevRoot === undefined) {
          return createNode(parsed);
        }
        return insert(prevRoot, parsed);
      });
      setInputValue("");
      setErrorMessage("");
    }
  }, [inputValue]);

  // ── Random Insert ───────────────────────────────────────────────────────────
  const handleRandomInsert = useCallback(() => {
    const value = randomInt(1, 99);
    setRoot((prevRoot) => insert(prevRoot, value));
  }, []);

  // ── Search ──────────────────────────────────────────────────────────────────
  const handleSearch = useCallback(() => {
    const parsed = parseInt(searchTerm, 10);
    const result = search(root, parsed);
    setFoundNode(result ? result.value : null);
  }, [root, searchTerm]);

  // ── Derived data ────────────────────────────────────────────────────────────
  const d3Data = useMemo(
    () => (root ? toD3Format(root) : null),
    [root]
  );

  const traversalResult = useMemo(
    () => (activeTraversal ? getTraversalResult(root, activeTraversal) : []),
    [root, activeTraversal]
  );

  // ── Node Rendering ──────────────────────────────────────────────────────────
  const renderCustomNode = useCallback(({ nodeDatum }) => (
    <g>
      <circle r={20} fill="#4A90D9" stroke="#fff" strokeWidth={2} />
      <text
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {nodeDatum.name}
      </text>
    </g>
  ), []);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BST Visualizer</h1>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInsert()}
            placeholder="Ingresa un número..."
            className={styles.input}
          />
          <button onClick={handleInsert} className={styles.button}>
            Insertar
          </button>
          <button onClick={handleRandomInsert} className={`${styles.button} ${styles.secondary}`}>
            🎲 Aleatorio
          </button>
        </div>

        {errorMessage && (
          <p className={styles.errorMessage}>{errorMessage}</p>
        )}

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          result={foundNode}
        />
      </div>

      {/* Traversal Selector */}
      <TraversalPanel
        active={activeTraversal}
        onChange={setTraversal}
        result={traversalResult}
      />

      {/* Tree Visualization */}
      <div className={styles.treeContainer}>
        {d3Data ? (
          <Tree
            data={d3Data}
            orientation="vertical"
            renderCustomNodeElement={renderCustomNode}
            separation={{ siblings: 1.5, nonSiblings: 2 }}
            translate={{ x: 400, y: 60 }}
          />
        ) : (
          <div className={styles.emptyState}>
            <p>El árbol está vacío.</p>
            <p>Inserta un número para comenzar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
