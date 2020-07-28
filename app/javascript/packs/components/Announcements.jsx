import React from "react";
import { Link,ReactDOM } from "react-router-dom";
import $ from "jquery";
import "../css/Announcements.css";

class Announcements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: []
    };

    this.changeOrder = this.changeOrder.bind(this);
  }

  componentDidMount() {
      const url = "/announcements/index";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ announcements: response }))
        .catch(() => this.props.history.push("/"));
  }

  changeOrder()
  {
      const url = "/announcements/index?order_by=" + $('#announcements_changeorder').val();
      console.log(url);
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => {
            this.setState({ announcements: response });
            console.log(response);
            var announcements = this.allAnnouncements();
            console.log(announcements);
            ReactDOM.render(announcements, document.getElementById('announcements_announcementslist'));
            //$('#announcements_announcementslist').empty().append(announcements);
        })
        .catch((error) => {console.log(error); this.props.history.push("/")});
  }

  allAnnouncements()
  {
      const { announcements } = this.state;
      if (announcements.length > 0)
      {
          return announcements.map((announcement, index) => (
              <div class="announcement">
              <h2>{announcement.title}</h2>
              <Link to={`/announcements/${announcement.id}`} id="announcement_button" class="button">Ver solicitud</Link>
              </div>
          ));
      }
      else
      {
          return (
            <div>
              <h4>
                No hay solicitudes de momento.
              </h4>
              <Link to="/announcements/create" class="button">Crear solicitud</Link>
            </div>
          );
      }
  }

  render() {
    const allAnnouncements = this.allAnnouncements();

    return (
      <>
        <div id="announcements_box">
            <h1>Solicitudes</h1>
            <p>Éstas son todas las solicitudes realizadas por los programadores.</p>
        </div>
        <div>
          <main>
            <div id="links_box">
            <Link to="/" id="home_button" class="button">
              Inicio
            </Link>
              <Link to="/announcements/create" class="button">Crear solicitud</Link>
            </div>
            <div>
                <span>Ordernar por: </span>
                <select onChange={this.changeOrder} id="announcements_changeorder">
                    <option value="recent">Más reciente</option>
                    <option value="score" selected>Puntuación</option>
                </select>
            </div>
            <div id="announcements_announcementslist">
              {allAnnouncements}
            </div>
          </main>
        </div>
      </>
    );
  }

}
export default Announcements;
