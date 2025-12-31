&lt;?php
// Pon tu token aquí
define('TOKEN', '6128304583:AAEhQuGABUp5YzB_aK-Q-L6u-UAYOHI29F0');

$content = file_get_contents("php://input");
$update = json_decode($content, true);

if(isset($update["message"])){
    $text = $update["message"]["text"];
    $chat_id = $update["message"]["chat"]["id"];

    if(preg_match("/^\/redirigir (\w+) (.+)$/", $text, $m)){
        $usuario_id = $m[1];
        $url = $m[2];
        if (!is_dir(__DIR__."/destinos")) {
            mkdir(__DIR__."/destinos", 0777, true);
        }
        file_put_contents(__DIR__."/destinos/$usuario_id.txt", $url);
        file_get_contents("https://api.telegram.org/bot".TOKEN."/sendMessage?chat_id=$chat_id&amp;text=Redirigido!");
    }
}
?&gt;