import Sheet from "./sheet.js";
import formatDateTime from "./formatDateTime.js"
import { FACULTIES } from '../parseConfig.js';

export default function prepareSheet(uName, position, previousUpdate, firstStart, actualScore, totalScore, data) {
	let currentRows = {};
	FACULTIES.forEach((faculty) => {currentRows[faculty.id] = 20});
	let dataSheet = new Sheet();
	dataSheet.setCell(1,1,".");
	dataSheet.setCell(2,1,"Имя начисляющего:");
	dataSheet.setCell(2,3,"Должность:");
	dataSheet.setCell(2,5,"Время формирования этого файла:");
	dataSheet.setCell(3,1,uName);
	dataSheet.setCell(3,3,position);
	dataSheet.setCell(3,5,formatDateTime(Date.now()));
	dataSheet.setCell(4,1,".");
	dataSheet.setCell(5,1,"Итоговые баллы");
	dataSheet.setCell(6,1,"начисленные с момента");
	dataSheet.setCell(7,1,"предыдущего обнуления");
	dataSheet.setCell(8,1,`(${formatDateTime(previousUpdate)}):`);
	dataSheet.setCell(8,6,"Всего за семестр начислено:");
	dataSheet.setCell(9,1,".");
	dataSheet.setCell(14,1,".");
	dataSheet.setCell(15,1,".");
	dataSheet.setCell(16,1,"Подробности начислений (за все время):");
	dataSheet.setCell(17,1,".");

	FACULTIES.forEach((faculty, index) => {
		dataSheet.setCell(10+index, 1, faculty.title+":");
		dataSheet.setCell(10+index, 2, actualScore[faculty.id]);
		dataSheet.setCell(10+index, 6, totalScore[faculty.id]);
		dataSheet.setCell(18, faculty.sheetDataColumn, faculty.title);
		dataSheet.setCell(19, faculty.sheetDataColumn, formatDateTime(firstStart).replace(" ", "_"));
		dataSheet.setCell(19, faculty.sheetDataColumn+1, "Первый");
		dataSheet.setCell(19, faculty.sheetDataColumn+2, "старт");
		dataSheet.setCell(19, faculty.sheetDataColumn+3, "программы");
	});

	data.forEach(dataRow => {
		if (dataRow.faculty === "") {
			FACULTIES.forEach((faculty) => {
				const fid = faculty.id;
				dataSheet.setCell(currentRows[fid], faculty.sheetDataColumn, formatDateTime(dataRow.time).replace(" ", "_"));
				dataSheet.setCell(currentRows[fid], faculty.sheetDataColumn+1, "");
				dataSheet.setCell(currentRows[fid], faculty.sheetDataColumn+2, "Сова отнесла баллы");
				dataSheet.setCell(currentRows[fid], faculty.sheetDataColumn+3, "**Выгрузка**");
				currentRows[fid] += 1;
			});
		} else {
			const fid = dataRow.faculty;
			const fcol = FACULTIES.find(faculty => (faculty.id === fid)).sheetDataColumn;
			dataSheet.setCell(currentRows[fid], fcol, formatDateTime(dataRow.time).replace(" ", "_"));
			dataSheet.setCell(currentRows[fid], fcol+1, dataRow.amount);
			dataSheet.setCell(currentRows[fid], fcol+2, "баллов");
			dataSheet.setCell(currentRows[fid], fcol+3, dataRow.description);
			currentRows[fid] += 1;
		}
	});

	return [uName, ...dataSheet.Data];
}