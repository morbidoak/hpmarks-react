import '../css/ScoreForm.css';
import React, { useEffect, useState } from 'react';
import { FACULTIES } from '../parseConfig.js';

export default function ScoreForm({maxAddScore, maxSubScore, scoreFormHandler}) {
	const [faculty, setFaculty] = useState(FACULTIES[0].id);
	const [sign, setSign] = useState("+");
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");

	useEffect(()=>{
		if (amount !== "") {
			if ((sign === "+")&&(parseInt(amount) > maxAddScore)) setAmount(maxAddScore);
			if ((sign === "-")&&(parseInt(amount) > maxSubScore)) setAmount(maxSubScore);
		}
	}, [sign, amount, maxAddScore, maxSubScore])

	const onFacultychange = (event) => setFaculty(event.target.value);

	const onSignChange = () => {
		if (sign === "+") setSign("-"); else setSign("+");
	};

	const onAmountChange = (event) => {
		setAmount(event.target.value.replace(/[^0-9]/g,""));
	};

	const onDescriptionChange = (event) => setDescription(event.target.value);

	const onSendForm = () => {
		if ((amount !== "")&&(description !== "")) {
			scoreFormHandler({faculty: faculty, amount: sign+amount, description: description, time: Date.now(),});
			setSign("+");
			setAmount("");
			setDescription("");
		} else {
			[...document.getElementsByClassName("non-empty-alert")].forEach(elem => {
				if (elem.value === "")
					elem.animate([
						{ transform: "translate(1vw, 0)" },
						{ transform: "translate(-1vw, 0)" },
						{ transform: "translate(0vw, 0)" },
					],
					{ duration: 200, iterations: 5, });
			});
		}
	}

	return (
		<div id="AddScoreForm">
			<div>
				{FACULTIES.map((item => (
					<React.Fragment key={item.id}>
						<input type="radio" name="faculty" value={item.id} id={`radio-${item.id}`} checked={faculty === item.id} onChange={onFacultychange} />
						<label htmlFor={`radio-${item.id}`}></label>
					</React.Fragment>
				)))}
			</div>
			<div>
				<input type="button" name="sign" onClick={onSignChange} value={sign} />
				<input type="text" name="amount" className="non-empty-alert" onChange={onAmountChange} value={amount} placeholder="0" />
				<span>баллов</span>
				<textarea name="description" className="non-empty-alert" placeholder="за что..." onChange={onDescriptionChange} value={description} />
				<input type="button" name="save" onClick={onSendForm} value="Записать" />
			</div>
		</div>
	);
}
