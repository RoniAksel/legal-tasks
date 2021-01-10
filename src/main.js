document.getElementById('missionInputForm').addEventListener('submit', saveMission);

function saveMission(e){
    let missionFile = parseInt (document.getElementById('missionFileInput').value);
    let missionTitle = document.getElementById ('missionTitleInput').value;
    let missionDesc = document.getElementById ('missionDescInput').value;
    let missionPrio = document.getElementById ('missionPrioInput').value;
    let missionAss = document.getElementById ('missionAssInput').value;
    let missionId = chance.guid();
    let missionStatus = '<p class="openBtn">Open</p>';

    if (missionFile != Number){
        console.log ('not a number');
    } 
    
    let mission = {
        id : missionId,
        fileN:  missionFile,
        title: missionTitle,
        desc : missionDesc,
        priority : missionPrio,
        assingedTo : missionAss,
        status : missionStatus
    }

if (localStorage.getItem('missions') == null ){
    let missions = [];
    missions.push(mission);
    localStorage.setItem('missions', JSON.stringify(missions));
} else{
    let missions = JSON.parse (localStorage.getItem ('missions'));
    missions.push (mission);
    localStorage.setItem('missions', JSON.stringify (missions));
}

document.getElementById ('missionInputForm').reset ();

fetchMissions();

e.preventDefault();

}


function setStatusClosed(id) {
    let missions = JSON.parse(localStorage.getItem('missions'));
  
    for (var i = 0; i < missions.length; i++) {
      if (missions[i].id == id) {
        missions[i].status = '<p class="closedBtn">Closed</p>';
      }
    }
  
    localStorage.setItem('missions', JSON.stringify(missions));
  
    fetchMissions();
  }
  
  function setDeleteMission(id) {
    let missions = JSON.parse(localStorage.getItem('missions'));
  
    for (var i = 0; i < missions.length; i++) {
      if (missions[i].id == id) {
        missions.splice(i, 1);
      }
    }
  
    localStorage.setItem('missions', JSON.stringify(missions));
  
    fetchMissions();
  }

function fetchMissions(){
    let missions = JSON.parse (localStorage.getItem ('missions'));
    let missionList = document.getElementById ('missionList');

    missionList.innerHTML = '';

    for (let i = 0; i < missions.length; i++){
        let id = missions[i].id;
        let fileN = missions[i].fileN;
        let title = missions[i].title;
        let desc = missions[i].desc;
        let priority = missions[i].priority;
        let assingedTo = missions[i].assingedTo;
        let status = missions[i].status;


        missionList.innerHTML+= '<br>' + 
                                '<div class = "container">' +
                                '<div class ="card" id = "container__mission">' +
                                '<div class = "card-header">' +
                                '<h3>' + title + '</h3>' +
                                '<p><span>' + status + '</span></p>' +
                                '<h6 class = "idMission" > Issue ID: ' + id + '</h6>' +
                                '</div>' +
                                '<p>' + desc + '</p>' +
                                `<p><span><span class = "fileNumberBold">${fileN}</span> </span></p>` +
                                '<p><span>' + priority + '</span></p>' +
                                '<p><span>' + assingedTo + '</span></p>' +
                                '<div>' +
                                '<a href = "#" class="btn btn-primary" id = "btn_cldl" onclick ="setStatusClosed(\''+id+'\')">Close</a>' + '<a href = "#" class="btn btn-danger"  id = "btn_cldl" onclick ="setDeleteMission(\''+id+'\')">Delete</a>' +
                                '</div>' +
                                '</div>' +
                                '</div>'

                                

    }
}
