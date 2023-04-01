import { useFetch } from "../useFetch";

export function Test() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    fetch("https://reqres.in/api/posts", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  };

  return (
    <div className="App">
      <header className="App-header">
        {error && <li> Error: {error} </li>}
        {loading && <li>Loading...</li>}
        {data?.map((elemento) => (
          <li key={elemento.name}>{elemento.name}</li>
        ))}
      </header>
    </div>
  );
}
