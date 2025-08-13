import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import Dock from '../components/dock/Dock'

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="text-center text-2xl font-bold mb-4">
                Bienvenido a la página de inicio
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
            <Footer />
            <Dock />
        </>
    )
}

export default HomePage;