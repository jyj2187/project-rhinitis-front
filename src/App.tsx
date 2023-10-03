import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar,Container,Nav } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import Board from './features/board/board';
import { useDispatch, useSelector } from 'react-redux';
import { setPattern } from './features/store/store';


function App() {
  let dispatch = useDispatch()
  return (
    <div className="App">

      

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">그러니까</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/board">board</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <button onClick  ={()=>dispatch(setPattern({ id: 1, type: 'dd', code: 'k12' }))}>코드 변경</button>
      <Routes>
        <Route path = "/board" element = {<Board/>}/>
        <Route />
      </Routes>
    </div>
  );
}

export default App;
