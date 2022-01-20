<?php

    require_once "vendor/autoload.php";

    use Doctrine\ORM\Tools\Setup;
    use Doctrine\ORM\EntityManager;

    date_default_timezone_set('America/Lima');

    const JWT_SECRET = "TP-CNAM-aetveu5567ppl83cww208";

    class Config {    

        private static ?Config $instance = null;
        public ?EntityManager $entityManager = null;

        private function __construct()
        {
            $isDevMode = true;
            $config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
            $conn = array(
                'host' => 'ec2-52-209-111-18.eu-west-1.compute.amazonaws.com',
                'driver' => 'pdo_pgsql',
                'user' => 'antwhscsnabqub',
                'password' => 'eda0ee786c29b49e189c5ea0a7117e9a67be150e8347346c5fbb4f368e9b8177',
                'dbname' => 'd6hfdm711dm44r',
                'port' => '5432'
            );

            $this->entityManager = EntityManager::create($conn, $config);

            $this->options = [
                "attribute" => "token",
                "header" => "Authorization",
                "regexp" => "/Bearer\s+(.*)$/i",
                "secure" => false,
                "algorithm" => ["HS256"],
                "secret" => JWT_SECRET,
                "path" => ["/api"],
                "ignore" => ["/api/login/", "/api/register/", "/api/products/"],
                "error" => function ($response, $arguments) {
                $data["status"] = "error";
                $data["message"] = "INVALID JWT";
                //$data["message"] = $arguments["message"];
                return $response
                    ->withHeader("Content-Type", "application/json")
                    ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
                }
            ];
        }

        public static function getInstance() : Config {
            if (self::$instance == null) {
                self::$instance = new Config();
            }
            return self::$instance;
        }
    }