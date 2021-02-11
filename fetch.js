let userArray = [];
let totalPage;

function fetchData(i) {
  url = `https://api.instantwebtools.net/v1/passenger?page=${i}&size=20`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      userArray = data;
      totalPage = userArray.totalPages;
      insertRecord();
      if (i == totalPage) {
        i = i - 1;
        onButton(i, "last");
      } else {
        onButton(i);
      }
    });
}
fetchData(1);

function insertRecord() {
  $("tbody").empty();
  let tr = "";
  for (let i = 0; i < userArray.data.length; i++) {
    tr += `<tr>
        <td>${userArray.data[i]._id}</td>
        <td>${userArray.data[i].name}</td>
        <td>${userArray.data[i].trips}</td>
        <td>${userArray.data[i].airline.country}</td>
        <td>${userArray.data[i].airline.established}</td>
        <td>${userArray.data[i].airline.head_quaters}</td>
        <td>${userArray.data[i].airline.id}</td>
        <td>${userArray.data[i].airline.logo}</td>
        <td>${userArray.data[i].airline.name}</td>
        <td>${userArray.data[i].airline.slogan}</td>
        <td>${userArray.data[i].airline.website}</td>
        <td>${userArray.data[i].__v}</td>
        <td>${userArray.data[i].name}</td>

        </tr>`;
  }
  $("tbody").append(tr);
}
function onButton(btnval, value) {
  $("#btn").empty();
  $("#btn").append(`<button  id="btn1" onclick="fetchData(1)">first</button>`);

  $("#btn").append(
    `<button id="btn2" onclick=previous('${value}')>previous</button>`
  );
  let Button = "";
  for (let i = btnval; i < btnval + 1; i++) {
    Button = `<button id="btn3" value="${i}" onclick="fetchData(${i})">${i}</button>  <button id="btn4" value="${
      i + 1
    }" onclick="fetchData(${i + 1})">${i + 1}</button> `;
  }
  $("#btn").append(Button);
  $("#btn").append(`<button id="btn5" onclick="next()">next</button>`);
  $("#btn").append(
    `<button id="btn6" onclick="fetchData(totalPage)">Last</button>`
  );

  if (btnval == 1) {
    $("#btn1").attr("disabled", "disabled");
    $("#btn2").attr("disabled", "disabled");
  }

  if (value == "last") {
    $("#btn5").attr("disabled", "disabled");
    $("#btn6").attr("disabled", "disabled");
  }
}
function next() {
  let btn3val = parseInt($("#btn4").val());
  fetchData(btn3val);
}
function previous(value) {
  let btn4val = parseInt($("#btn3").val());
  if (value != "last") {
    btn4val -= 1;
  }
  fetchData(btn4val);
}

