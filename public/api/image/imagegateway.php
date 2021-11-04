<?php

class ImageGateway {
    private $con=null;

    public function __construct($con){
        $this->con=$con;
    }

    public function get($dir_to_read){
        $dir=$_SERVER['DOCUMENT_ROOT'].'/images/'.$dir_to_read;

        $fileSystemIterator = new FilesystemIterator($dir);
        $entries = array();
        foreach ($fileSystemIterator as $fileInfo){
            if(!file_exists($fileInfo->getPathname())) echo "File not found.";
            $imgSize=getimagesize($fileInfo->getPathname());
            $myObj = new \stdClass();
            $myObj->width=$imgSize[0];
            $myObj->height=$imgSize[1];
            $myObj->src="/images/".$dir_to_read."/".$fileInfo->getFilename();
            $myObj->srcSet="";
            $myObj->title=$fileInfo->getFilename();
            $entries[] = $myObj;
        }
        return $entries;
    }

    public function delete($file){
        $file_url=$_SERVER['DOCUMENT_ROOT'].$file;
        return unlink($file_url);
    }

    public function put($destination, $filename, $file){
        $result = file_put_contents(
            $_SERVER['DOCUMENT_ROOT']."/images"."/".$destination."/".$filename,
            file_get_contents($file)
        );
        return !($result===false);
    }
}
?>