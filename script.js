let CurrDate = new Date();
// console.log(CurrDate)

let Currday = CurrDate.getDay()
// console.log(Currday)


// function to get the day from the number 
const dayString = (Currday) =>{
    const days = {
        1: 'Sun',
        2: 'Mon',
        3: 'Tue',
        4: 'Wed',
        5: 'Thur',
        6: 'Fri',
        7: 'Sat'
    };

    for( const key in days) 
        if(key == Currday ){
        //    console.log(days[key])
        return days[key]
        }
    

}

let day = dayString((Currday+1))
// console.log(day)


let date = CurrDate.getDate();
// console.log(date)

let monthNumber = CurrDate.getMonth();
console.log(`month ${monthNumber}`)

const findMonth = (monthNumber) =>{
    const months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };

    for(let key in months){
        if(key == monthNumber){
            return months[key]
        }
    }
}

let month = findMonth((monthNumber));
// console.log(`month is ${month}`)


let year = CurrDate.getFullYear();
// console.log(year)


let hours = CurrDate.getHours();
// console.log(hours)

let hours12 = (hours) =>{
    let minute =  CurrDate.getMinutes(); ;
    if(hours > 12){
        hours = hours - 12
         

        return `${hours}:${minute} PM`
    }
    else{
        return `${hours}:${minute} AM`
    }
}

let HoursString = hours12(hours);






let dateTime = document.getElementById("DateTime");

dateTime.innerHTML = `${day} | ${month} ${year} | <span class="time">${HoursString}</span> `