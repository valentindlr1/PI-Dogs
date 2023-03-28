import "./SearchBar.modules.css";
import { useState } from "react";

export default function SearchBar(props) {
  const { search } = props;

  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    const input = event.target.value;
    setText(input);
    search(input);
  };

  return (
    <div>
      <input
        value={text}
        onChange={handleInputChange}
        type="search"
        placeholder=" Find by name..."
        className="searchBar"
      />
    </div>
  );
}
