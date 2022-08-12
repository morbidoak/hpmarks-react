import '../css/ProcessCover.css';

const ProcessCover = ({uploadProgress, closeProcessCover}) => (
  <div 
    className={`process-cover ${uploadProgress}`} 
    onClick={() => {if (uploadProgress==="success" || uploadProgress==="fail") closeProcessCover();}}
  >
    {uploadProgress==="success"&&"Доставлено"}
    {uploadProgress==="fail"&&"Потерялось"}
  </div>
);

export default ProcessCover;