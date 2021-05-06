const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

  //객체.addEventListener(특정반응, 함수) = 반응이 있으면 함수 실행
  //localStorage.setItem(이름, 값)  로컬 스토리지에 이름과 값을 저장함.. JSON 이용
  //document.createElement("만들 HTML") html 만들고, 만들 HTML.innerHTML 로 값 써주고
  //li.appendChild() 로 영역에 담고 id 특정하여 appendChild()로 담기

const TODOS_LS = 'toDos';

let toDos = [];

function filterFn(toDo)
{
  return toDo.id === 1;
}

function deleteToDo(event)
{
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li); //li 지우기
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  }); //toDos 에서 id 같은 것 지우기

  toDos = cleanToDos;
  saveToDos();

}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //로컬에 저장
}

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button")
  const span = document.createElement("span");

  const newId = toDos.length + 1;
  delBtn.innerHTML = "✔️";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;

  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li); //문자열 만들어서

  const toDoObj={
    text : text,
    id : newId
  }
  toDos.push(toDoObj);
  saveToDos(); //로컬에 저장
}

function handleSubmit(event){
  event.preventDefault(); //인풋 기다리기
  const currentValue = toDoInput.value;
  paintToDo(currentValue); //로컬에 추가시키기
  toDoInput.value = "";
}

function loadToDos(){
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if(loadedtoDos !== null)
  {
    //console.log(loadedtoDos);
    const parsedToDos = JSON.parse(loadedtoDos);
    //console.log(parsedToDos);
    parsedToDos.forEach(function(toDo)
    {
      paintToDo(toDo.text); //로컬에 저장시켰던 것들 다시 로컬에 추가시키며 띄우기
    });
  }

}
function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}

init();
