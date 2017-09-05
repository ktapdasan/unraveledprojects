<?php
require_once('../PDF/fpdf.php');
$data = json_decode($_GET['reports'], true);
$total = $_GET['total'];
$user_id_fname = $_GET['user_id_fname'];
$user_id_lname = $_GET['user_id_lname'];
$date_time = $_GET['date_time'];
$TI = $_GET['TI'];
$counts = $_GET['count'];
$net_amnt = $_GET['net_amnt'];
$vat = $_GET['vat'];
$change = $_GET['change'];
$total = $_GET['total'];
$discount = $_GET['discount'];
$cash = $_GET['cash'];
$x = 50;
$y = 42;
$q = 54;
$w = 57;
$e = 60;
$r = 63;
$t = 66;
$s = 68;
$a = 70;
$endline = 73;
$endmessage = 76;
$endmessage2 = 79;
$endmessage3 = 82;
$endmessage4 = 85;
$endmessage5 = 90;
$endmessage6 = 93;
$endmessage7 = 96;
$count = 0;
$str = 'Php';

class PDF extends FPDF
{
	function construct ($margin = 10) 
	{ 
		$this->SetTopMargin($margin); 
		$this->SetLeftMargin($margin); 
		$this->SetRightMargin($margin); 
		$this->SetAutoPageBreak(true, $margin); 
	} 

	function Header()
	{
	    $this->SetFont('Arial', 'B', 5); 
		$this->SetFillColor(36, 96, 84); 
		$this->Cell(60, 0, 'GoSari', 0, 0, 'C'); 
	    $this->Ln(5);
	}

	function Footer() { 
		$this->SetFont('Arial', '', 10); 
		$this->SetTextColor(0); 
		$this->SetXY(20,-20); 
		$this->Cell(0, 20, "", 'T', 0, 'L'); 
	}

	function SetCellMargin($margin){
        // Set cell margin
        $this->cMargin = $margin;
    }
}
	$pdf = new PDF();
		// $pdf-$column_widths = ['50','50','50','50'];
		$pdf->construct();
		$pdf->AddPage('L','Legal');
		$pdf->SetFont('Arial', 'B', 5); 
		$pdf->SetXY(20,10); 
		$pdf->Cell(40, 5, 'AOMOS Information Technology Services' , 0, 'L'); 
		$pdf->Ln();
		$pdf->SetXY(19,12); 
		$pdf->Cell(10, 5, 'De Oro Bldg. Sierra Madre St. Boni Avenue' , 0, 'L'); 
		$pdf->Ln();
		$pdf->SetXY(25,14); 
		$pdf->Cell(10, 5, 'Mandaluyong City, Philippines' , 0, 'L'); 
		$pdf->Ln();
		$pdf->SetXY(24,16); 
		$pdf->Cell(10, 5, 'VAT REG TIN#000-000-000-00000' , 0, 'L'); 
		$pdf->Ln();
		$pdf->SetXY(22,18); 
		$pdf->Cell(10, 5, 'THIS SERVE AS YOUR SALES INVOICE' , 0, 'L'); 
		$pdf->Ln();
		$pdf->Ln();
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 5, 'Cashier:'." ".$user_id_fname." ".$user_id_lname, 0, 'L'); 
		$pdf->Ln();
		$pdf->Cell(10, 2,'---------------------------------------------------------------------------', 0, 'L');
		$pdf->Ln();
		$pdf->Cell(10, 5,$date_time." ".'TN#'.$TI, 0, 'L'); 
		$pdf->Ln();
		$pdf->Cell(10, 1,'---------------------------------------------------------------------------', 0, 'L');
		$pdf->Ln();
		foreach ($data as $k => $v) {
		if ($count >= 1) {
		$y += 4;
		$q += 1;
		$w += 1;
		$e += 1;
		$r += 1;
		$t += 1;
		$s += 1;
		$a += 1;
		$endline += 1;
		$endmessage += 1;
		$endmessage2 += 1;
		$endmessage3 += 1;
		$endmessage4 += 1;
		};
		$count += 1;
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->SetFillColor(36, 96, 84);
		$pdf->Ln();
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4, $v['product_quantity'], 0, 'L');
		$pdf->Cell(10, 4, $v['product_name'], 0, 'L');
		$pdf->SetXY($x,$y);
		$pdf->Cell(10, 4,$v['tempor_total'], 0, 'L');
	}	

		$pdf->Ln();
		$pdf->Ln();
		$pdf->SetXY(10,$q);
		$pdf->Cell(10, 4,$counts, 0, 'L');
		$pdf->Cell(10, 4,'Item(s)', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(20,$w);
		$pdf->Cell(10, 4,'Total Due', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(50,$w);
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 4,$total, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(20,$e);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'Cash', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(50,$e);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,$cash, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(20,$r);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'Change', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(50,$r);
		$pdf->SetFont('Arial', 'B', 8); 
		$pdf->Cell(10, 4,$change, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(20,$t);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'VATable', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(50,$t);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,$net_amnt, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(20,$s);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'Discount', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(50,$s);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,$discount, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(20,$a);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'VAT', 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(50,$a);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,$vat, 0, 'L');
		$pdf->Ln();
		$pdf->SetXY(10,$endline);
		$pdf->Cell(10, 1,'---------------------------------------------------------------------------', 0, 'L');
		$pdf->SetXY(10,$endmessage);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'THIS SERVES AS AN OFFICIAL RECEIPT', 0, 'L');
		$pdf->SetXY(10,$endmessage2);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'THANK YOU !', 0, 'L');
		$pdf->SetXY(10,$endmessage3);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'For comments and suggestions', 0, 'L');
		$pdf->SetXY(10,$endmessage4);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'you can reach us at customercare.gosari@gmail.com', 0, 'L');
		$pdf->SetXY(10,$endmessage5);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'THIS INVOICE / RECEIPT SHALL BE VALID FOR', 0, 'L');
		$pdf->SetXY(10,$endmessage6);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'FIVE (5) YEARS FROM THE DATE OF THE PERMIT TO', 0, 'L');
		$pdf->SetXY(10,$endmessage7);
		$pdf->SetFont('Arial', 'B', 6); 
		$pdf->Cell(10, 4,'USE.', 0, 'L');

		$pdf->Output();
?>