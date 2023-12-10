// import logo from './logo.svg';
import './App.css';
import CodeBlock from "./CodeBlock"
import { useParams } from 'react-router-dom';

function App() {
  const params = useParams();
  console.log(params);
  return (
    <CodeBlock url={`http://localhost:8000/code/usaco/${params.ch}/${params.prog}`} />
  );
}

export default App;
