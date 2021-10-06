import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

const DeletePost = ({ history }) => {
  let { id } = useParams();
  let [post, setPost] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3003/posts/${id}`, post)
      .then((result) => {
        setPost(result.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  let RemovePost = (e) => {
    axios
      .delete(`http://localhost:3003/posts/${id}`)
      .then((_) => {
        toast.dark("Post Deleted Successfully");
        history.push("/management-post");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container my-4 ">
      {post === undefined ? (
        "no title"
      ) : (
        <Fragment>
          <div class="card bg-default shadow">
            <h1 className="h4 font-weight-bold text-text-uppercase my-2">
              {post.name}
            </h1>

            <h3>Do you want to delete this user?</h3>
            <Link to="/management-post" className="btn btn-primary mb-2 ">
              Go Back
            </Link>
            <button className="btn btn-danger " onClick={RemovePost}>
              Delete
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default withRouter(DeletePost);
