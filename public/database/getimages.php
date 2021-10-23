<?php
    $dir_to_read=$_POST['directory'];
    echo $dir_to_read."\n";

    $dir=$_SERVER['DOCUMENT_ROOT'].'/images/'.$dir_to_read;

    $fileSystemIterator = new FilesystemIterator($dir);

    $entries = array();
    foreach ($fileSystemIterator as $fileInfo){
        if(!file_exists($fileInfo->getPathname())) echo "File not found.";
        $imgSize=getimagesize($fileInfo->getPathname());
        $myObj = new \stdClass();
        $myObj->width=$imgSize[0];
        $myObj->height=$imgSize[1];
        $myObj->src="/images/".$fileInfo->getFilename();
        $myObj->srcSet="";
        $myObj->title=$fileInfo->getFilename();
        $entries[] = $myObj;
    }
    echo json_encode($entries);
?>