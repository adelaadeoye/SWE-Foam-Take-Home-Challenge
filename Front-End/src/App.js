import logo from "./logo.svg";
import "./App.css";
import { s3 } from "./AwsConfig";

function App() {
  s3.listObjects(
    {
      Bucket: process.env.REACT_APP_BUCKET,
    },
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    }
  );
  console.log(
    "first",
    `https://${process.env.REACT_APP_BUCKET}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/prod-exp13436-2020-01-08-at-04.24.38-9zijoye9dteugy6agooo506u3c6wrin920a99mavvv4z9mahkt7qbu6thl2l3v39.png`
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={`https://${process.env.REACT_APP_BUCKET}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/prod-exp13436-2020-01-08-at-04.24.38-9zijoye9dteugy6agooo506u3c6wrin920a99mavvv4z9mahkt7qbu6thl2l3v39.png`} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
