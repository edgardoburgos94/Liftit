import React, { Component } from 'react';
import { Table } from 'react-bootstrap';


class Usersandpasswords extends Component {
  render() {
    return (
      <div className="container">
      <Table responsive>
        <thead>
          <tr>
            <th>Nombre de usuario</th>
            <th>Contraseña</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>test1</td>
            <td>123456</td>
          </tr>
          <tr>
            <td>test2</td>
            <td>654321</td>
          </tr>
          <tr>
            <td>test3</td>
            <td>135791</td>
          </tr>
        </tbody>
      </Table>
      json-server --watch users.json --port 3001
      </div>

    );
  }
}

export default Usersandpasswords;
