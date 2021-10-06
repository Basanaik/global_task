import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

const StudentDetails = ({ history }) => {
  let [post, setPost] = useState({
    name: "",
    dateofbirth: "",
    age: "",
    gender: "",
    course: "",
    loading: false,
  });
  //to reset values
  let cancelfield = () => {
    setPost({
      name: "",
      dateofbirth: "",
      age: "",
      gender: "",
      course: "",
      loading: false,
    });
  };
  //onchange event
  let handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  //submitevent
  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let postData = {
        name: post.name,
        dateofbirth: post.dateofbirth,
        age: post.age,
        gender: post.gender,
        course: post.course,
      };

      //getting data from the user and posting to url
      setPost({ loading: true });
      let BASE_URL = "http://localhost:3003";
      console.log(postData);
      await axios.post(`${BASE_URL}/posts`, postData);
      toast.success("Post created successfully ");
      history.push("/management-post");
    } catch (err) {
      toast.error(err.message);
    }

    setPost({ loading: false });
  };
  //controlled form
  let { name, dateofbirth, age, gender, course, loading } = post;
  return (
    <section
      id="PostsBlock"
      className="col-md-4 card my-4 mx-auto bg-light shadow"
    >
      <article className="card-body">
        <h2 className="display-5 font-weight-bold text-dark text-center text-uppercase">
          Student Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={name || ""}
              onChange={handleChange}
              placeholder="enter Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateofbirth">DOB</label>
            <input
              type="date"
              className="form-control"
              name="dateofbirth"
              id="dateofbirth"
              value={dateofbirth || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">AGE</label>
            <input
              type="number"
              className="form-control"
              name="age"
              id="age"
              value={age || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label> <br />
            <input
              type="radio"
              name="gender"
              value="male"
              id="gender"
              value={gender || ""}
              onChange={handleChange}
            />
            Male <br />
            <input
              type="radio"
              name="gender"
              value="female"
              id="gender"
              value={gender || ""}
              onChange={handleChange}
            />
            Female
          </div>

          <div className="form-group">
            <select
              name="course"
              id="course"
              value={course || ""}
              onChange={handleChange}
              required
            >
              <option value="MERN">MERN Stack</option>
              <option value="MEAN">MEAN Stack</option>
              <option value="Java">JavaFullStack</option>
              <option value="Python">PythonFullStack</option>
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-success btn-block my-2">
              {loading ? "loading..." : "save"}
            </button>
            <button
              className="btn btn-success btn-block my-2"
              onClick={cancelfield}
            >
              cancel
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default withRouter(StudentDetails);
