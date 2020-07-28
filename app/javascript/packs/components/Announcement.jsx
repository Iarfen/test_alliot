import React from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import "../css/Announcement.css";

class Announcement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { announcement: { comments: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.onSubmitComment = this.onSubmitComment.bind(this);
    this.onSubmitVote = this.onSubmitVote.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = '/announcements/' + id;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => { this.setState({ announcement: response }); })
      .catch((response) => {this.props.history.push("/announcements");});
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  onSubmitComment(event)
  {
      event.preventDefault();
      const url = "/announcements/comments/create";
      const comment = $('#comment').val();

      if (comment.length == 0)
        return;

      const body = {
        comment: comment,
        announcement_id: $('#announcement_id').val()
      };

      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => { this.props.history.push(`/announcements/${this.state.announcement.id}`) })
        .catch(error => console.log(error.message));
  }

  onSubmitVote(event)
  {
      event.preventDefault();
      const url = "/announcements_votes/create";
      const vote = $('#vote').val();

      if (vote == 0)
        return;

      const body = {
        vote: vote,
        announcement_id: $('#announcement_id').val()
      };

      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => { this.props.history.push(`/announcements/${this.state.announcement.id}`) })
        .catch(error => console.log(error.message));
  }

  render() {
    const { announcement } = this.state;
    let ingredientList = "No ingredients available";

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch("/announcements/" + this.state.announcement.id + "/comments", {
      method: "GET",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
          var content = "";
          for (var i = 0; i < response.length; i++)
          {
              content += "<div class='announcement_comment'>" + response[i].comment + "</div>";
          }
          $('#comments').empty().append(content);
      })
      .catch(error => console.log(error.message));

    return (
      <div id="announcement_box">
          <h1>
            {announcement.title}
          </h1>
          <p>{announcement.content}</p>
        <div>
            <form onSubmit={this.onSubmitVote}>
            <span id="announcement_score_box">Puntuación: {announcement.score}</span>
                <select name="vote" id="vote">
                    <option value="0">Seleccionar</option>
                    <option value="5">Muy bueno</option>
                    <option value="4">Bueno</option>
                    <option value="3">Regular</option>
                    <option value="2">Malo</option>
                    <option value="1">Muy malo</option>
                </select>
                <div id="vote_button" class="button" onClick={this.onSubmitVote}>Votar</div>
            </form>
        </div>
        <div id="announcement_comments_box">
            <h2>Comentarios</h2>
            <form onSubmit={this.onSubmitComment}>
                <input type="hidden" name="announcement_id" value={announcement.id} id="announcement_id" />
                <textarea name="comment" id="comment"></textarea>
                <div id="comment_button" class="button" onClick={this.onSubmitComment}>Comentar</div>
            </form>
            <div id="comments"></div>
        </div>
        <div>
          <Link to="/announcements" class="button">
            Volver a solicitudes
          </Link>
        </div>
      </div>
  );
  }

}

export default Announcement;
