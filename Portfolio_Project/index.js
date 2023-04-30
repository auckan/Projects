"use strict";

//NAVIGATION BAR

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

/******************************* GET AND POST *******************************/

const API_KEY = "88AVq_-zcZU-R3xT9pVSo2rx6EgBk1GpRAdsHpfFy1H5ec27itxzJlUlsuE";
const SPREADSHEET_ID = "1gNeOFGaHdYSqHn0y14e7GQQty8UEx2jAKvS6_D88a6s";
const TAB_NAME = "Experience2";
const url = new URL(`https://api.sheetson.com/v2/sheets/${TAB_NAME}`);

const params = {
  apiKey: API_KEY,
  spreadsheetId: SPREADSHEET_ID,
};

Object.keys(params).forEach((key) =>
  url.searchParams.append(key, encodeURIComponent(params[key]))
);

/****************** READ DATA - GET REQUEST *********************/

const getData = () => {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "X-Spreadsheet-Id": SPREADSHEET_ID,
    },
  })
    .then((r) => r.json())
    .then((response) => {
      const workArray = response.results;
      console.log(workArray);

      for (const experience of workArray) {
        const expUl = document.getElementById("my-work-exp");
        const li = document.createElement("li");
        expUl.appendChild(li);
        li.setAttribute("id", "experience");

        const p1 = document.createElement("p");
        li.appendChild(p1);
        p1.innerText = `${experience.company}`;
        p1.setAttribute("id", "companyName");

        const p2 = document.createElement("p");
        li.appendChild(p2);
        p2.innerText = ` ${experience.position}`;
        p2.setAttribute("id", "position");

        const p3 = document.createElement("p");
        li.appendChild(p3);
        p3.innerText = `${experience.startdate} - ${experience.enddate} `;
        p3.setAttribute("id", "date");
      }
    });
};

getData();

/************************** SEND DATA - POST REQUEST ***************************/

document.getElementById("submit-button").onclick = function () {
  const companyInput = document.getElementById("new-comp-name").value;
  const positionInput = document.getElementById("new-position").value;
  const startDateInput = document.getElementById("new-start-date").value;
  const endDataInput = document.getElementById("new-end-date").value;

  const expUl = document.getElementById("my-work-exp");
  const li = document.createElement("li");
  expUl.appendChild(li);
  li.setAttribute("id", "experience");

  const p1 = document.createElement("p");
  li.appendChild(p1);
  p1.innerText = `Company: ${companyInput}`;
  p1.setAttribute("id", "companyName");

  const p2 = document.createElement("p");
  li.appendChild(p2);
  p2.innerText = `Position: ${positionInput}`;
  p2.setAttribute("id", "position");

  const p3 = document.createElement("p");
  li.appendChild(p3);
  p3.innerText = `${startDateInput} - ${endDataInput} `;
  p3.setAttribute("id", "date");

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "X-Spreadsheet-Id": SPREADSHEET_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company: companyInput,
      position: positionInput,
      startdate: startDateInput,
      enddate: endDataInput,
    }),
  })
    .then((r) => r.json())
    .then((response) => {
      console.log(response);
    });
};

//   function createExperienceList(arr) {
//     for (let experience in myObject) {
//       const companyName = myObject[experience].company;
//       const position = myObject[experience].position;
//       const startDate = myObject[experience].start;
//       const endDate = myObject[experience].end;

//       const expUl = document.getElementById("my-work-exp");

//       const li = document.createElement("li");
//       // const header = document.createElement("H3");
//       expUl.appendChild(li);
//       // li.appendChild(header);
//       li.setAttribute("id", experience);

//       const p1 = document.createElement("p");
//       li.appendChild(p1);
//       p1.innerText = `${companyName}`;
//       p1.setAttribute("id", "companyName");

//       const p2 = document.createElement("p");
//       li.appendChild(p2);
//       p2.innerText = `${position}`;
//       p2.setAttribute("id", "position");

//       const p3 = document.createElement("p");
//       li.appendChild(p3);
//       p3.innerText = `${startDate} - ${endDate} `;
//       p3.setAttribute("id", "date");
//     }
//   }

//   createExperienceList(workArray);
// });

// function resolveArray(data) {
//   data.then((resolvedValue) => {
//     const resultsArray = resolvedValue.results;
//     return resultsArray;
//   });
// }

// function resolveArray(data) {
//   return new Promise((resolve, reject) => {
//     data
//       .then((resolvedValue) => {
//         const resultsArray = resolvedValue.results;
//         resolve(resultsArray);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

// const newData = resolveArray(sheetData);
// console.log(newData);

// function createExperienceList(myObject) {
//   for (let exp in myObject) {
//     const compName = myObject[book].comp_name;
//     const position = myObject[book].position;
//     const startDate = myObject[book].start;
//     const endDate = myObject[book].end;

//     console.log(compName);

//     // const li = document.createElement("li");
//     // const header = document.createElement("H3");
//     // bookUl.appendChild(li);
//     // li.appendChild(header);
//     // li.setAttribute("id", book);
//     // header.textContent = title;

//     // const p1 = document.createElement("p");
//     // li.appendChild(p1);
//     // p1.innerText = `Language: ${language}`;
//     // p1.setAttribute("id", "language");

//     // const p2 = document.createElement("p");
//     // li.appendChild(p2);
//     // p2.innerText = ` Author: ${author}`;
//     // p2.setAttribute("id", "author");
//   }
// }

// console.log(createExperienceList(sheetData));
