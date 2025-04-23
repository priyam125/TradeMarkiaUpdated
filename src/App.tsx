import Header from "./components/Header";
import Hero from "./components/Hero";
import Layout from "./components/Layout";
import SearchBar from "./components/SearchBar";

function App() {

  return (
    <Layout>
      <Header />
      <Hero />
      <SearchBar />
    </Layout>
  );
}

export default App;