import { Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Circuitos from "../components/admin/circuitos/Circuitos";
import Pilotos from "../components/admin/pilotos/Pilotos";
import Escuderias from "../components/admin/escuderias/escuderias";

const AdminPage = () => {
    return (
        <>
            <h1>Admin Page</h1>
            <div><Link to={"/circuitos"} className="link link-hover">Circuitos</Link></div>
            <div><Link to={"/pilotos"} className="link link-hover">Pilotos</Link></div>
            <div><Link to={"/escuderias"} className="link link-hover">Escuderias</Link></div>
        </>
    )
}

export default AdminPage;