import { Link } from "react-router-dom";

const AdminPage = () => {
    return (
        <>
            <h1>Admin Page</h1>
            <div><Link to={"/circuitos"} className="link link-hover">
                <button className="btn btn-xl sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Circuitos</button>
            </Link></div>
            <div><Link to={"/pilotos"} className="link link-hover">
                <button className="btn btn-xl sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Pilotos</button>
            </Link></div>
            <div><Link to={"/escuderias"} className="link link-hover">
                <button className="btn btn-xl sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Escuderias</button>
            </Link></div>
        </>
    )
}

export default AdminPage;