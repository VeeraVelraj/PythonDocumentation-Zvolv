window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    fetch(
      "https://app.zvolv.com/rest/v17/lite/submissions?pagination=%7B%22limit%22%3A150%2C%22offset%22%3A0%7D&filter=%5B%7B%22operator%22%3A%22%3D%22%2C%22value%22%3A181445%2C%22column%22%3A%22FormID%22%7D%5D",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": " application/json",
          jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLnp2b2x2LmNvbVwvcmVzdCIsImlhdCI6MTY3NDU2NDU2OCwibmJmIjoxNjc0NTY0NTY4LCJleHAiOjE2NzUxNjkzNjgsInVzZXJpZCI6MSwib3JnenZpY2VpZCI6MzAwMDI3OTA4NCwiZW1haWxpZCI6InZlZXJha3VtYXJ2ZWxyYWpAZ21haWwuY29tIn0.KQS0DDLVNGGDmP-6W-9uRNIaM2iewY06xex_gDVFza4",
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
        functionOutput(res.data.elements);
        functionTitle(res.data.elements);
      })
      .catch((err) => console.log(err));
  });
  