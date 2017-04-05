<?php
namespace loginapi\V1\Rest\Users;

use Zend\Paginator\Adapter\DbTableGateway as TableGatewayPaginator;
use ZF\Apigility\DbConnectedResource;
use loginapi\Module;
use Zend\ServiceManager\ServiceLocatorAwareInterface;
use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\Crypt\Password\Bcrypt;
use Zend\Form\Element\DateTime;

class UsersResource extends DbConnectedResource
{
  
   protected $serviceLocator;

    public function setServiceLocator(ServiceLocatorInterface $serviceLocator)
    {
        $this->serviceLocator = $serviceLocator;
    }
    public function getServiceLocator()
    {
        return $this->serviceLocator;
    }

	public function create($data)
    {
    			
    		$bcrypte = new Bcrypt();
    		$pass = $bcrypte->create($data->passwort);
      
    		
    	/*$adapter = $this->table->getAdapter();
    	//Oauth Controller connect
    	$ControllerModule = new Module();
        $config = $ControllerModule->getServiceConfig();
        $config->setAdapter($adapter);
        $config->setServiceLocator($this->getServiceLocator());
 		//$config->insertOauthUser($adapter,$data)*/
		//-----
 	
        $data = $this->retrieveData($data);

        $data['passwort']       =  $pass;
 		
        $this->table->insert($data);
        $id = $this->table->getLastInsertValue();
        return $this->fetch($id);
    }
    }