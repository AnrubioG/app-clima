import styles from "./App.module.css";
import { Form } from "./components/Form/Form";

function App() {
  return (
    <>
      <h1 className={styles.title}>Buscador del clima</h1>
      <div className={styles.container}>
        <Form />
      </div>
    </>
  );
}

export default App;
