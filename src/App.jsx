import { useEffect, useState } from 'react'


function App() {
  const [flightData, setFlightData] = useState();
  const [arr, setArr] = useState([]);
  const [paraClass, setParaClass] = useState('d-none');
  const [tableClass, setTableClass] = useState('d-none');
  useEffect(() => {
    fetch('/flightData.json')
      .then(res => res.json())
      .then(data => {
        setFlightData(data); setArr(data.flightOffer);
      })
  }, [])
  function displayData() {
    setParaClass('text-start'); setTableClass("table table-striped");
  }
  return (
    <div className='text-center container'>
      <h3>Flight Data Form</h3>
      <div className="btn-group mt-4">
        <button type="button" className="btn btn-outline-primary btn-sm">Round Trip</button>
        <button type="button" className="btn btn-outline-primary btn-sm">One Way</button>
        <button type="button" className="btn btn-outline-primary btn-sm">Multi City</button>
      </div>
      <hr className='border-primary opacity-100' />
      <div className='d-flex align-items-center justify-content-between'>
        <input type="text" className="form-control border-black w-15" placeholder="LHR" />
        <input type="text" className="form-control border-black w-15" placeholder="CDG" />
        <input type="date" className="form-control border-black w-15" />
        <button type='button' className='btn btn-outline-dark'><span>Day -</span> <i className="bi bi-chevron-down ms-2"></i></button>
        <button type='button' className='btn btn-outline-dark'><span>Day +</span> <i className="bi bi-chevron-down ms-2"></i></button>
        <button type='button' className='btn btn-outline-dark'><span>Anytime</span> <i className="bi bi-chevron-down ms-4"></i></button>
        <span className='fs-4'>+</span>
        <button type='button' className='btn btn-outline-dark'><span>ADT</span> <i className="bi bi-chevron-down ms-5"></i></button>
        <button type='button' className='btn btn-outline-dark'><span>1</span>  <i className="bi bi-chevron-down ms-5"></i></button>
        <span className='fs-4'>+</span>
      </div>
      <hr className='border-primary opacity-100' />
      <div className='d-flex justify-content-between align-items-center'>
        <section>
          <input type="checkbox" className="form-check-input border-black me-2" />
          <label className="form-check-label">Extra Options</label>
        </section>
        <section>
          <span>Environment</span>
          <input type="radio" className="form-check-input border-black mx-2" />
          <label className="form-check-label">Dummy</label>
          <input type="radio" className="form-check-input border-black mx-2" />
          <label className="form-check-label">PDT</label>
        </section>
        <button onClick={displayData} type='button' className='btn btn-primary'>SEARCH</button>
      </div>
      <hr className='border-primary opacity-100' />
      <p className={paraClass}>{flightData?.message}</p>
      <table className={tableClass}>
        <thead className='table-secondary'>
          <tr>
            <th className='text-secondary'>FLIGHT</th>
            <th className='text-secondary'>AIRCRAFT</th>
            <th className='text-secondary'>CLASS</th>
            <th className='text-secondary'>FARE</th>
            <th className='text-secondary'>ROUTE</th>
            <th className='text-secondary'>DEPARTURE</th>
            <th className='text-secondary'>ARRIVAL</th>
            <th className='text-secondary'>DURATION</th>
            <th className='text-secondary'>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {arr.map(e => (
            <tr className='border-bottom border-danger'>
              <td className='text-secondary'>{e.itineraries[0].segments.map(x => <p className='m-0'>{x.carrierCode} {x.aircraft}</p>)}</td>
              <td className='text-secondary'>{e.itineraries[0].segments.map(x => <p className='m-0'>{x.flightNumber}</p>)}</td>
              <td className='text-secondary'>{e.class[0].map(x => <p className='m-0'>{x}</p>)}</td>
              <td className='text-secondary'>{e.fareBasis[0].map(x => <p className='m-0'>{x}</p>)}</td>
              <td className='text-secondary'>{e.itineraries[0].segments.map(x => <p className='m-0'>{x.departure.iataCode}-{x.arrival.iataCode}</p>)}</td>
              <td className='text-secondary'>{e.itineraries[0].segments.map(x => <p className='m-0'>{x.departure.at}</p>)}</td>
              <td className='text-secondary'>{e.itineraries[0].segments.map(x => <p className='m-0'>{x.arrival.at}</p>)}</td>
              <td className='text-secondary'>{e.itineraries[0].duration}</td>
              <td className='text-secondary'><p className='m-0'>{e.price}</p><button type='button' className='btn btn-primary btn-sm'>SELECT</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
