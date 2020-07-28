import React from 'react';
import {Link} from 'react-router-dom'
import "../css/Home.css"

const Home = () => {
  return (
    <div id="buttons_box">
      <h1>Solicitudes</h1>
      <Link to='/login' class="button">Iniciar sesión</Link>
      <Link to='/announcements' id="announcements_button" class="button">Solicitudes</Link>
      <Link to='/announcements/create' id="create_announcement_button" class="button">Crear solicitud</Link>
    </div>
  );
};

export default Home;
