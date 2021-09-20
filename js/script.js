document.addEventListener('DOMContentLoaded', ()=>{
    let daysWrapper = document.querySelector('.days');
    let content = document.querySelector('.content');
    let monthTitle = document.querySelector('.month');
    let selectStartDay = document.querySelector('.startDay');
    let selectEndDay = document.querySelector('.endDay');
    let eventItem = document.querySelectorAll('.event');
    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let currentDate = date.getDate();
    let fullMonthDays =  getDaysInMonth(currentMonth,currentYear);

    // формирование календаря
    let monthList = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]
    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth()  === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
      }


      fullMonthDays.forEach(item=>{
          let element = document.createElement('div');
          element.classList.add('day')
          element.textContent = item.getDate();
          daysWrapper.appendChild(element);

          if(element.textContent == currentDate){
            //   element.classList.add('active')
          }
      })

  

      for(let i = 0; i < monthList.length; i++){
          monthTitle.textContent = monthList[currentMonth];
      }

  


 
  

    //   Позиция элемента исходя из даты начала и окончания активности

  

    // Получение дат и вычисление их позиции
    let obj = [];
    let obj2 = [];
    async function positionDay(){
        let days = document.querySelectorAll('.day');
        let eventTitle = document.querySelectorAll('.event_title');
    
        for(let i = 0; i < days.length; i++){
            var day = new Object({
                content: days[i].textContent,
                positionStart: days[i].getBoundingClientRect().x,
            });
            obj.push(day);
        }
      

       
        for(let b = 0; b < 31; b++){
         let dataStart = eventItem[b].dataset.start.split('-');
         let dataEnd = eventItem[b].dataset.end.split('-')
            a = parseInt(dataStart[2]); //дата начала
            i = parseInt(dataEnd[2]); // дата окончания
            c = parseInt(obj[dataStart[2]].content) - 1;  // числа календаря

            // вычисление начальной позиции элемента и его ширины
            // eventItem[b].classList.add('active')
            eventItem[b].style.left = obj[c].positionStart -560 + 'px';
            let elWidth = obj[dataEnd[2]].positionStart -  obj[c].positionStart;
            eventItem[b].style.width = elWidth + 20 + 'px';      

        //    раположение элемента относительно высоты задач расположенных слева
            eventItem[b].style.top = eventTitle[b].getBoundingClientRect().y - 105 + 'px';           
        }
    }
    positionDay()

    let dragLink = document.querySelectorAll('.event');
    let addWidth = document.querySelectorAll('.width_el');
    let calendar = document.querySelector('.calendar');
    // перетаскивание 
    dragLink.forEach(item=>{
        item.onmousedown = function(event){
            item.style.position = 'absolute';
            item.style.zIndex = 1000;
            calendar.append(item);
            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                item.style.left = pageX - item.offsetWidth / 2 + 'px';
                item.style.top = pageY - item.offsetHeight / 2 + 'px';
                item.classList.add('drop');
                item.classList.add('active_event')
              }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            calendar.addEventListener('mousemove', onMouseMove);

            item.onmouseup = function() {
                calendar.removeEventListener('mousemove', onMouseMove);
                item.onmouseup = null;
                item.classList.remove('active_event')
              };
            item.ondragstart = function() {
                return false;
              };
        }
    })
    // Увеличение ширины
    addWidth.forEach((item,id)=>{
        item.onmousedown = function(event){
            addWidth(item,id)
        }
        function addWidth(id){
            for(let i = 0; i < dragLink.length; i++){
                
                // console.log(item)
            }
        }
    })
})

