<?php
namespace loginapi\Controller;


use Zend\ServiceManager\ServiceLocatorAwareInterface;
use Zend\Stdlib\DispatchableInterface as Dispatchable;
use Zend\Stdlib\RequestInterface as Request;
use Zend\Stdlib\ResponseInterface as Response;
use Zend\ServiceManager\ServiceManager;
//use loginapi\Model\OauthUser;
use Zend\Crypt\Password\Bcrypt;
use Zend\Db\TableGateway\TableGateway;
use Zend\ServiceManager\ServiceLocatorInterface;


class OauthUserController implements Dispatchable
{
    protected $servicesLocator;
    protected $adapter;
    protected $oauthuser;
    public function setServiceLocator(ServiceLocatorInterface $serviceLocator)
    {
        $this->serviceLocator = $serviceLocator;
    }
    public function getServiceLocator()
    {
        return $this->serviceLocator;
    }
    public function dispatch(Request $request, Response $response = null)
    {
        // ...
        // Retrieve something from the service manager
        $router = $this->getServiceLocator()->get('Router');
        // ...
    }
    public function insertOauthUser($adapter, $data)
    {
        // Für die lokale Verwendung setzen
        
        $this->adapter = $adapter;
        
        $OauthUser = new OauthUser();
        $OauthUser->exchangeArray($data);
        $OauthUser->Bcrypt($data->password);
        $this->oauthuser = $OauthUser;
        
        $this->getServiceLocator()->setService('OauthUserController', $OauthUser);
        
        $this->insert();
    }
    public function existEmail($id, $email)
    {
        $where = array(
            $id => $email
        );
        $oauthuser = $this->select($where);
        return $oauthuser;
    }
    public function setAdapter($adapter)
    {
        $this->adapter = $adapter;
    }
 
    function insert()
    {
        $this->tableGateway = new TableGateway('oauth_users', $this->adapter);
        
        $this->tableGateway->insert($this->oauthuser->getArrayCopy());
    }
    function create()
    {
        $this->tableGateway->insert($this->data);
    }
    function update($set, $where)
    {
        $this->tableGateway = new TableGateway('oauth_users', $this->adapter);
        
        $this->tableGateway->update($set, $where);
    }
    function getOauthUserById($id)
    {
        $this->identifierName = 'username';
        $this->tableGateway = new TableGateway('oauth_users', $this->adapter);
        
        $resultSet = $this->tableGateway->select([
            $this->identifierName => $id
        ]);
        if (0 === $resultSet->count()) {
            
            throw new \Exception('Item not found', 404);
        }
        return $resultSet->current();
    }
    function updateOauthUser($set, $where)
    {
        $this->tableGateway = new TableGateway('oauth_users', $this->adapter);
        
        $this->tableGateway->update($set, $where);
    }
    function delete($where)
    {
        $this->tableGateway->delete($where);
    }
    function select($where)
    {
        $this->tableGateway = new TableGateway('oauth_users', $this->adapter);
        $oauth_user = $this->tableGateway->select($where)->toArray();
        return $oauth_user;
    }
}
?>
