async function addFunction(id) {
    console.log("DOM fully loaded and parsed");
  const key1 = document.getElementById("key1").value;
  const key2 = document.getElementById("key2").value;
  const key3 = document.getElementById("key3").value;
  const key4 = document.getElementById("key4").value;
  const key5 = document.getElementById("key5").value;
  const key6 = document.getElementById("key6").value;
  const key7 = document.getElementById("key7").value;
  var data = {
    FormData: {
      type: "KEY_LABELS",
      data: {
        "Title": key1,
        "Function Name": key2,
        "Function Code": key3,
      },
    },
  };
  await fetch(
    `http://app.zvolv.com/rest/v17/449VZ2DY54AF3/forms/181445/submissions/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLnp2b2x2LmNvbVwvcmVzdCIsImlhdCI6MTY3NTMzMTY2OSwibmJmIjoxNjc1MzMxNjY5LCJleHAiOjE2NzU5MzY0NjksInVzZXJpZCI6MSwib3JnenZpY2VpZCI6MzAwMDI3OTA4NCwiZW1haWxpZCI6InZlZXJha3VtYXJ2ZWxyYWpAZ21haWwuY29tIn0.rkvD5du5k2MDM6jlgn7DjbLG2ujKd7yuLVpaYcV24LI",
        businessDomain: "project_tracker",
        businessTagID: "98NCMBD2KBZ4R",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => {
      console.error("Error:", error);
    });
}
