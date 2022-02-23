import { useState } from "react";

type ListProps = {
  items: string[];
};

export const List = ({ items }: ListProps) => {
  const [list, setList] = useState(items);
  const [newItem, setNewItem] = useState("");

  const addToList = () => {
    setTimeout(() => {
      setList([...list, newItem]);
    }, 500);
  };

  const removeFromList = (item: string) => {
    setTimeout(() => {
      setList((list) => list.filter((list) => list !== item));
    }, 500);
  };

  return (
    <div className="teste">
      Lista
      <div>
        <input
          type="text"
          placeholder="Novo item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addToList}>adicionar</button>
        <ul>
          {list.map((item) => (
            <li key={item} data-testid="list-items">
              {item}{" "}
              <button onClick={() => removeFromList(item)}>remover</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
