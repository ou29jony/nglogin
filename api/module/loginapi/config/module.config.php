<?php
return [
    'router' => [
        'routes' => [
            'loginapi.rest.user-right' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/user_right[/:user_right_id]',
                    'defaults' => [
                        'controller' => 'loginapi\\V1\\Rest\\UserRight\\Controller',
                    ],
                ],
            ],
            'loginapi.rest.users' => [
                'type' => 'Segment',
                'options' => [
                    'route' => '/users[/:users_id]',
                    'defaults' => [
                        'controller' => 'loginapi\\V1\\Rest\\Users\\Controller',
                    ],
                ],
            ],
        ],
    ],
    'zf-versioning' => [
        'uri' => [
            0 => 'loginapi.rest.user-right',
            1 => 'loginapi.rest.users',
        ],
    ],
    'zf-rest' => [
        'loginapi\\V1\\Rest\\UserRight\\Controller' => [
            'listener' => 'loginapi\\V1\\Rest\\UserRight\\UserRightResource',
            'route_name' => 'loginapi.rest.user-right',
            'route_identifier_name' => 'user_right_id',
            'collection_name' => 'user_right',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \loginapi\V1\Rest\UserRight\UserRightEntity::class,
            'collection_class' => \loginapi\V1\Rest\UserRight\UserRightCollection::class,
            'service_name' => 'user_right',
        ],
        'loginapi\\V1\\Rest\\Users\\Controller' => [
            'listener' => \loginapi\V1\Rest\Users\UsersResource::class,
            'route_name' => 'loginapi.rest.users',
            'route_identifier_name' => 'users_id',
            'collection_name' => 'users',
            'entity_http_methods' => [
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
                4 => 'POST',
            ],
            'collection_http_methods' => [
                0 => 'GET',
                1 => 'POST',
            ],
            'collection_query_whitelist' => [],
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => \loginapi\V1\Rest\Users\UsersEntity::class,
            'collection_class' => \loginapi\V1\Rest\Users\UsersCollection::class,
            'service_name' => 'users',
        ],
    ],
    'zf-content-negotiation' => [
        'controllers' => [
            'loginapi\\V1\\Rest\\UserRight\\Controller' => 'HalJson',
            'loginapi\\V1\\Rest\\Users\\Controller' => 'HalJson',
        ],
        'accept_whitelist' => [
            'loginapi\\V1\\Rest\\UserRight\\Controller' => [
                0 => 'application/vnd.loginapi.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
            'loginapi\\V1\\Rest\\Users\\Controller' => [
                0 => 'application/vnd.loginapi.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ],
        ],
        'content_type_whitelist' => [
            'loginapi\\V1\\Rest\\UserRight\\Controller' => [
                0 => 'application/vnd.loginapi.v1+json',
                1 => 'application/json',
            ],
            'loginapi\\V1\\Rest\\Users\\Controller' => [
                0 => 'application/vnd.loginapi.v1+json',
                1 => 'application/json',
            ],
        ],
    ],
    'zf-hal' => [
        'metadata_map' => [
            \loginapi\V1\Rest\UserRight\UserRightEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'loginapi.rest.user-right',
                'route_identifier_name' => 'user_right_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \loginapi\V1\Rest\UserRight\UserRightCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'loginapi.rest.user-right',
                'route_identifier_name' => 'user_right_id',
                'is_collection' => true,
            ],
            \loginapi\V1\Rest\Users\UsersEntity::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'loginapi.rest.users',
                'route_identifier_name' => 'users_id',
                'hydrator' => \Zend\Hydrator\ArraySerializable::class,
            ],
            \loginapi\V1\Rest\Users\UsersCollection::class => [
                'entity_identifier_name' => 'id',
                'route_name' => 'loginapi.rest.users',
                'route_identifier_name' => 'users_id',
                'is_collection' => true,
            ],
        ],
    ],
    'zf-apigility' => [
        'db-connected' => [
            'loginapi\\V1\\Rest\\UserRight\\UserRightResource' => [
                'adapter_name' => 'login_Auth',
                'table_name' => 'user_right',
                'hydrator_name' => \Zend\Hydrator\ArraySerializable::class,
                'controller_service_name' => 'loginapi\\V1\\Rest\\UserRight\\Controller',
                'entity_identifier_name' => 'id',
                'table_service' => 'loginapi\\V1\\Rest\\UserRight\\UserRightResource\\Table',
            ],
            \loginapi\V1\Rest\Users\UsersResource::class => [
                'adapter_name' => 'login_Auth',
                'table_name' => 'users',
                'hydrator_name' => \Zend\Hydrator\ArraySerializable::class,
                'controller_service_name' => 'loginapi\\V1\\Rest\\Users\\Controller',
                'entity_identifier_name' => 'id',
                'table_service' => 'loginapi\\V1\\Rest\\Users\\UsersResource\\Table',
                'resource_class' => \loginapi\V1\Rest\Users\UsersResource::class,
            ],
        ],
    ],
    'zf-content-validation' => [
        'loginapi\\V1\\Rest\\UserRight\\Controller' => [
            'input_filter' => 'loginapi\\V1\\Rest\\UserRight\\Validator',
        ],
        'loginapi\\V1\\Rest\\Users\\Controller' => [
            'input_filter' => 'loginapi\\V1\\Rest\\Users\\Validator',
        ],
    ],
    'input_filter_specs' => [
        'loginapi\\V1\\Rest\\UserRight\\Validator' => [
            0 => [
                'name' => 'userid',
                'required' => false,
                'filters' => [
                    0 => [
                        'name' => \Zend\Filter\StripTags::class,
                    ],
                    1 => [
                        'name' => \Zend\Filter\Digits::class,
                    ],
                ],
                'validators' => [],
            ],
            1 => [
                'name' => 'right',
                'required' => false,
                'filters' => [
                    0 => [
                        'name' => \Zend\Filter\StripTags::class,
                    ],
                    1 => [
                        'name' => \Zend\Filter\Digits::class,
                    ],
                ],
                'validators' => [],
            ],
        ],
        'loginapi\\V1\\Rest\\Users\\Validator' => [
            0 => [
                'name' => 'email',
                'required' => true,
                'filters' => [
                    0 => [
                        'name' => \Zend\Filter\StringTrim::class,
                    ],
                    1 => [
                        'name' => \Zend\Filter\StripTags::class,
                    ],
                ],
                'validators' => [
                    0 => [
                        'name' => 'ZF\\ContentValidation\\Validator\\DbNoRecordExists',
                        'options' => [
                            'adapter' => 'login_Auth',
                            'table' => 'users',
                            'field' => 'email',
                        ],
                    ],
                    1 => [
                        'name' => \Zend\Validator\StringLength::class,
                        'options' => [
                            'min' => 1,
                            'max' => '255',
                        ],
                    ],
                ],
            ],
            1 => [
                'name' => 'passwort',
                'required' => true,
                'filters' => [
                    0 => [
                        'name' => \Zend\Filter\StringTrim::class,
                    ],
                    1 => [
                        'name' => \Zend\Filter\StripTags::class,
                    ],
                ],
                'validators' => [
                    0 => [
                        'name' => \Zend\Validator\StringLength::class,
                        'options' => [
                            'min' => 1,
                            'max' => '255',
                        ],
                    ],
                ],
            ],
            2 => [
                'name' => 'vorname',
                'required' => true,
                'filters' => [
                    0 => [
                        'name' => \Zend\Filter\StringTrim::class,
                    ],
                    1 => [
                        'name' => \Zend\Filter\StripTags::class,
                    ],
                ],
                'validators' => [
                    0 => [
                        'name' => \Zend\Validator\StringLength::class,
                        'options' => [
                            'min' => 1,
                            'max' => '255',
                        ],
                    ],
                ],
            ],
            3 => [
                'name' => 'nachname',
                'required' => true,
                'filters' => [
                    0 => [
                        'name' => \Zend\Filter\StringTrim::class,
                    ],
                    1 => [
                        'name' => \Zend\Filter\StripTags::class,
                    ],
                ],
                'validators' => [
                    0 => [
                        'name' => \Zend\Validator\StringLength::class,
                        'options' => [
                            'min' => 1,
                            'max' => '255',
                        ],
                    ],
                ],
            ],
            4 => [
                'name' => 'created_at',
                'required' => true,
                'filters' => [],
                'validators' => [],
            ],
            5 => [
                'name' => 'updated_at',
                'required' => false,
                'filters' => [],
                'validators' => [],
            ],
            6 => [
                'name' => 'passwortcode',
                'required' => false,
                'filters' => [
                    0 => [
                        'name' => \Zend\Filter\StringTrim::class,
                    ],
                    1 => [
                        'name' => \Zend\Filter\StripTags::class,
                    ],
                ],
                'validators' => [
                    0 => [
                        'name' => \Zend\Validator\StringLength::class,
                        'options' => [
                            'min' => 1,
                            'max' => '255',
                        ],
                    ],
                ],
            ],
            7 => [
                'name' => 'passwortcode_time',
                'required' => false,
                'filters' => [],
                'validators' => [],
            ],
            8 => [
                'name' => 'active',
                'required' => false,
                'filters' => [
                    0 => [
                        'name' => \Zend\Filter\StripTags::class,
                    ],
                    1 => [
                        'name' => \Zend\Filter\Digits::class,
                    ],
                ],
                'validators' => [],
            ],
            9 => [
                'name' => 'activatecode',
                'required' => false,
                'filters' => [
                    0 => [
                        'name' => \Zend\Filter\StringTrim::class,
                    ],
                    1 => [
                        'name' => \Zend\Filter\StripTags::class,
                    ],
                ],
                'validators' => [
                    0 => [
                        'name' => \Zend\Validator\StringLength::class,
                        'options' => [
                            'min' => 1,
                            'max' => '255',
                        ],
                    ],
                ],
            ],
            10 => [
                'name' => 'activatecode_time',
                'required' => false,
                'filters' => [],
                'validators' => [],
            ],
        ],
    ],
    'zf-mvc-auth' => [
        'authorization' => [
            'loginapi\\V1\\Rest\\Users\\Controller' => [
                'collection' => [
                    'GET' => true,
                    'POST' => false,
                    'PUT' => false,
                    'PATCH' => false,
                    'DELETE' => false,
                ],
                'entity' => [
                    'GET' => true,
                    'POST' => false,
                    'PUT' => false,
                    'PATCH' => false,
                    'DELETE' => true,
                ],
            ],
            'loginapi\\V1\\Rest\\UserRight\\Controller' => [
                'collection' => [
                    'GET' => true,
                    'POST' => true,
                    'PUT' => false,
                    'PATCH' => false,
                    'DELETE' => false,
                ],
                'entity' => [
                    'GET' => true,
                    'POST' => false,
                    'PUT' => true,
                    'PATCH' => true,
                    'DELETE' => true,
                ],
            ],
        ],
    ],
];
