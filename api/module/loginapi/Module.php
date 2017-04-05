<?php
namespace loginapi;

use ZF\Apigility\Provider\ApigilityProviderInterface;
use loginapi\Controller\OauthUserController;

class Module implements ApigilityProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return [
            'ZF\Apigility\Autoloader' => [
                'namespaces' => [
                    __NAMESPACE__ => __DIR__ . '/src',
                ],
            ],
        ];
    }
      public function getServiceConfig()
    {       
        $config = new OauthUserController();
               return $config;
                                         
    }
}
