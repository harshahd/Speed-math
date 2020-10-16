var carousel=".game-carousel";
var count=0;
var clock=null;
var mainContent =null;
var gsDialog =null;
var grDialog=null;
var totalQuestions=0;
var correct=0;
var wrong=0;
var maximum = 0;
var animateInterval=0;
var startAnimation=true;
var taskId=0;
var questionForm=document.createElement("form");
var questions=[];
var mTables;
var mTables2;
function initTimer()
{
gsDialog = document.querySelector(".game-setup-modal");
grDialog = document.querySelector(".game-report-modal");
mainContent = document.querySelector("#main-content");
clock=document.getElementById("clock");
gsDialog.addEventListener("keyup", function(event)
{
if(event.keyCode==27)
{
closeGameSetupDialog();
}
});
clearInterval(animateInterval)
animateInterval=setInterval(function()
{
if(!startAnimation)
return;
animateCarousel(count);
count=count+1;
}, 5000);
}

function animateCarousel(carouselNumber)
{
var n  = (carouselNumber%3)+1;
var previous = n-1;
if(previous==0)
{
previous=3;
}
var prevElement = document.querySelector(carousel+previous);
var element= document.querySelector(carousel+n);
prevElement.style.display="none";
element.style.display="block";
}

function setupGameDialog()
{
mainContent.style.display="none";
mainContent.setAttribute("tabindex", "-1");
gsDialog.style.display="block";
gsDialog.setAttribute("tabindex", "0");
gsDialog.focus();
}

function closeGameSetupDialog()
{
var btn=document.querySelector("#startSetup");
gsDialog.style.display="none";
if((totalQuestions>=3) && (maximum>=5))
{
document.querySelector(".intro-carousel").style.display="none";
}
mainContent.style.display="block";
btn.focus();
}


function save_info()
{
totalQuestions=document.querySelector("#total_questions").value;
maximum=document.querySelector("#max_numbers").value;
closeGameSetupDialog();
startAnimation=false;
clearInterval(animateInterval);
document.getElementById("startSetup").style.display="none";
for(i=0;i<totalQuestions;i++)
{
form_question(i);
}
var finish = document.createElement("input");
finish.setAttribute("type", "submit");
questionForm.appendChild(finish);
questionForm.setAttribute("action", "javascript:void(0)");
questionForm.setAttribute("method", "POST");
questionForm.setAttribute("onsubmit", "presentReport();");
document.getElementById("question_section").appendChild(questionForm);
taskId=setInterval(function()
{
clock.innerHTML=count+" seconds";
count=count+1;
}, 1000);
}

function form_question(position)
{
var left = Math.floor(Math.random()*maximum+1);
var operator = Math.floor(Math.random()*5);
var right = Math.floor(Math.random()*maximum+1);
if(right>left)
{
var temp=right;
right=left;
left=right;
}
var question =new Question(left, operator, right);
question.setAnswer();
questions.push(question);
form_input(position,question);
}

function form_input(position,question)
{
var label = document.createElement("label");
label.innerHTML="Question "+(position+1)+": What is "+question.left+" "+question.operatorStr+" "+question.right+"?";
var labelId = document.createAttribute("id");
labelId.value="q"+(position+1);
label.setAttributeNode(labelId);
var br = document.createElement("br");
var input = document.createElement("input");
input.setAttribute("aria-labelledby", "q"+(position+1));
input.setAttribute("required", "true");
input.setAttribute("type", "number");
input.setAttribute("name", "q"+(position+1));
input.setAttribute("id", "question"+(position+1));
questionForm.appendChild(label);
questionForm.appendChild(input);
questionForm.appendChild(br);
}

function presentReport()
{
clearInterval(taskId);
mainContent.style.display="none";
mainContent.setAttribute("tabindex", "-1");
grDialog.style.display="block";
grDialog.setAttribute("tabindex", "0");
grDialog.focus();
var table=document.createElement("table");
var tr=document.createElement("tr");
var th1=document.createElement("th");
var th2=document.createElement("th");
var th3=document.createElement("th");
var table2=document.createElement("table");
var tr2=document.createElement("tr");
var tr3=document.createElement("tr");
var th21=document.createElement("th");
var th22=document.createElement("th");
var th23=document.createElement("th");
var th24 = document.createElement("th");
th1.innerHTML="Question";
th2.innerHTML="Your answer";
th3.innerHTML="Correct answer";
th21.innerHTML="Total questions";
th22.innerHTML="Total wrong answers";
th23.innerHTML="Total correct answers";
th24.innerHTML="Time took to complete in seconds";
tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
table.appendChild(tr);
tr2.appendChild(th21);
tr2.appendChild(th22);
tr2.appendChild(th23);
tr2.appendChild(th24);
table2.appendChild(tr2);
for(i=0;i<questions.length;i++)
{
var row=document.createElement("tr");
var data1 = document.createElement("td");
data1.innerHTML=questions[i].left+" "+questions[i].operatorStr+" "+questions[i].right;
var data2=document.createElement("td");
data2.innerHTML=document.getElementById("question"+(i+1)).value;
var data3=document.createElement("td");
data3.innerHTML=questions[i].answer;
if(document.getElementById("question"+(i+1)).value!=questions[i].answer)
{
wrong=wrong+1;
}
else if(document.getElementById("question"+(i+1)).value==questions[i].answer)
{
correct=correct+1;
}
row.appendChild(data1);
row.appendChild(data2);
row.appendChild(data3);
table.appendChild(row);
}
var data21 = document.createElement("td");
var data22=document.createElement("td");
var data23=document.createElement("td");
var data24=document.createElement("td");
data21.innerHTML=totalQuestions;
data22.innerHTML=wrong;
data23.innerHTML = correct;
data24.innerHTML=count+" seconds.";
tr3.appendChild(data21);
tr3.appendChild(data22);
tr3.appendChild(data23);
tr3.appendChild(data24);
table2.appendChild(tr3);
mTables=table;
mTables2=table2;
var br=document.createElement("br");
grDialog.appendChild(mTables);
grDialog.appendChild(br);
grDialog.appendChild(br);
grDialog.appendChild(mTables2);
}

function closeGameReportDialog()
{
var btn=document.querySelector("#startSetup");
grDialog.style.display="none";
count=0;
totalQuestions=0;
maximum=0;
animateInterval=0;
correct=0;
wrong=0;
startAnimation=true;
questions=[];
document.querySelector(".intro-carousel").style.display="block";
mainContent.style.display="block";
btn.style.display="block";
btn.focus();
document.getElementById("question_section").removeChild(questionForm);
grDialog.removeChild(mTables);
grDialog.removeChild(mTables2);
mTables=null;
mTables2=null;
questionForm=document.createElement("form");
}





