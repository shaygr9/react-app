import { useEffect, useState } from "react";

function DataBox(props: { title: string; value: string }) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    setTitle(props.title);
    setValue(props.value);
  }, [props.title, props.value]);
  return (
    <div className="data-box">
      <span className="title">{title}</span>
      <span className="value">{value}</span>
    </div>
  );
}

export default DataBox;
