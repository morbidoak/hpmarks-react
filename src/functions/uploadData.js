import { UPLOAD_URL } from '../config.js';
import prepareSheet from './prepareSheet.js';

export default function uploadData(uName, position, previousUpdate, firstStart, actualScore, totalScore, data, onSuccess, onFail) {
	const prepared = prepareSheet(uName, position, previousUpdate, firstStart, actualScore, totalScore, data);
		
	fetch(UPLOAD_URL, {
 		method: 'POST',
		mode: 'no-cors',
		headers: {'Content-Type': 'application/json',},
  		body: JSON.stringify(prepared),
	})
	.then(onSuccess)
	.catch(onFail);
}