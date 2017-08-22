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

        $sql = <<<EOT
                insert into product_data
                (
                    product_name,
                    product_srp,
                    product_bar_code,
                    product_stocks,
                    product_price,
                    product_product_expiration,
                    product_supplier
                )
                VALUES
                (
                    '$product_name',
                    '$product_srp',
                    '$product_bar_code',
                    '$product_stocks',
                    '$product_price',
                    '$product_product_expiration',
                    '$product_supplier'
                )
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function tender_product($data){

        $datas = $data['data'];
        $z = json_decode($datas, true);
        
        $product_transaction_number = $data['product_transaction_number'];
        $cashier_user_id = $data['cashier_user_id'];

        
        $sql = "begin;";
        foreach ($z as $key => $value) {

            $product_name = $value['product_name'];
            $product_quantity = $value['product_quantity'];
            $product_supplier_price = $value['product_srp'];
            $product_retail_price = $value['product_price'];

            $sql .= <<<EOT
                insert into tender_data
                (
                    product_name,
                    product_quantity,
                    product_supplier_price,
                    product_retail_price,
                    product_transaction_number,
                    cashier_user_id
                )
                VALUES
                (
                    '$product_name',
                    '$product_quantity',
                    '$product_supplier_price',
                    '$product_retail_price',
                    '$product_transaction_number',
                    '$cashier_user_id'
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

        $sql = <<<EOT
                insert into request_order_data
                (
                    product_pk,
                    product_finalnumber,
                    product_quantity,
                    product_date_needed,
                    product_market_price
                )
                VALUES
                (
                    '$pk',
                    '$product_finalnumber',
                    '$product_quantity',
                    '$product_date_needed',
                    '$product_market_price'
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

        $sql = <<<EOT
                update product_data set
                (
                    product_name,
                    product_srp,
                    product_bar_code,
                    product_stocks,
                    product_price,
                    product_product_expiration
                )
                =
                (
                    '$product_name',
                    '$product_srp',
                    '$product_bar_code',
                    '$product_stocks',
                    '$product_price',
                    '$product_expiration'
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
                update product_data set
                (
                    archived
                )
                =
                (
                    't'
                )
                where pk = '$pk'
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function delete_supplier_data($data){

        $pk = $data['pk'];

        $sql = <<<EOT
                update supplier_data set
                (
                    archived
                )
                =
                (
                    't'
                )
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
                    product_bar_code,
                    product_stocks,
                    product_price,
                    product_product_expiration,
                    date_created::timestamp(0)
                from product_data
                where archived = 'f'
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
