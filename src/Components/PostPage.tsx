import React from "react";
import { Link, useParams } from "react-router-dom";
import { getUserPosts } from "../API/api";
import { TUserPosts } from "../types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

export default function PostPage() {
  let params: any = useParams();
  const [data, setData] = React.useState<TUserPosts[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [query, setQuery] = React.useState<string>("");
  const [localData, setLocalData] = React.useState<TUserPosts[]>([]);

  React.useEffect(() => {
    getUserPosts(params.id)
      .then((res) => {
        setData(res);
        setLocalData(res);
        setLoading(false);
      })
      .catch((err) => alert("There is some error while fetching data"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLocalSearch() {
    const temp = [
      ...localData.filter((postData) =>
        postData?.title?.toLowerCase().includes(query?.toLowerCase())
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
        <>
          <input
            type="text"
            placeholder="Search post by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ol>
            {data?.map((post) => {
              return (
                <div key={post.id}>
                  <li style={{ fontSize: 18, margin: 10 }}>
                    <b>Post Title: </b>
                    <u>{post.title}</u>
                  </li>
                  <Link to={`/postDetails/${post.id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: 10 }}
                    >
                      View Post
                    </Button>
                  </Link>
                </div>
              );
            })}
          </ol>
        </>
      )}
    </>
  );
}
