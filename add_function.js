async function addFunction() {
  var functionDetails = [];
  console.log("DOM fully loaded and parsed");
  const form = document.getElementById("form");
  const responseContainer = document.getElementById("response");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const key1 = document.getElementById("key1").value;
    const key2 = document.getElementById("key2").value;
    const key3 = document.getElementById("key3").value;
    const key4 = document.getElementById("key4").value;
    const key5 = document.getElementById("key5").value;
    const key6 = document.getElementById("key6").value;
    const key7 = document.getElementById("key7").value;

    // {
    //   ("FormData");
    //   {
    //     ("type");
    //     "KEY_LABELS", "data";
    //     {
    //       ("Title");
    //       key1;
    //     }
    //   }
    // }

    const data = {
      76473: key1,
      76474: key2,
      76475: key3,
      76476: key4,
      76477: key5,
      76478: key6,
      76479: key7,
      76780: null,
      OverrideMetaData: false,
    };

    await fetch(
      `https://app.zvolv.com/rest/v17/98NCMBD2KBZ4R/forms/181445/submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLnp2b2x2LmNvbVwvcmVzdCIsImlhdCI6MTY3NjIwODI3NSwibmJmIjoxNjc2MjA4Mjc1LCJleHAiOjE2NzY4MTMwNzUsInVzZXJpZCI6MSwib3JnenZpY2VpZCI6MzAwMDI3OTA4NCwiZW1haWxpZCI6InZlZXJha3VtYXJ2ZWxyYWpAZ21haWwuY29tIn0.P2X6O_-gJIAzi7rZXbGA9sqr-Tam5NX5l0V0dNGzSdM",
          businessDomain: "project_tracker",
          businessTagID: "98NCMBD2KBZ4R",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        responseContainer.innerHTML =
          "Data has been successfully pushed to the database: ";
      })
      .catch((error) => {
        responseContainer.innerHTML =
          "An error occurred while pushing data to the database: " + error;
      });
  });
}
