let chart;
const  userNames = [
  {name: 'Laura Ortego'},
  {name: 'Bryan Sherlin'},
  {name: 'Anna Rogers'},
  {name: 'Howard Coates'}
]
let notificationSwitch = document.getElementById('notifications-switch');
let publicSwitch = document.getElementById('public-switch');
let timeZone = document.getElementById('time-zone');

//functions to save and clear settings in local storage
function checkLocalStorage(){
  if(localStorage.getItem('notification-switch') == 'true'){
    notificationSwitch.click();
  }
  if(localStorage.getItem('public-switch') == 'true'){
    publicSwitch.click();
  }
  timeZone.value = localStorage.getItem('time-zone-input');
}

checkLocalStorage();

document.getElementById('save-button').addEventListener('click', function(){
 if(notificationSwitch.checked) {
   localStorage.setItem('notification-switch', 'true')
 }
 if(publicSwitch.checked) {
  localStorage.setItem('public-switch', 'true')
 }
  localStorage.setItem('time-zone-input', timeZone.value)
});

document.getElementById("cancel-button").addEventListener('click', function() {
  localStorage.clear();
});

//search variables and functions for user search bar
const searchInput = document.querySelector('.search-input');
const suggestionsPanel = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', function() {
  const input = searchInput.value;
  suggestionsPanel.innerHTML = '';
  const suggestions = userNames.filter(function(name) {
    return name.name.toLowerCase().startsWith(input);
  });
  suggestions.forEach(function(suggested) {
    const div = document.createElement('div');
    div.innerHTML = suggested.name;
    suggestionsPanel.appendChild(div);
    div.addEventListener('click', function(event){
      document.getElementById("user-search-bar").value = event.target.value;
    });
  });
  if (input === '') {
    suggestionsPanel.innerHTML = '';  
  }
})

//function to resize graphs
function resizeCanvas() {
    let canvases = document.getElementsByTagName('canvas');
    let heightRatio = 1;
    for(i = 0; i < canvases.length; i++){
    canvases[i].height = canvases[i].width * heightRatio;
    }
}

//function to validate message form
function validateForm() {
  let userName = document.forms["messageForm"]["userName"].value;
  let messageArea = document.forms["messageForm"]["messageArea"].value;


  if(userName == "" || messageArea == "") {
    alert("Please enter a valid user name and message.");
  } else {
    alert("Your message has been sent!");
  }
}

document.getElementById("bell-icon").addEventListener("click", function(){
  let notification1 = document.createElement("DIV");
  let notification2 = document.createElement("DIV");

  notification1.className = "alert";
  notification2.className = "alert";

  notification1.innerHTML = `Alert! You have unread messages
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>`;

  notification2.innerHTML = `Alert! You have 4 new users in your network!
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>`;

  document.getElementById('dashboard').insertBefore(notification1, document.getElementById('line-chart-heading'));
  document.getElementById('dashboard').insertBefore(notification2, document.getElementById('line-chart-heading'));
});

//function to change line graph from hourly to daily to monthly to weekly
document.getElementById('graph-options').addEventListener('click', (event) => {
  let labels;
  let data;

  if(event.target.innerHTML == "Weekly"){
    labels =  ['16-22','23-29','30-5','6-12','13-19','20-26','27-3','4-10','11-17','18-24','25-31'];
    data = [750,1250,1000,1500,2000,1500,1750,1250,1750,2250,1750,2250];
  } else if(event.target.innerHTML == "Hourly") {
    labels =  ['1-3','4-6','7-10','11-2','2-5','6-9','10-12'];
    data = [8,11,14,16,20,27,22];
  } else if(event.target.innerHTML =="Daily") {
    labels =  ['1','2','3','4','5','6','7'];
    data = [89,111,143,167,200,276,224];
  } else if(event.target.innerHTML == "Monthly") {
    labels =  ['1','2','3','4'];
    data = [1250,1750,2250,1750];
  }

new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{ 
          data: data,
          label: "Traffic",
          lineTension: 0,
          borderColor: "#3e95cd",
          backgroundColor: "rgba(62, 149, 205, 0.3)"
        }
      ]
    },
    options: {
      legend: { 
        display: false
        },
      title: {
        display: false,
        text: 'Traffic Chart'
      }
    }
  });
});

//call to resize canvas function
window.addEventListener('resize',resizeCanvas());

//default charts
new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: ['16-22','23-29','30-5','6-12','13-19','20-26','27-3','4-10','11-17','18-24','25-31'],
      datasets: [{ 
          data: [750,1250,1000,1500,2000,1500,1750,1250,1750,2250,1750,2250],
          label: "Traffic",
          lineTension: 0,
          borderColor: "#3e95cd",
          backgroundColor: "rgba(62, 149, 205, 0.3)"
        }
      ]
    },
    options: {
      legend: { 
        display: false
        },
      title: {
        display: false,
        text: 'Traffic Chart'
      }
    }
  });

  new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ['S','M','T','W','T','F','S'],
      datasets: [
        {
          label: "Visitors",
          backgroundColor: ["#3e95cd", "#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd"],
          data: [50,75,150,100,200,185,125]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: false,
        text: 'Daily Traffic'
      }
    }
});

new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: ["Phones","Tablets","Desktop"],
      datasets: [{
        label: "Users By Device",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
        data: [68,12,20]
      }]
    },
    options: {
      legend:{
          position: 'right',
          labels: {
            lineWidth: 5
        }
      },
      title: {
        display: false,
        text: 'Users By Device'
      }
    }
});

  