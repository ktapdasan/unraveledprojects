<?php
require_once('../PDF/fpdf.php');
require_once('../PHPMailer/PHPMailerAutoload.php');
$datass = json_decode($_POST['data'], true);
$total = $_POST['total'];
$user_id_fname = $_POST['user_id_fname'];
$user_id_lname = $_POST['user_id_lname'];
$date_time = $_POST['date_time'];
$TI = $_POST['TI'];
$counts = $_POST['count'];
$net_amount = $_POST['net_amount'];
$vat = $_POST['vat'];
$change = $_POST['change'];
$total = $_POST['total'];
$discount = $_POST['discount'];
$message = $_POST['message'];
$cash = $_POST['cash'];
$tempo_total = $_POST['tempo_total'];
$rname = $_POST['r_name'];
$x = 60;
$y = 51;
$q = 54;
$w = 57;
$e = 60;
$r = 63;
$t = 66;
$s = 69;
$a = 72;
$b = 25;
$n = 51;
$endline = 75;
$endmessage = 77;
$endmessage2 = 80;
$endmessage3 = 83;
$endmessage4 = 86;
$endmessage5 = 91;
$endmessage6 = 94;
$endmessage7 = 97;
$endmessage7 = 97;
$count = 0;
$str = 'Php';
$heights = 130;

	foreach ($datass as $k => $v) {
		$heights += 1;
	};

class PDF extends FPDF
{
	function construct ($margin = 7,$marginleft = 5,$marginright = 0) 
	{ 
		$this->SetTopMargin($margin); 
		$this->SetLeftMargin($marginleft); 
		$this->SetRightMargin($marginright); 
		$this->SetAutoPageBreak(true, 0); 
	} 

	function Header()
	{
	    $this->SetFont('Arial', 'B', 10); 
		$this->SetFillColor(36, 96, 84); 
		$this->Image('../../ASSETS/picture/gosarigray.png',36,2,14);
	    $this->Ln(5);
	}

	function SetCellMargin($margin){
        // Set cell margin
        $this->cMargin = $margin;
    }
}
	$pdf = new PDF('P','mm',array($heights,85));
		// $pdf-$column_widths = ['50','50','50','50'];
		$pdf->construct();
		$pdf->AddPage();
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->SetXY(14,16); 
		$pdf->Cell(40, 5, 'AOMOS Information Technology Services' , 0, 'L'); 
		$pdf->Ln();
		$pdf->SetXY(13,19); 
		$pdf->Cell(10, 5, 'De Oro Bldg. Sierra Madre St. Boni Avenue' , 0, 'L'); 
		$pdf->Ln();
		$pdf->SetXY(21,22); 
		$pdf->Cell(10, 5, 'Mandaluyong City, Philippines' , 0, 'L'); 
		$pdf->Ln();
		$pdf->SetXY(18,25); 
		$pdf->Cell(10, 5, 'VAT REG TIN#000-000-000-00000' , 0, 'L'); 
		$pdf->Ln();
		$pdf->SetXY(16,28); 
		$pdf->Cell(10, 5, 'THIS SERVE AS YOUR SALES INVOICE' , 0, 'L'); 
		$pdf->Ln();
		$pdf->Ln();
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 5, 'Cashier:'." ".$user_id_fname." ".$user_id_lname, 0, 'L'); 
		$pdf->Ln();
		$pdf->Cell(10, 2,'---------------------------------------------------------------------------', 0, 'L');
		$pdf->Ln();
		$pdf->Cell(10, 5,$date_time."               ".'TN#'.$TI, 0, 'L'); 
		$pdf->Ln();
		$pdf->Cell(10, 2,'---------------------------------------------------------------------------', 0, 'L');
		$pdf->Ln();
		foreach ($datass as $k => $v) {
		if ($count >= 1) {
		$y += 4;
		$n += 4;
		$q += 5;
		$w += 5;
		$e += 5;
		$r += 5;
		$t += 5;
		$s += 5;
		$a += 5;
		$endline += 6;
		$endmessage += 6;
		$endmessage2 += 6;
		$endmessage3 += 6;
		$endmessage4 += 6;
		$endmessage5 += 7;
		$endmessage6 += 7;
		$endmessage7 += 7;
		};
		$count += 1;
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->SetFillColor(36, 96, 84);
		$pdf->Ln();
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->SetXY(5,$n);
		$pdf->Cell(10, 4,$v['product_quantity'], 0, 'L');
		$pdf->SetXY($b,$n);
		$pdf->Cell(10, 4, $v['product_receipt_name'], 0, 'L');
		$pdf->SetXY($x,$y);
		$pdf->Cell(10, 4,$tempo_total, 0, 'L');
	}	

		$pdf->Ln();
		$pdf->Ln();
		$pdf->SetXY(5,$q);
		$pdf->Cell(10, 4,$counts, 0, 'L');
		$pdf->SetXY(25,$q);
		$pdf->Cell(10, 4,'Item(s)', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(25,$w);
		$pdf->Cell(10, 4,'Total Due', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(60,$w);
		$pdf->SetFont('Arial', 'B', 10); 
		$pdf->Cell(10, 4,$total, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(25,$e);
		$pdf->SetFont('Arial', 'B', 7); 
		$pdf->Cell(10, 4,$rname, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(60,$e);
		$pdf->SetFont('Arial', 'B', 7); 
		$pdf->Cell(10, 4,$cash, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(25,$r);
		$pdf->SetFont('Arial', 'B', 7); 
		$pdf->Cell(10, 4,'Change', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(60,$r);
		$pdf->SetFont('Arial', 'B', 10); 
		$pdf->Cell(10, 4,$change, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(25,$t);
		$pdf->SetFont('Arial', 'B', 7); 
		$pdf->Cell(10, 4,'VATable', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(60,$t);
		$pdf->SetFont('Arial', 'B', 7); 
		$pdf->Cell(10, 4,$net_amount, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(25,$s);
		$pdf->SetFont('Arial', 'B', 7); 
		$pdf->Cell(10, 4,'Discount', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(60,$s);
		$pdf->SetFont('Arial', 'B', 7); 
		$pdf->Cell(10, 4,$discount, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(25,$a);
		$pdf->SetFont('Arial', 'B', 7); 
		$pdf->Cell(10, 4,'VAT', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(60,$a);
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 4,$vat, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(5,$endline);
		$pdf->Cell(10, 2,'---------------------------------------------------------------------------', 0, 'L');
		$pdf->SetXY(5,$endmessage);
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 4,'THIS SERVES AS AN OFFICIAL RECEIPT', 0, 'L');
		$pdf->SetXY(5,$endmessage2);
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 4,'THANK YOU !', 0, 'L');
		$pdf->SetXY(5,$endmessage3);
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 4,'For comments and suggestions', 0, 'L');
		$pdf->SetXY(5,$endmessage4);
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 4,'you can reach us at gosaricare@chrsglobal.com', 0, 'L');
		$pdf->SetXY(5,$endmessage5);
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 4,'THIS INVOICE / RECEIPT SHALL BE VALID FOR', 0, 'L');
		$pdf->SetXY(5,$endmessage6);
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 4,'FIVE (5) YEARS FROM THE DATE OF THE PERMIT TO', 0, 'L');
		$pdf->SetXY(5,$endmessage7);
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 4,'USE.', 0, 'L');
		$receiptfile="../../ASSETS/uploads/receipt/receipt.pdf";
		$pdf->Output($receiptfile,'F');

		$mail = new PHPMailer;

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.gmail.com';                       // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'gosaricare@gmail.com';                
	$mail->Password = 'User123456!'; 
	$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;                                    // TCP port to connect to

	$mail->setFrom('gosaricare@chrsglobal.com', 'GoSari');
	$mail->addAddress($_POST['email']);     // Add a recipient
	//$mail->addReplyTo('info@example.com', 'Information');
	$mail->addBCC('');

	$mail->addAttachment($receiptfile);        
	// Add attachments
	//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = 'GoSari Official Receipt';
	$mail->Body    = $message;

	if(!$mail->send()) {
		
	} else {
	} 

header('Content-Type: application/json');
print(json_encode($data));
?>