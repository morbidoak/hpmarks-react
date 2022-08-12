class Sheet {
	constructor() {
		this.Data = [];
	}

    getCell(row, col) {
        if (this.Data.length >= row) return this.Data[row-1][col-1];
        else return "";
    }

    setCell(row, col, val) {
        for (let i=this.Data.length; i<row; i++) this.Data[i] = [];
        this.Data[row-1][col-1] = val;
    }
}

export default Sheet;