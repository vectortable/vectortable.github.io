<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<!--    <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>-->
<meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>
	Send Tech Support
</title>
    <style type="text/css">
        .form1
        {
            width: 591px;
            height: 232px;
            position: absolute;
            top: 15px;
            left: 10px;
        }
        .txtBody
        {
            width: 500px;
            height: 100px;
            border: medium outset #FF00FF;
            left: 80px;
            position: absolute;
            top: 90px;
            font-size: small;
        }
        .label1body
        {
            font-size: x-small;
            font-weight: bold;
            color: #008080;
            position: absolute;
            visibility: visible;
            left: 15px;
            top: 130px;
        }
        .sendmail
        {
            top: 205px;
            left: 515px;
            position: absolute;
            background-color: #008080;
            color: #FFFFFF;
            font-size: x-small;
        }
        .lblTo
        {
            font-size: x-small;
            font-weight: bold;
            color: #008080;
            position: fixed;
            visibility: visible;
            left: 26px;
            top: 39px;
        }
        .lblFrom
        {
            font-size: x-small;
            font-weight: bold;
            color: #008080;
            position: absolute;
            visibility: visible;
            left: 15px;
            top: 48px;
        }
        .lblSubject
        {
            font-size: x-small;
            font-weight: bold;
            color: #008080;
            position: absolute;
            visibility: visible;
            left: 15px;
            height: 12px;
            top: 73px;
        }
        .txtboxSubject
        {
            position: absolute;
            width: 500px;
            left: 80px;
            font-size: small;
            top: 65px;
        }
        .txtboxFrom
        {
            position: absolute;
            width: 500px;
            left: 80px;
            font-size: x-small;
            top: 42px;
        }
    </style>
</head>
<body>

<?php
    session_start();
    // Echo session variables that were set on previous page
//    echo "from app: " . $_SESSION["appname"] . ".<br>";
//    echo "Favorite animal is " . $_SESSION["animal"] . ".";
?>

    <form name="form1" method="post" action="getresultpost.php" id="form1" class="form1" onsubmit="return checkTextBoxes();">

    <div class="form1" style="width: 587px; height: 227px; top: 0px; left: 0px;">
    
        <span id="Label1" class="lblTo">Request Tech Support For "<?php echo $_SESSION["appname"]; ?>": </span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <br>
        <span id="Label2" class="lblFrom">From:</span>
        <input name="frombox" id="frombox" class="txtboxFrom" type="text" placeholder="  Your email address">
        <br>
        <span id="Label3" class="lblSubject">Subject:</span>
        <input name="subjectbox" id="subjectbox" class="txtboxSubject" type="text">
        <br>
        <br>
        <span id="Label4" class="label1body">Body:</span>
        <textarea name="bodybox" rows="10" cols="20" id="bodybox" class="txtBody"></textarea>
        <br>
        <input name="Btn_SendMail" value="Submit" id="Btn_SendMail" class="sendmail" type="submit">
        <br>
        <input name="appname" id="appname" class="appname" type="hidden" value="<?php echo $_SESSION["appname"]; ?>">

    </div>
    </form>

<script>
function checkTextBoxes() {
    
    if (frombox.value == '')
    {
        alert("You have not entered an email address in the From box!");
        return false;
    }
    else if (subjectbox.value == '')
    {
        alert("You have not entered any thing in the Subject box!");
        return false;
    }
    else if (bodybox.value == '')
    {
        alert("You have not entered any thing in the Body box!");
        return false;
    }
    else
    {
        return true;
    }
    
}
</script>

</body></html>