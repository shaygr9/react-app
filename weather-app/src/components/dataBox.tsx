import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

function DataBox(props: { title: string; value: string, loading: boolean}) {
  const [title, setTitle] = useState<string>();
  const [value, setValue] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const skeleton = <Skeleton className="value-skeleton" variant="text" sx={{ fontSize: "1rem" }} />;

  useEffect(() => {
    setLoading(props.loading)
    setTitle(props.title);
    setValue(props.value);
  }, [props.title, props.value, props.loading]);
  return (
    <div className="data-box">
      <span className="title">{title}</span>
      <span className="value">{loading ? skeleton : value}</span>
    </div>
  );
}

export default DataBox;
