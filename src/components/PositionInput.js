import { POSITIONS } from '../config.js';

const PositionInput = ({position, positionChangeHandler}) => (
  <select name="position" className="widefield" value={position} onChange={positionChangeHandler}>
		<option key="0" value="" disabled>должность</option>
		{POSITIONS.map(pos => (
			<option key={pos.id} value={pos.id}>{pos.title}</option>
		))};
	</select>
);

export default PositionInput;