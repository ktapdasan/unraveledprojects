<?php
require_once('../PDF/fpdf.php');
$data = json_decode($_GET['reports'], true);
$total = $_GET['total'];
$str = 'Php';

class PDF extends FPDF
{
	function construct ($margin = 5) 
	{ 
		$this->SetTopMargin($margin); 
		$this->SetLeftMargin($margin); 
		$this->SetRightMargin($margin); 
		$this->SetAutoPageBreak(true, $margin); 
	} 

	function Header()
	{
	    $this->SetFont('Arial', 'B', 10); 
		$this->SetFillColor(36, 96, 84); 
		$this->Cell(0, 0, 'Sales Report', 0, 0, 'C'); 
	    $this->Ln(5);
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
		$pdf->Cell(40, 10, 'Cashier Name' , 'LTBR', 0, 'L'); 
		$pdf->Cell(40, 10, 'Product Name' , 'LTBR', 0, 'L'); 
		$pdf->Cell(36, 10, 'Product Quantity' , 'LTBR', 0, 'L'); 
		$pdf->Cell(30, 10, 'Supplier Price' , 'LTBR', 0, 'L'); 
		$pdf->Cell(25, 10, 'Retail Price' , 'LTBR', 0, 'L'); 
		$pdf->Cell(20, 10, 'Discount' , 'LTBR', 0, 'L'); 
		$pdf->Cell(29, 10, 'Voided Items' , 'LTBR', 0, 'L'); 
		$pdf->Cell(43, 10, 'Transaction Number' , 'LTBR', 0, 'L'); 
		$pdf->Cell(53, 10, 'Date Tendered' , 'LTBR', 0, 'L'); 
		$pdf->Cell(30, 10, 'Total' , 'LTBR', 0, 'L'); 
		$pdf->Ln();
		foreach ($data as $k => $v) { 
		$pdf->SetFont('Arial', 'B', 10); 
		$pdf->SetFillColor(36, 96, 84);
		$pdf->Cell(40, 10, $v['first_name'].' '.$v['last_name'], 'LTBR', 0, 'L'); 
		$pdf->Cell(40, 10, $v['product_receipt_name'], 'LTBR', 0, 'L');
		$pdf->Cell(36, 10, $v['product_quantity'], 'LTBR', 0, 'L');
		$pdf->Cell(30, 10, $v['product_supplier_price'], 'LTBR', 0, 'L');
		$pdf->Cell(25, 10, $v['product_retail_price'], 'LTBR', 0, 'L');
		$pdf->Cell(20, 10, $v['discount'], 'LTBR', 0, 'L');
		$pdf->Cell(29, 10, $v['void_count'], 'LTBR', 0, 'L');
		$pdf->Cell(43, 10, $v['product_transaction_number'], 'LTBR', 0, 'L');
		$pdf->Cell(53, 10, $v['date_created'], 'LTBR', 0, 'L');
		$pdf->Cell(30, 10, $str." ".$v['tempo_total'], 'LTBR', 0, 'L');
		$pdf->Ln();
	}	
		$pdf->Cell(40, 10, '' , 0, 'L'); 
		$pdf->Cell(40, 10, '' , 0, 'L'); 
		$pdf->Cell(36, 10, '' , 0, 'L'); 
		$pdf->Cell(30, 10, '' , 0, 'L'); 
		$pdf->Cell(25, 10, '' , 0, 'L'); 
		$pdf->Cell(20, 10, '' , 0, 'L'); 
		$pdf->Cell(29, 10, '' , 0, 'L'); 
		$pdf->Cell(43, 10, '' , 0, 'L'); 
		$pdf->Cell(53, 10, 'Grand Total' , 'LTBR', 0, 'L'); 
		$pdf->Cell(30, 10, $str." ".$total, 'LTBR', 0, 'L'); 
		$pdf->Output();
?>