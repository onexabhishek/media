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
if(isset($_POST['submit'])){


  $img = $_FILES['upload-img']['name'];
  $tmp_img = $_FILES['upload-img']['tmp_name'];
     var_dump($bash);
  $file = $bash.uniqid().$img;
  move_uploaded_file($tmp_img, $file);
  $images = glob($bash.'*', GLOB_BRACE);

}
if(isset($_POST['mkdir'])){
   $folder = $_POST['rename'];
   mkdir('./../upload/'.$folder);
   // die($folder);
   $images = glob('./../upload/*', GLOB_BRACE);
         
}


?>
<div class="modal fade" id="adpModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Media Gallery</h4>
        <button type="button" class="btn btn-success insert pull-right" style="display: none;">Insert</button>
        <a href="?action=enter&folder=root" class="btn btn-success pull-right">Root</a> &nbsp;&nbsp;
        <button type="button" class="btn btn-success pull-right media-back" data-rel="">Back</button> &nbsp;&nbsp;
        <button type="button" class="btn btn-success mkdir pull-right">Create Folder</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <div class="alert adp-alert" style="display: none;">
          

        </div>
        <div class="adp-media optiscroll">
          <div class="adp-prev">
    
   
        </div>
        <div class="foot">
          <h4>Choose Image</h4>
        <form action="" method="post" enctype="multipart/form-data">
          <div class="col-md-8">
              <input type="file" class="form-control" id="exampleInputName2" name="upload-img" placeholder="Jane Doe" accept="image/x-png,image/gif,image/jpeg" required="">

              </div>
              <div class="col-md-4">
            <button type="submit" name="submit" class="btn btn-primary btn-block">Upload</button>
          </div>
          </form>
        </div>  
      </div>
    </div>

      <!-- Modal footer -->
      

    </div>
  </div>
</div>


<!-- newmodal -->
<div class="modal fade" id="adpModal2">
  <div class="modal-dialog" style="width: 23.3%; margin-top: 25rem;">
    <div class="modal-content">

      

      <!-- Modal body -->
      <div class="modal-body">
      
        
      <form method="post" action="">
        <div class="form-group">
          <input type="text" name="rename" class="form-control" placeholder="Folder Name.."> 
        </div>
        <button type="submit" name="mkdir" value="mkdir" class="btn btn-success btn-block">Submit</button>
      </form>
      
    </div>

      <!-- Modal footer -->
      

    </div>
  </div>
</div>
<style>
  @media (min-width: 768px){
.modal-dialog {
    width: 1025px;
    margin: 30px auto;
}
}
  .adp-media{
    height:600px;
 
}
.adp-media.optiscroll img {
    margin-bottom: 2rem;
    cursor: pointer;
    height: 100px;
    object-fit: contain;
    width: 100%! important;
    border: 0;
        background: transparent;
}
img.img-thumbnail.adp-thumb:hover,img.img-thumbnail.adp-folder:hover {
    transform: scale(1.1);
}
.adp-media .adp-prev {
    width: 100%;
    height: 520px;
    display: block;
    overflow: hidden;
    overflow-y: scroll;
}
.adp-media .foot{
  display: block;
}
.adp-thumbnail {
    position: relative;
    padding-left: 0;
    /* padding-right: 0; */
    height: 100px;
    margin-bottom: 3rem;
    border: 0;
}
.adp-thumbnail a.thumb-close {
    background: red;
    color: #fff;
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    font-size: 16px;
    padding-left: 6px;
    line-height: 21px;
    cursor: pointer;
}
.adp-thumb:active {
    border: 5px solid #3c8dbc;
    padding: 0;
}
.adp-thumb.multiple {
    border: 5px solid #3c8dbc;
        padding: 0;
}
.modal-title {
    display: inline;
}
ul.adp-media-thumb li {
    width: 150px;
    float: left;
    margin-left: 1rem;
    margin-bottom: 2rem;
    list-style: none;
}
ul.adp-media-thumb li img {
    height: 130px;
    object-fit: cover;
}
ul.adp-media-thumb {
    display: inline-block;
}
.media-thumb-wrapper {
    margin: 2rem 0 0;
}
img.img-thumbnail.adp-folder {
    margin-bottom: 0;
    /* object-fit: contain; */
    height: 98px;
}
span.folder-name {
    font-size: 12px;
    font-weight: 500;
    display: block;
    margin-top: -21px;
    text-align: center;
}
.adp-prev-folder{
  height: 100%;
}
</style>
