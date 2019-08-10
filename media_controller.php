<?php
error_reporting(1);
if(isset($_GET['action']) && $_GET['folder'] != 'root' && $_GET['folder'] != ''){
  $folder = $_GET['folder'];
   $images = glob('./../upload/'.$folder.'/*', GLOB_BRACE);
   $bash = './../upload/'.$folder.'/';
}else{
   $images = glob('./../upload/*', GLOB_BRACE);

   $bash = './../upload/';
}
if(isset($_POST['upload-file']) && isset($_GET['folder'])){
  $img = $_FILES['upload-img']['name'];
  $tmp_img = $_FILES['upload-img']['tmp_name'];
     var_dump($bash);
  $file = $bash.uniqid().$img;
  move_uploaded_file($tmp_img, $file);
  $images = glob($bash.'*', GLOB_BRACE);

}
if(isset($_POST['mkdir']) && isset($_GET['folder'])){
   $folder = $_POST['rename'];
   mkdir('./../upload/'.$folder);
   // die($folder);
   getDatas($folder);
         
}

if(isset($_POST['folder']) && $_POST['action'] == 'get'){
  getDatas($folder);
}
function getDatas($folder){
  $folder = $_POST['folder'];
   $datas = glob($folder.'/*', GLOB_BRACE);
   // $realpath = realpath($folder);
  // $datas = array_diff(scandir($folder), array('.', '..'));
   // var_dump($datas);
   $data_obj = [];
   $i=1;
   foreach ($datas as $data) {
     if(is_dir($data)){
      $data_obj[$i] = array('path'=>$data,'name'=>basename($data),'type'=>'folder');
     }else{
      $data_obj[$i] = array('name'=>basename($data),'path'=>$data,'type'=>'file','mime_type'=>mime_content_type($data));
     }
     $i++;
   }
 echo json_encode($data_obj);
}

?>