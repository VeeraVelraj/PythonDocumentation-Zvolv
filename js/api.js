window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  fetch(
    "https://app.zvolv.com/rest/v17/lite/submissions?pagination=%7B%22limit%22%3A150%2C%22offset%22%3A0%7D&filter=%5B%7B%22operator%22%3A%22%3D%22%2C%22value%22%3A181445%2C%22column%22%3A%22FormID%22%7D%5D",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": " application/json",
        jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLnp2b2x2LmNvbVwvcmVzdCIsImlhdCI6MTY3MDA4MTc3NiwibmJmIjoxNjcwMDgxNzc2LCJleHAiOjE2NzA2ODY1NzYsInVzZXJpZCI6MSwib3JnenZpY2VpZCI6MzAwMDI3OTA4NCwiZW1haWxpZCI6InZlZXJha3VtYXJ2ZWxyYWpAZ21haWwuY29tIn0.WQLBgn4ogdianRFKh3d1aAYexUUW8-t0SbxzkuRnBv4",
        businessDomain: "project_tracker",
        businessTagID: "98NCMBD2KBZ4R",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data.elements);
      functionName(res.data.elements);
      functionCode(res.data.elements);
      // functionDefinition(res.data.elements);
      // sampleCode(res.data.elements);
      // functionParameter(res.data.elements);
    })
    .catch((err) => console.log(err));
  
});


function functionName(data) {
  var mainContainer = document.getElementById("functionName1");
  for (var i = 0; i < data.length; i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href="#line" + (i+1);
    var div = document.createElement("div");
    var functionNameObject = data[i].inputs.find(
      (input) => input.label == "Function Name"
    );
    div.innerHTML = "" + functionNameObject.value;
    a.appendChild(div);

    li.appendChild(a);
    mainContainer.appendChild(li);
  }
}

//   function codeFile(data) {
//     var mainContainer = document.getElementById("codeFile");
//     for (var i = 0; i < data.length; i++) {
//       var div = document.createElement("div");
//       //   data[i].inputs.find((input)=>input.label=='Product Name');
//       var codeFileObject = data[i].inputs.find(
//         (input) => input.label == "Sample Code"
//       );
//       div.innerHTML = "" + codeFileObject.value;
//       mainContainer.appendChild(div);
//     }
//   }

//   function functionCode(data) {
//     var mainContainer = document.getElementById("functionCode");
//     for (var i = 0; i < data.length; i++) {
//       var div = document.createElement("div");
//       //   data[i].inputs.find((input)=>input.label=='Product Name');
//       var functionCodeObject = data[i].inputs.find(
//         (input) => input.label == "Function Code"
//       );
//       div.innerHTML = "" + functionCodeObject.value;
//       mainContainer.appendChild(div);
//     }
//   }

function functionCode(data) {
  console.log(data);
  var mainContainer = document.getElementById("functionCodeContainer");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.id="line" + (i+1);
    //   data[i].inputs.find((input)=>input.label=='Product Name');
    var functionCodeObject = data[i].inputs.find(
      (input) => input.label == "Function Code"
    );
    var functionDefinitionObject = data[i].inputs.find(
      (input) => input.label == "Function Definition"
    );
    var sampleCodeObject = data[i].inputs.find(
      (input) => input.label == "Example Code"
    );
    var functionParameterObject = data[i].inputs.find(
      (input) => input.label == "Parameter"
    );
    div.innerHTML = `<div class="row"><div class="col-md-12 left-align"><h2 class="dark-text">Function Definitation<hr/></h2></div></div><div class="intro2 clearfix"><p><i class="fa fa-python" id="functionCode">${functionCodeObject.value}</i></a></p></div><hr/><h4>Function Definition</h4><p id="functionDefinition">${functionDefinitionObject.value}</p><h4>Sample</h4><p id="sampleCode">${sampleCodeObject.value}</p>  <h4>Parameter</h4><p id="functionParameter">${functionParameterObject.value}</p><a href="#" target="_blank" class="btn btn-primary">View Sample Code</a><a href="#" class="btn btn-info">Ask a Question</a><hr />`
    
    // div.innerHTML = "" + functionCodeObject.value;
    mainContainer.appendChild(div);
  }
}

function functionDefinition(data) {
  var mainContainer = document.getElementById("functionDefinition");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    //   data[i].inputs.find((input)=>input.label=='Product Name');
    var functionDefinitionObject = data[i].inputs.find(
      (input) => input.label == "Function Definition"
    );
    div.innerHTML = "" + functionDefinitionObject.value;
    mainContainer.appendChild(div);
  }
}

function sampleCode(data) {
  var mainContainer = document.getElementById("sampleCode");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    //   data[i].inputs.find((input)=>input.label=='Product Name');
    var sampleCodeObject = data[i].inputs.find(
      (input) => input.label == "Example Code"
    );
    div.innerHTML = "" + sampleCodeObject.value;
    mainContainer.appendChild(div);
  }
}

function functionParameter(data) {
  var mainContainer = document.getElementById("functionParameter");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    //   data[i].inputs.find((input)=>input.label=='Product Name');
    var functionParameterObject = data[i].inputs.find(
      (input) => input.label == "Parameter"
    );
    div.innerHTML = "" + functionParameterObject.value;
    mainContainer.appendChild(div);
  }
}



