import '../css/History.css';
import formatDateTime from "../functions/formatDateTime.js";
import { FACULTIES } from '../parseConfig.js';

const History = ({title, data}) => (
  <table className="log">
    <thead>
      <tr>
        <td colSpan="4">
          {title}
        </td>
      </tr>
    </thead>
	  <tbody>
      {(data.length>0)?
        (
          data.map((item, index) => 
          <tr key={index}>
            <td>{formatDateTime(item.time)}</td>
            <td>{(item.faculty==="")?"":(FACULTIES.find(faculty => (faculty.id === item.faculty)).title)}</td>
            <td>{item.amount}</td>
            <td>{item.description}</td>
          </tr>).reverse()
        ):(
          <tr>
            <td colSpan="4">
              нет записей
            </td>
          </tr>
        )
      }
    </tbody>
  </table>
);

export default History;