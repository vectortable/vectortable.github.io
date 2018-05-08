<?php
    echo "Sending ... This window will close itself after sending. \n";
//    echo "before get datetime 1 \n";
    
    require 'vendor/autoload.php';
    use Mailgun\Mailgun;
    
    # Instantiate the client.
    $mgClient = new Mailgun('key-fe90a1c6d8736a0ffeb2713810a3fbeb');
    $domain = "mg.vectortable.com";
//    $mgClient = new Mailgun('key-fe90a1c6d8736a0ffeb2713810a3fbeb');
//    $domain = "64ktech.com";
//    $domain = "sandbox9fce12dcb7ca4823b186a4d646ba88b1.mailgun.org";
    
    # Make the call to the client.
    $result = $mgClient->sendMessage("$domain",
                                     array('from'    => 'TechSupport <techsupport@vectortable.com>',
                                           'to'      => '<techsupport@vectortable.com>',
                                           'subject' => $_POST['appname'] . ":  " . "  " . $_POST['subjectbox'],
                                           'text'    => $_POST['bodybox'] . "\n\n\n\n\n" . "Sender (customer): " . $_POST['frombox']));
    
    
//    'to'      => 'devmail vttech <devmail.vttech@gmail.com>',
////    echo "Sending ... This window will close itself after sending.";
//    
//    
//    echo "before get datetime \n";
//    # Send acknowledge to customer
    $date = new DateTime();
////    echo $date;
//    echo "current date: ";
//    
    $result = $date->format('Y-m-d H:i:s');
    
    echo "result: " . $result;
    
    $myReply = 'This is to confirm that you have contacted technical support for ' . $_POST['appname'] . ' on ' . $result . "\n\n";
    
    echo $myReply;
    $mgClient = new Mailgun('key-fe90a1c6d8736a0ffeb2713810a3fbeb');
    $result = $mgClient->sendMessage("$domain",
                                     array('from'    => 'TechSupport <techsupport@vectortable.com>',
                                           'to'      => $_POST['frombox'],
                                           'subject' => $_POST['appname'] . ":  " . "  " . $_POST['subjectbox'],
                                           'text'    => $myReply));
    
    echo "<script>window.close();</script>";
    
//    <script type="text/javascript">setTimeout(window.close, 2000);</script>
    
    
//    echo "<script>setTimeout("window.close()", 5000);</script>";
    
//    <script type="text/javascript">setTimeout("window.close();", 3000);</script>
//    echo "<script type="text/javascript">setTimeout( function() { window.close(); }, 3000);</script>"
    
//    <script type="text/javascript">setTimeout( function() { window.close(); }, 3000);</script>
    
//    <script>setTimeout(function(){ window.close();}, 5000);</script>
?>
