<?php
if(isset($_POST['submit']))
{
$value1=0;
$value2=0;
$value3=0;
$value4=0;
$value5=0;
$value6=0;
$totalScore;
$check1=$_POST['choice1'];
$check2=$_POST['choice2'];
$check3=$_POST['choice3'];
$check4=$_POST['choice4'];
$check5=$_POST['choice5'];
$check6=$_POST['choice6'];
if($check1=="choice-1-1"){
  $value1=2;
}
else if($check1=="choice-1-2")
{
  $value1=4;
}
else if($check1=="choice=1-3")
{
  $value1=6;

}
else if($check1=="choice-1-4")
{
  $value1=8;
}

if($check2=="choice-2-1"){
  $value2=10;
}
else if($check2=="choice-2-2")
{
  $value2=0;
}
else if($check2=="choice-2-3")
{
  $value2=5;

}
else if($check2=="choice-2-4")
{
  $value2=3;
}

if($check3=="choice-3-1"){
  $value3=4;
}
else if($check3=="choice-3-2")
{
  $value3=8;
}
else if($check3=="choice-3-3")
{
  $value3=5;

}
else if($check3=="choice-3-4")
{
  $value3=6;
}
else if($check3=="choice-3-5")
{
  $value3=0;
}
if($check4=="choice-4-1"){
  $value4=7;
}
else if($check4=="choice-4-2")
{
  $value4=7;
}
else if($check4=="choice-4-3")
{
  $value4=5;

}
else if($check4=="choice-4-4")
{
  $value4=0;
}
if($check5=="choice-5-1"){
  $value5=3;
}
else if($check5=="choice-5-2")
{
  $value5=5;
}
if($check6=="choice-6-1"){
  $value6=6;
}
else if($check6=="choice-6-2")
{
  $value6=0;
}


if(($value1+$value2+$value3+$value4+$value5+$value6) <=13)
{
  echo "<center><h2>You are negative for COVID-19!!</h2></center>";
}
else if(($value1+$value2+$value3+$value4+$value5+$value6)>13 && ($value1+$value2+$value3+$value4+$value5+$value6)<=17)
{
  echo "<center><h2>You need to get a COVID-19 test!!</h2></center>";
}
else if(($value1+$value2+$value3+$value4+$value5+$value6)>17)
{
  echo "<center><h2>You are positive for COVID-19!!</h2></center>";
}
}
?>