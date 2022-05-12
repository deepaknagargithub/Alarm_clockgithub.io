const display = document.getElementById('clock');

const myList = document.querySelector('#myList');

const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];

// this function used to show current time

function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    let ampm = hour >= 12 ? 'PM' : 'AM';
    const now = `${hour}:${minutes}:${seconds}:${ampm}`;

    display.innerText =`${hour}:${minutes}:${seconds}:${ampm}`;

    if(alarmList.includes(now) ){
        alert('Alarm Time')
    } 

}

// this function used to add zero in single digit input

function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

// this addeventlistener used to delete alarmlist

myList.addEventListener('click', e=> {
    console.log(e.target.classList)
 
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }

})

// this function is used to delete Element from Array(alarmList)

function remove(value) {

    let newList = alarmList.filter(function(time){
        if(time===value) {
            return false
        }else{
            return true
        }
    });
    console.log(newList)

    alarmList.length = 0;

    console.log(alarmList)

    alarmList.push.apply(alarmList, newList);

    console.log(alarmList, newList)

  
}

// this function is used to show alarmlist

function alarm_List(newAlarm){

    const html =`
    <li class = "time-list">        
        <span  class="btn btn-primary" id='js'>${newAlarm}</span>
        <button class="deleteAlarm"  id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button> 
    </li>`
    myList.innerHTML += html

};



// this eventlistener used to sumbmit alarm...

addAlarm.addEventListener('submit', e=> {


// take value from input forms

    e.preventDefault();
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=formatTime(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=formatTime(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
    let ampm = new_h >= 12 ? 'PM' : 'AM';
    
    
    const newAlarm = `${new_h}:${new_m}:${new_s}:${ampm}`
    console.log(typeof(newAlarm))


// this condition used to add newalarm tp alarmList

    if(isNaN(newAlarm)){

        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            alarm_List(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{

        alert("Invalid Time Entered")
    }

})

setInterval(updateTime, 1000)