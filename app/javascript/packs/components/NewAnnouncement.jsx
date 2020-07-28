import React from "react";
import { Link } from "react-router-dom";
import "../css/NewAnnouncement.css"

class NewAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/announcements/create";
    const { title, content } = this.state;

    if (title.length == 0 || content.length == 0)
      return;

    const body = {
      title,
      content
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
        console.log(response);
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/announcements/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div id="newannouncement_box">
        <h1>Crear solicitud</h1>
        <form onSubmit={this.onSubmit}>
            <div id="form_title_box">
            <div>Título</div>
            <input type="text" name="title" onChange={this.onChange} />
            </div>
            <div id="form_content_box">
            <div>Contenido</div>
            <textarea name="content" onChange={this.onChange}></textarea>
            </div>
            <div id="newannouncement_form_submit" onClick={this.onSubmit} class="button">Crear solicitud</div>
        </form>
      </div>
  );
  }

}

export default NewAnnouncement;
