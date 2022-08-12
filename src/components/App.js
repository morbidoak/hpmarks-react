import '../css/App.css';
import React, { useState } from 'react';
import NameInput from './NameInput.js';
import PositionInput from './PositionInput.js';
import ScoreForm from './ScoreForm.js';
import History from './History.js';
import ProcessCover from './ProcessCover.js';
import uploadData from '../functions/uploadData.js';
import { dropAllData, getLocalStoredState, setLocalStoredState } from '../functions/storage.js';
import { DROP_DATA_KEYWORD, FACULTIES, POSITIONS } from '../parseConfig.js';

const INITIAL_PREVIOUS_UPDATE = "еще не обнулялось";

function zeroScores() {
	let result = {};
	FACULTIES.forEach((faculty) => {result[faculty.id] = 0;});
	return result;
}

export default function App() {
	const [uName, setUName] = useState(getLocalStoredState("uName", ""));
	const [position, setPosition] = useState(getLocalStoredState("position", ""));
	const [data, setData] = useState(getLocalStoredState("data", []));
	const [firstStart, setFirstStart] = useState(getLocalStoredState("firstStart", Date.now()));
	const [previousUpdate, setPreviousUpdate] = useState(getLocalStoredState("previousUpdate", INITIAL_PREVIOUS_UPDATE));
	const [actualScore, setActualScore] = useState(getLocalStoredState("actualScore", zeroScores()));
	const [totalScore, setTotalScore] = useState(getLocalStoredState("totalScore", zeroScores()));
	const [uploadProgress, setUploadProgress] = useState("none"); //none, progress, success, fail


	const onSimpleFieldChange = (key, setter) => {
		return (event) => {
			if (event.target.value === DROP_DATA_KEYWORD)
				dropAllData();
			else 
				setLocalStoredState(setter, key, event.target.value);
		};
	};

	const closeProcessCover = () => {
		setUploadProgress("none");
	};

	const onScoreFormSubmit = (formData) => {
		let newData = [...data, formData];
		setLocalStoredState(setData, "data", newData);

		let newActualScore = {...actualScore};
		let newTotalScore = {...totalScore};

		newActualScore[formData.faculty] += parseInt(formData.amount);
		newTotalScore[formData.faculty] += parseInt(formData.amount);

		setLocalStoredState(setActualScore, "actualScore", newActualScore);
		setLocalStoredState(setTotalScore, "totalScore", newTotalScore);
	};

	const uploadProcess = () => {
		setUploadProgress("progress");
		uploadData(uName, POSITIONS.find(p=>(p.id === position)).title, previousUpdate, firstStart, actualScore, totalScore, data, ()=>uploadSuccess(), (err)=>{console.log(err);setUploadProgress("fail")});
	};

	const uploadSuccess = () => {
		let uploadDT = Date.now();
		let newData = [...data, {"time": uploadDT, "faculty": "", "amount": "Сова отнесла баллы", "description": "**Выгрузка**"}];

		setLocalStoredState(setPreviousUpdate, "previousUpdate", uploadDT);
		setLocalStoredState(setData, "data", newData);
		setLocalStoredState(setActualScore, "actualScore", zeroScores())
		setUploadProgress("success");
	};

	const maxAddScore = (pos) => (
		(pos==="")?0:(POSITIONS.find(p => (p.id === pos)).maxAddScore)
	);

	const maxSubScore = (pos) => (
		(pos==="")?0:(POSITIONS.find(p => (p.id === pos)).maxSubScore)
	);

	return (<>
		<NameInput uName={uName} nameChangeHandler={onSimpleFieldChange("uName", setUName)} />
		<PositionInput position={position} positionChangeHandler={onSimpleFieldChange("position", setPosition)} />
		<ScoreForm maxAddScore={maxAddScore(position)} maxSubScore={maxSubScore(position)} scoreFormHandler={onScoreFormSubmit} />
		<History 
			title="Журнал" 
			data={(previousUpdate === INITIAL_PREVIOUS_UPDATE)?data:data.filter(item=>(item.time>previousUpdate))} 
		/>
		<input type="button" name="send" onClick={()=>uploadProcess()} value="Отправить завучу" />
		<hr />
		{(previousUpdate !== INITIAL_PREVIOUS_UPDATE)&&(
			<History 
				title="Архив" 
				data={data.filter(item=>(item.time<=previousUpdate))} 
			/>
		)}
		<ProcessCover uploadProgress={uploadProgress} closeProcessCover={closeProcessCover}  />
	</>);
	
}

