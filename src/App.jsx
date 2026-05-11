import BSTVisualizer from "./components/BSTVisualizer";

const appStyles = {
  minHeight: "100vh",
  margin: 0,
  background: "#0b1220",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  boxSizing: "border-box",
};

export default function App() {
  return (
    <main style={appStyles}>
      <BSTVisualizer />
    </main>
  );
}