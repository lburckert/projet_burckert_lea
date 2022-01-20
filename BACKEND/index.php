<?php

require __DIR__ . '/vendor/autoload.php';
require_once __DIR__. '/bootstrap.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\JwtAuthentication;
use Firebase\JWT\JWT;
use Slim\Exception\NotFoundException;

$app = AppFactory::create();

const JWT_SECRET = "TP-CNAM-aetveu5567ppl83cww208";

function createJwt (Response $response, String $username) : Response {
    // $userid = "lburckert";
    // $email = "lburckert0@gmail.com";
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'username' => $username,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");

    return $response;
}

function  addHeaders (Response $response) : Response {
    //->withHeader('Access-Control-Allow-Origin', (str_contains($origin, 'localhost') ? 'http://localhost:4200/' : 'https://tp06-burckert-lea.herokuapp.com/'))
    //->withHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin, Authorization")

    $response = $response
    ->withHeader("Content-Type", "application/json")
    ->withHeader("Access-Control-Allow-Origin", ("*"))
    ->withHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    ->withHeader('Access-Control-Expose-Headers', 'Authorization');

    return $response;
}

$app->options('/{routes:.+}', function (Request $request, Response $response, $args) {
    $response = $response->withHeader('Access-Control-Max-Age', 600);
    return addHeaders($response, $request->getHeader('Origin'));
});

$app->post('/api/register/', function (Request $request, Response $response, $args) {

    $body = $request->getParsedBody();
    $email = $body['email'] ?? "";
    $password = $body['password'] ?? "";
    $username = $body['username'] ?? "";
    $firstname = $body['firstname'] ?? "";
    $lastname = $body['lastname'] ?? "";
    $city = $body['city'] ?? "";
    $state = $body['state'] ?? "";
    $address = $body['address'] ?? "";
    $zip = $body['zip'] ?? "";
    $phone = $body['phone'] ?? "";
    $civility = $body['civility'] ?? "";

    $err = 
    
    $email == "" ||
    $password == "" || 
    $username == "" || 
    $firstname == "" || 
    $lastname == "" || 
    $city == "" || 
    $state == "" || 
    $address == "" || 
    $zip == "" || 
    $phone == "" || 
    $civility == "";

    if ($err) {
        // Problème avec les champs
        $data["error"] = "Error with the accounts field";
        $response = $response->withStatus(403);
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response;
    }

    $clientRespository = Config::getInstance()->entityManager->getRepository('Client');
    $client = $clientRespository->findOneBy(array("username" => $username));

    if ($client != null) {
        // Client déjà existant avec cet username dans la base
        $data["error"] = "Error creating the account";
        $response = $response->withStatus(403);
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response;
    }

    $newClient = new Client();
    $newClient->setEmail($email);
    $newClient->setFirstname($firstname);
    $newClient->setLastname($lastname);
    $newClient->setUsername($username);
    $newClient->setAddress($address);
    $newClient->setPhone($phone);
    $newClient->setCivility($civility);
    $newClient->setZip($zip);
    $newClient->setState($state);
    $newClient->setCity($city);
    $newClient->setPassword(password_hash($password, PASSWORD_DEFAULT));
    Config::getInstance()->entityManager->persist($newClient);
    Config::getInstance()->entityManager->flush();

    $data["username"] = $username;
    $response = $response->withHeader("Access-Control-Max-Age", 600);
    $response = addHeaders($response, $request->getHeader('Origin'));
    $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

    return $response;
});

$app->get('/api/login/{username}', function (Request $request, Response $response, $args) {

    $username = $args['username'];

    $clientRespository = Config::getInstance()->entityManager->getRepository('Client');
    $client = $clientRespository->findOneBy(array("username" => $username));

    if($username) {

        $data = array(
            'id' => $client->getClientId(),
            'firstname' => $client->getFirstname(),
            'lastname' => $client->getLastname(),
            'account' => array(
                'username' => $client->getUsername()
            ),
            'address' => $client->getAddress(),
            'email' => $client->getEmail(),
            'phone' => $client->getPhone(),
            'civility' => $client->getCivility(),
            'zip' => $client->getZip(),
            'state' => $client->getState(),
            'city' => $client->getCity()
        );

        $response = addHeaders($response, $request->getHeader('Origin'));
        $response = createJwt($response, $username);
        $response->getBody()->write(json_encode($data));
    }
    else {
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->post('/api/login/', function (Request $request, Response $response, $args) {
    $body = $request->getParsedBody();
    $username = $body['username'] ?? "";
    $password = $body['password'] ?? "";

    $err = $username == "" || $password == "";

    if ($err) {
        // Problème avec les champs
        $data["error"] = "Error with the accounts field";
        $response = $response->withStatus(403);
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response;
    }

    $clientRespository = Config::getInstance()->entityManager->getRepository('Client');
    $client = $clientRespository->findOneBy(array("username" => $username));

    if ($client == null || !password_verify($password, $client->getPassword())) {
        // Aucun client connu avec cet username ou mdp
        $data["error"] = "Error with the username or password";
        $response = $response->withStatus(403);
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response;
    }

    $data["username"] = $client->getUsername();
    $response = addHeaders($response, $request->getHeader('Origin'));
    $response = createJWT($response, $username);
    $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

    return $response;
});

$app->get('/api/products/', function(Request $request, Response $response, $args) {
    $productRepository = Config::getInstance()->entityManager->getRepository('Product');
    $products = $productRepository->findAll();

    $data = array();
    foreach($products as $product) {
        $productInfo = array(
            "product_id" => $product->getProductId(),
            "name" => $product->getName(),
            "description" => $product->getDescription(),
            "shortdescription" => $product->getShortdescription(),
            "logo" => $product->getLogo(),
            "picture" => $product->getPicture(),
            "price" => $product->getPrice(),
            "date" => $product->getDate()->format('d/m/Y'),
            "brand" => $product->getBrand(),
            "pages" => $product->getPages(),
            "ean" => $product->getEan()
        );
        array_push($data, $productInfo);
    }

    $response = addHeaders($response);
    $response->getBody()->write(json_encode($data));
    return $response;
});

$app->post('/api/order/', function (Request $request, Response $response, $args) {

    $lastId = -1;

    $body = $request->getParsedBody();
    $client_id = $body['client_id'] ?? "";
    $product_id = $body['product_id'] ?? "";
    $reference = $body['reference'] ?? "";
    $totalprice = $body['totalprice'] ?? "";
    $devise = $body['devise'] ?? "";
    $totalitemquantity = $body['totalitemquantity'] ?? "";

    $err = 
    
    $client_id == "" ||
    $product_id == "" || 
    $reference == "" || 
    $totalprice == "" || 
    $devise == "" || 
    $totalitemquantity == "";

    if ($err) {
        // Problème avec les champs
        $data["error"] = "Error with the accounts field";
        $response = $response->withStatus(403);
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response;
    }

    $orderheaderRepository = Config::getInstance()->entityManager->getRepository('Orderheader');
    $lastId = $orderheaderRepository->findBy( 
        array(),
        array('orderheaderId' => 'DESC'));

    if ($lastId == null) {

        $lastId = 0;
    } else {

        $lastId = $lastId[0]->getOrderheaderId();
    }

    $clientRespository = Config::getInstance()->entityManager->getRepository('Client');
    $client = $clientRespository->findOneBy(array("clientId" => $client_id));

    $productRepository = Config::getInstance()->entityManager->getRepository('Product');

    $orderdetailRepository = Config::getInstance()->entityManager->getRepository('Orderdetail');

    if ($lastId == -1) {
        // Client déjà existant avec cet username dans la base
        $data["error"] = "Error creating the account";
        $response = $response->withStatus(403);
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response;
    }

    $lastId ++;

    $newOrderheader = new Orderheader();
    $newOrderheader->setClient($client);
    $newOrderheader->setReference($reference . $lastId);
    $newOrderheader->setTotalprice($totalprice);
    $newOrderheader->setDevise($devise);
    $newOrderheader->setTotalitemquantity($totalitemquantity);

    Config::getInstance()->entityManager->persist($newOrderheader);
    Config::getInstance()->entityManager->flush();

    $orderheader = $orderheaderRepository->findBy( 
        array(),
        array('orderheaderId' => 'DESC'));
    
    $orderheader = $orderheader[0];
    $orderdetails = explode(',', $product_id, PHP_INT_MAX);
    
    foreach($orderdetails as $orderdetail) {

        $newOrderdetail = new Orderdetail();

        $product = $productRepository->findOneBy(array("productId" => $orderdetail));

        $newOrderdetail->setOrderheader($orderheader);
        $newOrderdetail->setProduct($product);

        Config::getInstance()->entityManager->persist($newOrderdetail);
    }

    Config::getInstance()->entityManager->flush();

    $response = $response->withHeader("Access-Control-Max-Age", 600);
    $response = addHeaders($response, $request->getHeader('Origin'));
    $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

    return $response;
});

$app->get('/api/order/header/{client_id}', function(Request $request, Response $response, $args) {

    $client_id = $args['client_id'] ?? "";

    $clientRespository = Config::getInstance()->entityManager->getRepository('Client');
    $client = $clientRespository->findOneBy(array("clientId" => $client_id));

    $orderheaderRepository = Config::getInstance()->entityManager->getRepository('Orderheader');
    $orderheaders = $orderheaderRepository->findBy(array("client" => $client));

    if ($client_id == "" || $client == null || $orderheaders == null) {
        // Problème avec les champs
        $data["error"] = "Error with the accounts field";
        $response = $response->withStatus(403);
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response;
    }

    $data = array();
    foreach($orderheaders as $orderheader) {
        $orderheaderInfo = array(
            "orderheader_id" => $orderheader->getOrderheaderId(),
            "reference" => $orderheader->getReference(),
            "devise" => $orderheader->getDevise(),
            "totalitemquantity" => $orderheader->getTotalitemquantity(),
            "totalprice" => $orderheader->getTotalprice()
        );
        array_push($data, $orderheaderInfo);
    }

    //$response = addHeaders($response);
    $response = addHeaders($response, $request->getHeader('Origin'));
    $response->getBody()->write(json_encode($data));
    return $response;
});

$app->get('/api/order/detail/{orderheader_id}', function(Request $request, Response $response, $args) {

    $orderheader_id = $args['orderheader_id'] ?? "";


    $orderheaderRepository = Config::getInstance()->entityManager->getRepository('Orderheader');
    $orderheader = $orderheaderRepository->findOneBy(array("orderheaderId" => $orderheader_id));

    $orderdetailRepository = Config::getInstance()->entityManager->getRepository('Orderdetail');
    $orderdetails = $orderdetailRepository->findBy(array("orderheader" => $orderheader));

    if ($orderheader_id == "") {
        // Problème avec les champs
        $data["error"] = "Error with the accounts field";
        $response = $response->withStatus(403);
        $response = addHeaders($response, $request->getHeader('Origin'));
        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        return $response;
    }

    $data = array();
    foreach($orderdetails as $orderdetail) {
        $orderdetailInfo = array(
            "orderdetail_id" => $orderdetail->getOrderdetailId(),
            "orderheader_id" => $orderdetail->getOrderheader()->getOrderheaderId(),
            "product_name" => $orderdetail->getProduct()->getName()
        );
        array_push($data, $orderdetailInfo);
    }

    //$response = addHeaders($response);
    $response = addHeaders($response, $request->getHeader('Origin'));
    $response->getBody()->write(json_encode($data));
    return $response;
});

$app->add(new JwtAuthentication(Config::getInstance()->options));

// Run app
$app->run();

?>