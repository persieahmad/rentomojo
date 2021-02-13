import React from "react";
import { useParams } from "react-router-dom";
import { getComments, getPost, deletePost } from "../API/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

export default function PostDetailsPage() {
  let params: any = useParams();
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showComments, setShowComments] = React.useState<boolean>(false);
  const [commentsData, setCommentsData] = React.useState<any>([]);
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false);

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  React.useEffect(() => {
    getPost(params.id)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => alert("There is some error while fetching data"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getCommentsApiCall() {
    getComments(params.id)
      .then((res) => {
        setCommentsData(res);
        setShowComments(!showComments);
      })
      .catch((err) => alert("There is some error while fetching data"));
  }

  function deletePostApiCall() {
    deletePost(params.id)
      .then((res) => {
        setShowSnackbar(true);
        setTimeout(() => {
          window.history.back();
        }, 2000);
      })
      .catch((err) => alert("Error occured while deleting post"));
  }

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <p>
            <b>Post Title: </b>
            {data?.title}
          </p>
          <p>
            <b>Post Body: </b>
            {data?.body}
          </p>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
            onClick={getCommentsApiCall}
          >
            {!showComments ? "View Comments" : "Hide Comments"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: 10 }}
            onClick={deletePostApiCall}
          >
            Delete Post
          </Button>
          {showComments &&
            commentsData.map((comment: any) => {
              return (
                <div
                  key={comment.id}
                  style={{
                    backgroundColor: "#f5f2f2",
                    padding: 10,
                    margin: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <p>
                      <b>Name: </b>
                      {comment.name}
                    </p>
                    <p>
                      <b>Email: </b>
                      {comment.email}
                    </p>
                  </div>
                  <p>
                    <b>Comment: </b>
                    {comment.body}
                  </p>
                </div>
              );
            })}
          <Snackbar
            open={showSnackbar}
            autoHideDuration={2000}
            onClose={() => setShowSnackbar(false)}
          >
            <Alert onClose={() => setShowSnackbar(false)} severity="success">
              Post deleted successfully!
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
}
