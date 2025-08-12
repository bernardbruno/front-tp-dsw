const HomePage = () => {
    return (
        <>
            <div className="text-center text-2xl font-bold mb-4">
                  
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img
                        src="https://a.espncdn.com/i/venues/f1/day/404.svg"
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Heineken Dutch GP</h2>
                        <p>En Circuit Park Zandvoort; Zandvoort, Holanda. va a ganar norris o piastri</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Conocer más</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img
                        src="https://c.files.bbci.co.uk/BDEB/production/_103191684_dddffb6b-e8f1-4180-a987-1161a11f5bfb.jpg"
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Mira ya las ultimas noticias</h2>
                        <p>Increible choque mortal entre 2 pilotos, murieron</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Conocer más</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <table className="table">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Puntos</th>
                    <th>Piloto Favorito</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th>1</th>
                    <td>Lucas Fernández</td>
                    <td>128</td>
                    <td>Max Verstappen</td>
                    </tr>
                    <tr>
                    <th>2</th>
                    <td>Martina López</td>
                    <td>115</td>
                    <td>Charles Leclerc</td>
                    </tr>
                    <tr>
                    <th>3</th>
                    <td>Diego Ramírez</td>
                    <td>109</td>
                    <td>Lando Norris</td>
                    </tr>
                    <tr>
                    <th>4</th>
                    <td>Valentina Torres</td>
                    <td>102</td>
                    <td>Fernando Alonso</td>
                    </tr>
                    <tr>
                    <th>5</th>
                    <td>Matías Gómez</td>
                    <td>97</td>
                    <td>Lewis Hamilton</td>
                    </tr>
                </tbody>
                </table>
                <div>
                    <button className="ml-10 px-8 btn btn-primary">Conoce la tabla completa</button>
                </div>
            </div>
        </>
    )
}

export default HomePage;