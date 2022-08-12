const NameInput = ({uName, nameChangeHandler}) => (
    <input type="text" className="widefield" name="uName" value={uName} onChange={nameChangeHandler} placeholder="введите имя" />
);

export default NameInput;