&lt;?php
$id = $_GET['id'];
$file = __DIR__ . "/destinos/$id.txt";
if(file_exists($file)){
    $destino = trim(file_get_contents($file));
    echo json_encode(["destino"=&gt;$destino]);
} else {
    echo json_encode(["destino"=&gt;null]);
}
?&gt;