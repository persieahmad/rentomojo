import React from "react";
import BasicTable from "../UI/Table";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getUsers } from "../API/api";

export default function HomePage() {
  const [data, setData] = React.useState<any[]>([]);
  const [localData, setLocalData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [query, setQuery] = React.useState<string>("");

  React.useEffect(() => {
    getUsers()
      .then((res) => {
        setData(res);
        setLocalData(res);
        setLoading(false);
      })
      .catch((err) => {
        alert("There is some error while fetching data");
      });
  }, []);

  function handleLocalSearch() {
    const temp = [
      ...localData.filter(
        (userData) =>
          userData?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          userData?.company?.name?.toLowerCase().includes(query?.toLowerCase())
      ),
    ];
    setData(temp);
  }

  React.useEffect(() => {
    handleLocalSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search by Username/Company Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <BasicTable {...{ data }} />
        </div>
      )}
    </>
  );
}
