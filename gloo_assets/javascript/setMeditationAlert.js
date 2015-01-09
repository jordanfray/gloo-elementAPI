          //time picker script
   var setMeditationAlert = function(){ 
        var user = getUserObject();
        var userData = elementAPI.userData();
        var alertInstructions = 'It can be hard to remember these kinds of things. Click the button below to set up reminders for yourself.';
        // append timepicker HTML to DOM
        $('#setAlert').append('<p><span id="alertInstructions" style="display: none">' + alertInstructions + '</span></p><button id="setAlertBtn" class="btn full-width" style="display: none"><i class="fa fa-table"></i>&nbsp <span id="btnText">Click Here to Set a Reminder</span></button><div class="modal"> <div class="align-center"> <h3>Set a Reminder</h3> <div id="reminder-settings"> <div id="timePickerMenu"> <div class="full-width"> <table class="dropdown"> <tr id="setTimeStart"> <th colspan="3">Touch to Set a Time</th> </tr><tr class="timepicker"> <th id="hour">hr</th> <th id="minute">min</th> <th id="ampm">am/pm</th> </tr><tr> <td id="hour-1" class="hour">1</td><td id="minute-00" class="minute">00</td><td id="ampm-am" class="ampm">am</td></tr><tr> <td id="hour-2" class="hour">2</td><td id="minute-15" class="minute">15</td><td id="ampm-pm" class="ampm">pm</td></tr><tr> <td id="hour-3" class="hour">3</td><td id="minute-30" class="minute">30</td><td class="close"></td></tr><tr> <td id="hour-4" class="hour">4</td><td id="minute-45" class="minute">45</td><td class="close"></td></tr><tr> <td id="hour-5" class="hour">5</td><td class="close"></td><td class="close"></td></tr><tr> <td id="hour-6" class="hour">6</td><td class="close"></td><td class="close"></td></tr><tr> <td id="hour-7" class="hour">7</td><td class="close"></td><td class="close"></td></tr><tr> <td id="hour-8" class="hour">8</td><td class="close"></td><td class="close"></td></tr><tr> <td id="hour-9" class="hour">9</td><td class="close"></td><td class="close"></td></tr><tr> <td id="hour-10" class="hour">10</td><td class="close"></td><td class="close"></td></tr><tr> <td id="hour-11" class="hour">11</td><td class="close"></td><td class="close"></td></tr><tr> <td id="hour-12" class="hour">12</td><td class="close"></td><td class="close"></td></tr></table> </div></div><div class="content-container" id="instructions"> <p>Set up reminders so that you will be notified with a push notification to stay the course and complete your lessons.</p><div id="set-reminder"><button class="btn full-width align-center">Set Reminder for <span id="hourPrint"></span>:<span id="minutePrint"></span> <span id="ampmPrint"></span></button></div><div><input type="button" id="modalClose" class="btn" value="No Thanks"> <input type="checkbox" id="optOut"><small>Don\'t Remind me Again</small></div></div></div><div id="showAfter"> </div></div>');


        var nowUnformat = new Date();
           var now = nowUnformat.getMonth() + '-' + nowUnformat.getDate() + '-' + nowUnformat.getFullYear();
           console.log(now)
           var startDate = elementAPI.userData().getValue('meditationStartDate');
           var showModal = elementAPI.userData().getValue('showDateModal') || true;
           
           
          if(showModal === true || showModal === 'true'){
               $('#setAlertBtn').show();
               $('#alertInstructions').show();
               $(document).on('click', '#setAlertBtn', function(e){
                    $('.modal').toggle();
                    if($('#setAlertBtn').hasClass('alertSetShow')) {
                        $(document).scrollTop( $("#setAlertBtn").offset().top);
                        $('#setAlertBtn').removeClass('alertSetShow');
                       $('#btnText').text('Click Here to Set a Reminder');
                    } else {
                        $(document).scrollTop( $("#reminder-settings").offset().top);
                       $('#setAlertBtn').addClass('alertSetShow'); 
                       $('#btnText').text('Set your reminder:');
                    }
                      
               });
          
               
               if(!startDate) userData.setValue('meditationStartDate', now);
               
               $(document).on('click', '#modalClose', function(e){
                    e.preventDefault();
                   var optOut = $('#optOut').is(':checked');
                  if(optOut){
                      elementAPI.userData().setValue('showDateModal', false);
                      $('.modal').slideUp();
                      $('#setAlertBtn').hide();
                      $('#alertInstructions').hide();
                      $('#setAlert').hide();
                      
                  } else {
                      $('.modal').slideUp();
                       elementAPI.userData().setValue('showDateModal', true);
                       $('#setAlertBtn').removeClass('alertSetShow');
                       $('#btnText').text('Click Here to Set a Reminder');
                  }
               });
               
           } else {
               startDate = userData.getValue('meditationStartDate');
               $('#setAlert').hide();
           } 
           
           
//            $('a').hide();
           
           var db = elementAPI.userData();
           var reminderHour;
           var reminderMin; 
           var reminderAmPm; 
           
           // Drop Down Menu Code
           var timeMenuClicked = false;
           var hourSelected = false;
           var minuteSelected = false;
           var ampmSelected = false;
           
           $("table").on('click', '#setTimeStart, .timepicker, .close', function(e){
               $("#setTimeStart").hide();

               if ( timeMenuClicked === false ) {
                   $(".timepicker").show();
                   $("td").show();
                   $("body, html").css("background-color", "#38b3ce");
                   $("#instructions").hide();
                   timeMenuClicked = true;
                   hourSelected = false;
                   minuteSelected = false;
                   ampmSelected = false;
               } else {
                   $("td").hide();
                   $("body, html").css("background-color", "#ffffff");
                   $("#instructions").show();
                   timeMenuClicked = false;
               }
           });
           
           $(document).on('click', 'table td', function() {
               var id = $(this).attr('id');
               var type = id.split('-')[0];
               var value = id.split('-')[1];
               
               if ( type === "hour" ) {
                   $(".hour").css("font-weight", "100");
                   $("#" + id).css("font-weight", "900");
                   $("#hour").text(value);
                   $("#hourPrint").text(value);
                  
                   hourSelected = true;
                   reminderHour = value;
               } else if ( type === "minute" ) {
                   $(".minute").css("font-weight", "100");
                   $("#" + id).css("font-weight", "900");
                   $("#minute").text(value);
                   $("#minutePrint").text(value);
                 
                   minuteSelected = true;
                   reminderMin = value; 
               } else if ( type === "ampm" ) {
                   $(".ampm").css("font-weight", "100");
                   $("#" + id).css("font-weight", "900");
                   $("#ampm").text(value);
                   $("#ampmPrint").text(value);
                 
                   ampmSelected = true;
                   reminderAmPm = value;
               };

               if( hourSelected === true && minuteSelected === true && ampmSelected === true ) {
                   $("td").hide();
                   $("body, html").css("background-color", "#ffffff");
                   $("#instructions").show();
                   $("#set-reminder").show();
                   timeMenuClicked = false;
               };
           });
           
           // Set Reminder Code
           var reminderDuration; //Number of days the user will recieve the push notifcation
           var reminderMessage = "It's time for your daily meditation.";
           var reminderFrequency = 1;
           
           //  months categorized by days in each         
           var thirtyOne = [0,2,4,6,7,9,11];
           var thirty = [3,5,8,10];
           var twentyEight = [1];
           
           //  if start date and present date are the same, duration remains at 30 days          
           
           if(now >= startDate){
              if(now === startDate){
                          console.log('same date')
                           reminderDuration = 30;
                       } else {
                           var nowSplit = now.split('-');
                           var startSplit = startDate.split('-');
                       //  if it is not the same, find the difference and adjust duration accordingly              
                           if(nowSplit[2] === startSplit[2] && nowSplit[0] === startSplit[0]){
                            console.log('same month and year')
                       // if year and month are the same, duration is todays date less the start date                    
                               reminderDuration = 30 - ((+nowSplit[1])- (+startSplit[1]));
                               
                           } else {
                              console.log('not the same month. month is: ', startSplit[0])
                       //  if year is the same, find the difference between dates according to days in the start month (using arrays thirtyOne, thirty, and twentyEight)               
                               if(thirtyOne.indexOf(+startSplit[0]) !== -1){
                                console.log('thirty one days');
                                   reminderDuration = 30 - ( +nowSplit[1] + (31-(startSplit[1])) )
                               } else if(thirty.indexOf(+startSplit[0]) !== -1){
                                console.log('thirty days');
                                   reminderDuration = 30 - ( +nowSplit[1] + (30-(startSplit[1])) )
                               } else if(twentyEight.indexOf(+startSplit[0]) !== -1){
                                console.log('twenty eight days');
                                   reminderDuration = 30 - ( +nowSplit[1] + (28-(startSplit[1])) )
                               }
                           } 
                       }
             } else {
              return 'Start date cannot be after today\'s date'
             }
           
           $(document).on('click', "#set-reminder", function() {
               reminderHour = parseInt(reminderHour);
               reminderMin = parseInt(reminderMin);
               if( reminderAmPm === "pm") {
                   reminderHour += 12;
               }
               
               // alert(reminderHour + "\n" + reminderMin + "\n" + reminderAmPm);
               setReminder(reminderHour, reminderMin, reminderDuration, reminderFrequency, reminderMessage, true);
               
               elementAPI.userData().setValue('showDateModal', false);
               $('.modal').hide();
           });
           
           //See Confluence wiki for details about the SetReminder.js function
           
           function setReminder(hr, min, duration, frequency, message, debug) {
               var confirmation = confirm("Are you sure you want to set a reminder? Once you set it, you won't be able to undo it.");
               var html = db.getValue("html");
               
               if (html === undefined || html === null) {
                   $("body").append('<div class="alert-top" id="success-msg">Reminder set!</div><div class="alert-top" id="canceled-msg">Reminder canceled</div>');
                   db.setValue("html", 0);
                   alert("created"); 
               };
               
               if (confirmation) {
                   var futureDelays = 0; 
                   
                   if(frequency < 1) frequency = 1; 
                   frequency = Math.round(frequency);
                   duration = Math.round(duration); 
                   hr = Math.round(hr); 
                   min = Math.round(min); 
                      
                   var SECONDSINDAY = 86400;
                   var now = new Date();
                   var userDate = new Date();
                   userDate.setHours(hr, min, 0);
                   
                   var delay = (userDate - now)/1000;
                   
                   var firstDelay = SECONDSINDAY + delay;
                   if(debug){
                       ourDebug(firstDelay, 0); 
                   }
                   elementAPI.sendMessage(message, firstDelay, true);
                    
                   for (var i=1; i<duration; i++) {
                       futureDelays = firstDelay + (i*SECONDSINDAY*frequency);
                       if(debug){
                           ourDebug(futureDelays, i); 
                       }
                       elementAPI.sendMessage(message, futureDelays, true);
                   }
                   
                   $("#success-msg").fadeIn(200).delay(2000).fadeOut(200);
                   
                   /*setTimeout(function() { //We dont think this should happen. 
                       $("#reminder-settings").hide(0);
                   }, 2400);*/
               } else {
                   $("#canceled-msg").fadeIn(200).delay(2000).fadeOut(200);
               }
               
               function ourDebug(argument, num) {
                   console.log("Reminder #" + num + ": " + argument + "secs" + " = " + Math.floor(argument/SECONDSINDAY) + "days " + Math.floor((argument%SECONDSINDAY)/3600) + "hrs " + Math.floor(((argument%SECONDSINDAY)%3600)/60) + "mins " + Math.floor(((argument%SECONDSINDAY)%3600)%60) + "secs");
               }
           };
        }; //end of setMeditationAlert function